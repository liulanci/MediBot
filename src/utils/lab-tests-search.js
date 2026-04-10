class LabTestsSearch {
    constructor(labTestsDatabase) {
        this.db = labTestsDatabase;
        this.index = this.buildSearchIndex();
    }
    
    buildSearchIndex() {
        const index = new Map();
        
        const addToIndex = (test, categoryId, categoryName) => {
            const searchTerms = [
                test.name?.toLowerCase(),
                test.nameEn?.toLowerCase(),
                test.nameLatin?.toLowerCase(),
                test.nameAbbr?.toLowerCase(),
                test.namePinyin?.toLowerCase(),
                test.id?.toLowerCase()
            ].filter(Boolean);
            
            searchTerms.forEach(term => {
                if (!index.has(term)) {
                    index.set(term, []);
                }
                index.get(term).push({
                    ...test,
                    categoryId,
                    categoryName
                });
            });
        };
        
        Object.entries(this.db.categories).forEach(([categoryId, category]) => {
            category.items?.forEach(test => {
                addToIndex(test, categoryId, category.name);
                test.items?.forEach(subTest => {
                    addToIndex(subTest, categoryId, category.name);
                    subTest.items?.forEach(item => {
                        addToIndex(item, categoryId, category.name);
                    });
                });
            });
        });
        
        return index;
    }
    
    search(query) {
        if (!query || query.trim() === '') {
            return this.getAllTests();
        }
        
        query = query.toLowerCase().trim();
        const results = new Map();
        
        this.index.forEach((tests, term) => {
            if (term.includes(query) || this.fuzzyMatch(term, query)) {
                tests.forEach(test => {
                    if (!results.has(test.id)) {
                        results.set(test.id, {
                            ...test,
                            matchScore: this.calculateMatchScore(term, query)
                        });
                    }
                });
            }
        });
        
        return Array.from(results.values())
            .sort((a, b) => b.matchScore - a.matchScore)
            .slice(0, 50);
    }
    
    fuzzyMatch(term, query) {
        let termIndex = 0;
        for (let i = 0; i < query.length && termIndex < term.length; i++) {
            if (term[termIndex] === query[i]) {
                termIndex++;
            }
        }
        return termIndex === query.length;
    }
    
    calculateMatchScore(term, query) {
        if (term === query) return 100;
        if (term.startsWith(query)) return 90;
        if (term.includes(query)) return 80;
        if (this.fuzzyMatch(term, query)) return 70;
        return 50;
    }
    
    getAllTests() {
        const tests = [];
        Object.entries(this.db.categories).forEach(([categoryId, category]) => {
            category.items?.forEach(test => {
                tests.push({
                    ...test,
                    categoryId,
                    categoryName: category.name
                });
            });
        });
        return tests;
    }
    
    getTestsByCategory(categoryId) {
        const category = this.db.categories[categoryId];
        if (!category) return [];
        return category.items?.map(test => ({
            ...test,
            categoryId,
            categoryName: category.name
        })) || [];
    }
    
    getTestById(testId) {
        for (const [categoryId, category] of Object.entries(this.db.categories)) {
            for (const test of category.items || []) {
                if (test.id === testId) {
                    return { ...test, categoryId, categoryName: category.name };
                }
                for (const subTest of test.items || []) {
                    if (subTest.id === testId) {
                        return { ...subTest, categoryId, categoryName: category.name, parentTest: test };
                    }
                    for (const item of subTest.items || []) {
                        if (item.id === testId) {
                            return { ...item, categoryId, categoryName: category.name, parentTest: subTest, grandparentTest: test };
                        }
                    }
                }
            }
        }
        return null;
    }
    
    convertUnit(value, fromUnit, toUnit) {
        const conversions = {
            'mmol/L_to_mg/dL': { factor: 18.0182, offset: 0 },
            'mg/dL_to_mmol/L': { factor: 0.0555, offset: 0 },
            'g/L_to_g/dL': { factor: 0.1, offset: 0 },
            'g/dL_to_g/L': { factor: 10, offset: 0 },
            'μmol/L_to_mg/dL': { factor: 0.0113, offset: 0 },
            'mg/dL_to_μmol/L': { factor: 88.4, offset: 0 },
            'U/L_to_μkat/L': { factor: 0.0167, offset: 0 },
            'μkat/L_to_U/L': { factor: 60, offset: 0 }
        };
        
        const key = `${fromUnit}_to_${toUnit}`;
        const conversion = conversions[key];
        if (conversion) {
            return (value * conversion.factor + conversion.offset).toFixed(2);
        }
        return value;
    }
    
    interpretResult(testId, value, gender = 'general') {
        const test = this.getTestById(testId);
        if (!test || !test.referenceRanges) return null;
        
        const ranges = test.referenceRanges[gender] || test.referenceRanges.general || {};
        
        if (value === null || value === undefined || value === '') {
            return { status: 'unknown', interpretation: '未检测' };
        }
        
        const numericValue = parseFloat(value);
        if (isNaN(numericValue)) {
            if (ranges.negative !== undefined && (value === '阴性' || value === 'negative' || value === '-')) {
                return { status: 'normal', interpretation: '正常' };
            }
            return { status: 'unknown', interpretation: '无法判断' };
        }
        
        if (ranges.negative !== undefined) {
            return {
                status: numericValue === 0 ? 'normal' : 'abnormal',
                interpretation: numericValue === 0 ? '正常' : '异常'
            };
        }
        
        if (ranges.normal !== undefined) {
            return {
                status: 'normal',
                interpretation: ranges.normal
            };
        }
        
        if (ranges.min !== undefined && ranges.max !== undefined) {
            if (numericValue < ranges.min) {
                return {
                    status: 'low',
                    interpretation: '偏低',
                    clinicalNote: test.clinicalSignificance
                };
            } else if (numericValue > ranges.max) {
                return {
                    status: 'high',
                    interpretation: '偏高',
                    clinicalNote: test.clinicalSignificance
                };
            } else {
                return {
                    status: 'normal',
                    interpretation: '正常',
                    referenceRange: `${ranges.min}-${ranges.max}`
                };
            }
        }
        
        return { status: 'unknown', interpretation: '参考值未定义' };
    }
}

window.LabTestsSearch = LabTestsSearch;

function initLabTestsPage() {
    const searchInput = document.getElementById('lab-search');
    const resultsContainer = document.getElementById('lab-search-results');
    const categoryNav = document.getElementById('lab-categories');
    
    if (!searchInput || !resultsContainer) {
        console.warn('Lab tests elements not found');
        return;
    }
    
    if (typeof LabTestsSearch === 'undefined') {
        console.error('LabTestsSearch not loaded');
        return;
    }
    
    window.labTestsSearch = new LabTestsSearch(window.LabTestsDatabase);
    
    searchInput.addEventListener('input', debounce((e) => {
        const query = e.target.value;
        if (query.length >= 1) {
            const results = window.labTestsSearch.search(query);
            renderSearchResults(results, resultsContainer);
        } else {
            resultsContainer.innerHTML = '';
        }
    }, 300));
    
    if (categoryNav) {
        renderLabTestCategories(categoryNav);
    }
    
    console.log('Lab tests search initialized successfully');
}

function renderSearchResults(results, container) {
    if (results.length === 0) {
        container.innerHTML = '<div class="no-results">未找到匹配的检验项目</div>';
        return;
    }
    
    container.innerHTML = results.map(test => `
        <div class="lab-test-card" onclick="showLabTestDetail('${test.id}')">
            <div class="lab-test-header">
                <div class="lab-test-name">${test.name || test.nameCn}</div>
                ${test.nameAbbr ? `<div class="lab-test-abbr">${test.nameAbbr}</div>` : ''}
            </div>
            <div class="lab-test-info">
                <div class="lab-test-english">${test.nameEn || ''}</div>
                <div class="lab-test-latin">${test.nameLatin || ''}</div>
                <div class="lab-test-category">${test.categoryName}</div>
            </div>
            <div class="lab-test-specs">
                <span>🧪 ${test.specimen || '血清'}</span>
                <span>⏱️ ${test.turnaround || '60分钟'}</span>
                <span>💰 ¥${test.price || '0'}</span>
            </div>
        </div>
    `).join('');
}

function showLabTestDetail(testId) {
    const test = window.labTestsSearch.getTestById(testId);
    if (!test) return;
    
    const modal = document.createElement('div');
    modal.className = 'lab-detail-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h2>${test.nameCn || test.name}</h2>
                <button onclick="this.closest('.modal-content').parentNode.remove()">✕</button>
            </div>
            <div class="modal-body">
                <div class="detail-section">
                    <h3>基本信息</h3>
                    <div class="detail-row">
                        <span class="label">英文名称:</span>
                        <span class="value">${test.nameEn || '-'}</span>
                    </div>
                    <div class="detail-row">
                        <span class="label">拉丁名称:</span>
                        <span class="value latin">${test.nameLatin || '-'}</span>
                    </div>
                    <div class="detail-row">
                        <span class="label">缩写:</span>
                        <span class="value">${test.nameAbbr || '-'}</span>
                    </div>
                    <div class="detail-row">
                        <span class="label">检验编码:</span>
                        <span class="value">${test.code || '-'}</span>
                    </div>
                </div>
                
                <div class="detail-section">
                    <h3>标本信息</h3>
                    <div class="detail-row">
                        <span class="label">标本类型:</span>
                        <span class="value">${test.specimen || '-'}</span>
                    </div>
                    <div class="detail-row">
                        <span class="label">采集容器:</span>
                        <span class="value">${test.container || '-'}</span>
                    </div>
                    <div class="detail-row">
                        <span class="label">采血量:</span>
                        <span class="value">${test.volume || '-'}</span>
                    </div>
                    <div class="detail-row">
                        <span class="label">周转时间:</span>
                        <span class="value">${test.turnaround || '-'}</span>
                    </div>
                </div>
                
                ${test.referenceRanges ? `
                <div class="detail-section">
                    <h3>参考范围</h3>
                    ${Object.entries(test.referenceRanges).map(([key, range]) => `
                        <div class="detail-row">
                            <span class="label">${getGenderLabel(key)}:</span>
                            <span class="value">${formatReferenceRange(range)}</span>
                        </div>
                    `).join('')}
                </div>
                ` : ''}
                
                ${test.clinicalSignificance ? `
                <div class="detail-section">
                    <h3>临床意义</h3>
                    <p class="clinical-note">${test.clinicalSignificance}</p>
                    <p class="clinical-note latin">${test.clinicalSignificanceLatin || ''}</p>
                </div>
                ` : ''}
                
                <div class="detail-section">
                    <h3>检测项目</h3>
                    ${test.items ? test.items.map(item => `
                        <div class="sub-test-item">
                            <div class="sub-test-name">${item.name || item.nameCn}</div>
                            <div class="sub-test-info">
                                <span>${item.nameEn || ''}</span>
                                <span>${item.unit || ''}</span>
                            </div>
                            ${item.referenceRanges ? `
                            <div class="sub-test-range">
                                参考值: ${formatReferenceRange(item.referenceRanges.general || item.referenceRanges)}
                            </div>
                            ` : ''}
                        </div>
                    `).join('') : '<p>无子项目</p>'}
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.remove();
    });
}

function getGenderLabel(key) {
    const labels = {
        male: '男性',
        female: '女性',
        child: '儿童',
        general: '通用'
    };
    return labels[key] || key;
}

function formatReferenceRange(range) {
    if (!range) return '-';
    if (range.normal) return range.normal;
    if (range.negative !== undefined) return range.negative ? '阴性' : '阳性';
    if (range.min !== undefined && range.max !== undefined) {
        return `${range.min} - ${range.max}`;
    }
    if (range.min !== undefined) return `> ${range.min}`;
    if (range.max !== undefined) return `< ${range.max}`;
    return '-';
}

function renderLabTestCategories(container) {
    if (!window.LabTestsDatabase?.categories) return;
    
    container.innerHTML = Object.entries(window.LabTestsDatabase.categories).map(([id, category]) => `
        <div class="category-item" onclick="filterByCategory('${id}')">
            <div class="category-icon">${category.icon || '🧪'}</div>
            <div class="category-name">${category.name}</div>
            <div class="category-count">${category.items?.length || 0} 项</div>
        </div>
    `).join('');
}

function filterByCategory(categoryId) {
    const results = window.labTestsSearch.getTestsByCategory(categoryId);
    const resultsContainer = document.getElementById('lab-search-results');
    renderSearchResults(results, resultsContainer);
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('page-lab-search')) {
        initLabTestsPage();
    }
});

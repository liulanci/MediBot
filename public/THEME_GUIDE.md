# 主题颜色自定义指南

## 🎨 主题颜色系统

### CSS变量定义位置

**文件**: `css/styles.css` 第11-72行

### 可自定义的颜色变量

```css
:root {
    /* 主色调（蓝灰色系） */
    --primary: #5B7DB1;       /* 主色 */
    --primary-light: #8FA4C7;   /* 浅色 */
    --primary-dark: #3D5A80;   /* 深色 */
    
    /* 辅助色（灰绿色） */
    --secondary: #7A8B8B;
    --secondary-light: #A3B0B0;
    
    /* 功能色（柔和不刺眼） */
    --success: #6B9080;   /* 成功色 */
    --warning: #C9A962;    /* 警告色 */
    --danger: #B56B5D;    /* 危险色 */
    --info: #6B8BA3;      /* 信息色 */
    
    /* 文字颜色（舒适灰度） */
    --text-primary: #2D3748;     /* 主要文字 */
    --text-secondary: #718096;    /* 次要文字 */
    --text-muted: #A0AEC0;       /* 辅助文字 */
    
    /* 背景色 */
    --bg-gradient: linear-gradient(180deg, #FAFBFC 0%, #F7F8FA 100%);
    --bg-card: #FFFFFF;
    --bg-hover: #EDF2F7;
    
    /* 阴影（柔和多层阴影） */
    --shadow-sm: 0 1px 3px rgba(45, 55, 72, 0.08);
    --shadow: 0 2px 8px rgba(45, 55, 72, 0.06);
    --shadow-md: 0 4px 12px rgba(45, 55, 72, 0.08);
    --shadow-lg: 0 8px 24px rgba(45, 55, 72, 0.1);
    --shadow-xl: 0 16px 48px rgba(45, 55, 72, 0.12);
}
```

## 🎯 快速自定义

### 方法1：直接修改CSS文件

编辑 `css/styles.css` 中的 `:root` 部分：

```css
:root {
    /* 替换为您喜欢的颜色 */
    --primary: #YourColor;
    --primary-light: #YourLightColor;
    --primary-dark: #YourDarkColor;
}
```

### 方法2：JavaScript动态切换

```javascript
// 切换主题颜色
function setTheme(color) {
    document.documentElement.style.setProperty('--primary', color);
    document.documentElement.style.setProperty('--primary-light', lightenColor(color, 20));
    document.documentElement.style.setProperty('--primary-dark', darkenColor(color, 20));
}

// 辅助函数：变亮颜色
function lightenColor(hex, percent) {
    const num = parseInt(hex.replace('#', ''), amt = Math.round(2.55 * percent);
    const R = (num >> 16) + amt;
    const G = (num >> 8 & 0x00FF) + amt;
    const B = (num & 0x0000FF) + amt;
    return '#' + (
        0x1000000 +
        (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
        (G < 255 ? G < 1 ? 0 : G) * 0x100 +
        (B < 255 ? B < 1 ? 0 : B)
    ).toString(16).slice(1);
}

// 辅助函数：变暗颜色
function darkenColor(hex, percent) {
    return lightenColor(hex, -percent);
}
```

## 🎨 预设主题

### 蓝色主题（默认）
```css
--primary: #5B7DB1;
--primary-light: #8FA4C7;
--primary-dark: #3D5A80;
```

### 绿色主题
```css
:root {
    --primary: #10B981;
    --primary-light: #34D399;
    --primary-dark: #059669;
}
```

### 紫色主题
```css
:root {
    --primary: #8B5CF6;
    --primary-light: #A78BFA;
    --primary-dark: #7C3AED;
}
```

### 橙色主题
```css
:root {
    --primary: #F59E0B;
    --primary-light: #FBBF24;
    --primary-dark: #D97706;
}
```

### 粉色主题
```css
:root {
    --primary: #EC4899;
    --primary-light: #F472B6;
    --primary-dark: #DB2777;
}
```

### 青色主题
```css
:root {
    --primary: #06B6D4;
    --primary-light: #22D3EE;
    --primary-dark: #0891B2;
}
```

## 📝 使用示例

### 完整主题切换系统

```javascript
// 主题管理器
class ThemeManager {
    constructor() {
        this.themes = {
            blue: {
                primary: '#5B7DB1',
                primaryLight: '#8FA4C7',
                primaryDark: '#3D5A80',
                name: '专业蓝'
            },
            green: {
                primary: '#10B981',
                primaryLight: '#34D399',
                primaryDark: '#059669',
                name: '清新绿'
            },
            purple: {
                primary: '#8B5CF6',
                primaryLight: '#A78BFA',
                primaryDark: '#7C3AED',
                name: '优雅紫'
            }
        };
    }
    
    // 应用主题
    apply(themeName) {
        const theme = this.themes[themeName];
        if (!theme) return;
        
        document.documentElement.style.setProperty('--primary', theme.primary);
        documentElement.style.setProperty('--primary-light', theme.primaryLight);
        document.documentElement.style.setProperty('--primary-dark', theme.primaryDark);
        
        localStorage.setItem('selectedTheme', themeName);
    }
    
    // 保存主题
    save(themeName) {
        localStorage.setItem('selectedTheme', themeName);
    }
    
    // 加载保存的主题
    load() {
        const saved = localStorage.getItem('selectedTheme');
        if (saved) {
            this.apply(saved);
        }
    }
}

const themeManager = new ThemeManager();
```

## 🎨 颜色搭配建议

### 专业风格
- 主色：`#5B7DB1`（蓝灰）
- 成功色：`#6B9080`（灰绿）
- 警告色：`#C9A962`（柔和黄）
- 危险色：`#B56B5D`（柔和红）

### 清新风格
- 主色：`#10B981`（绿色）
- 成功色：`#059669`（深绿）
- 警告色：`#F59E0B`（橙色）
- 危险色：`#EF4444`（红色）

### 优雅风格
- 主色：`#8B5CF6`（紫色）
- 成功色：`#7C3AED`（深紫）
- 警告色：`#F59E0B`（橙色）
- 危险色：`#DC2626`（深红）

## 📱 响应式主题

主题颜色会自动适应所有屏幕尺寸：

```css
/* 手机端 */
@media (max-width: 575.98px) {
    :root {
        --primary: #5B7DB1;
    }
}

/* 平板 */
@media (min-width: 768px) and (max-width: 991.98px) {
    :root {
        --primary: #5B7DB1;
    }
}

/* 桌面端 */
@media (min-width: 992px) {
    :root {
        --primary: #5B7DB1;
    }
}
```

## 🔧 调试技巧

### 使用浏览器开发者工具

1. **打开开发者工具** (`F12`)
2. **选择元素**（点击选择器工具）
3. **查看变量**（在Styles面板可以看到CSS变量）

### 实时修改

```javascript
// 在控制台输入
document.documentElement.style.setProperty('--primary', '#FF0000');
```

## 💡 最佳实践

1. **保持对比度** - 确保文字和背景有足够对比度
2. **一致性** - 主色调统一整个应用
3. **柔和配色** - 避免过于鲜艳的颜色
4. **用户选择** - 提供主题切换选项
5. **保存偏好** - localStorage记住用户选择

---

**版本**: 2.0  
**更新**: 2024年

/**
 * 可拖动元素模块
 * 功能：让指定元素支持在屏幕上自由拖动
 * 使用方式：给元素添加 class="draggable" 即可
 */

class Draggable {
    constructor() {
        this.init();
    }
    
    init() {
        // 页面加载完成后初始化所有可拖动元素
        document.addEventListener('DOMContentLoaded', () => {
            this.initAllDraggableElements();
        });
        
        // 也监听动态添加的元素
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                mutation.addedNodes.forEach((node) => {
                    if (node.nodeType === 1) {
                        if (node.classList && node.classList.contains('draggable')) {
                            this.makeDraggable(node);
                        }
                        // 检查子元素
                        const draggables = node.querySelectorAll && node.querySelectorAll('.draggable');
                        draggables && draggables.forEach(el => this.makeDraggable(el));
                    }
                });
            });
        });
        
        observer.observe(document.body, { childList: true, subtree: true });
    }
    
    initAllDraggableElements() {
        const elements = document.querySelectorAll('.draggable, .ask-ai-btn, .floating-btn');
        elements.forEach(el => this.makeDraggable(el));
    }
    
    makeDraggable(element) {
        // 避免重复初始化
        if (element.dataset.draggableInitialized) return;
        element.dataset.draggableInitialized = 'true';
        
        // 设置初始样式
        element.style.position = 'fixed';
        element.style.zIndex = '9999';
        element.style.cursor = 'move';
        
        let isDragging = false;
        let currentX, currentY;
        let initialX, initialY;
        let initialMouseX, initialMouseY;
        
        // 鼠标按下
        const onMouseDown = (e) => {
            // 只响应左键
            if (e.button !== 0) return;
            
            isDragging = true;
            element.style.opacity = '0.8';
            element.style.transform = 'scale(1.1)';
            element.style.transition = 'none';
            
            // 获取当前坐标
            currentX = element.offsetLeft;
            currentY = element.offsetTop;
            
            // 获取鼠标初始位置
            initialMouseX = e.clientX;
            initialMouseY = e.clientY;
            
            // 添加事件监听
            document.addEventListener('mousemove', onMouseMove);
            document.addEventListener('mouseup', onMouseUp);
        };
        
        // 鼠标移动
        const onMouseMove = (e) => {
            if (!isDragging) return;
            
            // 计算移动距离
            const deltaX = e.clientX - initialMouseX;
            const deltaY = e.clientY - initialMouseY;
            
            // 计算新位置
            let newX = currentX + deltaX;
            let newY = currentY + deltaY;
            
            // 边界限制（防止拖出屏幕）
            const maxX = window.innerWidth - element.offsetWidth;
            const maxY = window.innerHeight - element.offsetHeight;
            
            // 限制范围
            newX = Math.max(0, Math.min(newX, maxX));
            newY = Math.max(0, Math.min(newY, maxY));
            
            // 更新位置
            element.style.left = newX + 'px';
            element.style.top = newY + 'px';
            element.style.right = 'auto';
            element.style.bottom = 'auto';
        };
        
        // 鼠标释放
        const onMouseUp = () => {
            isDragging = false;
            element.style.opacity = '';
            element.style.transform = '';
            element.style.transition = 'all 0.3s ease';
            
            // 移除事件监听
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
        };
        
        // 触摸支持
        const onTouchStart = (e) => {
            const touch = e.touches[0];
            isDragging = true;
            element.style.opacity = '0.8';
            element.style.transform = 'scale(1.1)';
            element.style.transition = 'none';
            
            currentX = element.offsetLeft;
            currentY = element.offsetTop;
            initialMouseX = touch.clientX;
            initialMouseY = touch.clientY;
            
            document.addEventListener('touchmove', onTouchMove, { passive: false });
            document.addEventListener('touchend', onTouchEnd);
        };
        
        const onTouchMove = (e) => {
            if (!isDragging) return;
            e.preventDefault();
            const touch = e.touches[0];
            
            const deltaX = touch.clientX - initialMouseX;
            const deltaY = touch.clientY - initialMouseY;
            
            let newX = currentX + deltaX;
            let newY = currentY + deltaY;
            
            const maxX = window.innerWidth - element.offsetWidth;
            const maxY = window.innerHeight - element.offsetHeight;
            
            newX = Math.max(0, Math.min(newX, maxX));
            newY = Math.max(0, Math.min(newY, maxY));
            
            element.style.left = newX + 'px';
            element.style.top = newY + 'px';
            element.style.right = 'auto';
            element.style.bottom = 'auto';
        };
        
        const onTouchEnd = () => {
            isDragging = false;
            element.style.opacity = '';
            element.style.transform = '';
            element.style.transition = 'all 0.3s ease';
            
            document.removeEventListener('touchmove', onTouchMove);
            document.removeEventListener('touchend', onTouchEnd);
        };
        
        // 绑定事件
        element.addEventListener('mousedown', onMouseDown);
        element.addEventListener('touchstart', onTouchStart, { passive: false });
        
        // 添加视觉提示
        element.title = element.title || '可拖动到任意位置';
    }
    
    // 静态方法：快速使元素可拖动
    static make(element) {
        const instance = new Draggable();
        instance.makeDraggable(element);
        return instance;
    }
}

// 自动初始化
const draggable = new Draggable();

// 导出
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Draggable;
}

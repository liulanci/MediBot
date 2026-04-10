/**
 * ============================================================================
 * 基于角色的访问控制(RBAC)系统
 * ============================================================================
 * 
 * 功能：
 * - 角色管理
 * - 权限定义
 * - 用户角色分配
 * - 资源级别权限控制
 * - 权限审计
 * 
 * 作者：Security Team
 * 版本：2.0.0
 * ============================================================================
 */

/**
 * 权限定义
 */
const Permissions = {
    // 用户管理
    USER_CREATE: 'user:create',
    USER_READ: 'user:read',
    USER_UPDATE: 'user:update',
    USER_DELETE: 'user:delete',
    USER_LIST: 'user:list',
    
    // 健康数据
    HEALTH_DATA_CREATE: 'health:create',
    HEALTH_DATA_READ: 'health:read',
    HEALTH_DATA_UPDATE: 'health:update',
    HEALTH_DATA_DELETE: 'health:delete',
    HEALTH_DATA_EXPORT: 'health:export',
    
    // MBTI测试
    MBTI_TEST_TAKE: 'mbti:test:take',
    MBTI_TEST_VIEW: 'mbti:test:view',
    MBTI_TEST_MANAGE: 'mbti:test:manage',
    
    // BMI评估
    BMI_ASSESS: 'bmi:assess',
    BMI_VIEW: 'bmi:view',
    BMI_MANAGE: 'bmi:manage',
    
    // 报告
    REPORT_CREATE: 'report:create',
    REPORT_READ: 'report:read',
    REPORT_DELETE: 'report:delete',
    REPORT_EXPORT: 'report:export',
    
    // 系统
    SYSTEM_CONFIG: 'system:config',
    SYSTEM_AUDIT: 'system:audit',
    SYSTEM_USER_MANAGE: 'system:user:manage'
};

/**
 * 系统预定义角色
 */
const SystemRoles = {
    ADMIN: {
        name: '系统管理员',
        permissions: Object.values(Permissions), // 所有权限
        description: '拥有系统所有权限'
    },
    
    DOCTOR: {
        name: '医生',
        permissions: [
            Permissions.HEALTH_DATA_READ,
            Permissions.HEALTH_DATA_UPDATE,
            Permissions.HEALTH_DATA_CREATE,
            Permissions.USER_READ,
            Permissions.MBTI_TEST_VIEW,
            Permissions.BMI_ASSESS,
            Permissions.BMI_VIEW,
            Permissions.REPORT_CREATE,
            Permissions.REPORT_READ,
            Permissions.REPORT_EXPORT
        ],
        description: '医疗专业人员，可查看和管理患者健康数据'
    },
    
    PATIENT: {
        name: '患者',
        permissions: [
            Permissions.HEALTH_DATA_CREATE,
            Permissions.HEALTH_DATA_READ,
            Permissions.HEALTH_DATA_UPDATE,
            Permissions.MBTI_TEST_TAKE,
            Permissions.BMI_ASSESS,
            Permissions.BMI_VIEW,
            Permissions.REPORT_READ
        ],
        description: '普通用户，可管理自己的健康数据'
    },
    
    AUDITOR: {
        name: '审计员',
        permissions: [
            Permissions.USER_READ,
            Permissions.HEALTH_DATA_READ,
            Permissions.MBTI_TEST_VIEW,
            Permissions.BMI_VIEW,
            Permissions.REPORT_READ,
            Permissions.REPORT_EXPORT,
            Permissions.SYSTEM_AUDIT
        ],
        description: '审计人员，可查看所有数据用于审计'
    },
    
    GUEST: {
        name: '访客',
        permissions: [
            Permissions.BMI_VIEW,
            Permissions.MBTI_TEST_TAKE
        ],
        description: '访客用户，只能进行基本测试'
    }
};

/**
 * 角色类
 */
class Role {
    constructor(name, config) {
        this.id = this.generateId();
        this.name = name;
        this.permissions = new Set(config.permissions || []);
        this.description = config.description || '';
        this.createdAt = new Date().toISOString();
        this.updatedAt = this.createdAt;
    }

    generateId() {
        return `ROLE-${Date.now()}-${Math.random().toString(36).substr(2, 6).toUpperCase()}`;
    }

    addPermission(permission) {
        this.permissions.add(permission);
        this.updatedAt = new Date().toISOString();
    }

    removePermission(permission) {
        this.permissions.delete(permission);
        this.updatedAt = new Date().toISOString();
    }

    hasPermission(permission) {
        return this.permissions.has(permission);
    }

    hasAnyPermission(permissions) {
        return permissions.some(p => this.permissions.has(p));
    }

    hasAllPermissions(permissions) {
        return permissions.every(p => this.permissions.has(p));
    }

    toJSON() {
        return {
            id: this.id,
            name: this.name,
            permissions: Array.from(this.permissions),
            description: this.description,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt
        };
    }
}

/**
 * 用户权限上下文
 */
class PermissionContext {
    constructor(userId, roles, attributes = {}) {
        this.userId = userId;
        this.roles = new Set(roles.map(r => r.id || r));
        this.attributes = attributes;
    }

    hasRole(roleId) {
        return this.roles.has(roleId);
    }

    addRole(roleId) {
        this.roles.add(roleId);
    }

    removeRole(roleId) {
        this.roles.delete(roleId);
    }
}

/**
 * RBAC管理器
 */
class RBACManager {
    constructor() {
        this.roles = new Map();
        this.userRoles = new Map();
        this.permissions = new Map();
        this.auditLog = [];
        
        // 初始化系统角色
        this.initializeSystemRoles();
    }

    /**
     * 初始化系统角色
     */
    initializeSystemRoles() {
        for (const [roleName, config] of Object.entries(SystemRoles)) {
            const role = new Role(roleName, config);
            this.roles.set(roleName, role);
        }
    }

    /**
     * 创建自定义角色
     */
    createRole(name, permissions, description = '') {
        const role = new Role(name, { permissions, description });
        this.roles.set(name, role);
        this.logAction('ROLE_CREATE', { roleId: role.id, name });
        return role;
    }

    /**
     * 获取角色
     */
    getRole(roleName) {
        return this.roles.get(roleName);
    }

    /**
     * 获取所有角色
     */
    getAllRoles() {
        return Array.from(this.roles.values()).map(r => r.toJSON());
    }

    /**
     * 分配角色给用户
     */
    assignRole(userId, roleName) {
        const role = this.roles.get(roleName);
        if (!role) {
            throw new Error(`Role ${roleName} not found`);
        }

        if (!this.userRoles.has(userId)) {
            this.userRoles.set(userId, new Set());
        }
        
        this.userRoles.get(userId).add(roleName);
        this.logAction('ROLE_ASSIGN', { userId, roleName });
        
        return true;
    }

    /**
     * 移除用户角色
     */
    revokeRole(userId, roleName) {
        if (!this.userRoles.has(userId)) {
            return false;
        }
        
        const removed = this.userRoles.get(userId).delete(roleName);
        if (removed) {
            this.logAction('ROLE_REVOKE', { userId, roleName });
        }
        
        return removed;
    }

    /**
     * 获取用户权限
     */
    getUserPermissions(userId) {
        const userRoleNames = this.userRoles.get(userId) || new Set();
        const permissions = new Set();
        
        for (const roleName of userRoleNames) {
            const role = this.roles.get(roleName);
            if (role) {
                role.permissions.forEach(p => permissions.add(p));
            }
        }
        
        return Array.from(permissions);
    }

    /**
     * 检查用户权限
     */
    hasPermission(userId, permission) {
        const permissions = this.getUserPermissions(userId);
        return permissions.includes(permission);
    }

    /**
     * 检查用户是否具有任何权限
     */
    hasAnyPermission(userId, permissions) {
        const userPermissions = this.getUserPermissions(userId);
        return permissions.some(p => userPermissions.includes(p));
    }

    /**
     * 检查用户是否具有所有权限
     */
    hasAllPermissions(userId, permissions) {
        const userPermissions = this.getUserPermissions(userId);
        return permissions.every(p => userPermissions.includes(p));
    }

    /**
     * 创建权限上下文
     */
    createContext(userId, attributes = {}) {
        const roleNames = Array.from(this.userRoles.get(userId) || []);
        return new PermissionContext(userId, roleNames, attributes);
    }

    /**
     * 资源级别权限检查
     */
    checkResourcePermission(userId, resource, action) {
        const permission = `${resource}:${action}`;
        
        // 检查直接权限
        if (this.hasPermission(userId, permission)) {
            return { allowed: true, reason: 'direct_permission' };
        }
        
        // 检查资源拥有者
        const ownerId = this.getResourceOwner(resource);
        if (ownerId === userId) {
            return { allowed: true, reason: 'owner' };
        }
        
        return { 
            allowed: false, 
            reason: 'permission_denied',
            requiredPermission: permission
        };
    }

    /**
     * 获取资源拥有者（示例）
     */
    getResourceOwner(resource) {
        // 在实际应用中，从数据库获取
        return null;
    }

    /**
     * 记录操作日志
     */
    logAction(action, details) {
        this.auditLog.push({
            timestamp: new Date().toISOString(),
            action,
            details,
            traceId: this.generateTraceId()
        });
    }

    generateTraceId() {
        return `TRACE-${Date.now()}-${Math.random().toString(36).substr(2, 8)}`;
    }

    /**
     * 获取审计日志
     */
    getAuditLog(filters = {}) {
        let logs = [...this.auditLog];
        
        if (filters.userId) {
            logs = logs.filter(l => l.details.userId === filters.userId);
        }
        
        if (filters.action) {
            logs = logs.filter(l => l.action === filters.action);
        }
        
        if (filters.startDate) {
            logs = logs.filter(l => new Date(l.timestamp) >= new Date(filters.startDate));
        }
        
        if (filters.endDate) {
            logs = logs.filter(l => new Date(l.timestamp) <= new Date(filters.endDate));
        }
        
        return logs;
    }

    /**
     * 权限检查中间件生成器
     */
    requirePermission(permission) {
        return (userId) => {
            if (!this.hasPermission(userId, permission)) {
                throw new Error(`Permission denied: ${permission}`);
            }
            return true;
        };
    }

    /**
     * 导出配置
     */
    exportConfig() {
        const config = {
            roles: this.getAllRoles(),
            userRoles: {},
            exportedAt: new Date().toISOString()
        };
        
        for (const [userId, roles] of this.userRoles.entries()) {
            config.userRoles[userId] = Array.from(roles);
        }
        
        return config;
    }

    /**
     * 导入配置
     */
    importConfig(config) {
        // 清除现有配置
        this.roles.clear();
        this.userRoles.clear();
        
        // 导入角色
        if (config.roles) {
            config.roles.forEach(roleConfig => {
                const role = new Role(roleConfig.name, {
                    permissions: roleConfig.permissions,
                    description: roleConfig.description
                });
                role.id = roleConfig.id;
                role.createdAt = roleConfig.createdAt;
                this.roles.set(roleConfig.name, role);
            });
        }
        
        // 导入用户角色
        if (config.userRoles) {
            for (const [userId, roles] of Object.entries(config.userRoles)) {
                this.userRoles.set(userId, new Set(roles));
            }
        }
    }
}

module.exports = {
    RBACManager,
    Role,
    PermissionContext,
    Permissions,
    SystemRoles
};

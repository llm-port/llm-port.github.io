---
sidebar_position: 2
---

# 安全与策略

**llm.Port** 提供全面的安全模型，涵盖身份验证、授权、加密和策略执行。

## 身份验证

### JWT Token

- 跨 Gateway 和管理 API 的 Bearer Token 认证
- 租户感知声明：`sub`、`tenant_id`、`roles`、`groups`
- 可配置的 Token 过期时间与刷新

### OAuth / SSO

- **OIDC / OAuth2** 提供商管理
- 首次 SSO 登录时自动注册用户
- 将身份提供商声明中的组映射到平台角色
- 支持多个提供商

### Root 模式 / 应急访问

- 用于紧急操作的有时限的提权会话
- 所有 Root 模式操作强制审计追踪
- 达到配置超时后自动过期

## 授权（RBAC）

完整的**资源 + 操作**权限模型：

- **角色**：命名权限集（如 `admin`、`viewer`、`operator`）
- **组**：具有共享角色分配的用户集合
- **资源**：`containers`、`providers`、`models`、`rag`、`pii`、`settings`……
- **操作**：`read`、`write`、`delete`、`execute`、`admin`

权限在每次请求时对管理 API 和 Gateway 均进行评估。

## 加密

### 数据库存储的密钥

- 使用单一主密钥的 **Fernet 加密**
- 所有密钥（API Key、Token、凭证）在 PostgreSQL 中加密存储
- 不在环境变量或配置文件中存储密钥
- 通过 Settings 服务透明地加密/解密

### 请求体大小限制

- 可配置的最大负载大小限制
- 防止超大请求到达上游提供商

## 限流

- 每个租户的 **Redis 固定窗口**RPM 和 TPM 计数器
- 每tenant 策略配置
- 通过 Lua 脚本保证一致性的原子操作

## 并发控制

- 通过 Redis + Lua 脚本实现分布式**每实例租约**
- 防止单个提供商实例过载
- 完成时（包括通过 `finally` 块的错误情况）自动释放租约

## Cookie 认证

管理控制台使用基于 **httponly cookie** 的会话管理：

- 登录成功后设置安全的 httponly cookie
- Gateway 中间件自动将 cookie 转换为 JWT 以供内部服务使用
- 支持 SameSite 和 Secure cookie 属性
- 配合 SSO 流程实现 302 重定向后无缝会话建立

---
sidebar_position: 6
---

# 部署

**llm.Port** 生产环境部署指南。

## 前置条件

| 要求           | 最低配置 | 推荐配置          |
| -------------- | -------- | ----------------- |
| Docker Engine  | 24+      | 最新稳定版        |
| Docker Compose | V2       | 最新稳定版        |
| 内存           | 8 GB     | 16 GB+            |
| 磁盘           | 20 GB    | 50 GB+            |
| GPU（可选）    | 任意支持 | NVIDIA + CUDA 12+ |

## 快速部署

### 1. 安装 CLI

```bash
pip install llmport-cli
```

或者，您可以从[最新 GitHub Release](https://github.com/llm-port/llm-port-cli/releases/latest) 下载独立二进制文件（无需 Python）。

### 2. 运行健康检查

```bash
llmport doctor
```

### 3. 生成环境文件

```bash
llmport config env --mode production
```

此命令生成 `.env` 文件，包含：

- 随机生成的 JWT 和 Fernet 密钥
- 数据库密码
- 服务 URL 和端口
- 模块配置

### 4. 启动平台

```bash
llmport up
```

此命令启动：

- PostgreSQL（Backend + Gateway + RAG）
- Redis（限流、缓存）
- RabbitMQ（异步任务队列）
- MinIO（对象存储）
- Grafana + Loki + Alloy（可观测性）
- Backend、Gateway 和 Frontend 服务

### 5. 运行初始化向导

在浏览器中打开 `http://localhost:3000` 进入管理控制台，完成设置向导。

## 模块配置文件

在部署时启用可选模块：

```bash
llmport module enable rag     # RAG 管道
llmport module enable pii     # PII 检测
llmport module enable auth    # SSO / OIDC
llmport module enable mailer  # 邮件通知
llmport module enable docling # 文档处理
llmport module enable sessions # 聊天会话与记忆
```

## Docker Compose

平台使用 Docker Compose profiles 进行模块化部署：

```bash
# 仅核心
docker compose up -d

# 核心 + RAG + PII
docker compose --profile rag --profile pii up -d

# 全部
docker compose --profile rag --profile pii --profile auth --profile mailer --profile docling up -d
```

## 配置

### 环境变量

主要配置通过环境变量管理：

| 变量                    | 说明                  | 默认值                   |
| ----------------------- | --------------------- | ------------------------ |
| `LLM_PORT_JWT_SECRET`   | JWT 签名密钥          | 自动生成                 |
| `LLM_PORT_FERNET_KEY`   | 数据库加密密钥        | 自动生成                 |
| `LLM_PORT_DB_URL`       | PostgreSQL 连接字符串 | `postgresql://...`       |
| `LLM_PORT_REDIS_URL`    | Redis 连接字符串      | `redis://localhost:6379` |
| `LLM_PORT_GATEWAY_PORT` | Gateway 监听端口      | `4000`                   |
| `LLM_PORT_BACKEND_PORT` | Backend 监听端口      | `8000`                   |

### 系统设置

运行时可配置的设置存储在数据库中，通过管理控制台或 API 进行管理。更改可触发：

- **实时重载** — 立即生效，无需重启
- **服务重启** — 重启受影响的服务
- **Stack 重建** — 重建 Docker Compose 服务

## GPU 配置

CLI 在设置过程中自动检测 GPU 硬件：

```bash
llmport doctor
# 输出包含：
# ✅ 检测到 NVIDIA GPU（CUDA 12.4, CC 8.9）
# ✅ Docker GPU 运行时可用
```

手动 GPU 配置请参见 [LLM 运行时管理](/docs/features/runtimes) 文档。

![Settings](/img/screenshots/settings.png)

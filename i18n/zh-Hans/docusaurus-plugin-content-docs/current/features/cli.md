---
sidebar_position: 8
---

# CLI

**llmport CLI**（`llm_port_cli`）是一个基于 Click 的命令行工具，用于安装、管理和运维平台。

## 安装

```bash
pip install llmport-cli
```

## 命令

### 系统管理

```bash
llmport up        # 启动 llm.port 基础设施和服务
llmport down      # 停止并移除容器和网络
llmport status    # 显示所有服务状态
llmport logs      # 查看服务日志（带跟随模式）
```

### 配置

```bash
llmport config show    # 显示当前配置
llmport config set     # 设置配置值
llmport config path    # 显示配置文件路径
```

### 模块

```bash
llmport module list      # 列出所有可用模块
llmport module enable    # 启用模块（rag、pii、auth 等）
llmport module disable   # 禁用模块
```

### 健康检查

```bash
llmport doctor    # 运行全面的系统健康检查
```

`doctor` 命令验证：

- 操作系统兼容性
- Docker Engine 和 Compose 版本
- GPU 驱动可用性（NVIDIA、AMD、Intel）
- RAM 和磁盘空间
- 所有服务的端口可用性

### 开发者工作流

```bash
llmport dev init ~/projects/llm-port    # 克隆仓库 + 安装依赖 + 启动基础设施
llmport dev up                           # 启动开发环境
llmport dev status                       # 检查运行中的进程
```

### 生产安装器

交互式设置向导，包含：

- GPU 自动检测
- TUI（Textual 用户界面）引导式配置
- 带随机密钥生成的 `.env` 文件生成
- Docker Compose profile 选择

### 环境生成

```bash
llmport config env    # 为开发或生产环境生成 .env 文件
```

创建包含以下内容的 `.env` 文件：

- 随机生成的密钥（JWT 密钥、Fernet 密钥、数据库密码）
- 来自注册表的服务 URL 和端口
- 模块特定配置

### Auto-Tune

```bash
llmport tune    # 对主机进行基准测试并生成推荐配置
```

`tune` 命令分析当前主机的 CPU、内存和磁盘，然后输出推荐配置：

- Uvicorn Worker 数量
- 数据库连接池大小
- Docker 资源限制（CPU 配额、内存限制）
- 最大并发量和批大小设置

生成的值可以直接写入 `.env` 或通过 `llmport config set` 应用。

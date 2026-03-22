---
sidebar_position: 1
slug: /intro
---

# 快速开始

**llm.Port** 是一个自托管的一体化 LLM 平台，集成了兼容 OpenAI 的网关、模型服务器控制平面、内置聊天控制台（含会话和记忆）、内部 RAG 子系统、PII 检测和通知推送——全部集中在一个运维控制台中。

## 适用人群

- **平台 / MLOps 团队**：需要在本地和远程 LLM 前面放置受治理的自托管网关
- **注重安全的组织**：需要具备完整审计日志和 PII 控制的本地推理
- **开发者**：希望使用兼容 OpenAI 的 API，同时避免供应商锁定

## 快速入门

### 前置要求

- Docker Engine 24+ 及 Compose V2
- 8 GB 内存（本地模型运行时建议 16 GB）
- GPU（可选）：NVIDIA、AMD 或 Intel，用于本地推理

### 1. 安装 CLI

```bash
pip install llmport-cli
```

或从 [GitHub Releases 页面](https://github.com/llm-port/llm-port-cli/releases/latest)下载独立可执行文件（无需 Python）。

### 2. 运行健康检查

```bash
llmport doctor
```

验证操作系统、Docker、Compose、GPU 驱动、内存、磁盘和端口可用性。

### 3. 启动共享服务

```bash
llmport up
```

启动 PostgreSQL、Redis、Grafana、Loki 和其他基础设施。

### 4. 运行初始化向导

后端包含一个引导式设置向导，在首次运行时配置密钥、提供商和网关设置。

### 5. 添加提供商和运行时

- **远程提供商**：OpenAI、Azure OpenAI 或任何兼容 OpenAI 的 API
- **本地运行时**：vLLM、llama.cpp、Ollama、TGI——支持 GPU 自动检测

### 6. 将应用指向网关

```bash
curl http://localhost:4000/v1/chat/completions \
  -H "Authorization: Bearer <your-token>" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "my-alias",
    "messages": [{"role": "user", "content": "你好！"}]
  }'
```

网关完全兼容 OpenAI API——任何支持 OpenAI API 的 SDK 或工具都可以直接使用。

## 下一步

- [架构](/docs/architecture) — 平台的结构设计
- [功能](/docs/features/gateway) — 详细功能文档
- [模块](/docs/modules) — 启用/禁用可选功能
- [代码仓库](/docs/repos) — 完整的代码库布局

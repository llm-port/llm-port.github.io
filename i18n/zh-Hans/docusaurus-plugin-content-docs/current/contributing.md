---
sidebar_position: 7
---

# 贡献指南

欢迎为 **llm.Port** 做出贡献！以下是入门方法。

## 开发环境搭建

### 前置条件

- Python 3.12+
- Node.js 20+
- Docker Engine 24+ with Compose V2
- Git

### 克隆与初始化

CLI 提供一键开发者环境搭建：

```bash
pip install llmport-cli
llmport dev init ~/projects/llm-port
```

这将：

1. 克隆所有仓库
2. 安装 Python 和 Node.js 依赖
3. 启动共享基础设施（Postgres、Redis 等）
4. 运行数据库迁移

### 手动搭建

```bash
# 克隆仓库
git clone https://github.com/llm-port/llm-port-backend.git
git clone https://github.com/llm-port/llm-port-frontend.git
git clone https://github.com/llm-port/llm-port-api.git
# ...（完整列表见仓库页面）

# 启动共享服务
cd llm-port-shared
docker compose up -d

# Backend
cd ../llm-port-backend
uv sync
uv run alembic upgrade head
uv run uvicorn llm_port_backend.main:app --reload

# Frontend
cd ../llm-port-frontend
npm install
npm run dev

# Gateway
cd ../llm-port-api
uv sync
uv run alembic upgrade head
uv run uvicorn llm_port_api.main:app --reload --port 4000
```

## 代码规范

### Python

- 格式化：`ruff format`
- 代码检查：`ruff check`
- 类型检查：`pyright`（严格模式）
- 测试：`pytest`

### TypeScript / React

- 格式化：Prettier
- 代码检查：ESLint
- 框架：React 19 + React Router + MUI + Tailwind

## 提交更改

1. Fork 相关仓库
2. 从 `main` 创建 feature 分支
3. 编写代码并添加测试
4. 运行测试套件：`pytest`（Python）或 `npm test`（Frontend）
5. 开启 Pull Request 并提供清晰的描述

## 报告问题

在相关仓库中提交 Issue，或使用[组织主讨论区](https://github.com/orgs/llm-port/discussions)讨论跨模块问题。

## 贡献者许可协议 (CLA)

我们使用 **CLA Assistant** 来管理贡献者许可协议。当您首次提交 Pull Request 时：

1. CLA bot 会自动添加评论并提供签署链接
2. 通过 GitHub 账户签署 CLA（一次性操作）
3. 签署后，您当前和未来的所有 PR 均自动通过检查

提供**个人 CLA** 和**企业 CLA**：

- **个人 CLA** — 以个人身份贡献
- **企业 CLA** — 代表组织贡献（适合由雇主授权的贡献者）

:::note
CLA 签署是一次性要求。签署后即覆盖该 GitHub 账户的所有未来贡献。
:::

## 许可证

提交贡献即表示您同意您的贡献将以 **Apache 2.0** 许可证授权。

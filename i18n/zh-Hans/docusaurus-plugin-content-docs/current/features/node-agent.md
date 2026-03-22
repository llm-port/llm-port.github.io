---
sidebar_position: 11
---

# 节点代理

**节点代理**（`llm_port_node_agent`）是一个轻量级主机端二进制文件，支持多节点集群部署。发布的 Python 包名和可执行命令名是 **`llmport-agent`**。它运行在每个远程主机上，执行由后端分发的 Docker 运行时生命周期命令。

## 工作原理

```
后端 ◄──WebSocket──► 节点代理 ──► Docker Engine（远程主机上）
```

1. 代理使用一次性令牌向后端**注册**
2. 维持认证的**出站 WebSocket** 连接
3. 后端分发运行时命令（启动、停止、拉取等）
4. 代理在本地执行命令并报告状态
5. **心跳 + 清单**数据持续流向后端

后端仍然是调度和放置的唯一权威——代理纯粹是执行臂。

## 安装

### 方式 A — 独立二进制文件（推荐）

目标节点上无需安装 Python。预构建二进制文件适用于：

| 平台    | 架构            |
| ------- | --------------- |
| Linux   | x86-64          |
| Windows | x86-64          |
| macOS   | Universal (M1+) |

通过 CLI 部署：

```bash
llmport node agent deploy <节点地址>
```

CLI 会自动检测目标平台的最佳二进制文件。

### 方式 B — Python 包

```bash
pip install llmport-agent
```

### 方式 C — systemd 服务

Linux 部署包含 systemd 单元文件：

```bash
sudo cp deploy/systemd/llmport-agent.service /etc/systemd/system/
sudo systemctl enable --now llmport-agent
```

## 功能特性

- **零依赖部署** — 使用 PyInstaller 构建的独立二进制文件
- **自动注册** — 与后端的一次性令牌握手
- **命令验证** — 执行前根据策略验证分发的命令
- **事件缓冲** — WebSocket 连接断开时在本地缓冲事件
- **健康监督** — 监控本地 Docker Engine 健康状态并报告
- **日志发送** — 可选转发到 Loki（Linux 上的 journald，Windows 上的 Event Log）

## CLI 命令

```bash
llmport node list              # 列出已注册的节点
llmport node agent deploy      # 将代理二进制文件部署到远程节点
llmport node agent status      # 检查节点上的代理状态
```

## 代理命令

```bash
llmport-agent         # 前台运行（测试连通性）
llmport-agent start   # 安装并启动 systemd 服务
llmport-agent status  # 查看服务状态
llmport-agent stop    # 停止并禁用服务
```

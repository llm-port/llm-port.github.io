---
sidebar_position: 4
---

# 可观测性

**llm.Port** 提供覆盖 Gateway、Backend 和所有模块的全栈可观测性。

## Langfuse 追踪

通过 [Langfuse](https://langfuse.com) 实现 LLM 专项追踪：

- 每次 Gateway 请求的**追踪和生成事件**
- 含输入/输出 Token 数量的 Token 用量追踪
- 包含 TTFT（首 Token 到达时间）的延迟指标
- 错误状态和上游提供商元数据

### 隐私模式

三种可配置的隐私级别：

| 模式            | 存储内容                       |
| --------------- | ------------------------------ |
| `full`          | 完整的请求/响应负载            |
| `redacted`      | 已遮掩 PII 实体的负载          |
| `metadata_only` | Token 数量、延迟、状态——无内容 |

## 集中式日志

- **Loki + Alloy** 从所有服务容器采集日志
- 带标签（服务、级别、租户）的结构化日志流
- 可通过 Grafana 和管理 API 查询
- 每环境可配置的日志保留策略

## 审计日志

每个重要操作均被审计记录：

- **Gateway 请求**：模型、租户、Token、延迟、状态、trace_id
- **管理操作**：容器操作、设置变更、用户管理
- **Root 模式**：提权会话开始/结束及完整操作追踪

## OpenTelemetry

- OpenTelemetry Collector 集成
- 支持 Jaeger 进行跨服务分布式追踪
- 关联 ID 在所有服务调用中传播

## 仪表板

管理控制台包含：

- 带健康检查和容器统计的系统概览
- **Grafana 面板嵌入**，用于实时指标和日志查询
- 带 SSE 实时追踪流的 LLM 拓扑图
- 按租户、模型和时间窗口的 Token 用量摘要

![Dashboard](/img/screenshots/dashboard.png)

![Trace Viewer](/img/screenshots/trace.png)

![Logging](/img/screenshots/logging.png)

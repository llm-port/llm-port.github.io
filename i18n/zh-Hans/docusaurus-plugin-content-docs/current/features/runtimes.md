---
sidebar_position: 7
---

# LLM 运行时管理

**llm.Port** 支持通过单一控制平面管理本地 LLM 运行时和远程提供商。

## 提供商适配器注册表

针对不同运行时的可插拔适配器：

| 运行时        | GPU 支持                        | 协议        |
| ------------- | ------------------------------- | ----------- |
| **vLLM**      | NVIDIA (CUDA)、AMD (ROCm)       | OpenAI 兼容 |
| **llama.cpp** | NVIDIA、AMD、Intel、Apple Metal | OpenAI 兼容 |
| **Ollama**    | NVIDIA、AMD、Apple Metal        | OpenAI 兼容 |
| **TGI**       | NVIDIA (CUDA)                   | OpenAI 兼容 |

## GPU 自动检测

平台自动检测可用的 GPU 硬件：

- **NVIDIA** — CUDA 并检测计算能力
- **AMD** — ROCm 支持
- **Intel** — GPU 加速
- **Apple Metal** — M 系列芯片支持

### vLLM 镜像预设

对于 vLLM 部署，根据 GPU 自动选择镜像：

| GPU             | 镜像           |
| --------------- | -------------- |
| NVIDIA CC ≥ 8.0 | 最新 CUDA 镜像 |
| NVIDIA CC ≥ 7.0 | 旧版 CUDA 镜像 |
| AMD             | ROCm 镜像      |

## 模型扫描器

自动分析模型工件：

- **格式检测**：safetensors、GGUF 等
- **运行时推荐**：根据格式建议兼容运行时
- **大小估算**：磁盘和内存需求

## 模型下载

- Docker 编排的 **HuggingFace 模型下载**
- 带进度报告的拉取追踪
- 工件缓存与去重

### HuggingFace 搜索

管理控制台提供内置的 HuggingFace Hub 搜索界面，可直接从 UI 中按名称、任务类型或标签发现模型——无需离开平台。

## 运行时协调

当模型运行时和 Gateway 均在平台管理下运行时，**运行时协调**确保两者保持同步：

- Gateway 提供商池实例自动从运行时注册表更新
- 统一调度器可在远程提供商和本地运行时之间进行智能路由
- 新增或删除运行时会自动传播到 Gateway 路由表

## LLM 拓扑图

整个 LLM 基础设施的可视化拓扑：

- 提供商 → 运行时 → 模型图形可视化
- 带 SSE 流的实时追踪浏览器
- 实时请求流叠加

![LLM Providers](/img/screenshots/llm_providers.png)

![Provider Details](/img/screenshots/llm_provider_details.png)

![Local Runtime](/img/screenshots/llm_provider_local.png)

![Models](/img/screenshots/models.png)

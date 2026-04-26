# LittleWhiteBox

一个面向 SillyTavern 的多功能扩展，包含剧情总结/记忆系统、变量系统、任务与多种面板能力。集成了画图、流式生成、模板编辑、调试面板等组件，适合用于复杂玩法与长期剧情记录。

## 最近修改

### 2025-04-26 缓存优化修复

修复了剧情总结模块中 `forceInsertAtEnd`（强制插入到末尾）配置项未生效的问题：

- **问题**：剧情总结面板中的"强制插入到末尾"选项配置能正常保存，但后端注入逻辑未读取该字段，导致剧情总结的 `depth` 始终随对话长度动态计算。对话越长，总结插入位置越高，造成 DeepSeek V4 的前缀缓存大面积失效。
- **修复文件**：`modules/story-summary/story-summary.js`
- **改动**：
  1. 在 `handleGenerationStarted` 中提前声明 `cfg` 变量，统一读取面板配置
  2. 修改 `depth` 计算逻辑：开启 `forceInsertAtEnd` 时固定为 `MIN_INJECTION_DEPTH`（2），不再随 `chatLen` 漂移
  3. 删除后文重复的 `cfg` 声明，避免配置读取不一致
- **效果**：勾选"强制插入到末尾"后，剧情总结固定在消息链底部，前面聊天记录保持静态，配合 DeepSeek V4 缓存优化器脚本可实现完整的前缀缓存命中。

## 许可证

详见 `docs/LICENSE.md`

# 霓虹磁带（neon-tape）

深底 + 霓虹点睛，科技感。适用：AI/科技趋势、酷炫题材。

## 1. 设计变量表

| 变量 | 值 | 用途 |
| --- | --- | --- |
| 主色 | `#845EF7` | 霓虹锚点/序号/渐变端点 |
| 副色 | `#22B8CF` | 渐变另一端（仅封面大字/分割线） |
| 背景 | `#14121F` | 画布深底 |
| 卡底 | `#221E33` | 要点卡 |
| 荧光标记 | `#3B2F63` | 关键句背景（深底版） |
| 正文 | `#E9ECEF` | 深底上的正文（对比度底线） |
| 辅助 | `#9775FA` | 副题/角标 |

## 2. 封面模板（默认：霓虹渐变大字）

```html
<div data-card="cover" style="width:1242px;height:1660px;box-sizing:border-box;padding:120px 100px;background:#14121F;font-family:-apple-system,'PingFang SC','Microsoft YaHei',sans-serif;position:relative;display:flex;flex-direction:column;justify-content:center;">
  <div style="font-size:36px;color:#9775FA;letter-spacing:10px;">▶ AI 趋势磁带 · SIDE A</div>
  <div style="font-size:140px;line-height:1.25;font-weight:900;margin-top:56px;background:linear-gradient(90deg,#845EF7,#22B8CF);-webkit-background-clip:text;background-clip:text;color:transparent;">主标题霓虹大字</div>
  <div style="font-size:48px;color:#E9ECEF;margin-top:56px;">副题一行，说人话</div>
  <div style="margin-top:80px;width:280px;height:6px;background:linear-gradient(90deg,#845EF7,#22B8CF);"></div>
  <div style="position:absolute;right:100px;bottom:96px;font-size:32px;color:#9775FA;">昵称角标</div>
</div>
```

## 3. 内容页组件

```html
<div data-card="content-1" style="width:1242px;height:1660px;box-sizing:border-box;padding:110px 100px;background:#14121F;font-family:-apple-system,'PingFang SC','Microsoft YaHei',sans-serif;position:relative;">
  <div style="display:flex;align-items:center;gap:28px;"><span style="font-size:64px;font-weight:900;color:#845EF7;">01</span><span style="font-size:56px;font-weight:800;color:#E9ECEF;">卡题 ≤12 字</span></div>
  <div style="margin-top:64px;background:#221E33;border:2px solid #3B2F63;border-radius:24px;padding:52px;font-size:44px;line-height:1.8;color:#E9ECEF;">要点正文，关键句用<span style="background:#3B2F63;padding:4px 10px;border-radius:8px;color:#E9ECEF;font-weight:700;">深紫荧光</span>包住。</div>
  <div style="position:absolute;right:100px;bottom:96px;font-size:32px;color:#9775FA;">昵称角标 · 2/7</div>
</div>
```

可选：术语注释位（虚线下划线术语 + 小字注释 36px `#9775FA`）。

## 4. 结尾页模板

深底 + 渐变描边总结卡（清单 ✓ 用 `#22B8CF`）+ `catchphrase`（渐变大字 56px）。

## 5. 配方表

| 文章类型 | 封面 | 内容页 | 结尾 |
| --- | --- | --- | --- |
| AI 趋势解读 | 霓虹大字 | 要点卡 + 术语注释位 | 渐变总结卡 |
| 工具上手 | 霓虹大字 | 要点卡 + 命令位（等宽 36px+） | 清单 + 关注 |
| 观点预测 | 霓虹大字 | 每卡一预测 + 置信度条 | 金句 + 关注 |

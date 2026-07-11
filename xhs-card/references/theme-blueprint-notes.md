# 蓝图笔记（blueprint-notes）

网格纸 + 步骤感。适用：教程、步骤拆解。

## 1. 设计变量表

| 变量 | 值 | 用途 |
| --- | --- | --- |
| 主色 | `#4C6EF5` | 步骤序号/箭头/锚点 |
| 浅底 | `#EDF2FF` | 步骤卡背景 |
| 浅边框 | `#BAC8FF` | 步骤卡描边 |
| 荧光标记 | `#DBE4FF` | 关键句背景 |
| 网格纸背景 | `background-image:linear-gradient(#E9ECEF 1px,transparent 1px),linear-gradient(90deg,#E9ECEF 1px,transparent 1px);background-size:60px 60px;` | 画布 |
| 正文灰 / 辅助灰 | `#212529` / `#868E96` | — |

## 2. 封面模板（默认：网格纸 + 蓝标签）

```html
<div data-card="cover" style="width:1242px;height:1660px;box-sizing:border-box;padding:120px 100px;background-color:#FFFFFF;background-image:linear-gradient(#E9ECEF 1px,transparent 1px),linear-gradient(90deg,#E9ECEF 1px,transparent 1px);background-size:60px 60px;font-family:-apple-system,'PingFang SC','Microsoft YaHei',sans-serif;position:relative;display:flex;flex-direction:column;justify-content:center;">
  <div style="display:inline-block;align-self:flex-start;background:#4C6EF5;color:#FFFFFF;font-size:40px;font-weight:700;padding:16px 44px;border-radius:12px;">保姆级教程</div>
  <div style="font-size:130px;line-height:1.3;font-weight:900;color:#212529;margin-top:56px;">主标题<span style="color:#4C6EF5;">N 步</span>搞定</div>
  <div style="font-size:48px;color:#868E96;margin-top:56px;">副题：零基础也能跟着做</div>
  <div style="position:absolute;right:100px;bottom:96px;font-size:32px;color:#868E96;">昵称角标</div>
</div>
```

## 3. 内容页组件（步骤卡）

```html
<div data-card="content-1" style="width:1242px;height:1660px;box-sizing:border-box;padding:110px 100px;background-color:#FFFFFF;background-image:linear-gradient(#E9ECEF 1px,transparent 1px),linear-gradient(90deg,#E9ECEF 1px,transparent 1px);background-size:60px 60px;font-family:-apple-system,'PingFang SC','Microsoft YaHei',sans-serif;position:relative;">
  <div style="display:flex;align-items:center;gap:32px;"><span style="width:110px;height:110px;border-radius:50%;background:#4C6EF5;color:#FFFFFF;font-size:56px;font-weight:900;display:flex;align-items:center;justify-content:center;">1</span><span style="font-size:56px;font-weight:800;color:#212529;">步骤名 ≤10 字</span></div>
  <div style="margin-top:56px;background:#EDF2FF;border:3px dashed #BAC8FF;border-radius:20px;padding:48px;font-size:44px;line-height:1.8;color:#212529;">操作要点，命令/入口用<span style="background:#DBE4FF;padding:4px 8px;font-weight:700;">荧光标记</span>。</div>
  <div style="margin-top:48px;font-size:44px;color:#4C6EF5;font-weight:700;">↓ 下一步</div>
  <div style="position:absolute;right:100px;bottom:96px;font-size:32px;color:#868E96;">昵称角标 · 2/7</div>
</div>
```

可选：代码位（深底 `#212529` 圆角块，等宽栈 `ui-monospace,Menlo,monospace`，字号 ≥36px，不折行则缩写）。

## 4. 结尾页模板

浅底 `#EDF2FF` + 白卡总结清单（步骤回顾 1→N）+ `catchphrase`；结构同番茄手帐 end，换色。

## 5. 配方表

| 文章类型 | 封面 | 内容页 | 结尾 |
| --- | --- | --- | --- |
| 工具教程 | 蓝标签 | 步骤卡（序号圆 + 虺线卡）+ 代码位 | 步骤回顾 |
| 流程拆解 | 蓝标签 | 步骤卡 + ↓ 连接符 | 步骤回顾 |
| 避坑指南 | 蓝标签 | 步骤卡 + ⚠️ 提醒位（浅底红边） | 清单 + 关注 |

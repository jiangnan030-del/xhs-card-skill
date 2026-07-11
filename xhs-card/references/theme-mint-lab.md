# 薄荷实验室（mint-lab）

数据感、对比感。适用：测评、对比、数据类内容。

## 1. 设计变量表

| 变量 | 值 | 用途 |
| --- | --- | --- |
| 主色 | `#0CA678` | 序号/进度条/结论锚点 |
| 浅底 / 浅边框 | `#E6FCF5` / `#96F2D7` | 数据卡 |
| 荧光标记 | `#C3FAE8` | 结论句背景 |
| 背景 | `#FFFFFF` | 画布 |
| 正文灰 / 辅助灰 | `#212529` / `#868E96` | — |
| 赞/踩色 | `#0CA678` / `#FA5252` | ✔/✘ 对比行（✘ 仅此一处用红） |

## 2. 封面模板（默认：测评报告头）

```html
<div data-card="cover" style="width:1242px;height:1660px;box-sizing:border-box;padding:120px 100px;background:#FFFFFF;font-family:-apple-system,'PingFang SC','Microsoft YaHei',sans-serif;position:relative;display:flex;flex-direction:column;justify-content:center;">
  <div style="font-size:40px;color:#0CA678;font-weight:700;letter-spacing:6px;">⚡ 实测报告</div>
  <div style="font-size:130px;line-height:1.25;font-weight:900;color:#212529;margin-top:48px;">主标题：N 款实测<span style="color:#0CA678;">真实结论</span></div>
  <div style="margin-top:72px;background:#E6FCF5;border:3px solid #96F2D7;border-radius:20px;padding:40px 48px;font-size:44px;color:#212529;">测试条件：一句话交代（时长/环境/样本）</div>
  <div style="position:absolute;right:100px;bottom:96px;font-size:32px;color:#868E96;">昵称角标</div>
</div>
```

## 3. 内容页组件

每卡一个被测项：名称 + 进度条评分 + ✔/✘ 两行 + 结论句。

```html
<div data-card="content-1" style="width:1242px;height:1660px;box-sizing:border-box;padding:110px 100px;background:#FFFFFF;font-family:-apple-system,'PingFang SC','Microsoft YaHei',sans-serif;position:relative;">
  <div style="display:flex;align-items:center;gap:28px;"><span style="font-size:64px;font-weight:900;color:#0CA678;">01</span><span style="font-size:56px;font-weight:800;color:#212529;">被测项名称</span></div>
  <div style="margin-top:56px;"><span style="font-size:40px;color:#868E96;">综合评分</span><span style="display:inline-block;width:520px;height:28px;background:#E6FCF5;border-radius:999px;margin-left:32px;vertical-align:middle;"><span style="display:block;width:82%;height:28px;background:#0CA678;border-radius:999px;"></span></span><span style="font-size:48px;font-weight:900;color:#0CA678;margin-left:24px;">8.2</span></div>
  <div style="margin-top:56px;font-size:44px;line-height:2.0;color:#212529;"><span style="color:#0CA678;font-weight:900;">✔</span> 优点一句话<br><span style="color:#FA5252;font-weight:900;">✘</span> 缺点一句话</div>
  <div style="margin-top:64px;font-size:44px;line-height:1.7;color:#212529;">结论：<span style="background:#C3FAE8;padding:4px 10px;font-weight:700;">适合谁、不适合谁</span></div>
  <div style="position:absolute;right:100px;bottom:96px;font-size:32px;color:#868E96;">昵称角标 · 2/7</div>
</div>
```

可选：迷你对比表（≤3 列，表头浅底，字号 ≥36px）。

## 4. 结尾页模板

浅底 + 总排名卡（🥇🥈🥉 三行）+ 一句总结论 + `catchphrase`。

## 5. 配方表

| 文章类型 | 封面 | 内容页 | 结尾 |
| --- | --- | --- | --- |
| 多款测评 | 报告头 | 每卡一款：评分条 + ✔✘ + 结论 | 总排名 |
| 两方对比 | 报告头 | 迷你对比表 + 结论句 | 结论 + 关注 |
| 数据复盘 | 报告头 | 大号数字位 + 趋势一句话 | 清单 + 关注 |

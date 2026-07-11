# 番茄手帐（tomato-journal）——默认主题

小红书原生气质：白底 + 番茄红锚点 + 手帐要点卡。适用：干货清单、工具盘点。

## 1. 设计变量表

| 变量 | 值 | 用途 |
| --- | --- | --- |
| 主色 | `#FF2E4D` | 封面大字/序号/锚点（每卡 ≤3 处） |
| 浅底 | `#FFF0F3` | 要点卡背景 |
| 浅边框 | `#FFC9D4` | 要点卡描边 |
| 荧光标记 | `#FFD8DE` | 关键句背景（每卡 1–2 处） |
| 正文灰 | `#212529` | 正文 |
| 辅助灰 | `#868E96` | 副题/角标/页码 |
| 字体栈 | `-apple-system,'PingFang SC','Microsoft YaHei',sans-serif` | 全局 |
| 圆角 | `24px`（要点卡）/ `0`（画布） | — |

## 2. 封面模板（cover，3 选 1）

A 大字报（默认）：

```html
<div data-card="cover" style="width:1242px;height:1660px;box-sizing:border-box;padding:120px 100px;background:#FFFFFF;font-family:-apple-system,'PingFang SC','Microsoft YaHei',sans-serif;position:relative;display:flex;flex-direction:column;justify-content:center;">
  <div style="font-size:40px;color:#FF2E4D;font-weight:700;letter-spacing:8px;">— 干货手帐 —</div>
  <div style="font-size:140px;line-height:1.25;font-weight:900;color:#212529;margin-top:48px;">主标题放这里<span style="color:#FF2E4D;">点睛词</span></div>
  <div style="font-size:52px;color:#868E96;margin-top:56px;">副题一行，说清适用人群</div>
  <div style="margin-top:88px;display:flex;gap:24px;"><span style="font-size:40px;background:#FFF0F3;border:3px solid #FFC9D4;border-radius:999px;padding:16px 40px;color:#FF2E4D;">钩子点 1</span><span style="font-size:40px;background:#FFF0F3;border:3px solid #FFC9D4;border-radius:999px;padding:16px 40px;color:#FF2E4D;">钩子点 2</span></div>
  <div style="position:absolute;right:100px;bottom:96px;font-size:32px;color:#868E96;">🐟 昵称角标</div>
</div>
```

B 左红色块版：左侧 30% 宽番茄红竖条 + 右侧白底大字；C 底部色条版：标题居中 + 底部 200px 红色条放 tagline。均复用 A 的字号与变量。

## 3. 内容页组件（content-N）

卡面骨架：

```html
<div data-card="content-1" style="width:1242px;height:1660px;box-sizing:border-box;padding:110px 100px;background:#FFFFFF;font-family:-apple-system,'PingFang SC','Microsoft YaHei',sans-serif;position:relative;">
  <div style="display:flex;align-items:center;gap:28px;"><span style="font-size:64px;font-weight:900;color:#FF2E4D;">01</span><span style="font-size:56px;font-weight:800;color:#212529;">卡题 ≤12 字</span></div>
  <!-- 要点卡 ×2–4 -->
  <div style="margin-top:64px;background:#FFF0F3;border:3px solid #FFC9D4;border-radius:24px;padding:48px;">
    <div style="font-size:44px;line-height:1.7;color:#212529;">要点正文，关键句用<span style="background:#FFD8DE;padding:4px 8px;">荧光标记</span>包住。</div>
  </div>
  <div style="position:absolute;right:100px;bottom:96px;font-size:32px;color:#868E96;">🐟 昵称角标 · 2/7</div>
</div>
```

可选组件：金句位（居中 52px 加粗 + 上下 6px 红色短线）；数据位（大号数字 96px 红 + 说明 36px 灰）。

## 4. 结尾页模板（end）

```html
<div data-card="end" style="width:1242px;height:1660px;box-sizing:border-box;padding:120px 100px;background:#FFF0F3;font-family:-apple-system,'PingFang SC','Microsoft YaHei',sans-serif;position:relative;">
  <div style="font-size:72px;font-weight:900;color:#212529;">今天的重点 ✓</div>
  <div style="margin-top:64px;background:#FFFFFF;border-radius:24px;padding:56px;font-size:44px;line-height:2.1;color:#212529;">✓ 清单条目 1<br>✓ 清单条目 2<br>✓ 清单条目 3</div>
  <div style="margin-top:80px;font-size:48px;color:#FF2E4D;font-weight:700;">🐟 关注我，下班早一小时</div>
  <div style="position:absolute;right:100px;bottom:96px;font-size:32px;color:#868E96;">昵称角标</div>
</div>
```

## 5. 配方表（文章类型 → 组件组合）

| 文章类型 | 封面 | 内容页 | 结尾 |
| --- | --- | --- | --- |
| 干货清单 | A 大字报 | 序号 + 要点卡 ×2–3 | 清单 + 关注 |
| 工具盘点 | B 色块版 | 每卡一工具：卡题 + 要点卡 + 数据位 | 清单 + 关注 |
| 经验分享 | C 色条版 | 要点卡 + 金句位 | 金句 + 关注 |

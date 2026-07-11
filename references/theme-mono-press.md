# 黑白报刊（mono-press）

大字报风，冲击力强。适用：观点、认知类、金句内容。

## 1. 设计变量表

| 变量 | 值 | 用途 |
| --- | --- | --- |
| 主色 | `#1A1A1A` | 大字/粗分割线/序号 |
| 背景 | `#FFFFFF`（内容）/ `#1A1A1A`（封面反白） | — |
| 荧光标记 | `#F1F3F5` | 关键句灰底（反白页用 `#343A40`） |
| 正文灰 | `#212529` / 反白 `#F8F9FA` | 正文 |
| 辅助灰 | `#868E96` | 副题/角标 |
| 衬线标题栈 | `'Songti SC','SimSun',serif` | 仅标题；正文仍用黑体栈 |

## 2. 封面模板（反白大字报，默认）

```html
<div data-card="cover" style="width:1242px;height:1660px;box-sizing:border-box;padding:120px 100px;background:#1A1A1A;font-family:-apple-system,'PingFang SC','Microsoft YaHei',sans-serif;position:relative;display:flex;flex-direction:column;justify-content:center;">
  <div style="font-size:36px;color:#868E96;letter-spacing:12px;">VOL.01 · 观点</div>
  <div style="font-family:'Songti SC','SimSun',serif;font-size:150px;line-height:1.2;font-weight:900;color:#F8F9FA;margin-top:56px;">主标题<br>换行抢眼</div>
  <div style="width:200px;height:8px;background:#F8F9FA;margin-top:64px;"></div>
  <div style="font-size:48px;color:#ADB5BD;margin-top:56px;">副题一行，一句话破题</div>
  <div style="position:absolute;right:100px;bottom:96px;font-size:32px;color:#868E96;">昵称角标</div>
</div>
```

变体：B 白底黑字 + 顶底双粗线（报头感）；C 上黑下白对切。

## 3. 内容页组件

```html
<div data-card="content-1" style="width:1242px;height:1660px;box-sizing:border-box;padding:110px 100px;background:#FFFFFF;font-family:-apple-system,'PingFang SC','Microsoft YaHei',sans-serif;position:relative;">
  <div style="border-top:10px solid #1A1A1A;padding-top:40px;font-size:56px;font-weight:800;color:#1A1A1A;">壹 · 卡题</div>
  <div style="margin-top:72px;font-size:46px;line-height:1.9;color:#212529;">观点正文，关键句用<span style="background:#F1F3F5;padding:4px 10px;font-weight:700;">灰底加粗</span>强调。</div>
  <div style="margin-top:88px;font-family:'Songti SC','SimSun',serif;font-size:60px;line-height:1.6;font-weight:900;color:#1A1A1A;text-align:center;">“金句居中，衬线大字。”</div>
  <div style="position:absolute;right:100px;bottom:96px;font-size:32px;color:#868E96;">昵称角标 · 2/6</div>
</div>
```

章节序号用汉字（壹贰叁）；末卡序号用「终」。

## 4. 结尾页模板

反白底 + 白字总结清单（`✓` 行高 2.1）+ 底部白色粗线 + `catchphrase`；字号同番茄手帐 end 模板，颜色反转。

## 5. 配方表

| 文章类型 | 封面 | 内容页 | 结尾 |
| --- | --- | --- | --- |
| 观点长文 | 反白大字报 | 汉字序号 + 金句居中 | 反白清单 |
| 认知拆解 | 白底报头 | 灰底加粗 ×2 + 短段落 | 反白清单 |
| 金句合集 | 上黑下白 | 每卡一金句（衬线大字） | 金句 + 关注 |

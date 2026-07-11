# 便利贴拼贴（sticky-collage）

便签纸堆叠隐喻，亲切有烟火气。适用：生活经验、碰壁复盘。

## 1. 设计变量表

| 变量 | 值 | 用途 |
| --- | --- | --- |
| 主色 | `#F59F00` | 胶带/序号/锚点 |
| 便签黄 | `#FFF3BF` | 便签卡背景（也是荧光标记色） |
| 便签蓝/粉 | `#D0EBFF` / `#FFDEEB` | 穿插用便签，一卡 ≤2 色 |
| 背景 | `#F8F9FA` | 画布（米灰） |
| 正文灰 / 辅助灰 | `#343A40` / `#868E96` | — |
| 便签阴影 | `box-shadow:0 12px 24px rgba(0,0,0,0.08)` | 便签卡 |

## 2. 封面模板（默认：大便签 + 胶带）

```html
<div data-card="cover" style="width:1242px;height:1660px;box-sizing:border-box;padding:120px 100px;background:#F8F9FA;font-family:-apple-system,'PingFang SC','Microsoft YaHei',sans-serif;position:relative;display:flex;align-items:center;justify-content:center;">
  <div style="background:#FFF3BF;box-shadow:0 12px 24px rgba(0,0,0,0.08);padding:100px 80px;transform:rotate(-2deg);max-width:960px;position:relative;">
    <div style="position:absolute;top:-28px;left:50%;margin-left:-120px;width:240px;height:56px;background:#F59F00;opacity:0.85;transform:rotate(2deg);"></div>
    <div style="font-size:120px;line-height:1.3;font-weight:900;color:#343A40;">主标题写在大便签上</div>
    <div style="font-size:48px;color:#868E96;margin-top:48px;">副题：踩过的坑都在这里</div>
  </div>
  <div style="position:absolute;right:100px;bottom:96px;font-size:32px;color:#868E96;">昵称角标</div>
</div>
```

## 3. 内容页组件（便签堆）

```html
<div data-card="content-1" style="width:1242px;height:1660px;box-sizing:border-box;padding:110px 100px;background:#F8F9FA;font-family:-apple-system,'PingFang SC','Microsoft YaHei',sans-serif;position:relative;">
  <div style="font-size:56px;font-weight:800;color:#343A40;"><span style="color:#F59F00;">№ 1</span> 卡题 ≤12 字</div>
  <div style="margin-top:56px;background:#FFF3BF;box-shadow:0 12px 24px rgba(0,0,0,0.08);padding:52px;transform:rotate(-1deg);font-size:44px;line-height:1.8;color:#343A40;">经验正文，重点句直接写在黄便签上。</div>
  <div style="margin-top:44px;background:#D0EBFF;box-shadow:0 12px 24px rgba(0,0,0,0.08);padding:44px;transform:rotate(1deg);font-size:40px;line-height:1.7;color:#343A40;">⚠️ 碰壁提醒写在蓝便签上。</div>
  <div style="position:absolute;right:100px;bottom:96px;font-size:32px;color:#868E96;">昵称角标 · 2/6</div>
</div>
```

## 4. 结尾页模板

米灰底 + 三张小便签并排（总结三要点，各 ≤20 字）+ 胶带压顶 + `catchphrase`。

## 5. 配方表

| 文章类型 | 封面 | 内容页 | 结尾 |
| --- | --- | --- | --- |
| 碰壁复盘 | 大便签 | 黄便签（经验）+ 蓝便签（⚠️ 坑） | 三便签总结 |
| 生活经验 | 大便签 | 黄便签 ×2 交错旋转 | 三便签总结 |
| 好物清单 | 大便签 | 每卡一物：黄便签 + 粉便签（价格/渠道） | 清单 + 关注 |

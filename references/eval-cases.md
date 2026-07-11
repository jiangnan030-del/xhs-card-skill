# 触发用例 + 可验证循环

## 触发用例

| 用户说 | 期望行为 |
| --- | --- |
| 「把这篇排成小红书卡片：article.md」 | 走 7 步工作流，默认番茄手帐，一步确认主题 |
| 「用黑白报刊风出 6 张卡」 | 指定主题 + 目标张数（仍受 ≤9 硬限） |
| 「这篇太长了能不能出卡」 | 先切页试算，超预算则给拆篇建议 |
| 「换个人设，昵称叫 XX」 | 只改人设包，不动主题与内容 |
| 「照这张参考图生成新主题」 | 走 theme-generator 流程 |
| 「把这篇排成公众号」 | **不处理**，提示用 gzh-design-skill |

## 可验证循环（改→验→修）

改组件库或工作流后，三关全绿才能交付：

```bash
python3 scripts/card_lint.py .                   # 源头关：0 ERROR
python3 scripts/validate_card.py assets/demo-cards.html  # 产物关：0 ERROR
python3 scripts/render_check.py assets/demo-cards.html   # 像素关（需 playwright，无则降级为提示）
```

逻辑：源头干净 → 产物大概率干净；产物关兜住规则红线；像素关兜住「规则合规但实渲溢出」的漏网之鱼。

## 已知坑（写进脚本的经验）

- 小红书上传会裁切边缘 → 安全区 padding ≥ 80px（validate_card 检查）。
- 手机信息流里小字不可读 → 全局最小字号 28px（validate_card 检查）。
- 文字超长撑破卡面 → 字数预算 + 实渲溢出检测双重兜底。
- 外部字体加载失败导致换机器走样 → 禁外部字体，系统字体栈（card_lint 检查）。

# xhs-card · 小红书图文卡片排版 Skill

**把 Markdown 一键排成 3:4 小红书图文卡组（封面 + 内容页 + 结尾页），导出 PNG 直接发布。**

6 套卡片主题 + 主题生成器 · 语义切页（每卡一个记忆点） · 博主人设包 · 三关质量校验（含像素级溢出检测）

> 本项目是 [gzh-design-skill](https://github.com/isjiamu/gzh-design-skill) 设计哲学的姊妹件：长文发公众号、卡片发小红书。

## 快速开始

```bash
# 手动安装到 Claude Code skills 目录（Codex / Cursor 同理）
git clone https://github.com/jiangnan030-del/xhs-card-skill.git ~/.claude/skills/xhs-card
```

装好后直接对 Agent 说：

> 用番茄手帐把这篇文章排成小红书卡片：`article.md`

## 6 套主题

| 主色 | 主题 | 适用 |
| --- | --- | --- |
| `#FF2E4D` | 番茄手帐（默认） | 干货清单、工具盘点 |
| `#1A1A1A` | 黑白报刊 | 观点、认知类（大字报风） |
| `#4C6EF5` | 蓝图笔记 | 教程、步骤拆解 |
| `#F59F00` | 便利贴拼贴 | 生活经验、碰壁复盘 |
| `#0CA678` | 薄荷实验室 | 测评、对比、数据类 |
| `#845EF7` | 霓虹磁带 | AI/科技趋势、酷炫题材 |

## 三关校验

```bash
python3 scripts/card_lint.py .                  # 源头关：组件库反模式（须 0 ERROR）
python3 scripts/validate_card.py out/cards.html  # 产物关：字数/字号/安全区/张数
python3 scripts/render_check.py out/cards.html   # 像素关：实渲溢出检测 + 导出 PNG（需 playwright）
```

工作流详见 `SKILL.md`；演示输入见 `assets/sample-article.md`；样例卡组见 `assets/demo-cards.html`。

## License

AGPL-3.0（与 gzh-design-skill 保持一致：衍生必须开源，SaaS 部署也须开源）。

# xhs-card · 小红书图文卡片排版 Skill

把 Markdown 一键排成 3:4 小红书图文卡组（封面 + 内容页 + 结尾页），导出 PNG 直接发布。
设计哲学同 gzh-design-skill：**约束优于自由、质量靠脚本不靠自觉、换模型不走样**。

## 何时触发

- 用户说「把这篇排成小红书卡片 / 图文 / 卡组」，或给出 Markdown/长文 + 平台是小红书。
- ❌ 不处理：公众号长文（用 gzh-design）、PPT、普通网页、代写文章（只排版不写作）。

## 卡片 HTML 约定（硬规则，脚本兜底）

1. **画布**：每张卡是一个顶层 `<div data-card="cover|content-N|end" style="width:1242px;height:1660px;...">`（3:4）。
2. **安全区**：四周 padding ≥ 80px，防平台裁切。
3. **字号**：全部 `font-size ≥ 28px`（手机可读下限）；正文 40–48px，封面主标 120–160px。
4. **字数预算**（CJK 字符）：封面 ≤40，内容页 ≤140，结尾页 ≤120。
5. **张数**：全部 ≤9 张（封面 1 + 内容 ≤7 + 结尾 1）；超长内容提示拆多篇。
6. **样式全内联**：禁 `class=`、禁 `@media/@keyframes`、禁外部字体（系统字体栈）、禁 `position:fixed`。
7. **人设元素**：每卡右下角昵称角标；结尾页用人设包固定模板（见 `references/persona.md`）。

## 工作流（7 步）

1. **选主题** — 按题材查 `references/theme-index.md` 推荐并一步确认（默认番茄手帐）；不够用走 `references/theme-generator.md` 现造一套。
2. **读组件库** — 读所选 `references/theme-{id}.md`（变量表/组件/配方表）。
3. **语义切页** — 按 `references/pagination.md` 把正文切成 ≤7 张内容卡，每卡一个记忆点。
4. **封面装配** — 提炼大字报标题 + 副题 + ≤3 钩子点，给 3 套封面候选一步选定。
5. **内容页装配** — 按配方表拼组件：荧光标记每卡 1–2 处、数字序号、人设角标。
6. **三关校验** — 全绿才交付：
   ```bash
   python3 scripts/card_lint.py .                 # 第一关：组件库源头（须 0 ERROR）
   python3 scripts/validate_card.py out/cards.html # 第二关：逐卡规则（须 0 ERROR）
   python3 scripts/render_check.py out/cards.html  # 第三关：实渲溢出检测 + 导出 PNG
   ```
7. **输出** — `out/cards.html`（全部卡片，网格预览）+ `out/png/`（逐卡 PNG）+ 发布文案（标题 ≤20 字 + 正文 + 话题标签 3–6 个）。

## 文件路由

- `references/theme-index.md` — 6 套主题索引（单一来源）
- `references/theme-*.md` — 主题组件库（封面/内容页/结尾页三段式）
- `references/pagination.md` — 语义切页规则（记忆点密度/字数预算）
- `references/persona.md` — 博主人设包（一次录入，张张复用）
- `references/theme-generator.md` — 主题生成器（描述/参考图 → 新主题）
- `references/eval-cases.md` — 触发用例 + 可验证循环
- `scripts/` — 三关校验脚本；`assets/` — 演示输入与样例；`docs/gallery/` — 预览页

## 设计原则（与 gzh-design 同源）

- 配方优于自由：先查主题库配方表定组件组合，再装配。
- 克制用色：主色只做锚点（每卡 ≤3 处），约 90% 文字交给中性灰阶。
- 确定性下沉脚本：字数/字号/安全区/张数这类死规则交给校验脚本，模型只做内容判断。
- 每处经验可复现：踩过的坑写进 lint 规则和 `eval-cases.md`，用可验证循环防回归。

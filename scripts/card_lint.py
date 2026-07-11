#!/usr/bin/env python3
"""card_lint.py — 第一关：组件库源头检查。

用法: python3 scripts/card_lint.py <skill根目录>
扫描 references/theme-*.md 中的 ```html 代码块，检查反模式。
退出码：0 = 全绿；1 = 存在 ERROR。
"""
import re
import sys
from pathlib import Path

BANNED = [
    (re.compile(r"@import|fonts\.googleapis|fonts\.gstatic", re.I),
     "外部字体：卡片必须用系统字体栈，保证离线渲染一致"),
    (re.compile(r"\bclass\s*="),
     "禁用 class=：组件必须全内联样式 + data-* 标记"),
    (re.compile(r"position\s*:\s*fixed", re.I), "禁用 position:fixed"),
    (re.compile(r"@media|@keyframes", re.I),
     "禁用 @media/@keyframes：交付物是静态图像"),
    (re.compile(r"<link\b|<script\b", re.I), "禁用外部资源/脚本标签"),
]
FONT = re.compile(r"font-size\s*:\s*(\d+(?:\.\d+)?)px", re.I)
CODE = re.compile(r"```html\n(.*?)```", re.S)
MIN_FONT = 28


def main() -> int:
    root = Path(sys.argv[1] if len(sys.argv) > 1 else ".")
    files = sorted((root / "references").glob("theme-*.md"))
    if not files:
        print(f"ERROR 未找到 references/theme-*.md（root={root}）")
        return 1
    errors = warns = blocks_total = 0
    for f in files:
        text = f.read_text(encoding="utf-8")
        for i, block in enumerate(CODE.findall(text), 1):
            blocks_total += 1
            where = f"{f.name}#block{i}"
            for pat, msg in BANNED:
                if pat.search(block):
                    print(f"ERROR {where}: {msg}")
                    errors += 1
            for m in FONT.finditer(block):
                if float(m.group(1)) < MIN_FONT:
                    print(f"ERROR {where}: font-size {m.group(1)}px < {MIN_FONT}px（手机不可读）")
                    errors += 1
            if "data-card=" in block:
                flat = re.sub(r"\s+", "", block)
                if "width:1242px" not in flat or "height:1660px" not in flat:
                    print(f"WARN  {where}: 卡根节点未声明 1242x1660 画布")
                    warns += 1
                if "box-sizing:border-box" not in flat:
                    print(f"WARN  {where}: 建议声明 box-sizing:border-box，避免 padding 撑大画布")
                    warns += 1
    print(f"—— 扫描 {len(files)} 个主题文件 / {blocks_total} 个代码块：{errors} ERROR, {warns} WARN")
    if errors == 0:
        print("PASS 组件库源头干净")
    return 1 if errors else 0


if __name__ == "__main__":
    sys.exit(main())

#!/usr/bin/env python3
"""validate_card.py — 第二关：逐卡规则校验。

用法: python3 scripts/validate_card.py out/cards.html
逐卡检查：画布 1242x1660 / 安全区 padding>=80px / 字号>=28px /
CJK 字数预算（cover<=40, content<=140, end<=120）/ 张数<=9 / 反模式。
退出码：0 = 全绿；1 = 存在 ERROR。
"""
import re
import sys
from html.parser import HTMLParser
from pathlib import Path

CJK = re.compile(r"[\u4e00-\u9fff]")
FONT = re.compile(r"font-size\s*:\s*(\d+(?:\.\d+)?)px", re.I)
CARD = re.compile(r"<div[^>]*data-card=\"([^\"]+)\"", re.I)
STYLE = re.compile(r"style=\"([^\"]*)\"", re.I)
BANNED = [
    (re.compile(r"\bclass\s*="), "禁用 class=（全内联样式）"),
    (re.compile(r"position\s*:\s*fixed", re.I), "禁用 position:fixed"),
    (re.compile(r"@import|fonts\.googleapis|fonts\.gstatic", re.I), "禁用外部字体"),
]
MIN_FONT, MIN_PAD, MAX_CARDS = 28, 80, 9
LIMITS = {"cover": 40, "content": 140, "end": 120}


class TextGrab(HTMLParser):
    def __init__(self):
        super().__init__()
        self.buf = []

    def handle_data(self, data):
        self.buf.append(data)


def card_text(fragment: str) -> str:
    p = TextGrab()
    p.feed(fragment)
    return "".join(p.buf)


def min_padding(style: str):
    m = re.search(r"(?:^|;)\s*padding\s*:\s*([^;]+)", style)
    if not m:
        return None
    vals = [float(v) for v in re.findall(r"(\d+(?:\.\d+)?)px", m.group(1))]
    return min(vals) if vals else None


def main() -> int:
    if len(sys.argv) < 2:
        print("用法: python3 scripts/validate_card.py <cards.html>")
        return 1
    html = Path(sys.argv[1]).read_text(encoding="utf-8")
    marks = [(m.start(), m.group(1)) for m in CARD.finditer(html)]
    if not marks:
        print("ERROR 未找到任何 data-card 卡片")
        return 1
    errors = warns = 0
    kinds = [k for _, k in marks]
    if len(marks) > MAX_CARDS:
        print(f"ERROR 共 {len(marks)} 张卡 > {MAX_CARDS} 张上限，请拆多篇")
        errors += 1
    if kinds.count("cover") != 1:
        print(f"ERROR cover 卡应恰为 1 张，实际 {kinds.count('cover')} 张")
        errors += 1
    if kinds.count("end") == 0:
        print("WARN  缺结尾页（end）：建议补总结清单 + 关注引导")
        warns += 1
    n_content = sum(1 for k in kinds if k.startswith("content"))
    if n_content > 7:
        print(f"ERROR 内容卡 {n_content} 张 > 7 张上限")
        errors += 1

    for i, (pos, kind) in enumerate(marks):
        end = marks[i + 1][0] if i + 1 < len(marks) else len(html)
        seg = html[pos:end]
        flat = re.sub(r"\s+", "", seg)
        tag = seg[: seg.index(">") + 1]
        style_m = STYLE.search(tag)
        style = style_m.group(1) if style_m else ""

        if "width:1242px" not in flat or "height:1660px" not in flat:
            print(f"ERROR [{kind}] 画布不是 1242x1660（3:4）")
            errors += 1
        pad = min_padding(style)
        if pad is None:
            print(f"ERROR [{kind}] 根节点缺 padding 安全区（防裁切）")
            errors += 1
        elif pad < MIN_PAD:
            print(f"ERROR [{kind}] 安全区 padding {pad:g}px < {MIN_PAD}px")
            errors += 1
        if "box-sizing:border-box" not in flat:
            print(f"WARN  [{kind}] 建议 box-sizing:border-box")
            warns += 1
        for m in FONT.finditer(seg):
            if float(m.group(1)) < MIN_FONT:
                print(f"ERROR [{kind}] font-size {m.group(1)}px < {MIN_FONT}px")
                errors += 1
        for pat, msg in BANNED:
            if pat.search(seg):
                print(f"ERROR [{kind}] {msg}")
                errors += 1
        base = kind.split("-")[0]
        limit = LIMITS.get(base)
        n_cjk = len(CJK.findall(card_text(seg)))
        if limit is not None and n_cjk > limit:
            print(f"ERROR [{kind}] CJK 字数 {n_cjk} > {limit}（会撑爆卡面，请精简或拆卡）")
            errors += 1

    print(f"—— 共 {len(marks)} 张卡：{errors} ERROR, {warns} WARN")
    if errors == 0:
        print("PASS 逐卡规则全绿")
    return 1 if errors else 0


if __name__ == "__main__":
    sys.exit(main())

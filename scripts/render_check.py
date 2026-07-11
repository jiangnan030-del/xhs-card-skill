#!/usr/bin/env python3
"""render_check.py — 第三关：无头实渲溢出检测 + 导出 PNG。

用法: python3 scripts/render_check.py out/cards.html [输出目录]
需要 playwright（pip install playwright && playwright install chromium）。
未安装时降级为 SKIP（前两关已兜住规则红线）。
退出码：0 = 通过或 SKIP；1 = 存在溢出。
"""
import sys
from pathlib import Path


def main() -> int:
    if len(sys.argv) < 2:
        print("用法: python3 scripts/render_check.py <cards.html> [outdir]")
        return 1
    src = Path(sys.argv[1])
    out = Path(sys.argv[2]) if len(sys.argv) > 2 else src.parent / "png"
    try:
        from playwright.sync_api import sync_playwright
    except ImportError:
        print("SKIP render_check：未安装 playwright（pip install playwright && playwright install chromium）")
        print("     前两关已覆盖规则红线；装好后重跑本脚本即可像素级兜底 + 导出 PNG。")
        return 0

    out.mkdir(parents=True, exist_ok=True)
    errors = 0
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page(viewport={"width": 1242, "height": 1660})
        page.goto(src.resolve().as_uri())
        cards = page.query_selector_all("[data-card]")
        if not cards:
            print("ERROR 页面中未找到 data-card 卡片")
            browser.close()
            return 1
        for el in cards:
            kind = el.get_attribute("data-card") or "unknown"
            m = el.evaluate(
                "e => ({sw: e.scrollWidth, sh: e.scrollHeight,"
                " cw: e.clientWidth, ch: e.clientHeight})"
            )
            if m["sw"] > m["cw"] + 1 or m["sh"] > m["ch"] + 1:
                print(
                    f"ERROR [{kind}] 内容溢出：scroll {m['sw']}x{m['sh']}"
                    f" > client {m['cw']}x{m['ch']}（文字超长或组件超界）"
                )
                errors += 1
            png = out / f"card-{kind}.png"
            el.screenshot(path=str(png))
            print(f"OK    导出 {png}")
        browser.close()
    if errors:
        print(f"FAIL {errors} 张卡溢出")
        return 1
    print("PASS 全部卡片无溢出，PNG 已导出")
    return 0


if __name__ == "__main__":
    sys.exit(main())

#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""将 github-cover.html 渲染为 PNG 封面图"""
import sys, os
sys.stdout.reconfigure(encoding='utf-8')

def main():
    base_dir = os.path.dirname(os.path.abspath(__file__))
    html_path = os.path.join(base_dir, "github-cover.html")
    output_path = os.path.join(base_dir, "github-cover.png")

    try:
        from playwright.sync_api import sync_playwright
        abs_html = os.path.abspath(html_path).replace("\\", "/")
        file_url = "file:///" + abs_html

        with sync_playwright() as p:
            browser = p.chromium.launch()
            page = browser.new_page(viewport={"width": 1200, "height": 600})
            page.goto(file_url)
            page.wait_for_timeout(500)
            page.screenshot(path=os.path.abspath(output_path), full_page=False)
            browser.close()
        print(f"[OK] Rendered: {output_path}")
    except Exception as e:
        print(f"[ERROR] {e}", file=sys.stderr)

if __name__ == '__main__':
    main()

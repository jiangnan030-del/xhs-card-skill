/**
 * 生成带手机壳框架的主题预览图
 * 每套主题渲染为：手机外壳 + 卡片内容 = 仿小红书效果
 * 用法: node generate_phone_previews.js
 */
const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

const REPO_ROOT = __dirname;
const OUTPUT_DIR = path.join(REPO_ROOT, 'assets', 'theme-previews');
if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });

// 手机壳参数（仿 iPhone / 小红书风格）
const PHONE_WIDTH = 880;   // 手机外壳宽度
const PHONE_HEIGHT = 1820; // 手机外壳高度（含状态栏等）
const SCREEN_WIDTH = 800;  // 屏幕内容宽度
const SCREEN_HEIGHT = 1660; // 屏幕内容高度（3:4 卡片）
const RADIUS = 56;         // 圆角半径

// 6 套主题的卡片 HTML 内容（无手机壳，纯卡片）
const THEMES = {
  'tomato-journal': {
    name: '番茄手帐',
    color: '#FF2E4D',
    cardHtml: `<div style="width:${SCREEN_WIDTH}px;height:${SCREEN_HEIGHT}px;box-sizing:border-box;padding:100px 76px;background:#FFFFFF;font-family:-apple-system,'PingFang SC','Microsoft YaHei',sans-serif;display:flex;flex-direction:column;justify-content:center;">
  <div style="font-size:34px;color:#FF2E4D;font-weight:700;letter-spacing:6px;">— 干货手帐 —</div>
  <div style="font-size:116px;line-height:1.25;font-weight:900;color:#212529;margin-top:40px;">3 个让 AI <span style="color:#FF2E4D;">替你打工</span>的技巧</div>
  <div style="font-size:44px;color:#868E96;margin-top:48px;">亲测有效，看完就能用</div>
  <div style="margin-top:72px;display:flex;gap:20px;"><span style="font-size:34px;background:#FFF0F3;border:2px solid #FFC9D4;border-radius:999px;padding:14px 32px;color:#FF2E4D;">省 2 小时</span><span style="font-size:34px;background:#FFF0F3;border:2px solid #FFC9D4;border-radius:999px;padding:14px 32px;color:#FF2E4D;">零基础</span></div>
  <div style="position:absolute;right:76px;bottom:80px;font-size:28px;color:#868E96;">你的昵称</div>
</div>`
  },
  'mono-press': {
    name: '黑白报刊',
    color: '#1A1A1A',
    cardHtml: `<div style="width:${SCREEN_WIDTH}px;height:${SCREEN_HEIGHT}px;box-sizing:border-box;padding:100px 76px;background:#1A1A1A;font-family:-apple-system,'PingFang SC','Microsoft YaHei',sans-serif;display:flex;flex-direction:column;justify-content:center;">
  <div style="font-size:30px;color:#868E96;letter-spacing:10px;">VOL.01 · 观点</div>
  <div style="font-family:'Songti SC','SimSun',serif;font-size:128px;line-height:1.2;font-weight:900;color:#F8F9FA;margin-top:48px;">思考<br>停止内耗</div>
  <div style="width:180px;height:6px;background:#F8F9FA;margin-top:56px;"></div>
  <div style="font-size:42px;color:#ADB5BD;margin-top:48px;">大多数焦虑来自想太多做太少</div>
  <div style="position:absolute;right:76px;bottom:80px;font-size:28px;color:#868E96;">你的昵称</div>
</div>`
  },
  'blueprint-notes': {
    name: '蓝图笔记',
    color: '#4C6EF5',
    cardHtml: `<div style="width:${SCREEN_WIDTH}px;height:${SCREEN_HEIGHT}px;box-sizing:border-box;padding:100px 76px;background-color:#FFFFFF;background-image:linear-gradient(#E9ECEF 1px,transparent 1px),linear-gradient(90deg,#E9ECEF 1px,transparent 1px);background-size:50px 50px;font-family:-apple-system,'PingFang SC','Microsoft YaHei',sans-serif;display:flex;flex-direction:column;justify-content:center;">
  <div style="display:inline-block;align-self:flex-start;background:#4C6EF5;color:#FFFFFF;font-size:34px;font-weight:700;padding:14px 36px;border-radius:10px;">保姆级教程</div>
  <div style="font-size:110px;line-height:1.3;font-weight:900;color:#212529;margin-top:48px;">Prompt <span style="color:#4C6EF5;">N 步</span>上手</div>
  <div style="font-size:42px;color:#868E96;margin-top:48px;">从零开始写出高质量提示词</div>
  <div style="position:absolute;right:76px;bottom:80px;font-size:28px;color:#868E96;">你的昵称</div>
</div>`
  },
  'sticky-collage': {
    name: '便利贴拼贴',
    color: '#F59F00',
    cardHtml: `<div style="width:${SCREEN_WIDTH}px;height:${SCREEN_HEIGHT}px;box-sizing:border-box;padding:100px 76px;background:#F8F9FA;font-family:-apple-system,'PingFang SC','Microsoft YaHei',sans-serif;display:flex;align-items:center;justify-content:center;">
  <div style="background:#FFF3BF;box-shadow:0 10px 20px rgba(0,0,0,0.08);padding:84px 68px;transform:rotate(-2deg);max-width:800px;position:relative;">
    <div style="position:absolute;top:-24px;left:50%;margin-left:-100px;width:200px;height:48px;background:#F59F00;opacity:0.85;transform:rotate(2deg);"></div>
    <div style="font-size:104px;line-height:1.3;font-weight:900;color:#343A40;">踩过的坑<br>都在这里</div>
    <div style="font-size:42px;color:#868E96;margin-top:40px;">职场新人必看的 3 个教训</div>
  </div>
  <div style="position:absolute;right:76px;bottom:80px;font-size:28px;color:#868E96;">你的昵称</div>
</div>`
  },
  'mint-lab': {
    name: '薄荷实验室',
    color: '#0CA678',
    cardHtml: `<div style="width:${SCREEN_WIDTH}px;height:${SCREEN_HEIGHT}px;box-sizing:border-box;padding:100px 76px;background:#FFFFFF;font-family:-apple-system,'PingFang SC','Microsoft YaHei',sans-serif;display:flex;flex-direction:column;justify-content:center;">
  <div style="font-size:34px;color:#0CA678;font-weight:700;letter-spacing:5px;">⚡ 实测报告</div>
  <div style="font-size:110px;line-height:1.25;font-weight:900;color:#212529;margin-top:40px;">5 款 AI 工具<span style="color:#0CA678;">真实对比</span></div>
  <div style="margin-top:60px;background:#E6FCF5;border:2px solid #96F2D7;border-radius:16px;padding:36px 40px;font-size:38px;color:#212529;">测试场景：文案生成 / 代码辅助 / 数据分析</div>
  <div style="position:absolute;right:76px;bottom:80px;font-size:28px;color:#868E96;">你的昵称</div>
</div>`
  },
  'neon-tape': {
    name: '霓虹磁带',
    color: '#845EF7',
    cardHtml: `<div style="width:${SCREEN_WIDTH}px;height:${SCREEN_HEIGHT}px;box-sizing:border-box;padding:100px 76px;background:#14121F;font-family:-apple-system,'PingFang SC','Microsoft YaHei',sans-serif;display:flex;flex-direction:column;justify-content:center;">
  <div style="font-size:30px;color:#9775FA;letter-spacing:8px;">▶ AI 趋势磁带 · SIDE A</div>
  <div style="font-size:120px;line-height:1.25;font-weight:900;margin-top:48px;background:linear-gradient(90deg,#845EF7,#22B8CF);-webkit-background-clip:text;background-clip:text;color:transparent;">2026 AI<br>五大趋势</div>
  <div style="font-size:42px;color:#E9ECEF;margin-top:48px;">从 Agent 到多模态，一文看懂方向</div>
  <div style="margin-top:68px;width:240px;height:5px;background:linear-gradient(90deg,#845EF7,#22B8CF);"></div>
  <div style="position:absolute;right:76px;bottom:80px;font-size:28px;color:#9775FA;">你的昵称</div>
</div>`
  }
};

// 生成带手机壳的完整页面 HTML
function buildPhoneFrame(cardHtml, themeColor) {
  return `<!DOCTYPE html>
<html lang="zh"><head><meta charset="utf-8">
<style>*{margin:0;padding:0;box-sizing:border-box;}
body{background:#F0F0F0;display:flex;justify-content:center;align-items:center;min-height:100vh;}
.phone{
  width:${PHONE_WIDTH}px;
  height:${PHONE_HEIGHT}px;
  background:#222;
  border-radius:64px;
  padding:12px 12px 24px 12px;
  box-shadow:
    0 0 0 3px #333,
    0 20px 60px rgba(0,0,0,0.3),
    inset 0 0 4px rgba(255,255,255,0.05);
  position:relative;
}
.phone::before{
  content:'';
  position:absolute;
  top:18px;left:50%;
  transform:translateX(-50%);
  width:160px;height:28px;
  background:#111;
  border-radius:20px;
  z-index:10;
}
.screen{
  width:${SCREEN_WIDTH}px;
  height:${SCREEN_HEIGHT}px;
  border-radius:${RADIUS}px;
  overflow:hidden;
  position:relative;
}
/* 状态栏 */
.status-bar{
  position:absolute;top:0;left:0;right:0;height:52px;
  display:flex;justify-content:space-between;align-items:center;
  padding:0 28px;z-index:5;
  font-family:-apple-system,sans-serif;font-size:26px;font-weight:600;color:#fff;
  background:linear-gradient(180deg,rgba(0,0,0,0.12),transparent);
}
.status-bar .time{letter-spacing:1px;}
.status-bar .icons{display:flex;gap:8px;align-items:center;}
.status-bar .icons span{font-size:22px;}
/* 底部指示条 */
.home-indicator{
  position:absolute;bottom:8px;left:50%;
  transform:translateX(-50%);
  width:140px;height:5px;
  background:rgba(255,255,255,0.6);
  border-radius:3px;
  z-index:5;
}
</style></head>
<body>
<div class="phone">
  <div class="status-bar">
    <span class="time">02:07</span>
    <span class="icons">
      <span>📶</span><span>📡</span><span>🔋</span>
    </span>
  </div>
  <div class="screen">${cardHtml}</div>
  <div class="home-indicator"></div>
</div>
</body></html>`;
}

async function renderPhonePreview(themeId, themeData) {
  const htmlPath = path.join(OUTPUT_DIR, `${themeId}-phone.html`);
  const pngPath = path.join(OUTPUT_DIR, `${themeId}-phone.png`);

  const fullHtml = buildPhoneFrame(themeData.cardHtml, themeData.color);
  fs.writeFileSync(htmlPath, fullHtml, 'utf-8');

  const browser = await chromium.launch();
  const page = await browser.newPage({
    viewport: { width: PHONE_WIDTH + 120, height: PHONE_HEIGHT + 120 }
  });
  await page.goto(`file:///${htmlPath.replace(/\\/g, '/')}`);
  await page.waitForTimeout(400);

  // 只截取手机区域
  const phoneEl = await page.$('.phone');
  await phoneEl.screenshot({
    path: pngPath,
    type: 'png'
  });

  await browser.close();
  console.log(`[OK] ${themeData.name} (phone) -> ${path.basename(pngPath)}`);
}

async function main() {
  console.log(`= Generate ${Object.keys(THEMES).length} phone-frame previews =`);
  console.log(`Output: ${OUTPUT_DIR}\n`);

  for (const [themeId, themeData] of Object.entries(THEMES)) {
    try {
      await renderPhonePreview(themeId, themeData);
    } catch (e) {
      console.error(`[ERROR] ${themeData.name}:`, e.message);
    }
  }

  console.log('\n= Done! =');
}

main().catch(console.error);

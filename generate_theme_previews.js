/**
 * 生成 6 套主题的效果预览图（封面 + 内容页 + 结尾页 三联预览）
 * 用法: node generate_theme_previews.js
 */
const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

const REPO_ROOT = __dirname;
const OUTPUT_DIR = path.join(REPO_ROOT, 'assets', 'theme-previews');
if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });

// 6 套主题的预览 HTML
const THEMES = {
  'tomato-journal': {
    name: '番茄手帐',
    html: `<!DOCTYPE html>
<html lang="zh"><head><meta charset="utf-8"><title>番茄手帐</title></head>
<body style="margin:0;background:#DEE2E6;">
<div data-card="cover" style="width:1242px;height:1660px;box-sizing:border-box;padding:120px 100px;background:#FFFFFF;font-family:-apple-system,'PingFang SC','Microsoft YaHei',sans-serif;position:relative;display:flex;flex-direction:column;justify-content:center;">
  <div style="font-size:40px;color:#FF2E4D;font-weight:700;letter-spacing:8px;">— 干货手帐 —</div>
  <div style="font-size:140px;line-height:1.25;font-weight:900;color:#212529;margin-top:48px;">3 个让 AI <span style="color:#FF2E4D;">替你打工</span>的技巧</div>
  <div style="font-size:52px;color:#868E96;margin-top:56px;">亲测有效，看完就能用</div>
  <div style="margin-top:88px;display:flex;gap:24px;"><span style="font-size:40px;background:#FFF0F3;border:3px solid #FFC9D4;border-radius:999px;padding:16px 40px;color:#FF2E4D;">省 2 小时</span><span style="font-size:40px;background:#FFF0F3;border:3px solid #FFC9D4;border-radius:999px;padding:16px 40px;color:#FF2E4D;">零基础</span></div>
  <div style="position:absolute;right:100px;bottom:96px;font-size:32px;color:#868E96;">🐟 摸鱼小李</div>
</div>
<div data-card="content-1" style="width:1242px;height:1660px;box-sizing:border-box;padding:110px 100px;background:#FFFFFF;font-family:-apple-system,'PingFang SC','Microsoft YaHei',sans-serif;position:relative;">
  <div style="display:flex;align-items:center;gap:28px;"><span style="font-size:64px;font-weight:900;color:#FF2E4D;">01</span><span style="font-size:56px;font-weight:800;color:#212529;">先给背景再给任务</span></div>
  <div style="margin-top:64px;background:#FFF0F3;border:3px solid #FFC9D4;border-radius:24px;padding:48px;"><div style="font-size:44px;line-height:1.7;color:#212529;">把角色、目标、限制先说清楚，<span style="background:#FFD8DE;padding:4px 8px;">输出质量直接翻倍</span>。</div></div>
  <div style="margin-top:44px;background:#FFF0F3;border:3px solid #FFC9D4;border-radius:24px;padding:48px;"><div style="font-size:44px;line-height:1.7;color:#212529;">句式：我是〇〇，要〇〇，要求〇〇。</div></div>
  <div style="position:absolute;right:100px;bottom:96px;font-size:32px;color:#868E96;">🐟 摸鱼小李 · 2/3</div>
</div>
<div data-card="end" style="width:1242px;height:1660px;box-sizing:border-box;padding:120px 100px;background:#FFF0F3;font-family:-apple-system,'PingFang SC','Microsoft YaHei',sans-serif;position:relative;">
  <div style="font-size:72px;font-weight:900;color:#212529;">今天的重点 ✓</div>
  <div style="margin-top:64px;background:#FFFFFF;border-radius:24px;padding:56px;font-size:44px;line-height:2.1;color:#212529;">✓ 先给背景再给任务<br>✓ 要求分步骤输出<br>✓ 让 AI 自查一遍</div>
  <div style="margin-top:80px;font-size:48px;color:#FF2E4D;font-weight:700;">🐟 关注我，下班早一小时</div>
  <div style="position:absolute;right:100px;bottom:96px;font-size:32px;color:#868E96;">摸鱼小李</div>
</div>
</body></html>`
  },
  'mono-press': {
    name: '黑白报刊',
    html: `<!DOCTYPE html>
<html lang="zh"><head><meta charset="utf-8"><title>黑白报刊</title></head>
<body style="margin:0;background:#DEE2E6;">
<div data-card="cover" style="width:1242px;height:1660px;box-sizing:border-box;padding:120px 100px;background:#1A1A1A;font-family:-apple-system,'PingFang SC','Microsoft YaHei',sans-serif;position:relative;display:flex;flex-direction:column;justify-content:center;">
  <div style="font-size:36px;color:#868E96;letter-spacing:12px;">VOL.01 · 观点</div>
  <div style="font-family:'Songti SC','SimSun',serif;font-size:150px;line-height:1.2;font-weight:900;color:#F8F9FA;margin-top:56px;">思考<br>停止内耗</div>
  <div style="width:200px;height:8px;background:#F8F9FA;margin-top:64px;"></div>
  <div style="font-size:48px;color:#ADB5BD;margin-top:56px;">大多数焦虑来自想太多做太少</div>
  <div style="position:absolute;right:100px;bottom:96px;font-size:32px;color:#868E96;">🐟 摸鱼小李</div>
</div>
<div data-card="content-1" style="width:1242px;height:1660px;box-sizing:border-box;padding:110px 100px;background:#FFFFFF;font-family:-apple-system,'PingFang SC','Microsoft YaHei',sans-serif;position:relative;">
  <div style="border-top:10px solid #1A1A1A;padding-top:40px;font-size:56px;font-weight:800;color:#1A1A1A;">壹 · 行动治愈恐惧</div>
  <div style="margin-top:72px;font-size:46px;line-height:1.9;color:#212529;">你不需要完全准备好才能开始。<span style="background:#F1F3F5;padding:4px 10px;font-weight:700;">先做五分钟</span>，momentum 会推着你走。</div>
  <div style="margin-top:88px;font-family:'Songti SC','SimSun',serif;font-size:60px;line-height:1.6;font-weight:900;color:#1A1A1A;text-align:center;">"完美是完成的敌人"</div>
  <div style="position:absolute;right:100px;bottom:96px;font-size:32px;color:#868E96;">🐟 摸鱼小李 · 2/3</div>
</div>
<div data-card="end" style="width:1242px;height:1660px;box-sizing:border-box;padding:120px 100px;background:#1A1A1A;font-family:-apple-system,'PingFang SC','Microsoft YaHei',sans-serif;position:relative;">
  <div style="font-size:72px;font-weight:900;color:#F8F9FA;">核心观点 · 总结</div>
  <div style="margin-top:64px;font-size:44px;line-height:2.2;color:#ADB5BD;">▌ 行动 > 思考<br>▌ 完美主义是陷阱<br>▌ 小步快跑胜过原地踏步</div>
  <div style="margin-top:80px;font-size:48px;color:#F8F9FA;font-weight:700;">🐟 关注我，一起深度思考</div>
  <div style="position:absolute;right:100px;bottom:96px;font-size:32px;color:#868E96;">摸鱼小李</div>
</div>
</body></html>`
  },
  'blueprint-notes': {
    name: '蓝图笔记',
    html: `<!DOCTYPE html>
<html lang="zh"><head><meta charset="utf-8"><title>蓝图笔记</title></head>
<body style="margin:0;background:#DEE2E6;">
<div data-card="cover" style="width:1242px;height:1660px;box-sizing:border-box;padding:120px 100px;background-color:#FFFFFF;background-image:linear-gradient(#E9ECEF 1px,transparent 1px),linear-gradient(90deg,#E9ECEF 1px,transparent 1px);background-size:60px 60px;font-family:-apple-system,'PingFang SC','Microsoft YaHei',sans-serif;position:relative;display:flex;flex-direction:column;justify-content:center;">
  <div style="display:inline-block;align-self:flex-start;background:#4C6EF5;color:#FFFFFF;font-size:40px;font-weight:700;padding:16px 44px;border-radius:12px;">保姆级教程</div>
  <div style="font-size:130px;line-height:1.3;font-weight:900;color:#212529;margin-top:56px;">Prompt <span style="color:#4C6EF5;">N 步</span>上手</div>
  <div style="font-size:48px;color:#868E96;margin-top:56px;">从零开始写出高质量提示词</div>
  <div style="position:absolute;right:100px;bottom:96px;font-size:32px;color:#868E96;">🐟 摸鱼小李</div>
</div>
<div data-card="content-1" style="width:1242px;height:1660px;box-sizing:border-box;padding:110px 100px;background-color:#FFFFFF;background-image:linear-gradient(#E9ECEF 1px,transparent 1px),linear-gradient(90deg,#E9ECEF 1px,transparent 1px);background-size:60px 60px;font-family:-apple-system,'PingFang SC','Microsoft YaHei',sans-serif;position:relative;">
  <div style="display:flex;align-items:center;gap:32px;"><span style="width:110px;height:110px;border-radius:50%;background:#4C6EF5;color:#FFFFFF;font-size:56px;font-weight:900;display:flex;align-items:center;justify-content:center;">1</span><span style="font-size:56px;font-weight:800;color:#212529;">明确角色和目标</span></div>
  <div style="margin-top:56px;background:#EDF2FF;border:3px dashed #BAC8FF;border-radius:20px;padding:48px;font-size:44px;line-height:1.8;color:#212529;">告诉 AI 它是谁、要做什么。<span style="background:#DBE4FF;padding:4px 8px;font-weight:700;">角色 + 任务 + 约束</span>三件套。</div>
  <div style="margin-top:48px;font-size:44px;color:#4C6EF5;font-weight:700;">↓ 下一步：拆解步骤</div>
  <div style="position:absolute;right:100px;bottom:96px;font-size:32px;color:#868E96;">🐟 摸鱼小李 · 2/4</div>
</div>
<div data-card="end" style="width:1242px;height:1660px;box-sizing:border-box;padding:120px 100px;background:#EDF2FF;font-family:-apple-system,'PingFang SC','Microsoft YaHei',sans-serif;position:relative;">
  <div style="font-size:72px;font-weight:900;color:#212529;">✓ 步骤回顾</div>
  <div style="margin-top:64px;background:#FFFFFF;border-radius:24px;padding:56px;font-size:44px;line-height:2.1;color:#212529;">① 明确角色和目标<br>② 拆解具体步骤<br>③ 给出示例和格式<br>④ 迭代优化 Prompt</div>
  <div style="margin-top:80px;font-size:48px;color:#4C6EF5;font-weight:700;">🐟 关注我，AI 效率翻倍</div>
  <div style="position:absolute;right:100px;bottom:96px;font-size:32px;color:#868E96;">摸鱼小李</div>
</div>
</body></html>`
  },
  'sticky-collage': {
    name: '便利贴拼贴',
    html: `<!DOCTYPE html>
<html lang="zh"><head><meta charset="utf-8"><title>便利贴拼贴</title></head>
<body style="margin:0;background:#DEE2E6;">
<div data-card="cover" style="width:1242px;height:1660px;box-sizing:border-box;padding:120px 100px;background:#F8F9FA;font-family:-apple-system,'PingFang SC','Microsoft YaHei',sans-serif;position:relative;display:flex;align-items:center;justify-content:center;">
  <div style="background:#FFF3BF;box-shadow:0 12px 24px rgba(0,0,0,0.08);padding:100px 80px;transform:rotate(-2deg);max-width:960px;position:relative;">
    <div style="position:absolute;top:-28px;left:50%;margin-left:-120px;width:240px;height:56px;background:#F59F00;opacity:0.85;transform:rotate(2deg);"></div>
    <div style="font-size:120px;line-height:1.3;font-weight:900;color:#343A40;">踩过的坑<br>都在这里</div>
    <div style="font-size:48px;color:#868E96;margin-top:48px;">职场新人必看的 3 个教训</div>
  </div>
  <div style="position:absolute;right:100px;bottom:96px;font-size:32px;color:#868E96;">🐟 摸鱼小李</div>
</div>
<div data-card="content-1" style="width:1242px;height:1660px;box-sizing:border-box;padding:110px 100px;background:#F8F9FA;font-family:-apple-system,'PingFang SC','Microsoft YaHei',sans-serif;position:relative;">
  <div style="font-size:56px;font-weight:800;color:#343A40;"><span style="color:#F59F00;">№ 1</span> 别当老好人</div>
  <div style="margin-top:56px;background:#FFF3BF;box-shadow:0 12px 24px rgba(0,0,0,0.08);padding:52px;transform:rotate(-1deg);font-size:44px;line-height:1.8;color:#343A40;">学会说「不」不是冷漠，是对自己和他人时间的尊重。每接一个不该接的任务，就是在挤压成长空间。</div>
  <div style="margin-top:44px;background:#D0EBFF;box-shadow:0 12px 24px rgba(0,0,0,0.08);padding:44px;transform:rotate(1deg);font-size:40px;line-height:1.7;color:#343A40;">⚠️ 碰壁提醒：拒绝时给出理由+替代方案，对方更容易接受。</div>
  <div style="position:absolute;right:100px;bottom:96px;font-size:32px;color:#868E96;">🐟 摸鱼小李 · 2/3</div>
</div>
<div data-card="end" style="width:1242px;height:1660px;box-sizing:border-box;padding:120px 100px;background:#F8F9FA;font-family:-apple-system,'PingFang SC','Microsoft YaHei',sans-serif;position:relative;">
  <div style="font-size:72px;font-weight:900;color:#343A40;">💡 三条总结</div>
  <div style="margin-top:64px;display:flex;flex-direction:column;gap:36px;">
    <div style="background:#FFF3BF;box-shadow:0 12px 24px rgba(0,0,0,0.08);padding:44px 52px;transform:rotate(-1deg);font-size:42px;color:#343A40;">① 学会拒绝，别当老好人</div>
    <div style="background:#D0EBFF;box-shadow:0 12px 24px rgba(0,0,0,0.08);padding:44px 52px;transform:rotate(1deg);font-size:42px;color:#343A40;">② 主动汇报，别等被问</div>
    <div style="background:#FFDEEB;box-shadow:0 12px 24px rgba(0,0,0,0.08);padding:44px 52px;transform:rotate(-0.5deg);font-size:42px;color:#343A40;">③ 记录过程，别只交结果</div>
  </div>
  <div style="margin-top:60px;font-size:48px;color:#F59F00;font-weight:700;text-align:center;">🐟 关注我，少走弯路</div>
  <div style="position:absolute;right:100px;bottom:96px;font-size:32px;color:#868E96;">摸鱼小李</div>
</div>
</body></html>`
  },
  'mint-lab': {
    name: '薄荷实验室',
    html: `<!DOCTYPE html>
<html lang="zh"><head><meta charset="utf-8"><title>薄荷实验室</title></head>
<body style="margin:0;background:#DEE2E6;">
<div data-card="cover" style="width:1242px;height:1660px;box-sizing:border-box;padding:120px 100px;background:#FFFFFF;font-family:-apple-system,'PingFang SC','Microsoft YaHei',sans-serif;position:relative;display:flex;flex-direction:column;justify-content:center;">
  <div style="font-size:40px;color:#0CA678;font-weight:700;letter-spacing:6px;">⚡ 实测报告</div>
  <div style="font-size:130px;line-height:1.25;font-weight:900;color:#212529;margin-top:48px;">5 款 AI 工具<span style="color:#0CA678;">真实对比</span></div>
  <div style="margin-top:72px;background:#E6FCF5;border:3px solid #96F2D7;border-radius:20px;padding:40px 48px;font-size:44px;color:#212529;">测试场景：文案生成 / 代码辅助 / 数据分析</div>
  <div style="position:absolute;right:100px;bottom:96px;font-size:32px;color:#868E96;">🐟 摸鱼小李</div>
</div>
<div data-card="content-1" style="width:1242px;height:1660px;box-sizing:border-box;padding:110px 100px;background:#FFFFFF;font-family:-apple-system,'PingFang SC','Microsoft YaHei',sans-serif;position:relative;">
  <div style="display:flex;align-items:center;gap:28px;"><span style="font-size:64px;font-weight:900;color:#0CA678;">01</span><span style="font-size:56px;font-weight:800;color:#212529;">ChatGPT</span></div>
  <div style="margin-top:56px;"><span style="font-size:40px;color:#868E96;">综合评分</span><span style="display:inline-block;width:520px;height:28px;background:#E6FCF5;border-radius:999px;margin-left:32px;vertical-align:middle;"><span style="display:block;width:92%;height:28px;background:#0CA678;border-radius:999px;"></span></span><span style="font-size:48px;font-weight:900;color:#0CA678;margin-left:24px;">9.2</span></div>
  <div style="margin-top:56px;font-size:44px;line-height:2.0;color:#212529;"><span style="color:#0CA678;font-weight:900;">✔</span> 理解能力强，长文本稳定<br><span style="color:#FA5252;font-weight:900;">✘</span> 免费版有限制，高峰排队</div>
  <div style="margin-top:64px;font-size:44px;line-height:1.7;color:#212529;">结论：<span style="background:#C3FAE8;padding:4px 10px;font-weight:700;">综合最强，日常首选</span></div>
  <div style="position:absolute;right:100px;bottom:96px;font-size:32px;color:#868E96;">🐟 摸鱼小李 · 2/6</div>
</div>
<div data-card="end" style="width:1242px;height:1660px;box-sizing:border-box;padding:120px 100px;background:#E6FCF5;font-family:-apple-system,'PingFang SC','Microsoft YaHei',sans-serif;position:relative;">
  <div style="font-size:72px;font-weight:900;color:#212529;">🏆 总排名</div>
  <div style="margin-top:64px;background:#FFFFFF;border-radius:24px;padding:56px;font-size:46px;line-height:2.2;color:#212529;">🥇 ChatGPT —— 综合评分 9.2<br>🥈 Claude —— 长文之王 8.8<br>🥉 Gemini —— 多模态强 8.5</div>
  <div style="margin-top:64px;font-size:44px;color:#0CA678;font-weight:700;text-align:center;">选工具看场景，没有万能答案</div>
  <div style="position:absolute;right:100px;bottom:96px;font-size:32px;color:#868E96;">摸鱼小李</div>
</div>
</body></html>`
  },
  'neon-tape': {
    name: '霓虹磁带',
    html: `<!DOCTYPE html>
<html lang="zh"><head><meta charset="utf-8"><title>霓虹磁带</title></head>
<body style="margin:0;background:#14121F;">
<div data-card="cover" style="width:1242px;height:1660px;box-sizing:border-box;padding:120px 100px;background:#14121F;font-family:-apple-system,'PingFang SC','Microsoft YaHei',sans-serif;position:relative;display:flex;flex-direction:column;justify-content:center;">
  <div style="font-size:36px;color:#9775FA;letter-spacing:10px;">▶ AI 趋势磁带 · SIDE A</div>
  <div style="font-size:140px;line-height:1.25;font-weight:900;margin-top:56px;background:linear-gradient(90deg,#845EF7,#22B8CF);-webkit-background-clip:text;background-clip:text;color:transparent;">2026 AI<br>五大趋势</div>
  <div style="font-size:48px;color:#E9ECEF;margin-top:56px;">从 Agent 到多模态，一文看懂方向</div>
  <div style="margin-top:80px;width:280px;height:6px;background:linear-gradient(90deg,#845EF7,#22B8CF);"></div>
  <div style="position:absolute;right:100px;bottom:96px;font-size:32px;color:#9775FA;">🐟 摸鱼小李</div>
</div>
<div data-card="content-1" style="width:1242px;height:1660px;box-sizing:border-box;padding:110px 100px;background:#14121F;font-family:-apple-system,'PingFang SC','Microsoft YaHei',sans-serif;position:relative;">
  <div style="display:flex;align-items:center;gap:28px;"><span style="font-size:64px;font-weight:900;color:#845EF7;">01</span><span style="font-size:56px;font-weight:800;color:#E9ECEF;">Agent 自主化</span></div>
  <div style="margin-top:64px;background:#221E33;border:2px solid #3B2F63;border-radius:24px;padding:52px;font-size:44px;line-height:1.8;color:#E9ECEF;">AI 不再只是对话框，而是能<span style="background:#3B2F63;padding:4px 10px;border-radius:8px;color:#E9ECEF;font-weight:700;">自主规划、调用工具、完成复杂任务</span>的智能体。</div>
  <div style="margin-top:48px;font-size:40px;color:#9775FA;">💡 代表：Claude Computer Use / OpenAI Operator</div>
  <div style="position:absolute;right:100px;bottom:96px;font-size:32px;color:#9775FA;">🐟 摸鱼小李 · 2/5</div>
</div>
<div data-card="end" style="width:1242px;height:1660px;box-sizing:border-box;padding:120px 100px;background:#14121F;font-family:-apple-system,'PingFang SC','Microsoft YaHei',sans-serif;position:relative;">
  <div style="font-size:72px;font-weight:900;color:#E9ECEF;">趋势清单 ✓</div>
  <div style="margin-top:64px;background:#221E33;border:2px solid #3B2F63;border-radius:24px;padding:56px;font-size:44px;line-height:2.1;color:#E9ECEF;">▸ Agent 自主化 —— AI 自己干活<br>▸ 多模态融合 —— 听说读写一体<br>▸ 边端部署 —— 手机跑大模型<br>▸ AI 安全 —— 对齐问题受关注<br>▸ 开源爆发 —— 社区驱动创新</div>
  <div style="margin-top:64px;font-size:48px;background:linear-gradient(90deg,#845EF7,#22B8CF);-webkit-background-clip:text;background-clip:text;color:transparent;font-weight:700;text-align:center;">🐟 关注我，紧跟 AI 趋势</div>
  <div style="position:absolute;right:100px;bottom:96px;font-size:32px;color:#9775FA;">摸鱼小李</div>
</div>
</body></html>`
  }
};

async function renderTheme(themeId, themeData) {
  const htmlPath = path.join(OUTPUT_DIR, `${themeId}.html`);
  const pngPath = path.join(OUTPUT_DIR, `${themeId}.png`);

  // 写入 HTML
  fs.writeFileSync(htmlPath, themeData.html, 'utf-8');

  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1242, height: 1660 } });
  await page.goto(`file:///${htmlPath.replace(/\\/g, '/')}`);
  await page.waitForTimeout(500);
  await page.screenshot({ path: pngPath, fullPage: true, type: 'png' });
  await browser.close();

  console.log(`[OK] ${themeData.name} -> ${path.basename(pngPath)}`);
}

async function main() {
  console.log(`= 生成 ${Object.keys(THEMES).length} 套主题预览图 =`);
  console.log(`输出目录: ${OUTPUT_DIR}\n`);

  for (const [themeId, themeData] of Object.entries(THEMES)) {
    try {
      await renderTheme(themeId, themeData);
    } catch (e) {
      console.error(`[ERROR] ${themeData.name}:`, e.message);
    }
  }

  console.log('\n= 全部完成！=');
}

main().catch(console.error);

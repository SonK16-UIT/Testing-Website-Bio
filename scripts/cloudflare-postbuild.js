const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, '..', 'out');
const nextStaticDir = path.join(outDir, '_next', 'static');
const targetStaticDir = path.join(outDir, 'static');

// 1. Move out/_next/static directly to out/static for 100% clean URL paths (/static/css/..., /static/chunks/...)
if (fs.existsSync(nextStaticDir)) {
  if (fs.existsSync(targetStaticDir)) {
    fs.rmSync(targetStaticDir, { recursive: true, force: true });
  }
  fs.cpSync(nextStaticDir, targetStaticDir, { recursive: true });
  fs.rmSync(path.join(outDir, '_next'), { recursive: true, force: true });
  console.log('✓ Successfully moved out/_next/static -> out/static');
}

// 2. Also remove any old static-assets folder if present
const oldStaticAssetsDir = path.join(outDir, 'static-assets');
if (fs.existsSync(oldStaticAssetsDir)) {
  fs.rmSync(oldStaticAssetsDir, { recursive: true, force: true });
}

// 3. Create .nojekyll in out/
fs.writeFileSync(path.join(outDir, '.nojekyll'), '', 'utf8');

// 4. Replace all occurrences of /_next/static/ and /static-assets/static/ with /static/
function replaceInFiles(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      replaceInFiles(filePath);
    } else if (file.endsWith('.html') || file.endsWith('.js') || file.endsWith('.json') || file.endsWith('.txt')) {
      let content = fs.readFileSync(filePath, 'utf8');
      if (content.includes('/_next/') || content.includes('/static-assets/')) {
        content = content.replace(/\/static-assets\/static\//g, '/static/');
        content = content.replace(/\/static-assets\//g, '/static/');
        content = content.replace(/\/_next\/static\//g, '/static/');
        content = content.replace(/\/_next\//g, '/static/');
        fs.writeFileSync(filePath, content, 'utf8');
      }
    }
  }
}

replaceInFiles(outDir);
console.log('✓ Purged all _next & static-assets references -> converted to clean /static/ paths!');

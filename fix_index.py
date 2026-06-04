import re
path = r"c:\Users\Lenovo\Desktop\codex\pdf-merge\index.html"
with open(path, "r", encoding="utf-8") as f:
    c = f.read()

# Add nav CSS and nav HTML
nav_css = """\n.nav{background:#fff;padding:0 24px;border-bottom:1px solid #e8eaed;display:flex;align-items:center;gap:4px;flex-wrap:wrap}\n.nav a{display:inline-flex;align-items:center;gap:5px;padding:14px 16px;text-decoration:none;color:#5f6368;font-size:.9rem;border-bottom:3px solid transparent;transition:color .2s,border-color .2s}\n.nav a:hover{color:#1a73e8}\n.nav a.active{color:#1a73e8;border-bottom-color:#1a73e8;font-weight:600}\n.nav .brand{font-weight:700;font-size:1rem;color:#1a1a1a;margin-right:16px;padding:14px 8px}\n"""

# Insert nav CSS after the existing header CSS (before .header)
c = c.replace(".header{background:#fff;", nav_css + ".header{background:#fff;")

# Add nav HTML before the header
nav_html = '\n<div class="nav">\n<a href="/pdf-merge/" class="brand">工具集</a>\n<a href="/pdf-merge/" class="active">PDF合并</a>\n<a href="/pdf-merge/image-compress.html">图片压缩</a>\n<a href="/pdf-merge/json-formatter.html">JSON格式化</a>\n<a href="/pdf-merge/qr-generator.html">二维码生成</a>\n</div>\n'
c = c.replace('<header class="header">', nav_html + '<header class="header">')

with open(path, "w", encoding="utf-8") as f:
    f.write(c)
print("index.html updated with nav")

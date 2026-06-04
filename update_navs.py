import os

nav_html = """<div class="nav">
<a href="/pdf-merge/" class="brand">工具集</a>
<a href="/pdf-merge/">PDF合并</a>
<a href="/pdf-merge/pdf-split.html">PDF拆分</a>
<a href="/pdf-merge/image-compress.html">图片压缩</a>
<a href="/pdf-merge/json-formatter.html">JSON格式化</a>
<a href="/pdf-merge/qr-generator.html">二维码生成</a>
<a href="/pdf-merge/markdown-editor.html">Markdown</a>
<a href="/pdf-merge/base64.html">Base64</a>
<a href="/pdf-merge/timestamp.html">时间戳</a>
</div>"""

files_to_update = ["index.html", "image-compress.html", "json-formatter.html", "qr-generator.html"]
base = r"c:\Users\Lenovo\Desktop\codex\pdf-merge"

for fname in files_to_update:
    path = os.path.join(base, fname)
    with open(path, "r", encoding="utf-8") as f:
        content = f.read()
    # Replace the old nav with new nav
    import re
    # Find existing nav block and replace it
    old_nav_pattern = r'<div class="nav">.*?</div>'
    content = re.sub(old_nav_pattern, nav_html, content, flags=re.DOTALL)
    with open(path, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"Updated nav in {fname}")

print("Done updating navs")

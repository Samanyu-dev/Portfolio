const fs = require("fs");
const path = require("path");

function walk(dir) {
  fs.readdirSync(dir, { withFileTypes: true }).forEach(f => {
    const p = path.join(dir, f.name);
    if (f.isDirectory()) {
      walk(p);
    } else if (p.endsWith(".tsx") || p.endsWith(".ts")) {
      let c = fs.readFileSync(p, "utf8");
      if (!c.startsWith("\"use client\"") && !c.startsWith("'use client'")) {
        fs.writeFileSync(p, "\"use client\";\n" + c);
      }
    }
  });
}

walk("src/components/portfolio-v3");

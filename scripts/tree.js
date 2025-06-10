#!/usr/bin/env node
import fs from 'fs';
import path from 'path';

const EXCLUDE = new Set(['node_modules', '.git', 'dist', '.vscode']);
const maxDepth = Number(process.argv[2] || 2);

function printTree(dir, prefix = '', depth = 0) {
  if (depth > maxDepth) return;
  const items = fs.readdirSync(dir).filter(f => !EXCLUDE.has(f)).sort();
  items.forEach((item, index) => {
    const fullPath = path.join(dir, item);
    const isLast = index === items.length - 1;
    const connector = isLast ? '└── ' : '├── ';
    const newPrefix = prefix + (isLast ? '    ' : '│   ');
    console.log(prefix + connector + item);
    if (fs.statSync(fullPath).isDirectory()) {
      printTree(fullPath, newPrefix, depth + 1);
    }
  });
}

printTree('.');

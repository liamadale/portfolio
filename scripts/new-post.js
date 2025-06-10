#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const [title, slugArg] = process.argv.slice(2);
if (!title) {
  console.error('Usage: npm run new-post "Title" [slug]');
  process.exit(1);
}
const slug = slugArg || title.toLowerCase().replace(/\s+/g, '-');
const today = new Date().toISOString().split('T')[0];
const filePath = path.join('src/content/blog', `${slug}.md`);

if (fs.existsSync(filePath)) {
  console.error(`Error: ${filePath} already exists.`);
  process.exit(1);
}

const frontmatter = `---\ntitle: ${title}\npubDate: ${today}\n---\n\n`; // Add tags or category manually after creation

fs.writeFileSync(filePath, frontmatter);
console.log(`Created ${filePath}`);

try {
  execSync('npm run build', { stdio: 'inherit' });
} catch (err) {
  console.error('Build failed:', err);
}

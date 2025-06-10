## Portfolio Website

Created using the Astro framework.

## 🚀 Project Structure

Below is an expanded overview of the repository. The tree lists the most important directories and files while omitting heavy folders like `node_modules`.

```text
├── .gitignore
├── LICENSE
├── README.md
├── README.md.bak
├── astro.config.mjs
├── package-lock.json
├── package.json
├── portfolio preview.png
├── postcss.config.js
├── public
│   ├── favicon
│   │   ├── dark
│   │   ├── future
│   │   ├── halflife
│   │   └── light
│   └── images
│       └── cat.png
├── scripts
│   ├── new-post.js
│   └── tree.js
├── src
│   ├── assets
│   │   └── audio
│   ├── components
│   │   ├── About.astro
│   │   ├── BlogSection.astro
│   │   ├── Experience.astro
│   │   ├── Footer.astro
│   │   ├── Hero.astro
│   │   └── Projects.astro
│   ├── content
│   │   ├── blog
│   │   └── config.ts
│   ├── layouts
│   │   └── Layout.astro
│   ├── pages
│   │   ├── blog
│   │   └── index.astro
│   ├── plugins
│   │   └── remark-image-shortcode.js
│   ├── scripts
│   │   ├── scroll-spy.js
│   │   ├── spotlight.js
│   │   └── theme-toggle.js
│   └── styles
│       ├── about.css
│       ├── blog-posts.css
│       ├── blog.css
│       ├── experience.css
│       ├── global.css
│       ├── hero.css
│       ├── projects.css
│       └── themes.css
├── tailwind.config.js
└── tsconfig.json
```

### Directory Overview

- **public** - Static files that get served as-is. Icons, images and other assets live here.
- **scripts** - Utility scripts. `new-post.js` scaffolds blog posts and `tree.js` generates the directory tree.
- **src** - Source code for the site.
  - **assets** - Media resources such as audio files.
  - **components** - Reusable UI components written as Astro components.
  - **content** - Markdown blog posts and configuration for the content collection.
  - **layouts** - Layout components that wrap pages.
  - **pages** - Route definitions for the site including the blog index.
  - **plugins** - Custom plugins used by Astro, e.g. a remark plugin for image shortcodes.
  - **scripts** - Browser-side JavaScript utilities like scroll spy and theme toggling.
  - **styles** - Global and component-specific CSS files.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |


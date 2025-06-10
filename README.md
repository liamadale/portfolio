## Liam's Portfolio Website

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
├── postcss.config.js
├── public
│   ├── favicon
│   └── images
├── scripts
├── src
│   ├── assets
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
│   ├── scripts
│   └── styles
├── tailwind.config.js
└── tsconfig.json
```

### Directory Overview

- **public** - Static files that get served as-is. Icons, images and other assets live here.
- **scripts** - Utility scripts.
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


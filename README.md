# kushagrasingh.in — Portfolio template

A React + Vite + TailwindCSS portfolio template ready to be forked and customized.

Features
- Fast dev server with Vite
- TailwindCSS for utilities
- Responsive layout and a card deck component
- Email contact form powered by EmailJS
- Dark-first styling (site runs in dark mode by default)

Quick start
1. Install dependencies

   npm install

2. Start the dev server

   npm run dev

3. Build for production

   npm run build

4. Preview the production build locally

   npm run preview

Project structure
- public/ — static assets and JSON data used by the site
- src/
  - components/ — shared UI components (Navbar, etc.)
  - pages/ — routed pages (Home, Projects, Experience, Contact)
  - assets/ — local images used by components
  - App.jsx, main.jsx, index.css, App.css

Cards image guidance
- The card images used in the deck are best at 600x900 (portrait). Using this resolution provides optimal layout and appearance for the card deck.

Email form setup
- The contact form integrates with EmailJS. Provide these env vars in a local `.env` (or your hosting provider's environment settings):
  - VITE_EMAILJS_SERVICE_ID
  - VITE_EMAILJS_TEMPLATE_ID
  - VITE_EMAILJS_PUBLIC_KEY

Customization
- Replace `public/projects.json` and `public/experience.json` to update content.
- Swap images in `public/` and `src/assets/`.
- Tailwind utility classes are used throughout — adjust classes in JSX files to change spacing/colors/layout.

Notes about theme
- This repository is simplified to a dark-first site. Light-mode logic and the theme toggle were removed. If you want light-mode, reintroduce a ThemeContext and update `index.css` variables.

Contributing
- Fork and submit PRs if you'd like to contribute improvements.

License
- No license provided. Check with the original author for licensing preferences.

# ES Learning

Production website for ES Learning, built from the Figma home frame with Next.js, TypeScript, and Tailwind CSS.

## Run

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run lint
npx tsc --noEmit
npm run build
```

Raster source files live in `public/assets/source`. Optimized WebP files are generated with:

```bash
npm run optimize:images
```

## Notes

- Design tokens are in `src/app/globle.css`.
- Component styles are in `src/app/style.css`.
- Official GSAP SplitText is a Club plugin and is not included in the public `gsap` package. Line-by-line text reveals use a local splitter with GSAP and ScrollTrigger.
- Lenis smooth scrolling is disabled when the visitor prefers reduced motion.

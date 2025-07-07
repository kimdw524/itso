# postcss-hover-fallback

A **PostCSS plugin** that adds touch-friendly fallbacks for `:hover` styles.

- Automatically maps :hover styles to :active on mobile (coarse pointer) devices.
- No need to manually write media queries every time.

## Example

### Before

```css
.button:hover {
  background: blue;
}
```

### After

```css
@media (hover: hover) and (pointer: fine) {
  .button:hover {
    background: blue;
  }
}

@media (pointer: coarse) {
  .button:active {
    background: blue;
  }
}
```

## Installation (not published yet)

```bash
pnpm add -D postcss-hover-fallback
```

## Usage

Create a `postcss.config.json` file in your project root and add the following:

```json
{
  "plugins": ["postcss-hover-fallback"]
}
```

- If you're using Next.js, please refer to [Next.js PostCSS Configuring](https://nextjs.org/docs/pages/building-your-application/configuring/post-css).

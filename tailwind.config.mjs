/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Montserrat", "ui-monospace", "system-ui", "sans-serif"],
        serif: ["Playfair", "ui-serif", "Georgia", "serif"],
      },
      lineHeight: {
        "extra-loose": "2.5",
      },
    },
  },
  plugins: [],
}

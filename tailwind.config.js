module.exports = {
  mode: "jit",
  purge: ["./layouts/**/*.html", "./content/**/*.{js,jsx,ts,tsx,html,md}"],

  content: ["content/**/*.md", "layouts/**/*.html"],
  theme: {
    extend: {},
  },
  plugins: [],
};

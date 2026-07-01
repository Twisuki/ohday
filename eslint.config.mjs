import antfu from "@antfu/eslint-config";

export default antfu({
  type: "lib",
  typescript: true,
  stylistic: {
    quotes: "double",
    semi: true,
  },
  formatters: {
    markdown: true,
  },
});

const { addDynamicIconSelectors } = require('@iconify/tailwind')

module.exports = {
  // 从以下文件查找用到的样式
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx,vue}',
  ],
  theme: {
    extend: {
      // 扩充 TailwindCSS 没有包含的样式
    },
  },
  plugins: [
    addDynamicIconSelectors(),
    require('daisyui'),
    require("tailwindcss-animate"),
  ],
}
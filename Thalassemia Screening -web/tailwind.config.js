/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './index.html', // 原生 HTML
        './src/**/*.{vue,js,ts,jsx,tsx}' // Vue
    ],
    theme: {
        extend: {
            colors: {
                'custom-teal': '#006263',// 自定义颜色
                'custom-teal-dark': '#003C3D', // 更深两个度
            },
        }
    }
};

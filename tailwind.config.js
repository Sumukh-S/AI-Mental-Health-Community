/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
        "./public/index.html"
    ],
    theme: {
        extend: {
            animation: {
                'gradient': 'gradient 15s ease infinite',
            },
            keyframes: {
                gradient: {
                    '0%, 100%': {
                        'background-size': '400% 400%',
                        'background-position': '0% 50%'
                    },
                    '50%': {
                        'background-size': '400% 400%',
                        'background-position': '100% 50%'
                    },
                },
            },
        },
    },
    plugins: [
        require('@tailwindcss/forms'),
        require('tailwind-scrollbar'),
    ],
} 
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        //Criamos um objeto "theme" para agrupar nossas cores mutáveis
        theme: {
          bg: "var(--bck-color)",
          surface: "var(--surface-color)",
          text: "var(--text-color)",
          primary: "var(--primary-color)",
          alert: "var(--alert-color)",
        },
      },
    },
  },
  plugins: [],
};

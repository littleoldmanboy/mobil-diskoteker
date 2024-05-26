/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./app/**/*.{js,jsx}",
    "./src/**/*.{js,jsx}",
    "./src/slices/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      height: {
        "svh-minus-52": "calc(100vh - 52px)",
      },
      colors: {
        darkGray: "#1D1E20", // Custom gray
        purpleIsh: "#7878FF", // Custom purple
        greenIsh: "#85FFCD", // Custom green
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      animation: {
        one: "one 10s infinite ease-in-out",
        two: "two 10s infinite ease-in-out",
        three: "three 10s infinite ease-in-out",
        four: "four 10s infinite ease-in-out",
        five: "five 10s infinite ease-in-out",
        six: "six 10s infinite ease-in-out",
      },
      keyframes: {
        one: {
          "0%": { left: "-64px", top: "176px" },
          "20%": { left: "-100px", top: "160px" },
          "50%": { left: "-80px", top: "140px" },
          "80%": { left: "-40px", top: "190px" },
          "100%": { left: "-64px", top: "176px" },
        },
        two: {
          "0%": { right: "-64px", top: "176px" },
          "25%": { right: "-40px", top: "140px" },
          "55%": { right: "-80px", top: "190px" },
          "75%": { right: "-100px", top: "160px" },
          "100%": { right: "-64px", top: "176px" },
        },
        three: {
          "0%": { left: "50%", top: "384px" },
          "30%": { left: "45%", top: "360px" },
          "50%": { left: "55%", top: "370px" },
          "70%": { left: "45%", top: "390px" },
          "100%": { left: "50%", top: "384px" },
        },
        four: {
          "0%": { left: "-64px", top: "112px" },
          "20%": { left: "-100px", top: "112px" },
          "50%": { left: "-80px", top: "120px" },
          "80%": { left: "-40px", top: "120px" },
          "100%": { left: "-64px", top: "112px" },
        },
        five: {
          "0%": { right: "-64px", top: "112px" },
          "25%": { right: "-40px", top: "120px" },
          "55%": { right: "-80px", top: "112px" },
          "75%": { right: "-100px", top: "120px" },
          "100%": { right: "-64px", top: "112px" },
        },
        six: {
          "0%": { left: "50%", top: "240px" },
          "30%": { left: "45%", top: "230px" },
          "50%": { left: "55%", top: "250px" },
          "70%": { left: "45%", top: "235px" },
          "100%": { left: "50%", top: "240px" },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

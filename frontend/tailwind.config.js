import daisyui from "daisyui";
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      Animation: {
        border: "border 4s linear infinite",
      },
      keyframes: {
        border: {
          to: {"--border-angle": "360deg"}
        }
      }
    },
  },
  plugins: [daisyui],
};

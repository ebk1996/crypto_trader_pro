// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // These paths should point to all of your project's files
    // that contain Tailwind class names.
    // For a React app, this typically includes .js, .jsx, .ts, .tsx files.
    // Adjust this path based on your project structure.
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
  ],
  theme: {
    extend: {
      // Extend Tailwind's default color palette with custom colors
      colors: {
        // Define custom shades for indigo (used in the original dashboard)
        // These are examples; you can adjust them to match the exact shades
        // if your design uses specific hex values not covered by default.
        indigo: {
          '400': '#818CF8', // Used for main dashboard heading
          '500': '#6366F1', // Used for focus rings, some buttons
          '600': '#4F46E5', // Used for primary buttons (e.g., 1D timeframe)
          '700': '#4338CA', // Darker indigo for hover states
        },
        // Define custom shades for gray (used extensively in the original dark theme)
        gray: {
          '100': '#F3F4F6', // Lightest gray (for text on dark background, if needed)
          '200': '#E5E7EB',
          '300': '#D1D5DB',
          '400': '#9CA3AF', // Used for placeholder text, some labels
          '500': '#6B7280',
          '600': '#4B5563', // Used for input backgrounds, some card backgrounds
          '700': '#374151', // Used for card backgrounds, some borders
          '800': '#1F2937', // Main background for dashboard sections
          '900': '#111827', // Overall background of the application
        },
        // Other colors used in the original design
        green: {
          '400': '#4ADE80', // Used for icons, success messages
          '600': '#16A34A', // Used for buy button, success messages background
          '700': '#15803D', // Darker green for hover states
        },
        red: {
          '400': '#F87171', // Used for error text
          '500': '#EF4444', // Used for error borders
          '600': '#DC2626', // Used for sell button, error messages background
          '700': '#B91C1C', // Darker red for hover states
        },
        blue: {
          '400': '#60A5FA', // Used for graph icon
          '600': '#2563EB', // Used for info messages background
        },
        purple: {
          '400': '#C084FC', // Used for AI bot config icon
          '600': '#9333EA', // Used for save bot config button
          '700': '#7E22CE', // Darker purple for hover states
        },
        yellow: {
          '300': '#FDE047', // Used for warning text
          '400': '#FACC15', // Used for activity log icon
        },
      },
      fontFamily: {
        // Define 'inter' font family if you plan to use it via Google Fonts
        // or if it's locally available.
        // If not using a custom font, you can remove this.
        inter: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
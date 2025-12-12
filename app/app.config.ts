export default defineAppConfig({
  site: {
    name: "Feedback",
    description: "",
  },

  toaster: {
    position: "bottom-right" as const,
    duration: 5000,
    max: 5,
    expand: true,
  },
  theme: {
    radius: 0.25,
    blackAsPrimary: false,
  },
  ui: {
    colors: {
      primary: "emerald",
      neutral: "neutral",
    },
  },
});

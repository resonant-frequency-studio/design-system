import "../index.css"; // brings in Tailwind + tokens
import type { Preview } from "@storybook/react";

// Toolbar theme switcher
export const globalTypes = {
  theme: {
    name: "Theme",
    description: "Light/Dark theme",
    defaultValue: "light",
    toolbar: {
      icon: "paintbrush",
      items: [
        { value: "light", title: "Light" },
        { value: "dark",  title: "Dark"  }
      ]
    }
  }
};

// Set html[data-theme] based on toolbar selection
const withTheme = (Story, context) => {
  const theme = context.globals.theme ?? "light";
  if (typeof document !== "undefined") {
    document.documentElement.setAttribute("data-theme", theme);
  }
  return Story();
};

const preview: Preview = {
  decorators: [withTheme],
  parameters: {
    controls: { expanded: true }
  }
};

export default preview;

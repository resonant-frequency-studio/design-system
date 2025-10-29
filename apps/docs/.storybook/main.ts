import type { StorybookConfig } from "@storybook/react-vite";
import tailwind from "@tailwindcss/vite";

const config: StorybookConfig = {
  framework: "@storybook/react-vite",
  stories: [
    "../stories/**/*.stories.@(js|jsx|ts|tsx|mdx)"
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-actions"
  ],
  viteFinal: async (config) => {
    // Enable Tailwind v4 via the official Vite plugin
    config.plugins = config.plugins || [];
    config.plugins.push(tailwind());
    return config;
  },
};
export default config;

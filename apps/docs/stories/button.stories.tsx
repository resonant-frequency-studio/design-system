import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "@harmonic/ui/button";

const meta: Meta<typeof Button> = {
  title: "Atoms/Button",
  component: Button,
  args: { children: "Click me" },
  argTypes: {
    variant: { control: "select", options: ["primary", "secondary", "ghost"] },
    size: { control: "select", options: ["sm", "md"] }
  }
};
export default meta;

export const Primary: StoryObj<typeof Button> = {
  args: { variant: "primary" }
};

export const Secondary: StoryObj<typeof Button> = {
  args: { variant: "secondary" }
};

export const Ghost: StoryObj<typeof Button> = {
  args: { variant: "ghost" }
};

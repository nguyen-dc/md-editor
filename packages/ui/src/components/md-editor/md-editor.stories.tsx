import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import MdEditor from "./md-editor";

const sampleMarkdown = `# Hello

This is **bold** and *italic*.

## Section

- Item one
- Item two

1. First
2. Second
`;

const meta: Meta<typeof MdEditor> = {
  title: "UI/MdEditor",
  component: MdEditor,
  args: {
    initialMarkdown: sampleMarkdown,
    onChange: () => { }
  }
};

export default meta;

type Story = StoryObj<typeof MdEditor>;

export const Default: Story = {};

export const Empty: Story = {
  args: {
    initialMarkdown: ""
  }
};

export const WithLiveOutput: Story = {
  render: (args) => {
    const [markdown, setMarkdown] = useState(args.initialMarkdown ?? "");
    return (
      <div className="space-y-4">
        <MdEditor
          {...args}
          initialMarkdown={args.initialMarkdown}
          onChange={setMarkdown}
        />
        <pre className="rounded-md border border-gray-200 bg-gray-50 p-3 text-xs text-gray-800 whitespace-pre-wrap">
          {markdown || "(empty)"}
        </pre>
      </div>
    );
  },
  args: {
    initialMarkdown: sampleMarkdown
  }
};

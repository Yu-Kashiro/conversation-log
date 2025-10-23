import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { ConversationCard } from "./conversation-card";

const meta = {
  component: ConversationCard,
} satisfies Meta<typeof ConversationCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    conversation: {
      id: "1",
      targetPerson: "Sample Person",
      caseworkerId: "caseworker-1",
      content: "Sample conversation content",
      consultationDate: new Date(),
      contactMethod: "email" as const,
      createdBy: "user-1",
      updatedBy: null,
      deletedAt: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  },
};

export const 長い名前の相談者: Story = {
  args: {
    conversation: {
      id: "1",
      targetPerson:
        '"Sample Person"Sample Person""Sample Person""Sample Person""Sample Person""Sample Person""Sample Person""Sample Person""Sample Person""Sample Person""Sample Person""Sample Person""Sample Person""Sample Person""Sample Person""',
      caseworkerId: "caseworker-1",
      content: "Sample conversation content",
      consultationDate: new Date("2025-10-14T06:06:41.090Z"),
      contactMethod: "email",
      createdBy: "user-1",
      updatedBy: null,
      deletedAt: null,
      createdAt: new Date("2025-10-14T06:06:41.090Z"),
      updatedAt: new Date("2025-10-14T06:06:41.090Z"),
    },
  },
};

export const 相談内容が長いパターン: Story = {
  args: {
    conversation: {
      id: "1",
      targetPerson: "Sample Person",
      caseworkerId: "caseworker-1",
      content:
        '"contentがすごい長いパターン"contentがすごい長いパターン""contentがすごい長いパターン""contentがすごい長いパターン""contentがすごい長いパターン""contentがすごい長いパターン""contentがすごい長いパターン""contentがすごい長いパターン""contentがすごい長いパターン""contentがすごい長いパターン""contentがすごい長いパターン""contentがすごい長いパターン""contentがすごい長いパターン""contentがすごい長いパターン""contentがすごい長いパターン""contentがすごい長いパターン""contentがすごい長いパターン""contentがすごい長いパターン""contentがすごい長いパターン""contentがすごい長いパターン""contentがすごい長いパターン""contentがすごい長いパターン""contentがすごい長いパターン""contentがすごい長いパターン""contentがすごい長いパターン""contentがすごい長いパターン""contentがすごい長いパターン""contentがすごい長いパターン""contentがすごい長いパターン""contentがすごい長いパターン""contentがすごい長いパターン""contentがすごい長いパターン""contentがすごい長いパターン""contentがすごい長いパターン""contentがすごい長いパターン""contentがすごい長いパターン""contentがすごい長いパターン""contentがすごい長いパターン""contentがすごい長いパターン""contentがすごい長いパターン""contentがすごい長いパターン""contentがすごい長いパターン""contentがすごい長いパターン""contentがすごい長いパターン""contentがすごい長いパターン""contentがすごい長いパターン""contentがすごい長いパターン""',
      consultationDate: new Date("2025-10-14T06:12:52.659Z"),
      contactMethod: "email",
      createdBy: "user-1",
      updatedBy: null,
      deletedAt: null,
      createdAt: new Date("2025-10-14T06:12:52.659Z"),
      updatedAt: new Date("2025-10-14T06:12:52.659Z"),
    },
  },
};

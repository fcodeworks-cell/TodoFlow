export type Tag = "urgent" | "work" | "personal" | "health";

export type Todo = {
  id: string;
  text: string;
  tag: Tag;
  completed: boolean;
  createdAt: Date;
  entering?: boolean;
  deleting?: boolean;
};

"use client";
import { useEffect, useState } from "react";
import { Todo, Tag } from "@/lib/todoTypes";

const STORAGE_KEY = "todos";

export function useTodos() {
  const [todo, setTodo] = useState<Todo[]>(() => {
    if (typeof window === "undefined") return [];

    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  });
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todo));
  }, [todo]);

  function addTodo(text: string, tag: Tag) {
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      text: text,
      tag: tag,
      completed: false,
      createdAt: new Date(),
      entering: true,
    };

    setTodo((prev) => [...prev, newTodo]);

    setTimeout(() => {
      setTodo((prev) =>
        prev.map((x) => (x.id === newTodo.id ? { ...x, entering: false } : x)),
      );
    }, 300);
  }

  function deleteTodo(id: string) {
    setTodo((prev) =>
      prev.map((x) => (x.id === id ? { ...x, deleting: true } : x)),
    );

    setTimeout(() => {
      setTodo((prev) => prev.filter((x) => x.id !== id));
    }, 1000);
  }

  function toggleTodo(id: string) {
    setTodo((prev) =>
      prev.map((x) => (x.id === id ? { ...x, completed: !x.completed } : x)),
    );
  }

  function updateTodo(id: string, text: string, tag: Tag) {
    setTodo((prev) => prev.map((x) => (x.id === id ? { ...x, text, tag } : x)));
  }

  return { todo, addTodo, deleteTodo, toggleTodo, updateTodo };
}

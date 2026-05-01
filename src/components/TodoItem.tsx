"use client";
import { Todo, Tag } from "@/lib/todoTypes";

const tagClassNames: Record<Tag, string> = {
  urgent: "tag-urgent",
  work: "tag-work",
  personal: "tag-personal",
  health: "tag-health",
};

type Props = {
  todo: Todo;
  onDeleteAction: (id: string) => void;
  onToggleAction: (id: string) => void;
  onEditAction: (todo: Todo) => void;
};

export default function TodoItem({
  todo,
  onDeleteAction,
  onToggleAction,
  onEditAction,
}: Props) {
  const tagClass = tagClassNames[todo.tag];

  return (
    <div
      style={{ boxShadow: tagClass }}
      className={`
         flex flex-col justify-between w-full shadow-slate-300/20  min-w-0 bg-zinc-900  shadow-inner rounded-r-lg  
        transition-all duration-700 ease-out
        ${
          todo.deleting
            ? "translate-x-full opacity-0 rotate-12 scale-90"
            : todo.entering
              ? "-translate-x-full opacity-0"
              : todo.completed
                ? "opacity-40"
                : "opacity-100"
        }
        ${!todo.completed ? "hover:bg-zinc-800" : ""}
      `}
    >
      <div className="relative flex items-center gap-4 md:gap-5 min-w-0 h-full pr-3">
        {/* colored left border bar */}
        <div
          className={` hidden md:block h-full w-3 shrink-0 rounded-l-lg ${tagClass}`}
        ></div>

        <input
          className="accent-lime-300 scale-140 cursor-pointer shrink-0 ml-3 md:ml-0"
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggleAction(todo.id)}
        />

        <div className="min-w-0 flex-1 flex items-center justify-between py-3">
          <div className="flex flex-col min-w-0 gap-2">
            <h1
              className={`${todo.completed ? "line-through" : ""} wrap-break-word  min-w-0  w-full`}
            >
              {todo.text}
            </h1>
            <span className="text-xs text-zinc-500">
              {new Date(todo.createdAt).toLocaleString(undefined, {
                month: "short",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
            <span
              className={`hidden md:inline w-14 py-1 text-[10px] ${tagClass} text-center rounded-full shrink-0`}
            >
              {todo.tag}
            </span>
          </div>
          <button
            className="cursor-pointer shrink-0"
            onClick={() => onDeleteAction(todo.id)}
          >
            🗑️
          </button>
        </div>

        <button
          onClick={() => onEditAction(todo)}
          className="cursor-pointer shrink-0"
        >
          🖊️
        </button>
      </div>

      {/* bottom banner - mobile only */}
      <div
        className={`md:hidden flex justify-center items-center h-4 w-full ${tagClass} text-center rounded-md text-sm`}
      >
        {todo.tag}
      </div>
    </div>
  );
}

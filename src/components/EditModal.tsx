"use client";

import { Tag, Todo } from "@/lib/todoTypes";
import { Canvas } from "@react-three/fiber";
import { Sparkles } from "@react-three/drei";
const tagOptions: Tag[] = ["work", "personal", "health", "urgent"];

type Props = {
  editingTodo: Todo | null;
  setEditingTodoAction: (t: Todo | null) => void;
  editValue: string;
  setEditValueAction: (v: string) => void;
  editTag: Tag | "";
  setEditTagAction: (t: Tag | "") => void;
  onSaveAction: () => void;
};

export default function EditModal({
  editingTodo,
  setEditingTodoAction,
  editValue,
  setEditValueAction,
  editTag,
  setEditTagAction,
  onSaveAction,
}: Props) {
  if (!editingTodo) return null;

  return (
    <div className="absolute inset-0 flex justify-center items-center backdrop-blur-2xl ">
      <div className="absolute inset-0 -z-10  ">
        <Canvas className="w-full h-full" camera={{ position: [0, 0, 10] }}>
          <Sparkles
            count={120}
            scale={12}
            noise={50}
            size={1.1}
            color={"#FFCA28"}
          />
        </Canvas>
      </div>
      <div className="flex flex-col justify-center items-center  w-125 h-125 px-5 ">
        <h2 className="bg-linear-90 from-green-800 via-lime-300 to-lime-800 text-transparent bg-clip-text mb-20 text-4xl font-extrabold">
          Update Task
        </h2>

        {/* Text Input */}
        <div className="flex flex-col gap-0 w-full">
          <h3 className="text-base text-lime-300 ">New Task:</h3>

          <input
            value={editValue}
            onChange={(e) => setEditValueAction(e.target.value)}
            className="shadow-zinc-600/40 shadow-inner  my-5 rounded-full px-4 py-2 w-full text-lg bg-radial from-zinc-900 from-40% to-zinc-950"
            placeholder="......."
          />
        </div>

        {/* Tag Select */}
        <div className="flex flex-col gap-2 w-full">
          <h3 className="text-base text-lime-300">Select Tag:</h3>

          <select
            value={editTag}
            onChange={(e) => setEditTagAction(e.target.value as Tag)}
            className="text-lg shadow-lime-300/40 shadow-inner rounded-2xl px-4 py-4 bg-radial from-zinc-900 from-40% to-zinc-950 my-3"
          >
            {tagOptions.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>

        {/* Buttons */}
        <div className="flex gap-5 my-8">
          <button
            onClick={onSaveAction}
            className="cursor-pointer text-lg bg-linear-40 from-lime-500 via-green-950 to-lime-500 px-4 py-1 font-bold rounded-full"
          >
            ✔️ Confirm
          </button>

          <button
            onClick={() => setEditingTodoAction(null)}
            className="cursor-pointer text-lg bg-linear-40 from-red-500 via-red-950 to-red-500 px-4 py-1 font-bold rounded-full"
          >
            ❌ Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

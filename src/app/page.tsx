"use client";

import { useState, useRef } from "react";
import { useTodos } from "@/hooks/useTodos";
import TodoItem from "@/components/TodoItem";
import EditModal from "@/components/EditModal";
import { Tag, Todo } from "@/lib/todoTypes";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import { Canvas } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { Group } from "three";

const filterOptions = [
  "All",
  "Active",
  "Done",
  "Work",
  "Personal",
  "Health",
  "Urgent",
];

function RotatingStars() {
  const ref = useRef<Group>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (ref.current) {
      ref.current.rotation.x = Math.sin(t * 0.2) * 0.3;
      ref.current.rotation.y = t * 0.05;
    }
  });

  return (
    <group ref={ref}>
      <Stars
        radius={100}
        depth={50}
        count={1000}
        factor={4}
        saturation={0}
        fade
        speed={5}
      />
    </group>
  );
}

export default function Home() {
  const { todo, addTodo, deleteTodo, toggleTodo, updateTodo } = useTodos();

  const [inputValue, setInputValue] = useState("");
  const [tag, setTag] = useState<Tag | "">("");
  const [defaultTagSelected, setDefaultTagSelected] = useState("All");

  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  const [editValue, setEditValue] = useState("");
  const [editTag, setEditTag] = useState<Tag | "">("");

  function handleAdd() {
    if (!inputValue.trim() || !tag) return;
    addTodo(inputValue, tag);
    setInputValue("");
    setTag("");
  }

  function handleSave() {
    if (!editingTodo || !editValue.trim() || !editTag) return;

    updateTodo(editingTodo.id, editValue, editTag);

    setEditingTodo(null);
    setEditValue("");
    setEditTag("");
  }

  const filterTodo = todo.filter((x) => {
    if (defaultTagSelected === "All") return true;
    if (defaultTagSelected === "Active") return !x.completed;
    if (defaultTagSelected === "Done") return x.completed;
    return x.tag === defaultTagSelected.toLowerCase();
  });

  const doneCount = todo.filter((x) => x.completed).length;
  const progress = todo.length ? (doneCount / todo.length) * 100 : 0;

  return (
    <section className="relative flex flex-col justify-center items-center  w-full">
      <div className="fixed inset-0 -z-10">
        <Canvas camera={{ position: [0, 0, 10] }}>
          <RotatingStars />
        </Canvas>
      </div>
      <Navbar />
      <Image
        src="/banner.png"
        alt="vector"
        fill
        className="object-cover"
        loading="eager"
      />
      <div className="relative w-132 mt-12 ">
        <Image
          className="absolute -top-7 animate-pulse object-cover"
          src="/vector.png"
          alt="vector"
          width={500}
          height={500}
          loading="eager"
        />
      </div>
      <div className="flex flex-col items-center justify-center px-2 w-[70%] z-10">
        {/* HEADER */}
        <div className="flex flex-col gap-10 lg:flex-row lg:gap-0 my-7  justify-center items-center w-full">
          <div className="flex gap-10">
            <div className="flex flex-col items-center">
              <h1 className="text-6xl textStroke">{doneCount}</h1>
              <h1 className="text-slate-400">Done</h1>
            </div>

            <div className="flex flex-col items-center">
              <h1 className="text-6xl textStroke2">
                {todo.filter((x) => !x.completed).length}
              </h1>
              <h1 className="text-slate-400">Left</h1>
            </div>
          </div>
        </div>

        {/* PROGRESS */}
        <div className="relative h-3 w-full border border-zinc-800  rounded-full my-7">
          <div
            style={{ width: `${progress}%` }}
            className="absolute inset-0 bg-linear-to-r from-black to-lime-500 rounded-full transition-all duration-300 ease-in-out"
          />
        </div>

        {/* INPUT */}
        <div className="flex flex-col xl:flex-row gap-5 items-center justify-center w-full my-10">
          <input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="rounded-2xl text-lime-300 px-3 py-4 bg-radial from-zinc-900 from-50% to-zinc-950 w-full xl:w-1/2 shadow-zinc-600/40 shadow-inner"
            placeholder="New task…"
          />

          <select
            value={tag}
            onChange={(e) => setTag(e.target.value as Tag)}
            className="rounded-2xl px-4 text-gray-400 py-4 bg-radial from-zinc-900 from-40% to-zinc-950 shadow-inner shadow-zinc-600/40 w-full xl:w-52"
          >
            <option disabled value="">
              Select category
            </option>
            <option value="work">Work</option>
            <option value="personal">Personal</option>
            <option value="health">Health</option>
            <option value="urgent">Urgent</option>
          </select>

          <button
            onClick={handleAdd}
            className={`px-4 py-3 w-44 rounded-full text-nowrap text-white lg:self-center shrink-0 ${
              inputValue.trim() && tag
                ? "cursor-pointer bg-linear-210 from-lime-500 via-lime-950 to-lime-950 shadow-zinc-600/40 shadow-inner"
                : "cursor-not-allowed bg-linear-210 from-lime-500 via-lime-950 opacity-40"
            }`}
          >
            ✚ Add Todo
          </button>
        </div>
        {/* FILTERS */}
        <div className="flex flex-wrap justify-center items-center gap-3 ">
          {filterOptions.map((item) => (
            <button
              key={item}
              onClick={() => setDefaultTagSelected(item)}
              className={`cursor-pointer border border-lime-400/30 shadow-zinc-500/40 shadow-inner px-4 py-2 rounded-full mb-7 lg:my-7 text-sm 
${
  defaultTagSelected === item
    ? "bg-linear-120 from-lime-500 to bg-lime-950 via-lime-950 text-white "
    : ""
}`}
            >
              {item}
            </button>
          ))}
        </div>

        {/* LIST */}
        <div className="grid grid-cols-1 sm:w-[80%] lg:w-full lg:grid-cols-2 2xl:grid-cols-3 gap-6">
          {filterTodo.map((x) => (
            <TodoItem
              key={x.id}
              todo={x}
              onDeleteAction={deleteTodo}
              onToggleAction={toggleTodo}
              onEditAction={(t) => {
                setEditingTodo(t);
                setEditValue(t.text);
                setEditTag(t.tag);
              }}
            />
          ))}
        </div>

        {/* MODAL */}
        <EditModal
          editingTodo={editingTodo}
          setEditingTodoAction={setEditingTodo}
          editValue={editValue}
          setEditValueAction={setEditValue}
          editTag={editTag}
          setEditTagAction={setEditTag}
          onSaveAction={handleSave}
        />
      </div>
      <footer className="animate-pulse pt-16 pb-4 bg-linear-120 from-lime-500 via-white to bg-lime-500 tracking-widest bg-clip-text text-transparent"
       
      >
        © {new Date().getFullYear()} fcodeworks. Built with Next.js..
      </footer>
    </section>
  );
}

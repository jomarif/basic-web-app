import React, { useState } from 'react';

interface TodoBlocksProps {
    index: number;
    todo: string;
    dragTask: React.MutableRefObject<number>;
    draggedOverTask: React.MutableRefObject<number>;
    handleSort: any;
    handleDelete: any;
}

const TodoBlocks: React.FC<TodoBlocksProps> = ({
    index,
    todo,
    dragTask,
    draggedOverTask,
    handleSort,
    handleDelete
}) => {
    const [isDone, setIsDone] = useState(false);

    return (
        <div
            key={index}
            className="my-2 flex w-2/5 min-w-[350px] items-center justify-between gap-4 rounded-2xl border-4 border-neutral-700 bg-neutral-800 p-4 text-2xl font-bold text-neutral-50 shadow-2xl"
            draggable
            onDragStart={() => (dragTask.current = index)}
            onDragEnter={() => (draggedOverTask.current = index)}
            onDragEnd={handleSort}
        >
            <div
                className={`h-[20px] w-[20px] rounded border border-white ${isDone ? 'bg-green-700' : ''}`}
                onClick={() => {
                    setIsDone(!isDone);
                }}
            ></div>
            <div
                className={`flex-1 break-all text-center ${isDone ? 'line-through' : ''}`}
            >
                {todo}
            </div>
            <button
                onClick={() => handleDelete(index)}
                className="rounded-xl border-2 border-neutral-600 bg-neutral-700 p-3 text-2xl hover:bg-red-700"
            >
                Delete
            </button>
        </div>
    );
};

export default TodoBlocks;

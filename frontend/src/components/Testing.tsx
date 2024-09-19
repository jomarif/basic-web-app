import { useState, useRef } from 'react';

const defaultPeople = [
    { id: 1, task: '210 - Phase 0' },
    { id: 2, task: '401 - Watch Lecture' },
    { id: 3, task: '210 - Watch lecture' }
];

const Testing = () => {
    const [todo, setTodo] = useState(defaultPeople);
    const dragTask = useRef<number>(0);
    const draggedOverTask = useRef<number>(0);

    function handleSort() {
        const todoClone = [...todo];
        const temp = todoClone[dragTask.current];
        todoClone[dragTask.current] = todoClone[draggedOverTask.current];
        todoClone[draggedOverTask.current] = temp;
        setTodo(todoClone);
    }

    return (
        <div className="flex min-h-screen w-full flex-col items-center space-y-4 border-8 border-blue-300">
            <h1 className="text-xl font-bold text-black">List</h1>
            {todo.map((task, index) => (
                <div
                    className="relative flex space-x-3 rounded border bg-gray-100 p-2"
                    draggable
                    onDragStart={() => (dragTask.current = index)}
                    onDragEnter={() => (draggedOverTask.current = index)}
                    onDragEnd={handleSort}
                    onDragOver={(e) => e.preventDefault()}
                >
                    <p>{task.task}</p>
                </div>
            ))}
            <h1 className="text-2xl text-black">
                Dragged Task: {dragTask.current} Dragged Over:{' '}
                {draggedOverTask.current}
            </h1>
        </div>
    );
};

export default Testing;

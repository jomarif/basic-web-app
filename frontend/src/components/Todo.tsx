import React, { useEffect, useState, useRef } from 'react';
import TodoBlocks from './TodoBlocks';

const Todo = () => {
    const [todoList, setTodoList] = useState<string[]>([]); // We need to tell react that it is a list of string, otherwise we will get errors
    const [textInput, setTextInput] = useState('');
    const [isInit, setIsInit] = useState(false); // This was needed because otherwise the local storage would update at first initialize as well. I thought before it would run for sure after the first useeffect but i guess not
    const dragTask = useRef<number>(0);
    const draggedOverTask = useRef<number>(0);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); /* Prevent refresh because forms on default refreshes the page after but we don't really want that for react - no use for it*/
        if (textInput) {
            setTodoList((prevTodoList) => [...prevTodoList, textInput]);
            setTextInput('');
        }
    };

    const handleDelete = (index: number) => {
        const newTodos = [...todoList];
        newTodos.splice(index, 1);
        setTodoList(newTodos);
    };

    useEffect(() => {
        const data = localStorage.getItem('my-todo-list');
        if (data) {
            setTodoList(JSON.parse(data));
        }
        setIsInit(true);
    }, []);

    useEffect(() => {
        if (isInit) {
            localStorage.setItem('my-todo-list', JSON.stringify(todoList));
        }
    }, [todoList, isInit]);

    function handleSort() {
        const todoListCopy = [...todoList];
        const temp = todoListCopy[dragTask.current];
        todoListCopy[dragTask.current] = todoListCopy[draggedOverTask.current];
        todoListCopy[draggedOverTask.current] = temp;

        setTodoList(todoListCopy);
    }

    const todoDiv = todoList.map((todo, index) => (
        <TodoBlocks
            index={index}
            todo={todo}
            dragTask={dragTask}
            draggedOverTask={draggedOverTask}
            handleSort={handleSort}
            handleDelete={handleDelete}
        />
    ));

    return (
        <div className="flex min-h-screen w-full flex-col items-center border-4 border-neutral-700 bg-neutral-900 p-2">
            <h1>Todo List</h1>
            <br />
            <form
                className="mb-3 flex w-1/2 min-w-[300px] justify-center gap-2"
                onSubmit={handleSubmit}
            >
                <input
                    className="w-1/2 rounded-xl border-2 border-neutral-700 bg-neutral-800 p-4 text-2xl text-white focus:outline-none"
                    type="text"
                    value={textInput}
                    onChange={(e) => setTextInput(e.target.value)}
                />
                <input
                    className="rounded-xl border-2 border-neutral-700 bg-neutral-800 p-2 text-2xl font-bold text-white hover:bg-green-700"
                    type="submit"
                    value="Add"
                />
            </form>
            {todoDiv}
        </div>
    );
};

export default Todo;

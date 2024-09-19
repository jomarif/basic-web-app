import React, { useEffect, useState } from 'react';

const Todo = () => {
    const [todoList, setTodoList] = useState<string[]>([]); // We need to tell react that it is a list of string, otherwise we will get errors
    const [textInput, setTextInput] = useState('');
    const [isInit, setIsInit] = useState(false); // This was needed because otherwise the local storage would update at first initialize as well. I thought before it would run for sure after the first useeffect but i guess not

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

    const todoDiv = todoList.map((todo, index) => (
        <div
            key={index}
            className="my-2 flex w-2/5 min-w-[350px] items-center justify-between gap-4 rounded-3xl border-4 border-neutral-700 bg-neutral-800 p-4 text-3xl font-bold text-neutral-50 shadow-2xl"
        >
            <div className="flex-1 text-center">{todo}</div>
            <button
                onClick={() => handleDelete(index)}
                className="rounded-2xl border-2 border-neutral-600 bg-neutral-700 p-3 text-2xl hover:bg-red-700"
            >
                Delete
            </button>
        </div>
    ));

    return (
        <div className="flex h-screen w-full flex-col items-center border-4 border-neutral-700 bg-neutral-900 p-2">
            <h1>Todo List</h1>
            <br />
            <form
                className="mb-3 flex w-1/2 min-w-[300px] justify-center"
                onSubmit={handleSubmit}
            >
                <input
                    className="w-1/2 rounded-xl border-2 border-neutral-700 bg-neutral-800 p-4 text-2xl text-white focus:outline-none"
                    type="text"
                    value={textInput}
                    onChange={(e) => setTextInput(e.target.value)}
                />
                <input
                    className="ml-2 rounded-xl border-2 border-neutral-700 bg-neutral-800 p-2 text-2xl font-bold text-white"
                    type="submit"
                    value="Add"
                />
            </form>
            {todoDiv}
        </div>
    );
};

export default Todo;

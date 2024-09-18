import React, { useEffect, useState } from 'react';

const Todo = () => {

    const [todoList, setTodoList] = useState<string[]>([]); // We need to tell react that it is a list of string, otherwise we will get errors
    const [textInput, setTextInput] = useState('');
    const [isInit, setIsInit] = useState(false); // This was needed because otherwise the local storage would update at first initialize as well. I thought before it would run for sure after the first useeffect but i guess not

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); /* Prevent refresh because forms on default refreshes the page after but we don't really want that for react - no use for it*/
        setTodoList(prevTodoList => [...prevTodoList, textInput]);
        setTextInput('');
    };

    const handleDelete = (index: number) => {
        const newTodos = [...todoList];
        newTodos.splice(index, 1);
        setTodoList(newTodos);
    }

    useEffect(() => {
        const data = localStorage.getItem('my-todo-list');
        if (data) {
            setTodoList(JSON.parse(data));
        };   
        setIsInit(true);
    }, [])
    

    useEffect(() => {
        if (isInit) {
            localStorage.setItem('my-todo-list', JSON.stringify(todoList));
        }
    }, [todoList, isInit])

    const todoDiv = todoList.map((todo, index) => (
            <div key={index} className='bg-gray-200 p-4 shadow-2xl rounded-3xl border-black border-4 w-2/5 min-w-[350px] my-2 flex gap-4 font-bold text-3xl justify-between items-center'>
                <div className='text-center flex-1'>{todo}</div>
                <button onClick={() => handleDelete(index)} className='bg-red-500 shadow-2xl italic rounded-2xl border-black border-2 p-3 text-2xl'>Delete</button>
            </div>
        ));

    return (
        <div className='flex flex-col items-center w-full h-screen border-4 p-2 bg-gradient-to-r from-slate-900 to-slate-500'>
            <h1>Todo List</h1>
            <form className='w-1/2 min-w-[300px] flex mb-3 justify-center' onSubmit={handleSubmit}>
                <input className='border-black w-1/2 border-2 p-4 rounded-xl focus:outline-none text-2xl' type="text" value={textInput} onChange={(e) => setTextInput(e.target.value)}/>
                <input className='border-black border-2 bg-gray-100 ml-2 rounded-xl p-2 font-bold text-2xl' type="submit" value="Add" />
            </form>
            {todoDiv}

        </div>
    )
};

export default Todo;

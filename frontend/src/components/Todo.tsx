import React, { useState } from 'react';

const Todo = () => {

    const [todoList, setTodoList] = useState<string[]>([]); // We need to tell react that it is a list of string, otherwise we will get errors
    const [textInput, setTextInput] = useState('');
    
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); /* Prevent refresh because forms on default refreshes the page after but we don't really want that for react*/
        setTodoList(prevTodoList => [...prevTodoList, textInput]);
        setTextInput('');
    };

    const handleDelete = (index: number) => {
        const newTodos = [...todoList];
        newTodos.splice(index, 1);
        setTodoList(newTodos);
    }

    const todoDiv = todoList.map((todo, index) => (
            <div key={index} className='bg-blue-200 p-4 rounded-full border-black border-4 my-2 flex gap-4 h-20 w-[500px] font-bold text-2xl justify-between items-center'>
                <div className='text-center flex-1'>{todo}</div>
                <button onClick={() => handleDelete(index)} className='bg-green-200 rounded-full border-black border-2 p-2 w-40'>Delete</button>
            </div>
        ));

    return (
        <div className='flex flex-col items-center border-red-300 border-4 bg-red-200 w-1/4 p-2'>
            <h1>Todo App</h1>
            <h2>What Needs to be done?</h2>
            <form onSubmit={handleSubmit}>
                <input className='border-black border-2 h-10 rounded-full p-4' type="text" value={textInput} onChange={(e) => setTextInput(e.target.value)}/>
                <input className='border-black border-2 bg-gray-100 mx-2 px-2' type="submit" value="Add" />
            </form>
            {todoDiv}
        </div>
    )
};

export default Todo;

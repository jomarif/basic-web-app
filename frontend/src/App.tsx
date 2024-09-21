import { RouterProvider, Routes, Route } from 'react-router-dom';
import Todo from './components/Todo';
import Router from './Router';
import Kanban from './components/Kanban';

function App() {
    return (
        <div>
            <RouterProvider router={Router} />
        </div>
    );
}

export default App;

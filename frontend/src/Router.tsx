import React from 'react';
import {
    createBrowserRouter,
    createRoutesFromElements,
    Route
} from 'react-router-dom';
import Todo from './components/Todo';
import Kanban from './components/Kanban';

const Router = createBrowserRouter(
    createRoutesFromElements(
        <Route>
            <Route path="todo" element={<Todo />} />
            <Route path="kanban" element={<Kanban />} />
        </Route>
    )
);

export default Router;

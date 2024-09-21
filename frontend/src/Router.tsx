import {
    createBrowserRouter,
    createRoutesFromElements,
    Route
} from 'react-router-dom';
import Todo from './components/Todo';
import Kanban from './components/Kanban';
import Navbar from './Navbar';

const Router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<Navbar />}>
            <Route index element={<Todo />} />
            <Route path="kanban" element={<Kanban />} />
        </Route>
    )
);

export default Router;

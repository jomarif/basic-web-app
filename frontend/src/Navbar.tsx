import { NavLink, Outlet } from 'react-router-dom';

const Navbar = () => {
    return (
        <div>
            <div className="flex h-[80px] items-center justify-evenly border-b-4 border-neutral-500 bg-neutral-700 text-3xl font-bold">
                <NavLink to="/">Todo List</NavLink>
                <NavLink to="kanban">Kanban Board</NavLink>
            </div>

            <main>
                <Outlet />
            </main>
        </div>
    );
};

export default Navbar;

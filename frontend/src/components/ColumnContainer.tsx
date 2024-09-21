import { SortableContext, useSortable } from '@dnd-kit/sortable';
import TrashIcon from '../icons/TrashIcon';
import { Column, Id, Task } from '../types';
import { CSS } from '@dnd-kit/utilities';
import { useMemo, useState } from 'react';
import PlusIcon from '../icons/PlusIcon';
import TaskCard from './TaskCard';

interface Props {
    column: Column;
    deleteColumn: (id: Id) => void;
    updateColumn: (id: Id, title: string) => void;
    createTask: (columnId: Id) => void;
    deleteTask: (id: Id) => void;
    tasks: Task[];
    updateTask: (id: Id, content: string) => void;
}

const ColumnContainer = (props: Props) => {
    const {
        column,
        deleteColumn,
        updateColumn,
        createTask,
        tasks,
        deleteTask,
        updateTask
    } = props;

    const [editMode, setEditMode] = useState(false);

    const tasksIds = useMemo(() => {
        return tasks.map((task) => task.id);
    }, [tasks]);

    const {
        setNodeRef,
        attributes,
        listeners,
        transform,
        transition,
        isDragging
    } = useSortable({
        id: column.id,
        data: {
            type: 'Column',
            column
        },
        disabled: editMode
    });

    const style = {
        transition,
        transform: CSS.Transform.toString(transform)
    };

    if (isDragging) {
        return (
            <div
                ref={setNodeRef}
                style={style}
                className="flex h-[500px] max-h-[500px] w-[350px] flex-col rounded-md border-2 border-rose-500 bg-columnBackgroundColor opacity-40"
            ></div>
        );
    }

    return (
        <div
            ref={setNodeRef}
            style={style}
            className="flex h-[500px] max-h-[500px] w-[350px] flex-col rounded-md bg-columnBackgroundColor"
        >
            {/* Column Title */}
            <div
                {...attributes}
                {...listeners}
                onClick={() => {
                    setEditMode(true);
                }}
                className="text-md flex h-[60px] cursor-grab items-center justify-between rounded-md rounded-b-none border-4 border-columnBackgroundColor bg-mainBackgroundColor p-3 font-bold"
            >
                <div className="flex gap-2">
                    <div className="flex items-center justify-center rounded-full bg-columnBackgroundColor px-2 py-1 text-sm">
                        0
                    </div>
                    {!editMode && column.title}
                    {editMode && (
                        <input
                            className="rounded border bg-black px-2 outline-none focus:border-rose-500"
                            value={column.title}
                            onChange={(e) =>
                                updateColumn(column.id, e.target.value)
                            }
                            autoFocus
                            onBlur={() => setEditMode(false)}
                            onKeyDown={(e) => {
                                if (e.key !== 'Enter') return;
                                setEditMode(false);
                            }}
                        />
                    )}
                </div>
                <button
                    onClick={() => {
                        deleteColumn(column.id);
                    }}
                    className="rounded stroke-gray-500 px-1 py-2 hover:bg-columnBackgroundColor hover:stroke-white"
                >
                    <TrashIcon />
                </button>
            </div>

            {/* Column Task Container */}
            <div className="flex flex-grow flex-col gap-4 overflow-y-auto overflow-x-hidden p-2">
                {tasks.map((task) => (
                    <SortableContext items={tasksIds}>
                        <TaskCard
                            key={task.id}
                            task={task}
                            deleteTask={deleteTask}
                            updateTask={updateTask}
                        />
                    </SortableContext>
                ))}
            </div>

            {/* Column Footer */}
            <button
                onClick={() => {
                    createTask(column.id);
                }}
                className="flex items-center gap-2 rounded-md border-2 border-columnBackgroundColor border-x-columnBackgroundColor p-4 hover:bg-mainBackgroundColor hover:text-rose-500 active:bg-black"
            >
                <PlusIcon />
                Add Task
            </button>
        </div>
    );
};

export default ColumnContainer;

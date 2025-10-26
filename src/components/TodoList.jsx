import TodoItem from './TodoItem.jsx';

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-10 text-center text-slate-500">
      <div className="mb-2 rounded-full bg-slate-100 px-3 py-1 text-xs font-medium">No tasks yet</div>
      <p className="text-sm">Add your first task to get started.</p>
    </div>
  );
}

function TodoList({ todos, onToggle, onDelete, onEdit }) {
  if (!todos.length) {
    return <EmptyState />;
  }

  return (
    <ul className="divide-y divide-slate-100">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </ul>
  );
}

export default TodoList;

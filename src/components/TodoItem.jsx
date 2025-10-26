import { useState } from 'react';
import { Check, Trash2 } from 'lucide-react';

function TodoItem({ todo, onToggle, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(todo.text);

  const handleSave = () => {
    const trimmed = draft.trim();
    if (trimmed && trimmed !== todo.text) {
      onEdit(todo.id, trimmed);
    }
    setIsEditing(false);
  };

  return (
    <li className="group flex items-center gap-3 rounded-lg border border-transparent px-3 py-2 transition hover:border-slate-200">
      <button
        onClick={() => onToggle(todo.id)}
        className={`relative grid h-5 w-5 place-items-center rounded border text-white ${
          todo.completed ? 'bg-emerald-500 border-emerald-500' : 'bg-white border-slate-300'
        }`}
        aria-label={todo.completed ? 'Mark as active' : 'Mark as completed'}
        title={todo.completed ? 'Mark as active' : 'Mark as completed'}
      >
        {todo.completed && <Check className="h-4 w-4" />}
      </button>

      {isEditing ? (
        <input
          autoFocus
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSave();
            if (e.key === 'Escape') setIsEditing(false);
          }}
          className="flex-1 rounded-md border border-slate-300 bg-white px-2 py-1 text-sm outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
        />
      ) : (
        <button
          onDoubleClick={() => setIsEditing(true)}
          onClick={() => setIsEditing(true)}
          className={`flex-1 text-left text-sm ${todo.completed ? 'text-slate-400 line-through' : ''}`}
          title="Click to edit"
        >
          {todo.text}
        </button>
      )}

      {isEditing ? (
        <div className="flex items-center gap-2">
          <button
            onClick={handleSave}
            className="rounded-md bg-slate-900 px-2.5 py-1 text-xs font-medium text-white hover:bg-slate-800"
          >
            Save
          </button>
          <button
            onClick={() => {
              setDraft(todo.text);
              setIsEditing(false);
            }}
            className="rounded-md border border-slate-300 px-2.5 py-1 text-xs font-medium hover:bg-slate-50"
          >
            Cancel
          </button>
        </div>
      ) : (
        <button
          onClick={() => onDelete(todo.id)}
          className="opacity-0 transition group-hover:opacity-100 text-slate-500 hover:text-red-600"
          aria-label="Delete task"
          title="Delete"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      )}
    </li>
  );
}

export default TodoItem;

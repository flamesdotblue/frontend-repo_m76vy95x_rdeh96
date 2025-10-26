import { useState } from 'react';
import { Plus } from 'lucide-react';

function TodoForm({ onAdd }) {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    onAdd(text);
    setText('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a new task..."
        className="flex-1 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
        aria-label="New task"
      />
      <button
        type="submit"
        className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-3.5 py-2 text-sm font-medium text-white shadow hover:bg-slate-800 active:bg-slate-900"
        aria-label="Add task"
      >
        <Plus className="h-4 w-4" />
        Add
      </button>
    </form>
  );
}

export default TodoForm;

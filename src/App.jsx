import { useEffect, useMemo, useState } from 'react';
import Header from './components/Header.jsx';
import TodoForm from './components/TodoForm.jsx';
import TodoList from './components/TodoList.jsx';
import TodoFooter from './components/TodoFooter.jsx';

function App() {
  const [todos, setTodos] = useState(() => {
    try {
      const raw = localStorage.getItem('todos');
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const remainingCount = useMemo(() => todos.filter(t => !t.completed).length, [todos]);

  const filteredTodos = useMemo(() => {
    if (filter === 'active') return todos.filter(t => !t.completed);
    if (filter === 'completed') return todos.filter(t => t.completed);
    return todos;
  }, [todos, filter]);

  const addTodo = (text) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    const newTodo = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
      text: trimmed,
      completed: false,
      createdAt: Date.now(),
    };
    setTodos(prev => [newTodo, ...prev]);
  };

  const toggleTodo = (id) => {
    setTodos(prev => prev.map(t => (t.id === id ? { ...t, completed: !t.completed } : t)));
  };

  const deleteTodo = (id) => {
    setTodos(prev => prev.filter(t => t.id !== id));
  };

  const editTodo = (id, newText) => {
    const trimmed = newText.trim();
    if (!trimmed) return;
    setTodos(prev => prev.map(t => (t.id === id ? { ...t, text: trimmed } : t)));
  };

  const clearCompleted = () => {
    setTodos(prev => prev.filter(t => !t.completed));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-100 text-slate-900">
      <div className="max-w-2xl mx-auto px-4 py-12">
        <Header />

        <div className="mt-6 rounded-xl border border-slate-200 bg-white/70 backdrop-blur shadow-sm">
          <div className="p-4 sm:p-6 border-b border-slate-200">
            <TodoForm onAdd={addTodo} />
          </div>

          <TodoList 
            todos={filteredTodos}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
            onEdit={editTodo}
          />

          <div className="p-4 sm:p-6 border-t border-slate-200">
            <TodoFooter 
              filter={filter}
              setFilter={setFilter}
              remainingCount={remainingCount}
              hasCompleted={todos.some(t => t.completed)}
              onClearCompleted={clearCompleted}
            />
          </div>
        </div>

        <p className="text-center text-xs text-slate-500 mt-6">Your tasks are saved in your browser.</p>
      </div>
    </div>
  );
}

export default App;

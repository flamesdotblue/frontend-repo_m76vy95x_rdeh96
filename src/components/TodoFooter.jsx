function FilterButton({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      className={`rounded-md px-3 py-1.5 text-sm font-medium transition ${
        active
          ? 'bg-slate-900 text-white shadow'
          : 'border border-slate-300 hover:bg-slate-50'
      }`}
    >
      {children}
    </button>
  );
}

function TodoFooter({ filter, setFilter, remainingCount, hasCompleted, onClearCompleted }) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="text-sm text-slate-600">
        {remainingCount} task{remainingCount === 1 ? '' : 's'} remaining
      </div>

      <div className="flex items-center gap-2">
        <FilterButton active={filter === 'all'} onClick={() => setFilter('all')}>All</FilterButton>
        <FilterButton active={filter === 'active'} onClick={() => setFilter('active')}>Active</FilterButton>
        <FilterButton active={filter === 'completed'} onClick={() => setFilter('completed')}>Completed</FilterButton>
      </div>

      <div className="text-right">
        <button
          disabled={!hasCompleted}
          onClick={onClearCompleted}
          className="text-sm font-medium text-slate-600 underline-offset-4 hover:underline disabled:cursor-not-allowed disabled:opacity-40"
        >
          Clear completed
        </button>
      </div>
    </div>
  );
}

export default TodoFooter;

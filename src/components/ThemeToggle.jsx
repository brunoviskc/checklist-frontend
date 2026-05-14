export function ThemeToggle({ theme, onToggle }) {
  return (
    <button type="button" className="theme-toggle" onClick={onToggle} aria-label="Alternar tema">
      <span>{theme === 'dark' ? 'Escuro' : 'Claro'}</span>
      <div className="theme-toggle-track" aria-hidden="true">
        <span className={`theme-toggle-thumb ${theme}`} />
      </div>
    </button>
  );
}
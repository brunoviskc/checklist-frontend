import { Link } from 'react-router-dom';
import { ThemeToggle } from './ThemeToggle';

export function Header({ onPrimaryAction, primaryActionLabel = 'Novo projeto', search, setSearch, showSearch, theme, onToggleTheme, onBack }) {
  return (
    <header className="site-header">
      <div className="brand-block">
        {onBack ? (
          <button type="button" className="ghost-button" onClick={onBack}>
            Voltar
          </button>
        ) : (
          <Link to="/" className="brand-mark">
            Checklist
          </Link>
        )}
        <div>
          <span className="brand-kicker">Frontend operacional</span>
          <strong className="brand-title">Checklist System</strong>
        </div>
      </div>

      {showSearch && (
        <input
          className="header-search"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Buscar projetos..."
        />
      )}

      <div className="header-actions">
        <ThemeToggle theme={theme} onToggle={onToggleTheme} />
        {onPrimaryAction && (
          <button type="button" className="primary-button" onClick={onPrimaryAction}>
            {primaryActionLabel}
          </button>
        )}
      </div>
    </header>
  );
}
import { useState, ChangeEvent, KeyboardEvent, useCallback } from 'react';
import { Search, X } from 'lucide-react';

interface SearchBarProps {
  onSearch?: (query: string) => void;
  className?: string;
  placeholder?: string;
}

const SearchBar = ({
  onSearch,
  className = '',
  placeholder = 'Søk etter produkter...',
}: SearchBarProps) => {
  const [query, setQuery] = useState('');

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setQuery(e.target.value);
    },
    [setQuery],
  );

  const handleClear = useCallback(() => {
    setQuery('');
    if (onSearch) onSearch('');
  }, [onSearch]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter' && onSearch) {
        onSearch(query);
      }
    },
    [onSearch, query],
  );

  const handleSubmit = useCallback(() => {
    if (onSearch) onSearch(query);
  }, [onSearch, query]);

  return (
    <div className={`relative flex w-full items-center ${className}`}>
      <input
        type="text"
        value={query}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className="w-full rounded-md border border-gray-300 px-3 py-2 pl-10 text-sm focus:border-[var(--baladi-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--baladi-primary)]"
      />
      <div className="absolute left-3 text-gray-400">
        <Search size={18} />
      </div>
      {query && (
        <button
          onClick={handleClear}
          className="absolute right-10 text-gray-400 hover:text-gray-600"
          type="button"
        >
          <X size={16} />
        </button>
      )}
      <button
        onClick={handleSubmit}
        className="absolute right-3 text-gray-500 hover:text-[var(--baladi-primary)]"
        type="button"
      >
        <Search size={18} />
      </button>
    </div>
  );
};

export default SearchBar;

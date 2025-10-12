const SearchableSelect = ({
  label,
  value,
  onChange,
  placeholder
}) => {
  const { useState, useEffect, useRef, useMemo } = React;

  // const API_BASE = 'http://localhost:4000/api/app-data';
  const API_BASE = 'https://dc-central-api-v2.onrender.com/api/app-data';

  const [participantList, setParticipantList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [displayValue, setDisplayValue] = useState('');
  const wrapperRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(`${API_BASE}/participants`);
      const data = await response.json();
      if (data.success) {
        setParticipantList(data.data);
      } else {
        setError('Failed to load participants.');
      }
    } catch (err) {
      setError('Failed to load data. Please refresh the page.');
    } finally {
      setLoading(false);
    }
  };

  const participantOptions = participantList.map((p) => ({
    id: p._id,
    name: p.name,
    extra: p.community,
  }));

  useEffect(() => {
    const selected = participantOptions.find((opt) => opt.id === value);
    setDisplayValue(selected ? selected.name : '');
  }, [value, participantOptions]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setIsOpen(false);
        setSearchTerm('');
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // ✅ Only EXACT name matches will show in dropdown
  const filteredOptions = useMemo(() => {
    if (!searchTerm.trim()) return [];
    const lowerSearchTerm = searchTerm.toLowerCase().trim();
    return participantOptions.filter(
      (opt) => opt.name.toLowerCase() === lowerSearchTerm
    );
  }, [searchTerm, participantOptions]);

  const handleSelect = (option) => {
    onChange(option.id);
    setDisplayValue(option.name);
    setSearchTerm('');
    setIsOpen(false);
  };

  const handleInputChange = (e) => {
    const val = e.target.value;
    setSearchTerm(val);
    setIsOpen(true);
    if (displayValue && val !== displayValue) {
      onChange('');
      setDisplayValue('');
    }
  };

  const handleContainerClick = () => {
    setIsOpen(true);
    inputRef.current?.focus();
  };

  if (loading) {
    return <div className="loading">Loading form data...</div>;
  }

  return (
    <div className="form-group">
      {error && (
        <div className="error-text" style={{ color: 'red' }}>
          {error}
        </div>
      )}

      <div className="searchable-select" ref={wrapperRef}>
        {/* Rounded container with icon and input */}
        <div className="search-container" onClick={handleContainerClick}>
          <span className="search-icon">🔍</span>
          <input
            ref={inputRef}
            type="text"
            className="searchable-input"
            value={isOpen ? searchTerm : displayValue}
            onChange={handleInputChange}
            onFocus={() => setIsOpen(true)}
            placeholder={placeholder}
          />
        </div>

        {/* Dropdown list */}
        {isOpen && (
          <div className="dropdown-list">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) => (
                <div
                  key={option.id}
                  className="dropdown-item"
                  onClick={() => handleSelect(option)}
                >
                  <div style={{ fontWeight: '500' }}>{option.name}</div>
                  {option.extra && (
                    <div style={{ fontSize: '12px', color: '#666' }}>
                      {option.extra}
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="no-results">No exact match found</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

window.SearchableSelect = SearchableSelect;
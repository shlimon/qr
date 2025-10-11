function SearchableSelect({
    label,
    options,
    value,
    onChange,
    placeholder,
    required,
}) {
    const [searchTerm, setSearchTerm] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [displayValue, setDisplayValue] = useState('');
    const wrapperRef = useRef(null);

    useEffect(() => {
        const selected = options.find((opt) => opt.id === value);
        setDisplayValue(selected ? selected.name : '');
    }, [value, options]);

    useEffect(() => {
        function handleClickOutside(event) {
            if (
                wrapperRef.current &&
                !wrapperRef.current.contains(event.target)
            ) {
                setIsOpen(false);
                setSearchTerm('');
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () =>
            document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // EXACT MATCH ONLY - no partial matches for privacy
    const filteredOptions = useMemo(() => {
        if (!searchTerm.trim()) return [];

        return options.filter(
            (opt) => opt.name.toLowerCase() === searchTerm.toLowerCase()
        );
    }, [searchTerm, options]);

    const handleSelect = (option) => {
        onChange(option.id);
        setDisplayValue(option.name);
        setSearchTerm('');
        setIsOpen(false);
    };

    const handleInputChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        setIsOpen(true);

        // Clear selection if input changes
        if (displayValue && value !== displayValue) {
            onChange('');
            setDisplayValue('');
        }
    };

    return (
        <div className="form-group">
            <label>
                {label} {required && '*'}
            </label>
            <div className="searchable-select" ref={wrapperRef}>
                <input
                    type="text"
                    className="searchable-input"
                    value={isOpen ? searchTerm : displayValue}
                    onChange={handleInputChange}
                    onFocus={() => setIsOpen(true)}
                    placeholder={placeholder}
                    required={required}
                />
                {isOpen && filteredOptions.length > 0 && (
                    <div className="dropdown-list">
                        {filteredOptions.map((option) => (
                            <div
                                key={option.id}
                                className="dropdown-item"
                                onClick={() => handleSelect(option)}
                            >
                                <div style={{ fontWeight: '500' }}>{option.name}</div>
                                {option.extra && (
                                    <div
                                        style={{
                                            fontSize: '12px',
                                            color: '#666',
                                            marginTop: '4px',
                                        }}
                                    >
                                        {option.extra}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default SearchableSelect;
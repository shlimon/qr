const { useState, useEffect, useCallback } = React;

// Custom hook for authentication
function useAuth() {
    const [user, setUser] = useState(() => {
        try {
            const stored = localStorage.getItem('kmTravelUser');
            return stored ? JSON.parse(stored) : null;
        } catch (error) {
            return null;
        }
    });

    const login = useCallback((userData) => {
        setUser(userData);
        localStorage.setItem('kmTravelUser', JSON.stringify(userData));
    }, []);

    const logout = useCallback(() => {
        setUser(null);
        localStorage.removeItem('kmTravelUser');
    }, []);

    return { user, login, logout };
}

// Reusable Login Form Component
function LoginForm({ onLogin }) {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        phone: '',
        dob: '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const payload = {
                name: `${formData.firstName.trim()} ${formData.lastName.trim()}`.trim(),
                phone: formData.phone,
                dob: formData.dob,
            };

            const response = await fetch('https://dc-central-api-v2.onrender.com/api/app-data/staffs/sw-login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            const result = await response.json();

            if (result.success) {
                onLogin(result.data);
            } else {
                setError(result.message || 'Login failed');
            }
        } catch (err) {
            setError('Network error. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container">
            <div className="card">
                <div className="login-form">
                    <h1>Provide Your Details</h1>
                    {error && <div className="error-message">{error}</div>}
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="firstName">First Name *</label>
                            <input
                                type="text"
                                id="firstName"
                                name="firstName"
                                placeholder="First Name"
                                value={formData.firstName}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="lastName">Last Name *</label>
                            <input
                                type="text"
                                id="lastName"
                                name="lastName"
                                placeholder="Last Name"
                                value={formData.lastName}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="phone">Phone *</label>
                            <input
                                type="tel"
                                id="phone"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="+61412345670"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="dob">Date of Birth *</label>
                            <input
                                type="date"
                                id="dob"
                                name="dob"
                                value={formData.dob}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <button className="btn" type="submit" disabled={loading}>
                            {loading ? 'Logging in...' : 'Login'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

// Higher-Order Component to protect any component with authentication
function withAuth(Component) {
    return function ProtectedComponent(props) {
        const { user, login, logout } = useAuth();

        if (!user) {
            return <LoginForm onLogin={login} />;
        }

        return <Component {...props} user={user} onLogout={logout} />;
    };
}
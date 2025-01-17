import { useState } from 'react';
import { router } from '@inertiajs/react';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        router.post('/login', { username, password }, {
            onSuccess: () => {
                setLoading(false);
            },
            onError: (errors) => {
                setLoading(false);
                setError(errors.username || errors.password || 'Login failed');
            }
        });
    };

    return (
        <div>
            <form onSubmit={handleLogin}>
                <div>
                    <label>Username Admin</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                {error && <p>{error}</p>}
                <button type="submit" disabled={loading}>
                    {loading ? 'Logging in...' : 'Login'}
                </button>
            </form>
        </div>
    );
}

export default Login;

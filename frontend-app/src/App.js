import React, { useState } from 'react';
import MathMicroservice from './MathMicroservice';
import Login from './Login';

function App() {
	const [token, setToken] = useState(localStorage.getItem('token') || null);

	const handleAuth = (jwtToken) => {
		setToken(jwtToken);
		localStorage.setItem('token', jwtToken);
	};

	const handleLogout = () => {
		setToken(null);
		localStorage.removeItem('token');
	};

	return (
		<div style={{background: '#f7f9fc', minHeight: '100vh', display: 'flex', alignItems: 'flex-start', justifyContent: 'center'}}>
			<div style={{width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'flex-start', minHeight: '100vh', marginTop: '48px'}}>
				{!token ? (
					<Login onAuth={handleAuth} />
				) : (
					<MathMicroservice token={token} onLogout={handleLogout} />
				)}
			</div>
		</div>
	);
}

export default App;

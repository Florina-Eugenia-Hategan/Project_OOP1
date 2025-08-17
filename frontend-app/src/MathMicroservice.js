import React, { useState } from 'react';

const operations = [
	{ value: 'pow', label: 'Power', fields: ['Base', 'Exponent'] },
	{ value: 'fibonacci', label: 'Fibonacci', fields: ['N'] },
	{ value: 'factorial', label: 'Factorial', fields: ['N'] }
];

function MathMicroservice({ token, onLogout }) {
	const handleReset = () => {
		setInputs({ Base: '', Exponent: '', N: '' });
		setResult(null);
		setError(null);
	};
	const [operation, setOperation] = useState('pow');
	const [inputs, setInputs] = useState({ Base: '', Exponent: '', N: '' });

	const handleOperationChange = (e) => {
		setOperation(e.target.value);
		setInputs({ Base: '', Exponent: '', N: '' });
	};
	const [result, setResult] = useState(null);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(false);
	const op = operations.find(o => o.value === operation);

	const normalize = val => val.replace(',', '.');

	const handleInput = (field, value) => {
		setInputs({ ...inputs, [field]: value });
	};

	const handleCalculate = async (e) => {
		e.preventDefault();
		setResult(null);
		setError(null);
		setLoading(true);
		let url = `http://localhost:8000/api/${operation}/`;
		let body = {};
		switch (operation) {
			case 'pow':
				body = { base: normalize(inputs.Base), exp: normalize(inputs.Exponent) };
				break;
			case 'fibonacci':
			case 'factorial':
				body = { n: normalize(inputs.N) };
				break;
			default:
				break;
		}
		for (const field of op.fields) {
			const val = normalize(inputs[field]);
			if (val === '' || isNaN(val)) {
				setError('Please enter valid numbers.');
				setLoading(false);
				return;
			}
		}
		try {
			const response = await fetch(url, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					...(token ? { 'Authorization': `Bearer ${token}` } : {})
				},
				body: JSON.stringify(body)
			});
			const data = await response.json();
			if (response.ok && data.result !== undefined) {
				setResult(data.result);
			} else {
				setError(data.error || 'Calculation error');
			}
		} catch (err) {
			setError('Server error');
		}
		setLoading(false);
	};

	return (
	<div className="auth-card math-card" style={{maxWidth: 420, margin: '60px auto', background: '#fff', borderRadius: 20, boxShadow: '0 8px 32px rgba(25, 118, 210, 0.15)', padding: '40px 32px 32px 32px', position:'relative', fontFamily: 'Segoe UI, Arial, sans-serif'}}>
			<div style={{position:'absolute', top:24, right:24, zIndex:2}}>
				<button onClick={onLogout} title="Logout" style={{background:'none', border:'none', cursor:'pointer', padding:0}} aria-label="Logout">
					<svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M16 17L21 12L16 7" stroke="#222" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M21 12H9" stroke="#222" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
				</button>
			</div>
			<h2 style={{marginBottom: 24, fontWeight:700, fontSize:26, color:'#222', letterSpacing:1}}>Math Microservice</h2>
			<form onSubmit={handleCalculate} autoComplete="off">
				<div style={{marginBottom: 16, display:'flex', alignItems:'center', background:'#f7f7f7', borderRadius:8, padding:'12px 16px'}}>
					<span style={{fontSize:15, color:'#bbb', marginRight:12}}>Operation</span>
					<select value={operation} onChange={handleOperationChange} style={{flex:1, border:'none', background:'transparent', fontWeight:'bold', fontSize:16, color:'#222'}} aria-label="Select operation">
						{operations.map(o => (
							<option key={o.value} value={o.value}>{o.label}</option>
						))}
					</select>
				</div>
				{op.fields.map(field => (
					<div key={field} style={{marginBottom: 16}}>
						<input
							type="text"
							required
							placeholder={field + ' *'}
							value={inputs[field] || ''}
							onChange={e => handleInput(field, e.target.value)}
							style={{width: '100%', padding: '16px', border: 'none', background: '#f7f7f7', borderRadius: 8, fontSize: 17, color:'#222', fontWeight:500}}
							aria-label={field}
							autoComplete="off"
						/>
					</div>
				))}
	<button type="submit" style={{width: '100%', background: '#1976d2', color: '#fff', padding: 16, border: 'none', borderRadius: 12, fontWeight: 'bold', fontSize: 18, cursor: 'pointer', marginTop: 12, letterSpacing:1, outline:'none'}} disabled={loading} tabIndex={0}>{loading ? 'Calculating...' : 'CALCULATE'}</button>
	<button type="button" onClick={handleReset} style={{width: '120px', background: '#f7f7f7', color: '#1976d2', padding: '8px 0', border: 'none', borderRadius: 8, fontWeight: 'bold', fontSize: 15, cursor: 'pointer', margin: '16px auto 0 auto', display: 'block', boxShadow: '0 1px 4px rgba(25, 118, 210, 0.08)'}}>Reset</button>
			</form>
	{result !== null && <div style={{marginTop: 24, fontSize: 18, color: '#1976d2', fontWeight:600, letterSpacing:1}}>Result: {result}</div>}
	{error && <div style={{marginTop: 24, color:'#d32f2f', background:'#ffeaea', border:'1px solid #d32f2f', borderRadius:8, padding:'10px 0', fontSize:15}}>{error}</div>}
		</div>
	);
}

export default MathMicroservice;

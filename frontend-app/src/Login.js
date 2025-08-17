import React, { useState } from 'react';
import './AuthCard.css';

function Login({ onAuth }) {
  // UI state for requirements checklist visibility
  const [showUsernameReq, setShowUsernameReq] = useState(false);
  const [showEmailReq, setShowEmailReq] = useState(false);
  const [showPasswordReq, setShowPasswordReq] = useState(false);
  const [activeTab, setActiveTab] = useState('signin');
  const [showRecover, setShowRecover] = useState(false);
  const [recoverEmail, setRecoverEmail] = useState('');
  const [recoverMsg, setRecoverMsg] = useState(null);
  const [recoverError, setRecoverError] = useState(null);
  const handleRecover = async (e) => {
    e.preventDefault();
    setRecoverMsg(null);
    setRecoverError(null);
    if (!recoverEmail || !recoverEmail.includes('@')) {
      setRecoverError('Valid email is required');
      return;
    }
    try {
      const response = await fetch('http://localhost:8000/auth/recover-password/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: recoverEmail })
      });
      const data = await response.json();
      if (response.ok && data.message) {
        setRecoverMsg(data.message);
        setRecoverEmail('');
      } else {
        setRecoverError(data.error || JSON.stringify(data));
      }
    } catch (err) {
      setRecoverError('Server error');
    }
  };
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [signupUsername, setSignupUsername] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  // Eliminăm rolul
  const [error, setError] = useState(null);
  const [signupError, setSignupError] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);
  const [usernameValid, setUsernameValid] = useState(false);
  const [emailValid, setEmailValid] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);
  const [usernameWarning, setUsernameWarning] = useState('');
  const [emailWarning, setEmailWarning] = useState('');
  const [passwordWarning, setPasswordWarning] = useState('');

  const validateUsername = (username) => {
    const isValid = username.length >= 3;
    setUsernameWarning(isValid ? '' : 'Username must be at least 3 characters long.');
    return isValid;
  };

  const validateEmail = (email) => {
    const isValid = /^\S+@\S+\.\S+$/.test(email);
    setEmailWarning(isValid ? '' : 'Please enter a valid email address.');
    return isValid;
  };

  const validatePassword = (password) => {
    const rules = [
      password.length >= 8,
      /[A-Z]/.test(password),
      /[a-z]/.test(password),
      /\d/.test(password),
      /[!@#$%^&*(),.?":{}|<>]/.test(password),
    ];
    const unmetRules = [];
    if (!rules[0]) unmetRules.push('At least 8 characters');
    if (!rules[1]) unmetRules.push('One uppercase letter');
    if (!rules[2]) unmetRules.push('One lowercase letter');
    if (!rules[3]) unmetRules.push('One digit');
    if (!rules[4]) unmetRules.push('One special character');
    setPasswordWarning(unmetRules.length > 0 ? `Password must have: ${unmetRules.join(', ')}` : '');
    return rules.every(rule => rule);
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMsg(null);
    if (!username) {
      setError('Username is required');
      return;
    }
    if (!password) {
      setError('Password is required');
      return;
    }
    try {
      const response = await fetch('http://localhost:8000/auth/login/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const data = await response.json();
      if (response.ok && data.access) {
        setSuccessMsg('Login successful!');
        setTimeout(() => {
          if (onAuth) onAuth(data.access);
        }, 500);
      } else {
        setError(data.error || 'Login failed');
      }
    } catch (err) {
      setError('Server error');
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setSignupError(null);
    setSuccessMsg(null);
    if (!signupUsername) {
      setSignupError('Username is required');
      return;
    }
    if (!signupEmail || !signupEmail.includes('@')) {
      setSignupError('Valid email is required');
      return;
    }
    if (!signupPassword || signupPassword.length < 6) {
      setSignupError('Password must be at least 6 characters');
      return;
    }
    try {
      const response = await fetch('http://localhost:8000/auth/signup/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: signupUsername, email: signupEmail, password: signupPassword })
      });
      const data = await response.json();
      if (response.ok && data.message) {
        setSuccessMsg(data.message);
        setSignupUsername('');
        setSignupEmail('');
        setSignupPassword('');
  // nu mai resetăm rolul
        setTimeout(() => setActiveTab('signin'), 1200);
      } else {
        setSignupError(data.error || JSON.stringify(data));
      }
    } catch (err) {
      setSignupError('Server error');
    }
  };

  // SVG icons identice cu cele din poză
  const iconUser = (
    <svg width="18" height="18" fill="none" viewBox="0 0 24 24" style={{marginRight:8, color:'#bbb'}}><path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" fill="#bbb"/></svg>
  );
  const iconLock = (
    <svg width="18" height="18" fill="none" viewBox="0 0 24 24" style={{marginRight:8, color:'#bbb'}}><path d="M6 10V8a6 6 0 1 1 12 0v2" stroke="#bbb" strokeWidth="2"/><rect x="6" y="10" width="12" height="8" rx="2" stroke="#bbb" strokeWidth="2"/></svg>
  );
  const iconMail = (
    <svg width="18" height="18" fill="none" viewBox="0 0 24 24" style={{marginRight:8, color:'#bbb'}}><rect x="3" y="5" width="18" height="14" rx="2" stroke="#bbb" strokeWidth="2"/><path d="M3 7l9 6 9-6" stroke="#bbb" strokeWidth="2"/></svg>
  );

  return (
  <div className="auth-card login-card" style={{maxWidth: 420, margin: '120px auto 0 auto', background: '#fff', borderRadius: 20, boxShadow: '0 8px 32px rgba(25, 118, 210, 0.15)', padding: '40px 32px 32px 32px', fontFamily: 'Segoe UI, Arial, sans-serif'}}>
      <div style={{display: 'flex', borderBottom: '2px solid #f0f0f0', marginBottom: 24}}>
        <button
          className={`tab-btn${activeTab==='signin' ? ' active' : ''}`}
          style={{flex: 1, padding: 12, fontWeight: 'bold', background: 'none', border: 'none', borderBottom: activeTab==='signin' ? '2px solid #1976d2' : '2px solid #f0f0f0', color: activeTab==='signin' ? '#222' : '#bbb', cursor: 'pointer', fontSize: 18, letterSpacing: 1}}
          onClick={() => setActiveTab('signin')}
          tabIndex={0}
        >
          Login
        </button>
        <button
          className={`tab-btn${activeTab==='signup' ? ' active' : ''}`}
          style={{flex: 1, padding: 12, fontWeight: 'bold', background: 'none', border: 'none', borderBottom: activeTab==='signup' ? '2px solid #1976d2' : '2px solid #f0f0f0', color: activeTab==='signup' ? '#222' : '#bbb', cursor: 'pointer', fontSize: 18, letterSpacing: 1}}
          onClick={() => setActiveTab('signup')}
          tabIndex={0}
        >
          Sign Up
        </button>
      </div>
      {activeTab === 'signin' && (
        <>
        <form onSubmit={handleLogin} autoComplete="off">
          <div style={{display: 'flex', alignItems: 'center', marginBottom: 16, background: '#f7f7f7', borderRadius: 8, padding: '16px 16px'}}>
            {iconUser}
            <input type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} style={{flex: 1, border: 'none', background: 'transparent', fontSize: 17, color: '#222', fontWeight:500}} aria-label="Username" autoComplete="off" />
          </div>
          <div style={{display: 'flex', alignItems: 'center', marginBottom: 16, background: '#f7f7f7', borderRadius: 8, padding: '16px 16px'}}>
            {iconLock}
            <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} style={{flex: 1, border: 'none', background: 'transparent', fontSize: 17, color: '#222', fontWeight:500}} aria-label="Password" autoComplete="off" />
          </div>
          <button type="submit" style={{width: '100%', background: 'linear-gradient(90deg, #1976d2 0%, #2196f3 100%)', color: '#fff', padding: '18px', border: 'none', borderRadius: '16px', fontWeight: 'bold', fontSize: '20px', cursor: 'pointer', letterSpacing: '1px', outline: 'none', boxShadow: '0 4px 16px rgba(25, 118, 210, 0.12)', transition: 'background 0.2s, box-shadow 0.2s', marginTop: '8px'}} onMouseOver={e => e.currentTarget.style.background = 'linear-gradient(90deg, #2196f3 0%, #1976d2 100%)'} onMouseOut={e => e.currentTarget.style.background = 'linear-gradient(90deg, #1976d2 0%, #2196f3 100%)'} tabIndex={0}>
              Sign In
          </button>
          <div style={{marginTop: 12, textAlign: 'right'}}>
            <button type="button" style={{background: 'none', border: 'none', color: '#1976d2', fontWeight: 'bold', cursor: 'pointer', fontSize: 15, textDecoration: 'underline', padding: 0}} onClick={() => setShowRecover(true)}>Forgot Password?</button>
          </div>
          {error && <div className="msg error" style={{background:'#ffeaea', color:'#d32f2f', border:'1px solid #d32f2f', borderRadius:8, padding:'10px 0', fontSize:15}}>{error}</div>}
          {successMsg && <div className="msg success" style={{background:'#eaffea', color:'#388e3c', border:'1px solid #388e3c', borderRadius:8, padding:'10px 0', fontSize:15}}>{successMsg}</div>}
        </form>
        {showRecover && (
          <div style={{position:'fixed', top:0, left:0, width:'100vw', height:'100vh', background:'rgba(0,0,0,0.18)', zIndex:99, display:'flex', alignItems:'center', justifyContent:'center'}}>
            <div style={{background:'#fff', borderRadius:16, boxShadow:'0 8px 32px rgba(25, 118, 210, 0.15)', padding:'32px 24px', minWidth:320, maxWidth:360, position:'relative'}}>
              <button onClick={()=>{setShowRecover(false); setRecoverMsg(null); setRecoverError(null);}} style={{position:'absolute', top:12, right:12, background:'none', border:'none', fontSize:22, color:'#1976d2', cursor:'pointer'}} aria-label="Close">×</button>
              <h3 style={{marginBottom:16, color:'#1976d2', fontWeight:700, fontSize:22}}>Recover Password</h3>
              <form onSubmit={handleRecover} autoComplete="off">
                <div style={{display:'flex', alignItems:'center', marginBottom:16, background:'#f7f7f7', borderRadius:8, padding:'12px 12px'}}>
                  {iconMail}
                  <input type="email" placeholder="Enter your email" value={recoverEmail} onChange={e => setRecoverEmail(e.target.value)} style={{flex:1, border:'none', background:'transparent', fontSize:16, color:'#222', fontWeight:500}} aria-label="Email" autoComplete="off" />
                </div>
                <button type="submit" style={{width:'100%', background:'#1976d2', color:'#fff', padding:12, border:'none', borderRadius:10, fontWeight:'bold', fontSize:16, cursor:'pointer', letterSpacing:1, outline:'none'}}>Send Recovery Email</button>
                {recoverError && <div className="msg error" style={{background:'#ffeaea', color:'#d32f2f', border:'1px solid #d32f2f', borderRadius:8, padding:'10px 0', fontSize:15, marginTop:10}}>{recoverError}</div>}
                {recoverMsg && <div className="msg success" style={{background:'#eaffea', color:'#388e3c', border:'1px solid #388e3c', borderRadius:8, padding:'10px 0', fontSize:15, marginTop:10}}>{recoverMsg}</div>}
              </form>
            </div>
          </div>
        )}
        </>
      )}
      {activeTab === 'signup' && (
        <form onSubmit={handleSignup} autoComplete="off">
          <div style={{display: 'flex', alignItems: 'center', marginBottom: 24, background: '#f7f7f7', borderRadius: 8, padding: '16px 16px'}}>
            {iconUser}
            <input
              type="text"
              placeholder="Username"
              value={signupUsername}
              onChange={e => {
                setSignupUsername(e.target.value);
                setUsernameValid(validateUsername(e.target.value));
              }}
              style={{flex: 1, border: 'none', background: 'transparent', fontSize: 17, color: '#222', fontWeight:500}}
              aria-label="Username"
              autoComplete="off"
            />
          </div>
          {usernameWarning && (
            <div style={{color:'#d32f2f', fontSize:13, marginBottom:4}}>{usernameWarning}</div>
          )}
          <div style={{display: 'flex', alignItems: 'center', marginBottom: 24, background: '#f7f7f7', borderRadius: 8, padding: '16px 16px'}}>
            {iconMail}
            <input
              type="email"
              placeholder="Email"
              value={signupEmail}
              onChange={e => {
                setSignupEmail(e.target.value);
                setEmailValid(validateEmail(e.target.value));
              }}
              style={{flex: 1, border: 'none', background: 'transparent', fontSize: 17, color: '#222', fontWeight:500}}
              aria-label="Email"
              autoComplete="off"
            />
          </div>
          {emailWarning && (
            <div style={{color:'#d32f2f', fontSize:13, marginBottom:4}}>{emailWarning}</div>
          )}
          <div style={{display: 'flex', alignItems: 'center', marginBottom: 24, background: '#f7f7f7', borderRadius: 8, padding: '16px 16px'}}>
            {iconLock}
            <input
              type={passwordVisible ? "text" : "password"}
              placeholder="Password"
              value={signupPassword}
              onChange={e => {
                setSignupPassword(e.target.value);
                setPasswordValid(validatePassword(e.target.value));
              }}
              style={{flex: 1, border: 'none', background: 'transparent', fontSize: 17, color: '#222', fontWeight:500}}
              aria-label="Password"
              autoComplete="off"
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              style={{background: 'none', border: 'none', cursor: 'pointer', marginLeft: 8}}
              aria-label="Toggle password visibility"
            >
              {passwordVisible ? 'Hide' : 'Show'}
            </button>
          </div>
          {passwordWarning && (
            <div style={{color:'#d32f2f', fontSize:13, marginBottom:4}}>{passwordWarning}</div>
          )}
          <button type="submit" style={{width: '100%', background: '#1976d2', color: '#fff', padding: 16, border: 'none', borderRadius: 12, fontWeight: 'bold', fontSize: 18, cursor: 'pointer', letterSpacing: 1, outline:'none'}} tabIndex={0}>Create Account</button>
          {signupError && <div className="msg error" style={{background:'#ffeaea', color:'#d32f2f', border:'1px solid #d32f2f', borderRadius:8, padding:'10px 0', fontSize:15}}>{signupError}</div>}
          {successMsg && <div className="msg success" style={{background:'#eaffea', color:'#388e3c', border:'1px solid #388e3c', borderRadius:8, padding:'10px 0', fontSize:15}}>{successMsg}</div>}
        </form>
      )}
    </div>
  );
}

export default Login;

import React from 'react'
import { useNavigate } from 'react-router'
import { useAuth } from '../features/auth/hooks/useAuth'
import './navbar.scss'

const Navbar = () => {
    const navigate = useNavigate()
    const { handleLogout, user } = useAuth()

    const handleLogoClick = () => {
        navigate('/')
    }

    const handleLogoutClick = async () => {
        await handleLogout()
        navigate('/login')
    }

    return (
        <nav className='navbar'>
            <div className='navbar__container'>
                <button 
                    className='navbar__logo-btn'
                    onClick={handleLogoClick}
                    title='Go to home'
                >
                    <span className='navbar__logo-emoji'>🤖</span>
                    <span className='navbar__logo-text'>HireReady</span>
                </button>
                
                {user && (
                    <div className='navbar__welcome'>
                        <span className='navbar__welcome-text'>Welcome, <strong>{user.username}</strong>! 🎯</span>
                    </div>
                )}
                
                <button 
                    className='navbar__logout-btn'
                    onClick={handleLogoutClick}
                    title='Logout'
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h4m4-4l4-4m0 0l-4-4m4 4H9" /></svg>
                    Logout
                </button>
            </div>
        </nav>
    )
}

export default Navbar

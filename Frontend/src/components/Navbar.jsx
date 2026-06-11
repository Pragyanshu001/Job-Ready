import React from 'react'
import { Box, Typography, Button } from '@mui/material'
import { useNavigate } from 'react-router'
import { useAuth } from '../hooks/useAuth.js'
import { useTheme } from '../context/theme.context.jsx'
import { Sun, Moon } from 'lucide-react'

const Navbar = ({ maxWidth = '960px', marginBottom = '2.5rem' }) => {
    const { user, handleLogout } = useAuth()
    const { theme, toggleTheme } = useTheme()
    const navigate = useNavigate()

    const brandLogoStyle = {
        fontSize: '1.1rem',
        fontWeight: '800',
        color: 'var(--text-title)',
        letterSpacing: '-0.02em',
        transition: 'color 0.3s ease'
    }

    const navUserGreetingStyle = {
        fontSize: '0.85rem',
        fontWeight: '500',
        color: 'var(--text-secondary)',
        transition: 'color 0.3s ease'
    }

    const stickyContainerStyle = {
        position: 'sticky',
        top: 0,
        width: '100%',
        zIndex: 1000,
        display: 'flex',
        justifyContent: 'center',
        padding: '1rem 1.5rem',
        boxSizing: 'border-box',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        background: 'var(--navbar-container-bg)',
        transition: 'all 0.3s ease',
        marginBottom: marginBottom
    }

    const navbarStyle = {
        width: '100%',
        maxWidth: maxWidth,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0.75rem 1.5rem',
        background: 'var(--navbar-bg)',
        border: '1px solid var(--navbar-border)',
        borderRadius: '30px',
        boxShadow: 'var(--card-shadow)',
        boxSizing: 'border-box',
        transition: 'all 0.3s ease'
    }

    return (
        <Box sx={stickyContainerStyle}>
            <Box sx={navbarStyle}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }} onClick={() => navigate('/')}>
                    <Box
                        component="img"
                        src="/logo.png"
                        alt="Job-Ready Logo"
                        sx={{
                            width: '32px',
                            height: '32px',
                            objectFit: 'contain',
                            transition: 'all 0.3s ease'
                        }}
                    />
                    <Typography sx={brandLogoStyle}>
                        Job-Ready AI
                    </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <Typography sx={navUserGreetingStyle}>
                        Hello, <Box component="span" sx={{ color: 'var(--highlight-color)', fontWeight: '600' }}>{user?.username || 'User'}</Box>
                    </Typography>

                    {/* Theme Toggle Button */}
                    <Button
                        onClick={toggleTheme}
                        sx={{
                            minWidth: '36px',
                            width: '36px',
                            height: '36px',
                            borderRadius: '50%',
                            border: '1px solid var(--btn-border)',
                            background: 'none',
                            color: 'var(--text-primary)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: 0,
                            transition: 'all 0.3s ease',
                            '&:hover': {
                                background: 'var(--btn-hover-bg)',
                                borderColor: 'var(--text-primary)'
                            }
                        }}
                        aria-label="Toggle Theme"
                    >
                        {theme === 'light' ? (
                            <Sun size={16} strokeWidth={2} />
                        ) : (
                            <Moon size={16} strokeWidth={2.5} />
                        )}
                    </Button>

                    <Button
                        onClick={handleLogout}
                        sx={{
                            background: 'none',
                            border: '1px solid var(--btn-border)',
                            borderRadius: '30px',
                            color: 'var(--text-primary)',
                            fontSize: '0.8rem',
                            textTransform: 'none',
                            fontWeight: 700,
                            padding: '0.35rem 1.25rem',
                            transition: 'all 0.3s ease',
                            '&:hover': {
                                background: 'var(--btn-hover-bg)',
                                borderColor: 'var(--text-primary)',
                                transform: 'translateY(-1px)'
                            }
                        }}
                    >
                        Logout
                    </Button>
                </Box>
            </Box>
        </Box>
    )
}

export default Navbar

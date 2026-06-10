import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router'
import { useAuth } from '../hooks/useAuth'
import { Box, Typography, Button } from '@mui/material'

const Register = () => {

    const navigate = useNavigate()
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const { loading, handleRegister } = useAuth()

    const handleSubmit = async (e) => {
        e.preventDefault()
        const success = await handleRegister({ username, email, password })
        if (success) {
            navigate("/")
        }
    }

    if (loading) {
        return (
            <Box style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '100vh',
                backgroundColor: 'var(--bg-color)',
                color: 'var(--text-primary)',
                transition: 'all 0.3s ease'
            }}>
                <Typography variant="h5" style={{ fontWeight: 'bold' }}>Loading.......</Typography>
            </Box>
        )
    }

    const containerStyle = {
        width: '100%',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '2rem 1.5rem',
        background: 'var(--bg-gradient)',
        color: 'var(--text-primary)',
        boxSizing: 'border-box',
        fontFamily: '"Outfit", "Inter", system-ui, -apple-system, sans-serif',
        position: 'relative',
        overflow: 'hidden',
        transition: 'background-color 0.3s ease, color 0.3s ease'
    }

    const cardStyle = {
        background: 'var(--card-bg)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        border: '1px solid var(--card-border)',
        borderRadius: '24px',
        padding: '2.5rem 1.75rem',
        width: '100%',
        maxWidth: '420px',
        boxSizing: 'border-box',
        boxShadow: 'var(--card-shadow)',
        textAlign: 'center',
        zIndex: 1,
        transition: 'all 0.3s ease'
    }

    const badgeStyle = {
        background: 'var(--card-bg)',
        border: '1px solid rgba(234, 43, 22, 0.25)',
        borderRadius: '30px',
        color: '#ea2b16',
        fontSize: '0.75rem',
        fontWeight: '700',
        padding: '0.35rem 1.25rem',
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
        display: 'inline-block',
        marginBottom: '1.25rem',
        boxShadow: '0 4px 10px rgba(234, 43, 22, 0.05)',
        transition: 'all 0.3s ease'
    }

    const headerStyle = {
        fontSize: '2rem',
        fontWeight: '800',
        margin: '0 0 0.5rem 0',
        color: 'var(--text-title)',
        letterSpacing: '-0.02em',
        lineHeight: 1.2,
        transition: 'color 0.3s ease'
    }

    const subheaderStyle = {
        fontSize: '0.875rem',
        color: 'var(--text-secondary)',
        margin: '0 0 2rem 0',
        lineHeight: '1.5',
        transition: 'color 0.3s ease'
    }

    const inputGroupStyle = {
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem',
        marginBottom: '1.25rem',
        textAlign: 'left'
    }

    const labelStyle = {
        fontSize: '0.8rem',
        fontWeight: '700',
        color: 'var(--text-secondary)',
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
        transition: 'color 0.3s ease'
    }

    const inputStyle = {
        width: '100%',
        backgroundColor: 'var(--input-bg)',
        border: '1px solid var(--input-border)',
        borderRadius: '30px',
        padding: '0.85rem 1.25rem',
        color: 'var(--text-primary)',
        fontSize: '0.9rem',
        outline: 'none',
        boxSizing: 'border-box',
        transition: 'all 0.3s ease',
        '&:focus': {
            borderColor: '#ea2b16',
            boxShadow: '0 0 10px rgba(234, 43, 22, 0.15)'
        }
    }

    const buttonStyle = {
        width: '100%',
        background: 'var(--btn-bg)',
        color: 'var(--btn-text)',
        fontSize: '1rem',
        fontWeight: '700',
        padding: '0.85rem',
        border: 'none',
        borderRadius: '30px',
        cursor: 'pointer',
        boxShadow: '0 8px 20px rgba(31, 33, 37, 0.25)',
        marginTop: '1.5rem',
        textTransform: 'none',
        transition: 'all 0.3s ease',
        '&:hover': {
            opacity: 0.95,
            background: 'var(--text-primary)',
            boxShadow: '0 10px 25px rgba(31, 33, 37, 0.35)',
            transform: 'translateY(-1px)'
        }
    }

    const footerTextStyle = {
        fontSize: '0.875rem',
        color: 'var(--text-secondary)',
        marginTop: '1.5rem',
        lineHeight: '1.5',
        transition: 'color 0.3s ease'
    }

    const linkStyle = {
        color: '#ea2b16',
        textDecoration: 'none',
        fontWeight: '600'
    }

    return (
        <Box sx={containerStyle}>
            {/* Glowing background shapes */}
            <Box sx={{
                position: 'absolute',
                top: '10%',
                right: '-5%',
                width: '600px',
                height: '600px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(234, 43, 22, 0.18) 0%, rgba(255, 59, 38, 0.05) 50%, transparent 70%)',
                filter: 'blur(60px)',
                zIndex: 0,
                pointerEvents: 'none'
            }} />
            <Box sx={{
                position: 'absolute',
                bottom: '-10%',
                left: '-5%',
                width: '500px',
                height: '500px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(255, 255, 255, 0.8) 0%, transparent 70%)',
                filter: 'blur(50px)',
                zIndex: 0,
                pointerEvents: 'none'
            }} />

            <Box sx={cardStyle}>
                <Box sx={badgeStyle}>🎁 Free Registration</Box>
                <Typography component="h1" sx={headerStyle}>Create Account</Typography>
                <Typography component="p" sx={subheaderStyle}>Start building custom interview preparation paths using AI</Typography>

                <form onSubmit={handleSubmit}>
                    <Box sx={inputGroupStyle}>
                        <Typography component="label" htmlFor="username" sx={labelStyle}>Username</Typography>
                        <Box
                            component="input"
                            onChange={(e) => { setUsername(e.target.value) }}
                            type="text"
                            id="username"
                            name='username'
                            placeholder='Choose a username'
                            required
                            sx={inputStyle}
                        />
                    </Box>
                    <Box sx={inputGroupStyle}>
                        <Typography component="label" htmlFor="email" sx={labelStyle}>Email Address</Typography>
                        <Box
                            component="input"
                            onChange={(e) => { setEmail(e.target.value) }}
                            type="email"
                            id="email"
                            name='email'
                            placeholder='Enter your email address'
                            required
                            sx={inputStyle}
                        />
                    </Box>
                    <Box sx={inputGroupStyle}>
                        <Typography component="label" htmlFor="password" sx={labelStyle}>Password</Typography>
                        <Box
                            component="input"
                            onChange={(e) => { setPassword(e.target.value) }}
                            type="password"
                            id="password"
                            name='password'
                            placeholder='Create a secure password'
                            required
                            sx={inputStyle}
                        />
                    </Box>

                    <Button
                        type="submit"
                        sx={buttonStyle}
                    >
                        Register & Get Started
                    </Button>
                </form>

                <Typography component="p" sx={footerTextStyle}>
                    Already have an account? <Link to={"/login"} style={linkStyle}>Login Now</Link>
                </Typography>
            </Box>
        </Box>
    )
}

export default Register
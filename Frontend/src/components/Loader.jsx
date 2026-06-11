import React from 'react'

const Loader = ({ message = 'Loading...', subtitle }) => {
    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            background: 'var(--bg-gradient)',
            color: 'var(--text-primary)',
            fontFamily: '"Outfit", "Inter", system-ui, -apple-system, sans-serif',
            transition: 'background-color 0.3s ease, color 0.3s ease'
        }}>
            <div style={{ textAlign: 'center' }}>
                <div style={{
                    width: '50px',
                    height: '50px',
                    border: '4px solid var(--highlight-color)',
                    borderTop: '4px solid transparent',
                    borderRadius: '50%',
                    margin: '0 auto 1.5rem auto',
                    animation: 'spin 1s linear infinite'
                }} />
                <p style={{
                    margin: 0,
                    fontWeight: '700',
                    letterSpacing: '0.05em',
                    color: 'var(--text-title)',
                    textTransform: 'uppercase',
                    fontSize: '1.1rem'
                }}>
                    {message}
                </p>
                {subtitle && (
                    <p style={{
                        margin: '0.5rem 0 0 0',
                        fontSize: '0.85rem',
                        color: 'var(--text-secondary)',
                        fontFamily: 'inherit'
                    }}>
                        {subtitle}
                    </p>
                )}
            </div>
            <style>{`
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    )
}

export default Loader


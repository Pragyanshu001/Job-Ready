import React, { createContext, useContext, useState, useCallback } from 'react';
import { Snackbar, Alert } from '@mui/material';

const SnackbarContext = createContext();

export const SnackbarProvider = ({ children }) => {
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [severity, setSeverity] = useState('info'); // 'success' | 'error' | 'warning' | 'info'

    const showSnackbar = useCallback((msg, sev = 'info') => {
        setMessage(msg);
        setSeverity(sev);
        setOpen(true);
    }, []);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    const alertStyle = {
        borderRadius: '16px',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.15)',
        fontWeight: 600,
        fontSize: '0.9rem',
        border: '1px solid',
        fontFamily: '"Outfit", "Inter", system-ui, -apple-system, sans-serif',
        padding: '0.65rem 1.25rem',
        color: 'var(--text-title)',
        backgroundColor: severity === 'success' ? 'rgba(16, 185, 129, 0.15)' :
                       severity === 'error' ? 'rgba(234, 43, 22, 0.15)' :
                       severity === 'warning' ? 'rgba(217, 119, 6, 0.15)' :
                       'rgba(13, 148, 136, 0.15)',
        borderColor: severity === 'success' ? 'rgba(16, 185, 129, 0.3)' :
                     severity === 'error' ? 'rgba(234, 43, 22, 0.3)' :
                     severity === 'warning' ? 'rgba(217, 119, 6, 0.3)' :
                     'rgba(13, 148, 136, 0.3)',
        '& .MuiAlert-icon': {
            color: severity === 'success' ? '#10b981' :
                   severity === 'error' ? '#ea2b16' :
                   severity === 'warning' ? '#d97706' :
                   '#0d9488',
        },
        '& .MuiAlert-message': {
            color: 'var(--text-primary)'
        },
        '& .MuiAlert-action': {
            paddingTop: 0,
            paddingBottom: 0,
            alignItems: 'center',
            color: 'var(--text-secondary)'
        }
    };

    return (
        <SnackbarContext.Provider value={{ showSnackbar }}>
            {children}
            <Snackbar
                open={open}
                autoHideDuration={4000}
                onClose={handleClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                sx={{
                    zIndex: 9999,
                    '&.MuiSnackbar-root': {
                        bottom: { xs: 16, sm: 24 },
                        right: { xs: 16, sm: 24 },
                        left: { xs: 16, sm: 'auto' }
                    }
                }}
            >
                <Alert 
                    onClose={handleClose} 
                    severity={severity} 
                    sx={alertStyle}
                >
                    {message}
                </Alert>
            </Snackbar>
        </SnackbarContext.Provider>
    );
};

export const useSnackbar = () => {
    const context = useContext(SnackbarContext);
    if (!context) {
        throw new Error('useSnackbar must be used within a SnackbarProvider');
    }
    return context;
};

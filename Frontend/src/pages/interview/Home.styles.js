export const panelTitleStyle = {
    fontSize: '1.1rem',
    fontWeight: '700',
    color: 'var(--text-title)',
    flex: 1,
    transition: 'color 0.3s ease'
}

export const labelStyle = {
    fontSize: '0.875rem',
    fontWeight: '600',
    color: 'var(--text-primary)',
    transition: 'color 0.3s ease'
}

export const dropzoneTitleStyle = {
    fontSize: '0.85rem',
    fontWeight: '600',
    color: 'var(--text-title)',
    transition: 'color 0.3s ease'
}

export const dropzoneSubStyle = {
    fontSize: '0.72rem',
    color: 'var(--text-secondary)',
    transition: 'color 0.3s ease'
}

export const fileNameStyle = {
    fontSize: '0.85rem',
    fontWeight: '600',
    color: '#10b981',
    wordBreak: 'break-all'
}

export const removeFileLinkStyle = {
    fontSize: '0.75rem',
    fontWeight: '600',
    color: '#ea2b16',
    cursor: 'pointer',
    textDecoration: 'underline',
    display: 'inline-block',
    marginTop: '0.25rem',
    transition: 'opacity 0.2s',
    '&:hover': {
        opacity: 0.8
    }
}

export const infoBoxTextStyle = {
    fontSize: '0.78rem',
    color: 'var(--text-secondary)',
    lineHeight: '1.45',
    transition: 'color 0.3s ease'
}

export const cardFooterTextStyle = {
    fontSize: '0.8rem',
    color: 'var(--text-secondary)',
    transition: 'color 0.3s ease'
}

export const recentCardTitleStyle = {
    fontSize: '0.95rem',
    fontWeight: '700',
    color: 'var(--text-title)',
    transition: 'color 0.3s ease'
}

export const recentCardDateStyle = {
    fontSize: '0.75rem',
    color: 'var(--text-secondary)',
    transition: 'color 0.3s ease'
}

export const loadingTitleStyle = {
    fontSize: '1.1rem',
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: '0.25rem'
}

export const loadingSubStyle = {
    fontSize: '0.85rem',
    color: '#64748b'
}

export const pageWrapperStyle = {
    width: '100%',
    minHeight: '100vh',
    background: 'var(--bg-gradient)',
    color: 'var(--text-primary)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '0rem 0rem 4rem 0rem',
    boxSizing: 'border-box',
    fontFamily: '"Outfit", "Inter", system-ui, -apple-system, sans-serif',
    position: 'relative',
    overflow: 'visible',
    transition: 'background-color 0.3s ease, color 0.3s ease'
}

export const headerWrapperStyle = {
    textAlign: 'center',
    marginBottom: '2.5rem',
    width: '100%',
    zIndex: 1
}

export const mainTitleStyle = {
    fontSize: '2.5rem',
    fontWeight: '800',
    marginBottom: '0.75rem',
    color: 'var(--text-title)',
    letterSpacing: '-0.02em',
    transition: 'color 0.3s ease'
}

export const highlightStyle = {
    background: 'var(--highlight-gradient)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent'
}

export const subtitleStyle = {
    color: 'var(--text-secondary)',
    fontSize: '1rem',
    maxWidth: '520px',
    margin: '0 auto',
    lineHeight: '1.6',
    transition: 'color 0.3s ease'
}

export const cardStyle = {
    width: '100%',
    maxWidth: '960px',
    background: 'var(--card-bg)',
    backdropFilter: 'blur(16px)',
    WebkitBackdropFilter: 'blur(16px)',
    border: '1px solid var(--card-border)',
    borderRadius: '24px',
    overflow: 'hidden',
    boxShadow: 'var(--card-shadow)',
    zIndex: 1,
    transition: 'all 0.3s ease'
}

export const cardBodyStyle = {
    display: 'flex',
    flexDirection: { xs: 'column', md: 'row' },
    minHeight: '480px'
}

export const leftPanelStyle = {
    flex: 1,
    padding: '1.5rem 1.75rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem'
}

export const rightPanelStyle = {
    flex: 1,
    padding: '1.5rem 1.75rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.85rem',
    borderLeft: { xs: 'none', md: '1px solid var(--divider-color)' },
    borderTop: { xs: '1px solid var(--divider-color)', md: 'none' },
    transition: 'all 0.3s ease'
}

export const panelHeaderStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    marginBottom: '0.25rem'
}

export const iconWrapperStyle = {
    display: 'flex',
    alignItems: 'center',
    color: 'var(--highlight-color)'
}

export const badgeStyle = {
    fontSize: '0.7rem',
    fontWeight: '700',
    padding: '0.25rem 1rem',
    borderRadius: '30px',
    textTransform: 'uppercase',
    letterSpacing: '0.03em',
    background: 'var(--card-bg)',
    color: 'var(--highlight-color)',
    border: '1px solid rgba(69, 208, 157, 0.25)',
    boxShadow: '0 4px 10px rgba(69, 208, 157, 0.05)',
    transition: 'all 0.3s ease'
}

export const badgeBestStyle = {
    fontSize: '0.7rem',
    fontWeight: '700',
    padding: '0.25rem 1rem',
    borderRadius: '30px',
    textTransform: 'uppercase',
    letterSpacing: '0.03em',
    background: 'rgba(69, 208, 157, 0.06)',
    border: '1px solid rgba(69, 208, 157, 0.25)',
    color: 'var(--highlight-color)'
}

export const textareaStyle = {
    width: '100%',
    flex: 1,
    backgroundColor: 'var(--input-bg)',
    border: '1px solid var(--input-border)',
    borderRadius: '16px',
    padding: '0.85rem 1rem',
    color: 'var(--text-primary)',
    fontSize: '0.85rem',
    outline: 'none',
    resize: 'none',
    boxSizing: 'border-box',
    fontFamily: 'inherit',
    lineHeight: 1.5,
    transition: 'all 0.3s ease',
    minHeight: '180px',
    '&:focus': {
        borderColor: 'var(--highlight-color)',
        boxShadow: '0 0 10px rgba(69, 208, 157, 0.15)'
    }
}

export const shortTextareaStyle = {
    ...textareaStyle,
    flex: 'none',
    height: '76px',
    minHeight: '76px'
}

export const dropzoneStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '1.15rem 1rem',
    backgroundColor: 'var(--input-bg)',
    border: '2px dashed var(--input-border)',
    borderRadius: '16px',
    cursor: 'pointer',
    textAlign: 'center',
    transition: 'all 0.3s ease',
    '&:hover': {
        borderColor: 'var(--highlight-color)',
        backgroundColor: 'rgba(69, 208, 157, 0.01)'
    }
}

export const orDividerStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    color: 'var(--text-secondary)',
    fontSize: '0.75rem',
    fontWeight: '700',
    margin: '0.25rem 0',
    transition: 'color 0.3s ease'
}

export const infoBoxStyle = {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '0.6rem',
    padding: '0.6rem 0.85rem',
    backgroundColor: 'rgba(234, 43, 22, 0.03)',
    border: '1px solid rgba(234, 43, 22, 0.1)',
    borderRadius: '12px'
}

export const cardFooterStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0.85rem 1.75rem',
    borderTop: '1px solid var(--divider-color)',
    flexDirection: { xs: 'column', sm: 'row' },
    gap: '1rem',
    transition: 'all 0.3s ease'
}

export const generateButtonStyle = {
    background: 'var(--btn-bg)',
    color: 'var(--btn-text)',
    fontSize: '0.9rem',
    fontWeight: '800',
    padding: '0.75rem 1.75rem',
    border: 'none',
    borderRadius: '30px',
    cursor: 'pointer',
    boxShadow: '0 8px 20px rgba(31, 33, 37, 0.25)',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    textTransform: 'none',
    transition: 'all 0.3s ease',
    '&:hover': {
        opacity: 0.95,
        background: 'var(--text-primary)',
        boxShadow: '0 10px 25px rgba(31, 33, 37, 0.35)',
        transform: 'translateY(-1px)'
    }
}

export const recentSectionStyle = {
    width: '100%',
    maxWidth: '960px',
    marginTop: '3.5rem',
    zIndex: 1
}

export const reportsGridStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '1rem',
    marginTop: '1.25rem'
}

export const reportCardStyle = {
    background: 'var(--card-bg)',
    backdropFilter: 'blur(16px)',
    WebkitBackdropFilter: 'blur(16px)',
    border: '1px solid var(--card-border)',
    borderRadius: '16px',
    padding: '1.25rem',
    flex: { xs: '1 1 100%', sm: '1 1 calc(50% - 0.5rem)', md: '1 1 calc(33.33% - 0.67rem)' },
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
    transition: 'all 0.3s ease',
    boxSizing: 'border-box',
    '&:hover': {
        borderColor: 'var(--highlight-color)',
        boxShadow: '0 10px 20px rgba(0, 0, 0, 0.04)',
        transform: 'translateY(-2px)'
    }
}

export const matchBadgeStyle = (score) => {
    const isHigh = score >= 80
    const isMid = score >= 60
    return {
        fontSize: '0.75rem',
        fontWeight: '700',
        color: isHigh ? '#10b981' : isMid ? '#d97706' : '#ea2b16'
    }
}

export const pageFooterStyle = {
    display: 'flex',
    gap: '2rem',
    marginTop: '4rem',
    justifyContent: 'center',
    zIndex: 1
}

export const footerLinkStyle = {
    fontSize: '0.8rem',
    color: 'var(--text-secondary)',
    textDecoration: 'none',
    transition: 'color 0.2s',
    '&:hover': {
        color: 'var(--text-title)'
    }
}

export const pageWrapperStyleWithTheme = {
    ...pageWrapperStyle
}

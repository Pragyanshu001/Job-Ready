export const questionCardStyle = {
    background: 'var(--qcard-bg)',
    border: '1px solid var(--divider-color)',
    borderRadius: '16px',
    marginBottom: '0.75rem',
    overflow: 'hidden',
    boxSizing: 'border-box',
    transition: 'all 0.3s ease',
    '&:hover': {
        borderColor: 'rgba(234, 43, 22, 0.25)',
        boxShadow: '0 4px 15px rgba(234, 43, 22, 0.05)'
    }
}

export const questionHeaderStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    padding: '1.25rem 1rem',
    cursor: 'pointer',
    userSelect: 'none'
}

export const questionIndexBadgeStyle = {
    background: 'rgba(69, 208, 157, 0.06)',
    color: 'var(--highlight-color)',
    border: '1px solid rgba(69, 208, 157, 0.25)',
    borderRadius: '30px',
    fontSize: '0.75rem',
    fontWeight: '700',
    padding: '0.2rem 0.6rem'
}

export const questionTextStyle = {
    flex: 1,
    margin: 0,
    fontSize: '0.9rem',
    fontWeight: '700',
    color: 'var(--text-title)',
    lineHeight: 1.5,
    transition: 'color 0.3s ease'
}

export const questionChevronStyle = (open) => ({
    color: 'var(--text-secondary)',
    transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
    transition: 'transform 0.2s',
    display: 'flex',
    alignItems: 'center'
})

export const questionBodyStyle = {
    padding: '1.25rem',
    borderTop: '1px solid var(--divider-color)',
    background: 'var(--qcard-body-bg)',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    transition: 'all 0.3s ease'
}

export const questionSectionStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.4rem'
}

export const questionTagStyle = (type) => ({
    fontSize: '0.68rem',
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: '0.06em',
    padding: '0.2rem 0.6rem',
    borderRadius: '20px',
    width: 'fit-content',
    background: type === 'intention' ? 'rgba(13, 148, 136, 0.06)' : 'rgba(235, 118, 60, 0.06)',
    border: `1px solid ${type === 'intention' ? 'rgba(13, 148, 136, 0.2)' : 'rgba(235, 118, 60, 0.2)'}`,
    color: type === 'intention' ? '#0d9488' : '#EB763C'
})

export const questionBodyTextStyle = {
    margin: 0,
    fontSize: '0.835rem',
    color: 'var(--text-secondary)',
    lineHeight: 1.6,
    transition: 'color 0.3s ease'
}

export const roadmapCardStyle = {
    background: 'var(--qcard-bg)',
    border: '1px solid var(--divider-color)',
    borderRadius: '16px',
    padding: '1.25rem',
    marginBottom: '1rem',
    boxSizing: 'border-box',
    transition: 'all 0.3s ease'
}

export const roadmapHeaderStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    marginBottom: '0.75rem'
}

export const roadmapBadgeStyle = {
    background: 'rgba(69, 208, 157, 0.06)',
    border: '1px solid rgba(69, 208, 157, 0.25)',
    color: 'var(--highlight-color)',
    fontSize: '0.75rem',
    fontWeight: '700',
    padding: '0.2rem 0.6rem',
    borderRadius: '30px',
    textTransform: 'uppercase',
    letterSpacing: '0.03em'
}

export const roadmapFocusStyle = {
    fontSize: '1rem',
    fontWeight: '700',
    color: 'var(--text-title)',
    margin: 0,
    transition: 'color 0.3s ease'
}

export const roadmapListStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
    padding: 0,
    margin: 0,
    listStyle: 'none'
}

export const roadmapItemStyle = {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '0.6rem',
    fontSize: '0.85rem',
    color: 'var(--text-secondary)',
    lineHeight: 1.5,
    transition: 'color 0.3s ease'
}

export const roadmapBulletStyle = {
    width: '6px',
    height: '6px',
    borderRadius: '50%',
    background: 'var(--highlight-color)',
    marginTop: '6px',
    flexShrink: 0
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

export const layoutContainerStyle = {
    width: '100%',
    maxWidth: '1100px',
    background: 'var(--card-bg)',
    backdropFilter: 'blur(16px)',
    WebkitBackdropFilter: 'blur(16px)',
    border: '1px solid var(--card-border)',
    borderRadius: '24px',
    display: 'flex',
    minHeight: '600px',
    overflow: 'hidden',
    boxShadow: 'var(--card-shadow)',
    flexDirection: { xs: 'column', md: 'row' },
    zIndex: 1,
    transition: 'all 0.3s ease'
}

export const navPanelStyle = {
    width: { xs: '100%', md: '240px' },
    padding: '1.75rem 1.25rem',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    borderRight: { xs: 'none', md: '1px solid var(--divider-color)' },
    borderBottom: { xs: '1px solid var(--divider-color)', md: 'none' },
    flexShrink: 0,
    boxSizing: 'border-box',
    transition: 'all 0.3s ease'
}

export const contentPanelStyle = {
    flex: 1,
    padding: '2rem',
    display: 'flex',
    flexDirection: 'column',
    boxSizing: 'border-box',
    overflowY: 'auto'
}

export const rightPanelStyle = {
    width: { xs: '100%', md: '260px' },
    padding: '2rem 1.5rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '1.75rem',
    alignItems: 'center',
    borderLeft: { xs: 'none', md: '1px solid var(--divider-color)' },
    borderTop: { xs: '1px solid var(--divider-color)', md: 'none' },
    flexShrink: 0,
    boxSizing: 'border-box',
    transition: 'all 0.3s ease'
}

export const navLabelStyle = {
    fontSize: '0.75rem',
    fontWeight: '700',
    color: 'var(--text-secondary)',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    marginBottom: '0.75rem',
    paddingLeft: '0.5rem',
    transition: 'color 0.3s ease'
}

export const navButtonStyle = (isActive) => ({
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    padding: '0.75rem 1rem',
    background: isActive ? 'rgba(69, 208, 157, 0.06)' : 'none',
    color: isActive ? 'var(--highlight-color)' : 'var(--text-secondary)',
    border: isActive ? '1px solid rgba(69, 208, 157, 0.2)' : '1px solid transparent',
    borderRadius: '30px',
    fontSize: '0.85rem',
    fontWeight: '600',
    cursor: 'pointer',
    textTransform: 'none',
    justifyContent: 'flex-start',
    marginBottom: '0.5rem',
    transition: 'all 0.3s ease',
    '&:hover': {
        background: 'var(--btn-hover-bg)',
        color: 'var(--highlight-color)'
    }
})

export const downloadButtonStyle = {
    background: 'var(--btn-bg)',
    color: 'var(--btn-text)',
    fontSize: '0.8rem',
    fontWeight: '800',
    padding: '0.75rem',
    borderRadius: '30px',
    border: 'none',
    cursor: 'pointer',
    boxShadow: '0 8px 20px rgba(31, 33, 37, 0.25)',
    textTransform: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    width: '100%',
    marginTop: '1.5rem',
    transition: 'all 0.3s ease',
    '&:hover': {
        opacity: 0.95,
        background: 'var(--text-primary)',
        boxShadow: '0 10px 25px rgba(31, 33, 37, 0.35)',
        transform: 'translateY(-1px)'
    },
    '&.Mui-disabled': {
        background: 'var(--btn-bg)',
        color: 'var(--btn-text)',
        opacity: 0.6
    }
}

export const contentHeaderStyle = {
    display: 'flex',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    borderBottom: '1px solid var(--divider-color)',
    paddingBottom: '1rem',
    marginBottom: '1.5rem',
    transition: 'all 0.3s ease'
}

export const getScoreColorClass = (score) => {
    if (score >= 80) return '#10b981' // high
    if (score >= 60) return '#d97706' // mid
    return '#ea2b16' // low
}

export const scoreCircleStyle = (score) => ({
    width: '120px',
    height: '120px',
    borderRadius: '50%',
    border: `5px solid ${getScoreColorClass(score)}`,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0.5rem 0',
    background: 'var(--sidebar-score-bg)',
    boxShadow: `0 0 30px rgba(${score >= 80 ? '16,185,129' : score >= 60 ? '217,119,6' : '234,43,22'}, 0.15)`,
    transition: 'all 0.3s ease'
})

export const getSeverityStyle = (severity) => {
    if (severity === 'high') return { border: '1px solid rgba(234, 43, 22, 0.25)', color: '#ea2b16', bg: 'rgba(234, 43, 22, 0.06)' }
    if (severity === 'medium') return { border: '1px solid rgba(217, 119, 6, 0.25)', color: '#d97706', bg: 'rgba(217, 119, 6, 0.06)' }
    return { border: '1px solid rgba(16, 185, 129, 0.25)', color: '#10b981', bg: 'rgba(16, 185, 129, 0.06)' }
}

export const skillTagStyle = (severity) => {
    const colors = getSeverityStyle(severity)
    return {
        fontSize: '0.7rem',
        fontWeight: '700',
        padding: '0.25rem 0.6rem',
        borderRadius: '20px',
        backgroundColor: colors.bg,
        color: colors.color,
        border: colors.border,
        textTransform: 'uppercase',
        letterSpacing: '0.03em'
    }
}

export const panelTitleStyle = {
    fontSize: '1.15rem',
    fontWeight: '700',
    color: 'var(--text-title)',
    transition: 'color 0.3s ease'
}

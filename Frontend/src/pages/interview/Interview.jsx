import React, { useState, useEffect } from 'react'
import { useInterview } from '../../hooks/useInterview.js'
import { useNavigate, useParams } from 'react-router'
import { Box, Typography, Button } from '@mui/material'
import Navbar from '../../components/Navbar.jsx'
import Loader from '../../components/Loader.jsx'
import VoicePractice from '../../components/VoicePractice.jsx'
import { Code, MessageSquare, Compass, Mic, ChevronDown, Download } from 'lucide-react'

const NAV_ITEMS = [
    { id: 'technical', label: 'Technical Questions', icon: <Code size={16} /> },
    { id: 'behavioral', label: 'Behavioral Questions', icon: <MessageSquare size={16} /> },
    { id: 'roadmap', label: 'Road Map', icon: <Compass size={16} /> },
    { id: 'voice-practice', label: 'Voice AI Practice 🎙️', icon: <Mic size={16} strokeWidth={2.5} /> },
]

// ── Sub-components ────────────────────────────────────────────────────────────
const QuestionCard = ({ item, index }) => {
    const [open, setOpen] = useState(false)

    const cardStyle = {
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

    const headerStyle = {
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        padding: '1.25rem 1rem',
        cursor: 'pointer',
        userSelect: 'none'
    }

    const indexBadgeStyle = {
        background: 'rgba(69, 208, 157, 0.06)',
        color: 'var(--highlight-color)',
        border: '1px solid rgba(69, 208, 157, 0.25)',
        borderRadius: '30px',
        fontSize: '0.75rem',
        fontWeight: '700',
        padding: '0.2rem 0.6rem'
    }

    const questionTextStyle = {
        flex: 1,
        margin: 0,
        fontSize: '0.9rem',
        fontWeight: '700',
        color: 'var(--text-title)',
        lineHeight: 1.5,
        transition: 'color 0.3s ease'
    }

    const chevronStyle = {
        color: 'var(--text-secondary)',
        transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
        transition: 'transform 0.2s',
        display: 'flex',
        alignItems: 'center'
    }

    const bodyStyle = {
        padding: '1.25rem',
        borderTop: '1px solid var(--divider-color)',
        background: 'var(--qcard-body-bg)',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        transition: 'all 0.3s ease'
    }

    const sectionStyle = {
        display: 'flex',
        flexDirection: 'column',
        gap: '0.4rem'
    }

    const tagStyle = (type) => ({
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

    const bodyTextStyle = {
        margin: 0,
        fontSize: '0.835rem',
        color: 'var(--text-secondary)',
        lineHeight: 1.6,
        transition: 'color 0.3s ease'
    }

    return (
        <Box sx={cardStyle}>
            <Box sx={headerStyle} onClick={() => setOpen(o => !o)}>
                <Box component="span" sx={indexBadgeStyle}>Q{index + 1}</Box>
                <Typography component="p" sx={questionTextStyle}>{item.question}</Typography>
                <Box component="span" sx={chevronStyle}>
                    <ChevronDown size={16} strokeWidth={2} />
                </Box>
            </Box>
            {open && (
                <Box sx={bodyStyle}>
                    <Box sx={sectionStyle}>
                        <Box component="span" sx={tagStyle('intention')}>Intention</Box>
                        <Typography component="p" sx={bodyTextStyle}>{item.intention}</Typography>
                    </Box>
                    <Box sx={sectionStyle}>
                        <Box component="span" sx={tagStyle('answer')}>Model Answer</Box>
                        <Typography component="p" sx={bodyTextStyle}>{item.answer}</Typography>
                    </Box>
                </Box>
            )}
        </Box>
    )
}

const RoadMapDay = ({ day }) => {
    const cardStyle = {
        background: 'var(--qcard-bg)',
        border: '1px solid var(--divider-color)',
        borderRadius: '16px',
        padding: '1.25rem',
        marginBottom: '1rem',
        boxSizing: 'border-box',
        transition: 'all 0.3s ease'
    }

    const headerStyle = {
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        marginBottom: '0.75rem'
    }

    const badgeStyle = {
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

    const focusStyle = {
        fontSize: '1rem',
        fontWeight: '700',
        color: 'var(--text-title)',
        margin: 0,
        transition: 'color 0.3s ease'
    }

    const listStyle = {
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem',
        padding: 0,
        margin: 0,
        listStyle: 'none'
    }

    const itemStyle = {
        display: 'flex',
        alignItems: 'flex-start',
        gap: '0.6rem',
        fontSize: '0.85rem',
        color: 'var(--text-secondary)',
        lineHeight: 1.5,
        transition: 'color 0.3s ease'
    }

    const bulletStyle = {
        width: '6px',
        height: '6px',
        borderRadius: '50%',
        background: 'var(--highlight-color)',
        marginTop: '6px',
        flexShrink: 0
    }

    return (
        <Box sx={cardStyle}>
            <Box sx={headerStyle}>
                <Box component="span" sx={badgeStyle}>Day {day.day}</Box>
                <Typography component="h3" sx={focusStyle}>{day.focus}</Typography>
            </Box>
            <Box component="ul" sx={listStyle}>
                {day.tasks.map((task, i) => (
                    <Box component="li" key={i} sx={itemStyle}>
                        <Box component="span" sx={bulletStyle} />
                        {task}
                    </Box>
                ))}
            </Box>
        </Box>
    )
}

// ── Main Component ────────────────────────────────────────────────────────────
const Interview = () => {
    const [activeNav, setActiveNav] = useState('technical')
    const { report, getReportById, loading, getResumePdf } = useInterview()
    const { interviewId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if (interviewId) {
            getReportById(interviewId)
        }
    }, [interviewId])

    if (loading || !report) {
        return <Loader message="Loading strategy plan..." />
    }

    // Styles for original three-column layout in MUI
    const pageWrapperStyle = {
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

    const layoutContainerStyle = {
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

    const navPanelStyle = {
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

    const contentPanelStyle = {
        flex: 1,
        padding: '2rem',
        display: 'flex',
        flexDirection: 'column',
        boxSizing: 'border-box',
        overflowY: 'auto'
    }

    const rightPanelStyle = {
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

    const navLabelStyle = {
        fontSize: '0.75rem',
        fontWeight: '700',
        color: 'var(--text-secondary)',
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
        marginBottom: '0.75rem',
        paddingLeft: '0.5rem',
        transition: 'color 0.3s ease'
    }

    const navButtonStyle = (isActive) => ({
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

    const downloadButtonStyle = {
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
        }
    }

    const contentHeaderStyle = {
        display: 'flex',
        alignItems: 'baseline',
        justifyContent: 'space-between',
        borderBottom: '1px solid var(--divider-color)',
        paddingBottom: '1rem',
        marginBottom: '1.5rem',
        transition: 'all 0.3s ease'
    }

    const getScoreColorClass = (score) => {
        if (score >= 80) return '#10b981' // high
        if (score >= 60) return '#d97706' // mid
        return '#ea2b16' // low
    }

    const scoreCircleStyle = {
        width: '120px',
        height: '120px',
        borderRadius: '50%',
        border: `5px solid ${getScoreColorClass(report.matchScore)}`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '0.5rem 0',
        background: 'var(--sidebar-score-bg)',
        boxShadow: `0 0 30px rgba(${report.matchScore >= 80 ? '16,185,129' : report.matchScore >= 60 ? '217,119,6' : '234,43,22'}, 0.15)`,
        transition: 'all 0.3s ease'
    }

    const getSeverityStyle = (severity) => {
        if (severity === 'high') return { border: '1px solid rgba(234, 43, 22, 0.25)', color: '#ea2b16', bg: 'rgba(234, 43, 22, 0.06)' }
        if (severity === 'medium') return { border: '1px solid rgba(217, 119, 6, 0.25)', color: '#d97706', bg: 'rgba(217, 119, 6, 0.06)' }
        return { border: '1px solid rgba(16, 185, 129, 0.25)', color: '#10b981', bg: 'rgba(16, 185, 129, 0.06)' }
    }

    const skillTagStyle = (severity) => {
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

    const panelTitleStyle = {
        fontSize: '1.15rem',
        fontWeight: '700',
        color: 'var(--text-title)',
        transition: 'color 0.3s ease'
    }

    return (
        <Box sx={pageWrapperStyle}>
            {/* Glowing background shapes wrapped to prevent horizontal overflow */}
            <Box sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                overflow: 'hidden',
                pointerEvents: 'none',
                zIndex: 0
            }}>
                <Box sx={{
                    position: 'absolute',
                    top: '10%',
                    right: '-5%',
                    width: '600px',
                    height: '600px',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(234, 43, 22, 0.18) 0%, rgba(255, 59, 38, 0.05) 50%, transparent 70%)',
                    filter: 'blur(60px)'
                }} />
                <Box sx={{
                    position: 'absolute',
                    bottom: '-10%',
                    left: '-5%',
                    width: '500px',
                    height: '500px',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(255, 255, 255, 0.8) 0%, transparent 70%)',
                    filter: 'blur(50px)'
                }} />
            </Box>

            {/* Sticky glassmorphic navbar */}
            <Navbar maxWidth="1100px" marginBottom="2rem" />

            {/* Layout Box */}
            <Box sx={layoutContainerStyle}>

                {/* ── Left Navigation ── */}
                <Box sx={navPanelStyle}>
                    <Box>
                        <Typography sx={navLabelStyle}>Sections</Typography>
                        {NAV_ITEMS.map(item => (
                            <Button
                                key={item.id}
                                onClick={() => setActiveNav(item.id)}
                                sx={navButtonStyle(activeNav === item.id)}
                            >
                                {item.icon}
                                <Box component="span" sx={{ marginLeft: '0.5rem' }}>{item.label}</Box>
                            </Button>
                        ))}
                    </Box>

                    <Button
                        onClick={() => getResumePdf(interviewId)}
                        sx={downloadButtonStyle}
                    >
                        <Download size={16} strokeWidth={2.5} style={{ marginRight: '0.25rem' }} />
                        Download Resume
                    </Button>
                </Box>

                {/* ── Center Content ── */}
                <Box sx={contentPanelStyle}>
                    {activeNav === 'technical' && (
                        <Box>
                            <Box sx={contentHeaderStyle}>
                                <Typography component="h2" sx={panelTitleStyle}>
                                    Technical Questions
                                </Typography>
                                <Typography sx={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                                    {report.technicalQuestions.length} questions
                                </Typography>
                            </Box>
                            <Box>
                                {report.technicalQuestions.map((q, i) => (
                                    <QuestionCard key={i} item={q} index={i} />
                                ))}
                            </Box>
                        </Box>
                    )}

                    {activeNav === 'behavioral' && (
                        <Box>
                            <Box sx={contentHeaderStyle}>
                                <Typography component="h2" sx={panelTitleStyle}>
                                    Behavioral Questions
                                </Typography>
                                <Typography sx={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                                    {report.behavioralQuestions.length} questions
                                </Typography>
                            </Box>
                            <Box>
                                {report.behavioralQuestions.map((q, i) => (
                                    <QuestionCard key={i} item={q} index={i} />
                                ))}
                            </Box>
                        </Box>
                    )}

                    {activeNav === 'roadmap' && (
                        <Box>
                            <Box sx={contentHeaderStyle}>
                                <Typography component="h2" sx={panelTitleStyle}>
                                    Preparation Roadmap
                                </Typography>
                                <Typography sx={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                                    {report.preparationPlan.length}-day plan
                                </Typography>
                            </Box>
                            <Box>
                                {report.preparationPlan.map((day) => (
                                    <RoadMapDay key={day.day} day={day} />
                                ))}
                            </Box>
                        </Box>
                    )}

                    {activeNav === 'voice-practice' && (
                        <VoicePractice 
                            report={report} 
                            onRefresh={() => getReportById(interviewId)} 
                        />
                    )}
                </Box>

                {/* ── Right Sidebar ── */}
                <Box sx={rightPanelStyle}>
                    {/* Match Score */}
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
                        <Typography sx={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                            Match Score
                        </Typography>
                        <Box sx={scoreCircleStyle}>
                            <Typography sx={{ fontSize: '2.5rem', fontWeight: 900, color: 'var(--text-title)', lineHeight: 1 }}>
                                {report.matchScore}
                            </Typography>
                            <Typography sx={{ fontSize: '0.7rem', color: 'var(--text-secondary)', fontWeight: 700, textTransform: 'uppercase' }}>
                                percent
                            </Typography>
                        </Box>
                        <Typography sx={{ fontSize: '0.8rem', color: '#ea2b16', fontWeight: 600, marginTop: '0.5rem' }}>
                            Strong match for this role
                        </Typography>
                    </Box>

                    <Box sx={{ width: '100%', height: '1px', backgroundColor: 'var(--divider-color)' }} />

                    {/* Skill Gaps */}
                    <Box sx={{ width: '100%' }}>
                        <Typography sx={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.75rem', display: 'block' }}>
                            Skill Gaps
                        </Typography>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                            {report.skillGaps.map((gap, i) => (
                                <Box component="span" key={i} sx={skillTagStyle(gap.severity)}>
                                    {gap.skill}
                                </Box>
                            ))}
                        </Box>
                    </Box>
                </Box>

            </Box>
        </Box>
    )
}

export default Interview
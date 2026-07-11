import React, { useState, useEffect } from 'react'
import { useInterview } from '../../hooks/useInterview.js'
import { useNavigate, useParams } from 'react-router'
import { Box, Typography, Button, CircularProgress } from '@mui/material'
import Navbar from '../../components/Navbar.jsx'
import Loader from '../../components/Loader.jsx'
import VoicePractice from '../../components/VoicePractice.jsx'
import { Code, MessageSquare, Compass, Mic, ChevronDown, Download } from 'lucide-react'
import {
    questionCardStyle,
    questionHeaderStyle,
    questionIndexBadgeStyle,
    questionTextStyle,
    questionChevronStyle,
    questionBodyStyle,
    questionSectionStyle,
    questionTagStyle,
    questionBodyTextStyle,
    roadmapCardStyle,
    roadmapHeaderStyle,
    roadmapBadgeStyle,
    roadmapFocusStyle,
    roadmapListStyle,
    roadmapItemStyle,
    roadmapBulletStyle,
    pageWrapperStyle,
    layoutContainerStyle,
    navPanelStyle,
    contentPanelStyle,
    rightPanelStyle,
    navLabelStyle,
    navButtonStyle,
    downloadButtonStyle,
    contentHeaderStyle,
    scoreCircleStyle,
    skillTagStyle,
    panelTitleStyle
} from './Interview.styles.js'

const NAV_ITEMS = [
    { id: 'technical', label: 'Technical Quest.', icon: <Code size={16} /> },
    { id: 'behavioral', label: 'Behavioral Quest.', icon: <MessageSquare size={16} /> },
    { id: 'roadmap', label: 'Road Map', icon: <Compass size={16} /> },
    { id: 'voice-practice', label: 'Voice AI Practice', icon: <Mic size={16} strokeWidth={2.5} /> },
]

// ── Sub-components ────────────────────────────────────────────────────────────
const QuestionCard = ({ item, index }) => {
    const [open, setOpen] = useState(false)

    return (
        <Box sx={questionCardStyle}>
            <Box sx={questionHeaderStyle} onClick={() => setOpen(o => !o)}>
                <Box component="span" sx={questionIndexBadgeStyle}>Q{index + 1}</Box>
                <Typography component="p" sx={questionTextStyle}>{item.question}</Typography>
                <Box component="span" sx={questionChevronStyle(open)}>
                    <ChevronDown size={16} strokeWidth={2} />
                </Box>
            </Box>
            {open && (
                <Box sx={questionBodyStyle}>
                    <Box sx={questionSectionStyle}>
                        <Box component="span" sx={questionTagStyle('intention')}>Intention</Box>
                        <Typography component="p" sx={questionBodyTextStyle}>{item.intention}</Typography>
                    </Box>
                    <Box sx={questionSectionStyle}>
                        <Box component="span" sx={questionTagStyle('answer')}>Model Answer</Box>
                        <Typography component="p" sx={questionBodyTextStyle}>{item.answer}</Typography>
                    </Box>
                </Box>
            )}
        </Box>
    )
}

const RoadMapDay = ({ day }) => {

    return (
        <Box sx={roadmapCardStyle}>
            <Box sx={roadmapHeaderStyle}>
                <Box component="span" sx={roadmapBadgeStyle}>Day {day.day}</Box>
                <Typography component="h3" sx={roadmapFocusStyle}>{day.focus}</Typography>
            </Box>
            <Box component="ul" sx={roadmapListStyle}>
                {day.tasks.map((task, i) => (
                    <Box component="li" key={i} sx={roadmapItemStyle}>
                        <Box component="span" sx={roadmapBulletStyle} />
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

    if (!report || report._id !== interviewId) {
        return <Loader message="Loading..." />
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
                        disabled={loading}
                        sx={downloadButtonStyle}
                    >
                        {loading ? (
                            <>
                                <CircularProgress size={16} sx={{ color: 'inherit', marginRight: '0.5rem' }} />
                                Downloading...
                            </>
                        ) : (
                            <>
                                <Download size={16} strokeWidth={2.5} style={{ marginRight: '0.25rem' }} />
                                Download Resume
                            </>
                        )}
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
                        <Box sx={scoreCircleStyle(report.matchScore)}>
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
        </Box >
    )
}

export default Interview

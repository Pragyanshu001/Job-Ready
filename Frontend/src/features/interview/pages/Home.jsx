import React, { useState, useRef } from 'react'
import { useInterview } from '../hooks/useInterview.js'
import { useNavigate } from 'react-router'
import { Box, Typography, Button } from '@mui/material'
import { useSnackbar } from '../../../snackbar.context.jsx'
import Navbar from '../../../components/Navbar.jsx'

const Home = () => {

    const { loading, generateReport, reports } = useInterview()
    const { showSnackbar } = useSnackbar()
    const [jobDescription, setJobDescription] = useState("")
    const [selfDescription, setSelfDescription] = useState("")
    const [fileName, setFileName] = useState("")
    const resumeInputRef = useRef()

    const navigate = useNavigate()

    const handleGenerateReport = async () => {
        const resumeFile = resumeInputRef.current.files[0]
        if (!jobDescription.trim()) {
            showSnackbar("Please paste the Target Job Description.", "warning")
            return
        }
        if (!resumeFile && !selfDescription.trim()) {
            showSnackbar("Either a Resume or a Self Description is required.", "warning")
            return
        }
        const data = await generateReport({ jobDescription, selfDescription, resumeFile })
        if (data && data._id) {
            showSnackbar("Strategy report generated successfully!", "success")
            navigate(`/interview/${data._id}`)
        }
    }

    const panelTitleStyle = {
        fontSize: '1.1rem',
        fontWeight: '700',
        color: 'var(--text-title)',
        flex: 1,
        transition: 'color 0.3s ease'
    }



    const labelStyle = {
        fontSize: '0.875rem',
        fontWeight: '600',
        color: 'var(--text-primary)',
        transition: 'color 0.3s ease'
    }

    const dropzoneTitleStyle = {
        fontSize: '0.85rem',
        fontWeight: '600',
        color: 'var(--text-title)',
        transition: 'color 0.3s ease'
    }

    const dropzoneSubStyle = {
        fontSize: '0.72rem',
        color: 'var(--text-secondary)',
        transition: 'color 0.3s ease'
    }

    const fileNameStyle = {
        fontSize: '0.85rem',
        fontWeight: '600',
        color: '#10b981',
        wordBreak: 'break-all'
    }

    const removeFileLinkStyle = {
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

    const infoBoxTextStyle = {
        fontSize: '0.78rem',
        color: 'var(--text-secondary)',
        lineHeight: '1.45',
        transition: 'color 0.3s ease'
    }

    const cardFooterTextStyle = {
        fontSize: '0.8rem',
        color: 'var(--text-secondary)',
        transition: 'color 0.3s ease'
    }

    const recentCardTitleStyle = {
        fontSize: '0.95rem',
        fontWeight: '700',
        color: 'var(--text-title)',
        transition: 'color 0.3s ease'
    }

    const recentCardDateStyle = {
        fontSize: '0.75rem',
        color: 'var(--text-secondary)',
        transition: 'color 0.3s ease'
    }

    const loadingTitleStyle = {
        fontSize: '1.1rem',
        fontWeight: '700',
        color: '#1e293b',
        marginBottom: '0.25rem'
    }

    const loadingSubStyle = {
        fontSize: '0.85rem',
        color: '#64748b'
    }


    if (loading) {
        return (
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '100vh',
                backgroundColor: '#eef2f6',
                color: '#1e293b',
                fontFamily: 'system-ui, -apple-system, sans-serif'
            }}>
                <Box sx={{ textAlign: 'center' }}>
                    <Box sx={{
                        width: '50px',
                        height: '50px',
                        border: '4px solid #ea2b16',
                        borderTop: '4px solid transparent',
                        borderRadius: '50%',
                        margin: '0 auto 1.5rem auto',
                        animation: 'spin 1s linear infinite'
                    }} />
                    <Typography variant="h6" sx={loadingTitleStyle}>ANALYZING PROFILE...</Typography>
                    <Typography variant="body2" sx={loadingSubStyle}>This takes about 30 seconds</Typography>
                </Box>
                <style>{`
                    @keyframes spin {
                        0% { transform: rotate(0deg); }
                        100% { transform: rotate(360deg); }
                    }
                `}</style>
            </Box>
        )
    }

    // Styles for original two-column layout using MUI
    // Styles for original two-column layout using MUI
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


    const headerWrapperStyle = {
        textAlign: 'center',
        marginBottom: '2.5rem',
        width: '100%',
        zIndex: 1
    }

    const mainTitleStyle = {
        fontSize: '2.5rem',
        fontWeight: '800',
        marginBottom: '0.75rem',
        color: 'var(--text-title)',
        letterSpacing: '-0.02em',
        transition: 'color 0.3s ease'
    }

    const highlightStyle = {
        background: 'var(--highlight-gradient)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent'
    }

    const subtitleStyle = {
        color: 'var(--text-secondary)',
        fontSize: '1rem',
        maxWidth: '520px',
        margin: '0 auto',
        lineHeight: '1.6',
        transition: 'color 0.3s ease'
    }

    const cardStyle = {
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

    const cardBodyStyle = {
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        minHeight: '480px'
    }

    const leftPanelStyle = {
        flex: 1,
        padding: '1.5rem 1.75rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem'
    }

    const rightPanelStyle = {
        flex: 1,
        padding: '1.5rem 1.75rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.85rem',
        borderLeft: { xs: 'none', md: '1px solid var(--divider-color)' },
        borderTop: { xs: '1px solid var(--divider-color)', md: 'none' },
        transition: 'all 0.3s ease'
    }

    const panelHeaderStyle = {
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        marginBottom: '0.25rem'
    }

    const iconWrapperStyle = {
        display: 'flex',
        alignItems: 'center',
        color: '#ea2b16'
    }

    const badgeStyle = {
        fontSize: '0.7rem',
        fontWeight: '700',
        padding: '0.25rem 1rem',
        borderRadius: '30px',
        textTransform: 'uppercase',
        letterSpacing: '0.03em',
        background: 'var(--card-bg)',
        color: '#ea2b16',
        border: '1px solid rgba(234, 43, 22, 0.25)',
        boxShadow: '0 4px 10px rgba(234, 43, 22, 0.05)',
        transition: 'all 0.3s ease'
    }

    const badgeBestStyle = {
        fontSize: '0.7rem',
        fontWeight: '700',
        padding: '0.25rem 1rem',
        borderRadius: '30px',
        textTransform: 'uppercase',
        letterSpacing: '0.03em',
        background: 'rgba(234, 43, 22, 0.06)',
        border: '1px solid rgba(234, 43, 22, 0.25)',
        color: '#ea2b16'
    }

    const textareaStyle = {
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
            borderColor: '#ea2b16',
            boxShadow: '0 0 10px rgba(234, 43, 22, 0.15)'
        }
    }

    const shortTextareaStyle = {
        ...textareaStyle,
        flex: 'none',
        height: '76px',
        minHeight: '76px'
    }

    const dropzoneStyle = {
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
            borderColor: '#ea2b16',
            backgroundColor: 'rgba(234, 43, 22, 0.01)'
        }
    }

    const orDividerStyle = {
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        color: 'var(--text-secondary)',
        fontSize: '0.75rem',
        fontWeight: '700',
        margin: '0.25rem 0',
        transition: 'color 0.3s ease'
    }

    const infoBoxStyle = {
        display: 'flex',
        alignItems: 'flex-start',
        gap: '0.6rem',
        padding: '0.6rem 0.85rem',
        backgroundColor: 'rgba(234, 43, 22, 0.03)',
        border: '1px solid rgba(234, 43, 22, 0.1)',
        borderRadius: '12px'
    }

    const cardFooterStyle = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0.85rem 1.75rem',
        borderTop: '1px solid var(--divider-color)',
        flexDirection: { xs: 'column', sm: 'row' },
        gap: '1rem',
        transition: 'all 0.3s ease'
    }

    const generateButtonStyle = {
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

    const recentSectionStyle = {
        width: '100%',
        maxWidth: '960px',
        marginTop: '3.5rem',
        zIndex: 1
    }

    const reportsGridStyle = {
        display: 'flex',
        flexWrap: 'wrap',
        gap: '1rem',
        marginTop: '1.25rem'
    }

    const reportCardStyle = {
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

    const matchBadgeStyle = (score) => {
        const isHigh = score >= 80
        const isMid = score >= 60
        return {
            fontSize: '0.75rem',
            fontWeight: '700',
            color: isHigh ? '#10b981' : isMid ? '#d97706' : '#ea2b16'
        }
    }

    const pageFooterStyle = {
        display: 'flex',
        gap: '2rem',
        marginTop: '4rem',
        justifyContent: 'center',
        zIndex: 1
    }

    const footerLinkStyle = {
        fontSize: '0.8rem',
        color: 'var(--text-secondary)',
        textDecoration: 'none',
        transition: 'color 0.2s',
        '&:hover': {
            color: 'var(--text-title)'
        }
    }

    const pageWrapperStyleWithTheme = {
        ...pageWrapperStyle
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
            <Navbar maxWidth="960px" marginBottom="2.5rem" />

            {/* Page Header */}
            <Box sx={headerWrapperStyle}>
                <Box sx={{
                    display: 'inline-block',
                    background: '#fff',
                    border: '1px solid rgba(234, 43, 22, 0.25)',
                    borderRadius: '30px',
                    color: '#ea2b16',
                    fontSize: '0.75rem',
                    fontWeight: '700',
                    padding: '0.35rem 1.25rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    marginBottom: '1.25rem',
                    boxShadow: '0 4px 10px rgba(234, 43, 22, 0.05)'
                }}>
                    ⚡ AI-Powered Strategy Planner
                </Box>
                <Typography component="h1" sx={mainTitleStyle}>
                    Create Your Custom <Box component="span" sx={highlightStyle}>Interview Plan</Box>
                </Typography>
                <Typography component="p" sx={subtitleStyle}>
                    Let our AI analyze the job requirements and your unique profile to build a winning strategy.
                </Typography>
            </Box>

            {/* Main Card */}
            <Box sx={cardStyle}>
                <Box sx={cardBodyStyle}>

                    {/* Left Column - Job Description */}
                    <Box sx={leftPanelStyle}>
                        <Box sx={panelHeaderStyle}>
                            <Box sx={iconWrapperStyle}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /></svg>
                            </Box>
                            <Typography component="h2" sx={panelTitleStyle}>Target Job Description</Typography>
                            <Box component="span" sx={badgeStyle}>Required</Box>
                        </Box>
                        <Box
                            component="textarea"
                            value={jobDescription}
                            onChange={(e) => setJobDescription(e.target.value)}
                            sx={textareaStyle}
                            placeholder={`Paste the full job description here...\ne.g. 'Senior Frontend Engineer at Google requires proficiency in React, TypeScript, and large-scale system design...'`}
                        />
                    </Box>

                    {/* Right Column - Your Profile */}
                    <Box sx={rightPanelStyle}>
                        <Box sx={panelHeaderStyle}>
                            <Box sx={iconWrapperStyle}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                            </Box>
                            <Typography component="h2" sx={panelTitleStyle}>Your Profile</Typography>
                        </Box>

                        {/* Resume Upload */}
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <Typography sx={labelStyle}>Upload Resume</Typography>
                                <Box component="span" sx={badgeBestStyle}>Best Results</Box>
                            </Box>

                            <Box
                                component="label"
                                sx={dropzoneStyle}
                                htmlFor="resume"
                            >
                                {fileName ? (
                                    <>
                                        <Box component="span" sx={{ color: '#10b981', marginBottom: '0.25rem' }}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                                        </Box>
                                        <Typography sx={fileNameStyle}>{fileName}</Typography>
                                        <Typography
                                            onClick={(e) => {
                                                e.preventDefault();
                                                e.stopPropagation();
                                                setFileName("");
                                                resumeInputRef.current.value = "";
                                            }}
                                            sx={removeFileLinkStyle}
                                        >
                                            Remove file
                                        </Typography>
                                    </>
                                ) : (
                                    <>
                                        <Box component="span" sx={{ color: '#ea2b16', marginBottom: '0.15rem', display: 'flex' }}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 16 12 12 8 16" /><line x1="12" y1="12" x2="12" y2="21" /><path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" /></svg>
                                        </Box>
                                        <Typography sx={dropzoneTitleStyle}>Click to upload PDF resume</Typography>
                                        <Typography sx={dropzoneSubStyle}>PDF only (Max 5MB)</Typography>
                                    </>
                                )}
                                <input
                                    ref={resumeInputRef}
                                    hidden
                                    type='file'
                                    id='resume'
                                    name='resume'
                                    accept='.pdf'
                                    onChange={(e) => {
                                        const file = e.target.files[0];
                                        if (file) {
                                            setFileName(file.name);
                                        } else {
                                            setFileName("");
                                        }
                                    }}
                                />
                            </Box>
                        </Box>

                        {/* OR Divider */}
                        <Box sx={orDividerStyle}>
                            <Box sx={{ flex: 1, height: '1px', backgroundColor: 'var(--divider-color)' }} />
                            <Box component="span">OR</Box>
                            <Box sx={{ flex: 1, height: '1px', backgroundColor: 'var(--divider-color)' }} />
                        </Box>

                        {/* Quick Self-Description */}
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                            <Typography component="label" htmlFor="selfDescription" sx={labelStyle}>
                                Quick Self-Description
                            </Typography>
                            <Box
                                component="textarea"
                                value={selfDescription}
                                onChange={(e) => setSelfDescription(e.target.value)}
                                id="selfDescription"
                                name="selfDescription"
                                sx={shortTextareaStyle}
                                placeholder="Briefly describe your experience, key skills, and years of experience if you don't have a resume handy..."
                            />
                        </Box>

                        {/* Info Box */}
                        <Box sx={infoBoxStyle}>
                            <Box component="span" sx={{ color: '#ea2b16', display: 'flex', marginTop: '1px' }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" stroke="#ffffff" strokeWidth="2.5" /><line x1="12" y1="16" x2="12.01" y2="16" stroke="#ffffff" strokeWidth="2.5" /></svg>
                            </Box>
                            <Typography sx={infoBoxTextStyle}>
                                Either a <Box component="strong" sx={{ color: 'var(--text-title)' }}>Resume</Box> or a <Box component="strong" sx={{ color: 'var(--text-title)' }}>Self Description</Box> is required to generate a personalized plan.
                            </Typography>
                        </Box>

                    </Box>
                </Box>

                {/* Card Footer */}
                <Box sx={cardFooterStyle}>
                    <Typography sx={cardFooterTextStyle}>
                        AI-Powered Strategy Generation &bull; Approx 30s
                    </Typography>
                    <Button
                        onClick={handleGenerateReport}
                        sx={generateButtonStyle}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '0.35rem' }}><polygon points="5 3 19 12 5 21 5 3" /></svg>
                        Generate My Interview Strategy
                    </Button>
                </Box>
            </Box>

            {/* Recent Reports List */}
            {reports.length > 0 && (
                <Box sx={recentSectionStyle}>
                    <Typography component="h2" sx={panelTitleStyle}>
                        My Recent Interview Plans
                    </Typography>
                    <Box sx={reportsGridStyle}>
                        {reports.map(report => (
                            <Box
                                key={report._id}
                                sx={reportCardStyle}
                                onClick={() => navigate(`/interview/${report._id}`)}
                            >
                                <Typography component="h3" sx={recentCardTitleStyle}>
                                    {report.title || 'Untitled Plan'}
                                </Typography>
                                <Typography sx={recentCardDateStyle}>
                                    Generated on {new Date(report.createdAt).toLocaleDateString()}
                                </Typography>
                                <Typography sx={{ ...recentCardDateStyle, fontWeight: '600', color: report.matchScore >= 80 ? '#10b981' : report.matchScore >= 60 ? '#d97706' : '#ea2b16', marginTop: '0.25rem' }}>
                                    Match Score: {report.matchScore}%
                                </Typography>
                            </Box>
                        ))}
                    </Box>
                </Box>
            )}

            {/* Page Footer */}
            <Box component="footer" sx={pageFooterStyle}>
                <Box component="a" href="#" sx={footerLinkStyle}>Privacy Policy</Box>
                <Box component="a" href="#" sx={footerLinkStyle}>Terms of Service</Box>
                <Box component="a" href="#" sx={footerLinkStyle}>Help Center</Box>
            </Box>
        </Box>
    )
}

export default Home
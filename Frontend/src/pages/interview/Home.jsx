import React, { useState, useRef } from 'react'
import { useInterview } from '../../hooks/useInterview.js'
import { useNavigate } from 'react-router'
import { Box, Typography, Button } from '@mui/material'
import { useSnackbar } from '../../context/snackbar.context.jsx'
import Navbar from '../../components/Navbar.jsx'
import Loader from '../../components/Loader.jsx'
import { AlertCircle, Briefcase, User, FileText, Upload, Play } from 'lucide-react'
import {
    panelTitleStyle,
    labelStyle,
    dropzoneTitleStyle,
    dropzoneSubStyle,
    fileNameStyle,
    removeFileLinkStyle,
    infoBoxTextStyle,
    cardFooterTextStyle,
    recentCardTitleStyle,
    recentCardDateStyle,
    pageWrapperStyle,
    headerWrapperStyle,
    mainTitleStyle,
    highlightStyle,
    subtitleStyle,
    cardStyle,
    cardBodyStyle,
    leftPanelStyle,
    rightPanelStyle,
    panelHeaderStyle,
    iconWrapperStyle,
    badgeStyle,
    badgeBestStyle,
    textareaStyle,
    shortTextareaStyle,
    dropzoneStyle,
    orDividerStyle,
    infoBoxStyle,
    cardFooterStyle,
    generateButtonStyle,
    recentSectionStyle,
    reportsGridStyle,
    reportCardStyle,
    pageFooterStyle,
    footerLinkStyle
} from './Home.styles.js'

const Home = () => {

    const { loading, generateReport, reports } = useInterview()
    const { showSnackbar } = useSnackbar()
    const [jobDescription, setJobDescription] = useState("")
    const [selfDescription, setSelfDescription] = useState("")
    const [fileName, setFileName] = useState("")
    const [resumeFile, setResumeFile] = useState(null)
    const [errorMsg, setErrorMsg] = useState(null)
    const resumeInputRef = useRef()

    const navigate = useNavigate()

    const handleGenerateReport = async () => {
        setErrorMsg(null)
        if (!jobDescription.trim()) {
            showSnackbar("Please paste the Target Job Description.", "warning")
            return
        }
        if (!resumeFile && !selfDescription.trim()) {
            showSnackbar("Either a Resume or a Self Description is required.", "warning")
            return
        }
        try {
            const data = await generateReport({ jobDescription, selfDescription, resumeFile })
            if (data && data._id) {
                showSnackbar("Strategy report generated successfully!", "success")
                navigate(`/interview/${data._id}`)
            }
        } catch (err) {
            setErrorMsg(err.message || "Failed to generate report. Please try again.")
        }
    }

    if (loading) {
        return <Loader message="Analyzing Profile..." subtitle="This takes about 30 seconds" />
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
                    background: 'var(--card-bg)',
                    border: '1px solid rgba(69, 208, 157, 0.25)',
                    borderRadius: '30px',
                    color: 'var(--highlight-color)',
                    fontSize: '0.75rem',
                    fontWeight: '700',
                    padding: '0.35rem 1.25rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    marginBottom: '1.25rem',
                    boxShadow: '0 4px 10px rgba(69, 208, 157, 0.05)'
                }}>
                    ⚡ AI-Powered Strategy Planner
                </Box>
                <Typography component="h1" sx={mainTitleStyle}>
                    Create Your Custom <Box component="span" sx={highlightStyle}>Interview Plan</Box>
                </Typography>
                <Typography component="p" sx={subtitleStyle}>
                    Let our AI analyze the job requirements and your unique profile to build a winning strategy.
                </Typography>
            </Box>            {/* Main Card */}
            <Box sx={cardStyle}>
                {errorMsg ? (
                    <Box sx={{
                        textAlign: 'center',
                        padding: '4.5rem 2rem',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '1.5rem'
                    }}>
                        <Box sx={{
                            width: '64px',
                            height: '64px',
                            borderRadius: '50%',
                            background: 'rgba(234, 43, 22, 0.08)',
                            color: '#ea2b16',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            margin: '0 auto'
                        }}>
                            <AlertCircle size={32} strokeWidth={2.5} />
                        </Box>
                        <Typography variant="h6" sx={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-title)' }}>
                            Generation Failed
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'var(--text-secondary)', fontSize: '0.85rem', maxWidth: '420px', lineHeight: 1.5 }}>
                            {errorMsg}
                        </Typography>
                        <Box sx={{ display: 'flex', gap: '1rem', width: '100%', maxWidth: '350px', marginTop: '1rem' }}>
                            <Button
                                onClick={handleGenerateReport}
                                sx={{
                                    background: 'var(--highlight-gradient)',
                                    color: 'white',
                                    fontWeight: 800,
                                    padding: '0.75rem',
                                    borderRadius: '30px',
                                    textTransform: 'none',
                                    flex: 1,
                                    boxShadow: '0 8px 20px rgba(234, 43, 22, 0.25)',
                                    '&:hover': {
                                        opacity: 0.95
                                    }
                                }}
                            >
                                Try Again
                            </Button>
                            <Button
                                onClick={() => setErrorMsg(null)}
                                sx={{
                                    background: 'transparent',
                                    border: '1px solid var(--divider-color)',
                                    color: 'var(--text-primary)',
                                    fontWeight: 700,
                                    padding: '0.75rem',
                                    borderRadius: '30px',
                                    textTransform: 'none',
                                    flex: 1,
                                    '&:hover': {
                                        background: 'var(--btn-hover-bg)'
                                    }
                                }}
                            >
                                Edit Details
                            </Button>
                        </Box>
                    </Box>
                ) : (
                    <>
                        <Box sx={cardBodyStyle}>
                            {/* Left Column - Job Description */}
                            <Box sx={leftPanelStyle}>
                                <Box sx={panelHeaderStyle}>
                                    <Box sx={iconWrapperStyle}>
                                        <Briefcase size={18} strokeWidth={2} />
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
                                        <User size={18} strokeWidth={2} />
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
                                                    <FileText size={24} strokeWidth={2} />
                                                </Box>
                                                <Typography sx={fileNameStyle}>{fileName}</Typography>
                                                <Typography
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        e.stopPropagation();
                                                        setFileName("");
                                                        setResumeFile(null);
                                                        if (resumeInputRef.current) {
                                                            resumeInputRef.current.value = "";
                                                        }
                                                    }}
                                                    sx={removeFileLinkStyle}
                                                >
                                                    Remove file
                                                </Typography>
                                            </>
                                        ) : (
                                            <>
                                                <Box component="span" sx={{ color: '#ea2b16', marginBottom: '0.15rem', display: 'flex' }}>
                                                    <Upload size={20} strokeWidth={2.5} />
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
                                                    setResumeFile(file);
                                                } else {
                                                    setFileName("");
                                                    setResumeFile(null);
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
                                        <AlertCircle size={12} strokeWidth={2.5} />
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
                                <Play size={16} strokeWidth={2.5} style={{ marginRight: '0.35rem' }} />
                                Generate My Interview Strategy
                            </Button>
                        </Box>
                    </>
                )}
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
import React, { useState, useEffect, useRef } from 'react'
import Vapi from '@vapi-ai/web'
import { Box, Typography, Button, TextField, MenuItem, Select, FormControl, InputLabel, Paper, Accordion, AccordionSummary, AccordionDetails } from '@mui/material'
import { useSnackbar } from '../context/snackbar.context'
import { Phone, Mic, ChevronDown } from 'lucide-react'

const VoicePractice = ({ report, onRefresh }) => {
    const { showSnackbar } = useSnackbar()
    const publicKey = import.meta.env.VITE_VAPI_PUBLIC_KEY || ''
    const assistantId = import.meta.env.VITE_VAPI_ASSISTANT_ID || ''
    const [mode, setMode] = useState('interview') // 'interview' | 'revision'
    const [language, setLanguage] = useState('hinglish') // 'english' | 'hinglish' | 'hindi'
    const [callStatus, setCallStatus] = useState('idle') // 'idle' | 'connecting' | 'active' | 'ending'
    const [volume, setVolume] = useState(0)
    const [expandedSession, setExpandedSession] = useState(null)

    const vapiRef = useRef(null)

    const hasCredentials = publicKey.trim() !== '' && assistantId.trim() !== ''

    // Initialize Vapi SDK
    const initVapi = () => {
        if (!hasCredentials) {
            showSnackbar('Vapi environment variables VITE_VAPI_PUBLIC_KEY or VITE_VAPI_ASSISTANT_ID are missing.', 'error')
            return null
        }
        if (!vapiRef.current) {
            vapiRef.current = new Vapi(publicKey.trim())

            vapiRef.current.on('call-start', () => {
                setCallStatus('active')
                showSnackbar('Voice session connected!', 'success')
            })

            vapiRef.current.on('call-end', () => {
                setCallStatus('idle')
                setVolume(0)
                showSnackbar('Session ended. Generating report...', 'info')
                // Wait 4 seconds for Vapi webhook to process and refresh the report list
                setTimeout(() => {
                    if (onRefresh) onRefresh()
                }, 4000)
            })

            vapiRef.current.on('volume-level', (level) => {
                setVolume(level)
            })

            vapiRef.current.on('error', (err) => {
                console.error('Vapi Error:', err)
                setCallStatus('idle')
                showSnackbar(err.message || 'Error occurred during voice call', 'error')
            })
        }
        return vapiRef.current
    }

    const startCall = () => {
        const vapi = initVapi()
        if (!vapi) return

        setCallStatus('connecting')

        // Build customized dynamic prompt based on current interview report
        let systemPrompt = ''
        if (mode === 'interview') {
            const techQStr = report.technicalQuestions.map((q, i) => `Q${i + 1}: ${q.question} (Focus/Intention: ${q.intention})`).join('\n')
            const behQStr = report.behavioralQuestions.map((q, i) => `Q${i + 1}: ${q.question} (Focus/Intention: ${q.intention})`).join('\n')

            systemPrompt = `You are a professional, polite, and realistic mock interviewer.
The candidate is interviewing for the job title: "${report.title}".
Here is their profile description or resume: "${report.resume || report.selfDescription}".

Your tasks during this call:
1. Greet the candidate briefly and start the mock interview.
2. Ask these customized questions one by one. Wait for their answer before proceeding to the next.
3. Keep your questions and follow-ups short, as this is a voice call.
4. Try to ask questions from this list:
Technical Questions:
${techQStr}

Behavioral Questions:
${behQStr}

5. End the interview after they answer all questions, thank them, and say goodbye.`
        } else {
            const roadmapStr = report.preparationPlan.map(day => `Day ${day.day} - Focus: ${day.focus}. Tasks: ${day.tasks.join(', ')}`).join('\n')

            systemPrompt = `You are a friendly, encouraging, and highly technical mock coding tutor.
The student is preparing for the job title: "${report.title}".
Their study roadmap is:
${roadmapStr}

Your tasks during this call:
1. Greet the student warmly. Ask them which day/focus area of their preparation roadmap they want to review today.
2. Ask questions about the chosen topics. Explain concepts if they get stuck or explain it wrong.
3. Be supportive, conversational, and check in on their learning.
4. Keep your replies concise to let the student speak.`
        }

        // Append language instruction
        if (language === 'english') {
            systemPrompt += `\n\nCRITICAL LANGUAGE REQUIREMENT: You must conduct the entire session strictly in English. Ask all questions, prompts, and feedback in English only.`
        } else {
            systemPrompt += `\n\nCRITICAL LANGUAGE REQUIREMENT: You must speak in natural Hinglish (a mixture of Hindi and English, written in standard Latin alphabet script). Speak like a tech professional from India (e.g. "React key props ke baare me bataiye", "Aapka major experience kis technology me hai? Let's talk about that.").`
        }

        const backendUrl = import.meta.env.VITE_API_URL || 'http://localhost:5001'
        const webhookUrl = `${backendUrl}/api/interview/vapi-webhook?interviewId=${report._id}&mode=${mode}&language=${language}`

        // Start call with overrides
        vapi.start(assistantId.trim(), {
            recordingEnabled: true,
            serverUrl: webhookUrl,
            model: {
                provider: "google",
                model: "gemini-2.5-flash",
                messages: [
                    {
                        role: 'system',
                        content: systemPrompt
                    }
                ]
            }
        })
    }

    const stopCall = () => {
        if (vapiRef.current) {
            setCallStatus('ending')
            vapiRef.current.stop()
        }
    }

    // Clean up Vapi listeners on unmount
    useEffect(() => {
        return () => {
            if (vapiRef.current) {
                vapiRef.current.stop()
                vapiRef.current = null
            }
        }
    }, [])

    const formatDuration = (seconds) => {
        if (!seconds) return '0s'
        const mins = Math.floor(seconds / 60)
        const secs = Math.floor(seconds % 60)
        return mins > 0 ? `${mins}m ${secs}s` : `${secs}s`
    }

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '2rem', width: '100%' }}>
            {/* Header */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--divider-color)', pb: '1rem' }}>
                <Typography component="h2" sx={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-title)' }}>
                    🎙️ Voice AI Practice Center
                </Typography>
            </Box>

            {/* Vapi Credentials Warning Alert */}
            {!hasCredentials && (
                <Paper sx={{
                    padding: '1.5rem',
                    borderRadius: '16px',
                    background: 'rgba(235, 118, 60, 0.03)',
                    border: '1px solid rgba(235, 118, 60, 0.2)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.75rem',
                }}>
                    <Typography sx={{ fontSize: '0.9rem', fontWeight: '800', color: '#EB763C', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        ⚠️ Environment Setup Required
                    </Typography>
                    <Typography sx={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                        To enable Voice AI Mock Interviews and revision lessons, please add your Vapi credentials to the frontend <strong>.env</strong> file:
                    </Typography>
                    <Box component="pre" sx={{
                        backgroundColor: 'var(--input-bg)',
                        border: '1px solid var(--input-border)',
                        borderRadius: '8px',
                        padding: '0.75rem',
                        fontSize: '0.75rem',
                        fontFamily: 'monospace',
                        color: 'var(--text-primary)',
                        overflowX: 'auto',
                        my: '0.25rem'
                    }}>
                        {`VITE_VAPI_PUBLIC_KEY=your_vapi_public_key\nVITE_VAPI_ASSISTANT_ID=your_vapi_assistant_id`}
                    </Box>
                    <Typography sx={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                        You can sign up and get free keys at <a href="https://vapi.ai" target="_blank" rel="noopener noreferrer" style={{ color: '#EB763C', fontWeight: 600, textDecoration: 'underline' }}>vapi.ai</a>.
                    </Typography>
                </Paper>
            )}

            {/* Calling Controls */}
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '2.5rem 1.5rem',
                background: 'var(--qcard-bg)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                border: '1px solid var(--card-border)',
                borderRadius: '24px',
                textAlign: 'center',
                gap: '1.5rem',
                position: 'relative',
                overflow: 'hidden',
                boxShadow: 'var(--card-shadow)'
            }}>
                <Box sx={{
                    display: 'flex',
                    gap: '1rem',
                    flexDirection: { xs: 'column', sm: 'row' },
                    justifyContent: 'center',
                    width: '100%',
                    zIndex: 2
                }}>
                    <FormControl size="small" sx={{
                        width: '220px',
                        '& .MuiInputLabel-root': {
                            color: 'var(--text-secondary)',
                            '&.Mui-focused': {
                                color: 'var(--highlight-color)'
                            }
                        }
                    }}>
                        <InputLabel id="mode-select-label">Select Practice Mode</InputLabel>
                        <Select
                            labelId="mode-select-label"
                            value={mode}
                            onChange={(e) => setMode(e.target.value)}
                            label="Select Practice Mode"
                            disabled={!hasCredentials || callStatus !== 'idle'}
                            sx={{
                                borderRadius: '20px',
                                color: 'var(--text-primary)',
                                backgroundColor: 'var(--input-bg)',
                                '& .MuiOutlinedInput-notchedOutline': {
                                    borderColor: 'var(--input-border)'
                                },
                                '&:hover .MuiOutlinedInput-notchedOutline': {
                                    borderColor: 'var(--highlight-color)'
                                },
                                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                    borderColor: 'var(--highlight-color)'
                                },
                                '& .MuiSvgIcon-root': {
                                    color: 'var(--text-secondary)'
                                }
                            }}
                            MenuProps={{
                                PaperProps: {
                                    sx: {
                                        backgroundColor: 'var(--card-bg)',
                                        border: '1px solid var(--divider-color)',
                                        backgroundImage: 'none',
                                        '& .MuiMenuItem-root': {
                                            color: 'var(--text-primary)',
                                            '&:hover': {
                                                backgroundColor: 'rgba(234, 43, 22, 0.08)'
                                            },
                                            '&.Mui-selected': {
                                                backgroundColor: 'rgba(234, 43, 22, 0.15)',
                                                color: 'var(--text-title)',
                                                '&:hover': {
                                                    backgroundColor: 'rgba(234, 43, 22, 0.2)'
                                                }
                                            }
                                        }
                                    }
                                }
                            }}
                        >
                            <MenuItem value="interview">Mock Interview</MenuItem>
                            <MenuItem value="revision">Interactive Revision</MenuItem>
                        </Select>
                    </FormControl>

                    <FormControl size="small" sx={{
                        width: '220px',
                        '& .MuiInputLabel-root': {
                            color: 'var(--text-secondary)',
                            '&.Mui-focused': {
                                color: 'var(--highlight-color)'
                            }
                        }
                    }}>
                        <InputLabel id="language-select-label">Select Language</InputLabel>
                        <Select
                            labelId="language-select-label"
                            value={language}
                            onChange={(e) => setLanguage(e.target.value)}
                            label="Select Language"
                            disabled={!hasCredentials || callStatus !== 'idle'}
                            sx={{
                                borderRadius: '20px',
                                color: 'var(--text-primary)',
                                backgroundColor: 'var(--input-bg)',
                                '& .MuiOutlinedInput-notchedOutline': {
                                    borderColor: 'var(--input-border)'
                                },
                                '&:hover .MuiOutlinedInput-notchedOutline': {
                                    borderColor: 'var(--highlight-color)'
                                },
                                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                    borderColor: 'var(--highlight-color)'
                                },
                                '& .MuiSvgIcon-root': {
                                    color: 'var(--text-secondary)'
                                }
                            }}
                            MenuProps={{
                                PaperProps: {
                                    sx: {
                                        backgroundColor: 'var(--card-bg)',
                                        border: '1px solid var(--divider-color)',
                                        backgroundImage: 'none',
                                        '& .MuiMenuItem-root': {
                                            color: 'var(--text-primary)',
                                            '&:hover': {
                                                backgroundColor: 'rgba(234, 43, 22, 0.08)'
                                            },
                                            '&.Mui-selected': {
                                                backgroundColor: 'rgba(234, 43, 22, 0.15)',
                                                color: 'var(--text-title)',
                                                '&:hover': {
                                                    backgroundColor: 'rgba(234, 43, 22, 0.2)'
                                                }
                                            }
                                        }
                                    }
                                }
                            }}
                        >
                            <MenuItem value="english">English</MenuItem>
                            <MenuItem value="hinglish">Hinglish (Mix)</MenuItem>
                        </Select>
                    </FormControl>
                </Box>

                {/* Pulsating Voice Circles */}
                <Box sx={{
                    position: 'relative',
                    width: '140px',
                    height: '140px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    my: '1rem'
                }}>
                    {callStatus === 'active' && (
                        <>
                            <Box sx={{
                                position: 'absolute',
                                width: '100%',
                                height: '100%',
                                borderRadius: '50%',
                                background: 'rgba(234, 43, 22, 0.1)',
                                transform: `scale(${1 + volume * 1.5})`,
                                transition: 'transform 0.1s ease',
                                border: '1px solid rgba(234, 43, 22, 0.2)'
                            }} />
                            <Box sx={{
                                position: 'absolute',
                                width: '85%',
                                height: '85%',
                                borderRadius: '50%',
                                background: 'rgba(234, 43, 22, 0.15)',
                                transform: `scale(${1 + volume * 0.8})`,
                                transition: 'transform 0.15s ease'
                            }} />
                        </>
                    )}

                    {callStatus === 'connecting' && (
                        <Box sx={{
                            position: 'absolute',
                            width: '100%',
                            height: '100%',
                            borderRadius: '50%',
                            border: '3px dashed var(--highlight-color)',
                            animation: 'spin 4s linear infinite',
                            '@keyframes spin': {
                                '0%': { transform: 'rotate(0deg)' },
                                '100%': { transform: 'rotate(360deg)' }
                            }
                        }} />
                    )}

                    <Button
                        onClick={callStatus === 'active' ? stopCall : startCall}
                        disabled={!hasCredentials || callStatus === 'connecting' || callStatus === 'ending'}
                        sx={{
                            width: '90px',
                            height: '90px',
                            borderRadius: '50%',
                            background: !hasCredentials ? 'var(--divider-color)' : callStatus === 'active' ? 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)' : 'var(--highlight-gradient)',
                            color: 'white',
                            minWidth: 0,
                            boxShadow: !hasCredentials ? 'none' : callStatus === 'active' ? '0 8px 30px rgba(239, 68, 68, 0.25)' : '0 8px 30px rgba(69, 208, 157, 0.25)',
                            transition: 'all 0.3s ease',
                            zIndex: 2,
                            '&:hover': {
                                transform: !hasCredentials ? 'none' : 'scale(1.05)',
                                background: !hasCredentials ? 'var(--divider-color)' : callStatus === 'active' ? 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)' : 'var(--text-primary)'
                            }
                        }}
                    >
                        {callStatus === 'active' ? (
                            <Phone size={32} strokeWidth={2.5} />
                        ) : (
                            <Mic size={32} strokeWidth={2.5} />
                        )}
                    </Button>
                </Box>

                <Box>
                    {callStatus === 'idle' && (
                        <Typography variant="body2" sx={{ color: 'var(--text-secondary)' }}>
                            Choose mode and click to start your personalized voice AI session.
                        </Typography>
                    )}
                    {callStatus === 'connecting' && (
                        <Typography variant="body2" sx={{ color: '#d97706', fontWeight: 600 }}>
                            Connecting to Voice Server... Please allow microphone access.
                        </Typography>
                    )}
                    {callStatus === 'active' && (
                        <Typography variant="body2" sx={{ color: '#10b981', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem' }}>
                            <Box sx={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981', display: 'inline-block', animation: 'blink 1s infinite' }} />
                            Live Call Active. Speak now!
                            <style>{`@keyframes blink { 0%, 100% { opacity: 0.3 } 50% { opacity: 1 } }`}</style>
                        </Typography>
                    )}
                    {callStatus === 'ending' && (
                        <Typography variant="body2" sx={{ color: 'var(--text-secondary)' }}>
                            Ending session... saving results.
                        </Typography>
                    )}
                </Box>
            </Box>

            {/* Session Logs / Past Sessions */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography component="h3" sx={{ fontSize: '1rem', fontWeight: '700', color: 'var(--text-title)' }}>
                        Previous Practice Sessions
                    </Typography>
                    <Button
                        size="small"
                        onClick={onRefresh}
                        sx={{ textTransform: 'none', color: 'var(--highlight-color)', fontWeight: 600 }}
                    >
                        🔄 Refresh Logs
                    </Button>
                </Box>

                {!report.voiceSessions || report.voiceSessions.length === 0 ? (
                    <Box sx={{
                        padding: '2.5rem',
                        border: '1px dashed var(--divider-color)',
                        borderRadius: '16px',
                        textAlign: 'center',
                        color: 'var(--text-secondary)'
                    }}>
                        No voice sessions recorded yet. Start your first session to see summaries and transcripts!
                    </Box>
                ) : (
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        {report.voiceSessions.map((session, idx) => (
                            <Accordion
                                key={session._id || idx}
                                expanded={expandedSession === session._id}
                                onChange={() => setExpandedSession(expandedSession === session._id ? null : session._id)}
                                sx={{
                                    background: 'var(--qcard-bg)',
                                    border: '1px solid var(--divider-color)',
                                    borderRadius: '16px !important',
                                    boxShadow: 'none',
                                    overflow: 'hidden',
                                    '&:before': { display: 'none' }
                                }}
                            >
                                <AccordionSummary
                                    expandIcon={<ChevronDown size={16} strokeWidth={2.5} />}
                                    sx={{ px: '1.25rem' }}
                                >
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center', pr: '1rem' }}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                            <Box sx={{
                                                background: 'rgba(69, 208, 157, 0.06)',
                                                color: 'var(--highlight-color)',
                                                border: '1px solid rgba(69, 208, 157, 0.25)',
                                                borderRadius: '30px',
                                                fontSize: '0.7rem',
                                                fontWeight: '800',
                                                px: '0.6rem',
                                                py: '0.15rem',
                                                textTransform: 'uppercase'
                                            }}>
                                                {session.mode === 'revision' ? 'Revision' : 'Interview'}
                                            </Box>
                                            <Typography sx={{ fontSize: '0.875rem', fontWeight: '700', color: 'var(--text-title)' }}>
                                                Session #{report.voiceSessions.length - idx}
                                            </Typography>
                                        </Box>
                                        <Box sx={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                            <Typography sx={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                                                {formatDuration(session.duration)}
                                            </Typography>
                                            <Typography sx={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                                                {new Date(session.createdAt).toLocaleDateString()}
                                            </Typography>
                                        </Box>
                                    </Box>
                                </AccordionSummary>
                                <AccordionDetails sx={{
                                    borderTop: '1px solid var(--divider-color)',
                                    background: 'var(--qcard-body-bg)',
                                    padding: '1.25rem',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '1rem'
                                }}>
                                    {/* Summary */}
                                    {session.summary && (
                                        <Box>
                                            <Typography sx={{ fontSize: '0.75rem', fontWeight: '800', color: 'var(--highlight-color)', textTransform: 'uppercase', mb: '0.25rem' }}>
                                                AI Summary
                                            </Typography>
                                            <Typography sx={{ fontSize: '0.85rem', color: 'var(--text-primary)', lineHeight: 1.5 }}>
                                                {session.summary}
                                            </Typography>
                                        </Box>
                                    )}

                                    {/* Transcript */}
                                    {session.transcript && (
                                        <Box>
                                            <Typography sx={{ fontSize: '0.75rem', fontWeight: '800', color: '#0d9488', textTransform: 'uppercase', mb: '0.25rem' }}>
                                                Full Transcript
                                            </Typography>
                                            <Box sx={{
                                                maxHeight: '220px',
                                                overflowY: 'auto',
                                                backgroundColor: 'var(--input-bg)',
                                                border: '1px solid var(--input-border)',
                                                borderRadius: '12px',
                                                p: '0.75rem 1rem',
                                                fontSize: '0.8rem',
                                                color: 'var(--text-secondary)',
                                                whiteSpace: 'pre-line',
                                                lineHeight: 1.6
                                            }}>
                                                {session.transcript}
                                            </Box>
                                        </Box>
                                    )}

                                    {/* Audio Recording Link */}
                                    {session.recordingUrl && (
                                        <Button
                                            href={session.recordingUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            size="small"
                                            variant="outlined"
                                            sx={{
                                                alignSelf: 'flex-start',
                                                textTransform: 'none',
                                                borderRadius: '20px',
                                                borderColor: 'var(--divider-color)',
                                                color: 'var(--text-secondary)',
                                                mt: '0.5rem',
                                                '&:hover': {
                                                    borderColor: 'var(--highlight-color)',
                                                    color: 'var(--highlight-color)'
                                                }
                                            }}
                                        >
                                            📁 Download Audio Recording
                                        </Button>
                                    )}
                                </AccordionDetails>
                            </Accordion>
                        ))}
                    </Box>
                )}
            </Box>
        </Box>
    )
}

export default VoicePractice

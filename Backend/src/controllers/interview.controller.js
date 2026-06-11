const pdfParse = require("pdf-parse")
const { generateInterviewReport, generateResumePdf } = require("../services/ai.service")
const interviewReportModel = require("../models/interviewReport.model")




/**
 * @description Controller to generate interview report based on user self description, resume and job description.
 */
async function generateInterViewReportController(req, res) {
    try {
        let resumeText = ""
        if (req.file) {
            const resumeContent = await (new pdfParse.PDFParse(Uint8Array.from(req.file.buffer))).getText()
            resumeText = resumeContent.text
        }
        const { selfDescription, jobDescription } = req.body

        const interViewReportByAi = await generateInterviewReport({
            resume: resumeText,
            selfDescription,
            jobDescription
        })

        const interviewReport = await interviewReportModel.create({
            user: req.user.id,
            resume: resumeText,
            selfDescription,
            jobDescription,
            ...interViewReportByAi
        })

        res.status(201).json({
            message: "Interview report generated successfully.",
            interviewReport
        })
    } catch (err) {
        console.error("Error in generateInterViewReportController:", err)
        res.status(err.status || 500).json({
            message: err.message || "Failed to generate interview report."
        })
    }
}

/**
 * @description Controller to get interview report by interviewId.
 */
async function getInterviewReportByIdController(req, res) {

    const { interviewId } = req.params

    const interviewReport = await interviewReportModel.findOne({ _id: interviewId, user: req.user.id })

    if (!interviewReport) {
        return res.status(404).json({
            message: "Interview report not found."
        })
    }

    res.status(200).json({
        message: "Interview report fetched successfully.",
        interviewReport
    })
}


/** 
 * @description Controller to get all interview reports of logged in user.
 */
async function getAllInterviewReportsController(req, res) {
    const interviewReports = await interviewReportModel.find({ user: req.user.id }).sort({ createdAt: -1 }).select("-resume -selfDescription -jobDescription -__v -technicalQuestions -behavioralQuestions -skillGaps -preparationPlan")

    res.status(200).json({
        message: "Interview reports fetched successfully.",
        interviewReports
    })
}


/**
 * @description Controller to generate resume PDF based on user self description, resume and job description.
 */
async function generateResumePdfController(req, res) {
    try {
        const { interviewReportId } = req.params

        const interviewReport = await interviewReportModel.findById(interviewReportId)

        if (!interviewReport) {
            return res.status(404).json({
                message: "Interview report not found."
            })
        }

        const { resume, jobDescription, selfDescription } = interviewReport

        const pdfBuffer = await generateResumePdf({ resume, jobDescription, selfDescription })

        res.set({
            "Content-Type": "application/pdf",
            "Content-Disposition": `attachment; filename=resume_${interviewReportId}.pdf`
        })

        res.send(pdfBuffer)
    } catch (err) {
        console.error("Error in generateResumePdfController:", err)
        res.status(500).json({
            message: err.message || "Failed to generate resume PDF."
        })
    }
}

/**
 * @description Controller to handle call ended webhooks from Vapi.
 */
async function handleVapiWebhook(req, res) {
    try {
        const { interviewId, mode } = req.query
        const payload = req.body

        // Vapi webhook is called for multiple events, we listen for "end-of-call-report"
        const messageType = payload.message?.type

        if (messageType === "end-of-call-report") {
            const callData = payload.message.call
            const sessionId = callData?.id || payload.message.callId
            const transcript = callData?.transcript || payload.message.transcript || ""
            const summary = callData?.summary || payload.message.summary || ""
            const duration = callData?.duration || 0
            const recordingUrl = callData?.recordingUrl || ""

            if (!interviewId) {
                return res.status(400).json({ message: "interviewId query param is required" })
            }

            const interviewReport = await interviewReportModel.findById(interviewId)
            if (!interviewReport) {
                return res.status(404).json({ message: "Interview report not found" })
            }

            interviewReport.voiceSessions.push({
                sessionId,
                transcript,
                summary,
                duration,
                recordingUrl,
                mode: mode || "interview"
            })

            await interviewReport.save()
            console.log(`Saved Vapi voice session for report ${interviewId}`)
        }

        res.status(200).json({ received: true })
    } catch (err) {
        console.error("Error in handleVapiWebhook:", err)
        res.status(500).json({
            message: err.message || "Failed to process Vapi webhook"
        })
    }
}

module.exports = {
    generateInterViewReportController,
    getInterviewReportByIdController,
    getAllInterviewReportsController,
    generateResumePdfController,
    handleVapiWebhook
}
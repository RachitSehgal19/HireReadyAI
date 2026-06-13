const multer = require("multer")


const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 3 * 1024 * 1024 // 3MB
    },
    fileFilter: (req, file, cb) => {
        // Allow only PDF and DOCX files
        const allowedMimes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
        
        if (!allowedMimes.includes(file.mimetype)) {
            return cb(new Error('Please upload a valid PDF or DOCX file'))
        }
        
        cb(null, true)
    }
})

// Error handler middleware for multer
const handleUploadError = (err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        if (err.code === 'LIMIT_FILE_SIZE') {
            return res.status(400).json({
                message: 'File size exceeds 3MB limit. Please upload a smaller file.'
            })
        }
        return res.status(400).json({
            message: err.message || 'File upload failed'
        })
    } else if (err) {
        return res.status(400).json({
            message: err.message || 'File upload failed'
        })
    }
    next()
}

module.exports = { upload, handleUploadError }
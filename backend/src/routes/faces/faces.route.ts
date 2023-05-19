import * as fs from "fs"
import express from 'express'
import face_recognition from '../../face-recognition/face.recognition'
import uploadFile from "../../utils/multer.util"

const router = express.Router()

router.post('/add', (req: any, res) => {
    uploadFile(req, res, async (err) => {
        if(err)
            return res.status(500).json({ errors: [ { msg: err } ] })
        if(!req.file)
            return res.status(403).json({ errors: [ { msg: 'File not found' } ] })
        face_recognition.add_face({
            name: req.body.name,
            blob: fs.readFileSync(req.file.path)
        }, (err, data) => {
            if(err)
                res.status(500).json({ errors: [ { msg: err } ] })
            res.status(200).json({ msg: data })
        })
    });
})

router.post('/find', (req: any, res) => {
    uploadFile(req, res, async (err) => {
        if(err)
            return res.status(500).json({ errors: [ { msg: err } ] })
        if(!req.file)
            return res.status(403).json({ errors: [ { msg: 'File not found' } ] })
        face_recognition.find_face({
            blob: fs.readFileSync(req.file.path)
        }, (err, data) => {
            if(err)
                res.status(500).json({ errors: [ { msg: err } ] })
            res.status(200).json({ msg: data })
            if(data.FaceMatches && data.FaceMatches.length > 0 && data.FaceMatches[0].Face)
                return res.status(200).json(data.FaceMatches[0])
            return res.status(404).json({ msg: 'Person not found' })
        })
    });
})

export default router
import multer from 'multer';
import { v4 } from 'uuid';
import fs from 'fs';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        fs.mkdirSync(process.env.UPLOAD_DIR, { recursive: true })
        cb(null, process.env.UPLOAD_DIR);
    },
    filename: (req, file, cb) => {
        const uuid = v4();
        cb(null, `${uuid}_${file.originalname}`)
    }
});

const uploadFile = multer({
    storage: storage,
    fileFilter: (req, file, cb) => cb(null, true),
    limits: {
        fileSize: 12 * 1024 * 1024
    }
}).single('file');

export default uploadFile;

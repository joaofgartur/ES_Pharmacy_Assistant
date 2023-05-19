import dotenv from 'dotenv'
dotenv.config()

import cors from 'cors'
import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'

// Routes
import auth_route from './routes/auth/auth.route'
import qr_route from './routes/qr/qr.route'
import faces_route from "./routes/faces/faces.route"

const app = express()
const port = 3000

app.use(cors());

app.use(bodyParser.json());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/auth', auth_route)
app.use('/qr', qr_route)
app.use('/face', faces_route)

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});

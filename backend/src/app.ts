import dotenv from 'dotenv'
dotenv.config()

import cors from 'cors'
import express, {Request, Response} from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import passport from 'passport'

// Routes
import auth_route from './routes/auth/auth.route'
import qr_route from './routes/qr/qr.route'
import faces_route from "./routes/faces/faces.route"
import payment_route from "./routes/payment/payment.route"
import populate from "./populate/populate";
import face from './face-recognition/face.recognition'
import swaggerDocs, {swaggerSpec} from "./utils/swagger";
import passportUtil from './utils/passport.util'

// Docs

const app = express()
const port = 3000

passport.use(passportUtil.localStrategy);
passport.use(passportUtil.jwtStrategy);


app.use(cors());

app.use(bodyParser.json());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/auth', auth_route)
app.use('/qr', passport.authenticate('jwt', { session: false }), qr_route)
app.use('/face', passport.authenticate('jwt', { session: false }), faces_route)
app.use('/payment', passport.authenticate('jwt', { session: false }), payment_route)

app.listen(port, () => {
  swaggerDocs(app)
  return (console.log(`Express is listening at http://localhost:${port}`));
});
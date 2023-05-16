import dotenv from 'dotenv'
dotenv.config()
import express from 'express'

// Routes
import auth_route from './routes/auth/auth.route'
import qr_route from './routes/qr/qr'
import populate from "./populate/populate"

const app = express()
const port = 3000


app.use(express.json());

app.use('/auth', auth_route)
app.use('/qr', qr_route)

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});

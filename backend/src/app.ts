import express from 'express'

import authRoute from "./routes/auth/auth.route"

const app = express()
const port = 3001

app.use(express.json());

app.use('/auth', authRoute)

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`)
})

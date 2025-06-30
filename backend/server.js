import express from 'express'
import 'dotenv/config'
import cors from 'cors'
import connectDB from './config/db.js';
import adminRouter from './routes/adminRoute.js';
import router from './routes/newsletterRoutes.js';
import imageRouter from './routes/imageRouter.js';


const app = express();
const port = process.env.PORT || 8080

connectDB()

//Middlewares
app.use(express.json())
app.use(cors())


app.get('/', (req, res) => res.send('API is working '))
app.use('/api/admin', adminRouter)
app.use("/api/newsletter", router);
app.use('/api/image', imageRouter)

app.listen(port, () => {
    console.log(`Server is running on port : ${port}`)
})

export default app;
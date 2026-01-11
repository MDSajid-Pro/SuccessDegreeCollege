import express from 'express'
import 'dotenv/config'
import cors from 'cors'
import connectDB from './config/db.js';
import adminRouter from './routes/adminRoute.js';
import router from './routes/newsletterRoutes.js';
import imageRouter from './routes/imageRouter.js';
import noticeRoute from './routes/noticeRoutes.js';
import resultRoute from './routes/resultRoutes.js';
import admissionRouter from './routes/admissionRoute.js';
import facultyRouter from './routes/facultyRoute.js';

const app = express();
const port = process.env.PORT || 8080

connectDB()

//Middlewares
app.use(express.json())
app.use(cors())
app.use(cors({
  origin: ["https://success-degree-college.vercel.app", "http://localhost:5173"], // Add your frontend URL
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));


app.get('/', (req, res) => res.send('API is working '))
app.use('/api/admin', adminRouter)
app.use("/api/subscribers", router);
app.use('/api/image', imageRouter)
app.use('/api/notices', noticeRoute);
app.use('/api/results', resultRoute);

// ... middleware
app.use('/uploads', express.static('uploads')); // Serve files publicly

// ... routes
app.use('/api/admission', admissionRouter);
app.use('/api/faculty', facultyRouter )

app.listen(port, () => {
    console.log(`Server is running on port : ${port}`)
})

export default app;
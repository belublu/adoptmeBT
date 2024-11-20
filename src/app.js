import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import swaggerSetup from './utils/swagger.js';
import "./database.js"
/* import swaggerJSDoc from 'swagger-jsdoc'
import swaggerUiExpress from "swagger-ui-express" */

import usersRouter from './routes/users.router.js';
import petsRouter from './routes/pets.router.js';
import adoptionsRouter from './routes/adoption.router.js';
import sessionsRouter from './routes/sessions.router.js';
import mocksRouter from './routes/mocks.router.js';


const app = express();
const PORT = process.env.PORT||8080;
/* const connection = mongoose.connect(`mongodb+srv://blupelusa:MongoCoder2020@cluster0.xc6zvs5.mongodb.net/Adoptme?retryWrites=true&w=majority&appName=Cluster0`)
 */

app.use(express.json());
app.use(cookieParser());

app.use('/api/users',usersRouter);
app.use('/api/pets',petsRouter);
app.use('/api/adoptions',adoptionsRouter);
app.use('/api/sessions',sessionsRouter);
app.use('/api/mocks', mocksRouter);

swaggerSetup(app)

app.listen(PORT,()=>console.log(`Listening on ${PORT}`))

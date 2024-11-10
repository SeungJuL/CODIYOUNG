import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import { postRouter, userRouter } from './routes';
import { addTimestamp, errorHandler } from './middlewares';


const app = express();
const port = process.env.PORT || 8080;

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(addTimestamp);
app.get('/', (req, res) => {
    res.send('Server is Running');
});


app.use('/api/user', userRouter);
app.use('/api/post', postRouter);


app.use(errorHandler);

app.listen(port, () => {
    console.log(`Hosting at: http://localhost:${port}`)
});

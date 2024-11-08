import dotenv  from 'dotenv';
dotenv.config();
import express from 'express';
import { postRouter, userRouter } from './routes';
import { addTimestamp } from './middlewares';


const app = express();
const port = process.env.PORT || 8080;

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(addTimestamp);
app.get('/', (req, res) => {
    res.send('Server is Running');
});


app.use('/user', userRouter);
app.use('/post', postRouter);

app.listen(port, () => {
    console.log(`Hosting at: http://localhost:${port}`)
});

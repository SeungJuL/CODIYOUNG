import dotenv  from 'dotenv';
dotenv.config();
import express from 'express';
import { userRouter } from './routes';
import { addTimestamp } from './middlewares';


const app = express();
const port = 3000;

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(addTimestamp);
app.get('/', (req, res) => {
    res.send('Server is Running');
});


app.use('/user', userRouter)


app.listen(port, () => {
    console.log(`Hosting at: http://localhost:${port}`)
});

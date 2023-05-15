import express from 'express';
import { userRoutes } from './routes/user.routes';

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use('/user', userRoutes);



app.listen(process.env.PORT || 5012, () => {
    console.log(`Server is running on port ${process.env.PORT || 5012}`);
})
import express from 'express';
import { userRoutes } from './routes/user.routes';
import { linkRoutes } from './routes/link.routes';
import { rootRoutes } from './routes/root.routes';

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use('/user', userRoutes);
app.use('/link', linkRoutes);
app.use('/', rootRoutes);



app.listen(process.env.PORT || 5012, () => {
    console.log(`Server is running on port ${process.env.PORT || 5012}`);
})
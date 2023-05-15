import express from 'express';
import { create as createUser, getClients } from '../controllers/user.controllers';

export const userRoutes = express.Router();

userRoutes.get('/', getClients  );
userRoutes.post('/', createUser  );
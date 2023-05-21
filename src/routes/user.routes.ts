import express from 'express';
import { create as createUser, deleteClient, getClients } from '../controllers/user.controllers';

export const userRoutes = express.Router();

userRoutes.get('/', getClients  );
userRoutes.post('/', createUser  );
userRoutes.delete('/', deleteClient );
import express from 'express';
import { redirectToUrl } from '../controllers/link.controllers';

export const rootRoutes = express.Router();

rootRoutes.get('/:short_name', redirectToUrl)
import express from 'express';
import { create as createLink, deleteLink, getLinks, redirectToUrl } from '../controllers/link.controllers';

export const linkRoutes = express.Router();

linkRoutes.get('/', getLinks  );
linkRoutes.post('/', createLink  );
linkRoutes.delete('/:short_name', deleteLink );
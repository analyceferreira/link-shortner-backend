import express from 'express';
import { create as createLink, deleteLink, getLinks, redirectToUrl } from '../controllers/link.controllers';
import { validate } from '../middlewares/zod.validate';
import { bodyReqLinkSchema, linkPathParams } from '../schemas/link.schemas';

export const linkRoutes = express.Router();

linkRoutes.get('/', getLinks  );
linkRoutes.post('/', validate(bodyReqLinkSchema), createLink  );
linkRoutes.delete('/:short_name', validate(linkPathParams), deleteLink );
import { Request, Response } from 'express';
import { createLink, deleteLinkByShortName, getAllLinks, getLinkByAlias } from '../services/link.services';
import { LinkSchema } from '../schemas/link.schemas';


export async function create(req:Request, res:Response) {
    const linkToSave: LinkSchema = req.body;

    try {
        const hasLinkWithThisShortName = await getLinkByAlias( linkToSave.short_name)
        if (hasLinkWithThisShortName) {
            return res.status(400).json({
                success: false,
                message: 'short_name is already in use. Try with another name'
            });
        }
        const link = await createLink( linkToSave );

        res.status(201).json({
            success: true,
            message: 'Short link created successfully',
            data: link,
        });
    } catch (error) {
        console.log('entrou no catch')
        console.log(error)
        res.status(500).json({
            success: false,
            message: 'Internal Server Error',
            data: (error as Error).message ?? error ,
        });
    }
}

export async function getLinks(req:Request, res:Response) {
    console.log('entrou no get links')
    try {
        const links = await getAllLinks();

        res.status(200).json({
            success: true,
            message: 'Get links successfully',
            data: links,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal Server Error',
            data: error,
        });
    }
}

export async function deleteLink(req:Request, res:Response) {
    console.log('entrou no delete link')
    try {
        await deleteLinkByShortName(req.params.short_name);

        res.status(200).json({
            success: true,
            message: 'Delete link successfully',
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal Server Error',
            data: error,
        });
    }
}

export async function redirectToUrl(req:Request, res:Response) {
    console.log('entrou no redirect link')
    try {
        const link = await getLinkByAlias(req.params.short_name);
        if(link == null) {
        res.status(404).json({
            success: false,
            message: 'Short link does not exist',
            data: link,
        });
        } else {
            res.status(302).redirect(link.original_url);
        }
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal Server Error',
            data: error,
        });
    }
}
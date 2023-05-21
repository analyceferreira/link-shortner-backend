import { User } from "@prisma/client";
import { prisma } from "../../src/lib/prisma";
import { LinkSchema } from "../schemas/link.schemas";

export async function createLink({short_name, original_url, userId}:LinkSchema) {
    const conectToUser = userId? {connect: {id: userId}} : {}
    const link = await prisma.link.create({
        data: {
            original_url,
            short_name,
            short_url: process.env.BASE_URL+short_name,
            user: conectToUser,
        },
    });

    return link;
}

export async function getAllLinks() {
    const link = await prisma.link.findMany();

    return link;
}

export async function getLinkByAlias(short_name:string) {
    const link = await prisma.link.findUnique({
        where: {
            short_name,
        },
    });

    return link;
}

export async function getLinkByUser(user:User) {
    const link = await prisma.link.findMany({
        where: {
            user: {id: user?.id},
        },
    });

    return link;
}

export async function updateLink(short_name:string, originalUrl:string, hits:number) {
    const link = await prisma.link.update({
        where: {
            short_name,
        },
        data: {
            short_name,
            original_url: originalUrl,
            hits,
        },
    });
}

export async function deleteLinkByShortName(short_name:string) {
    const link = await prisma.link.delete({
        where: {
            short_name,
        },
    });
    return link
}
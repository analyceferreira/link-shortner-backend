import { User } from "@prisma/client";
import { prisma } from "../../src/lib/prisma";

export async function createLink(short_name:string, url:string, user:User, hits:number) {
    const link = await prisma.link.create({
        data: {
            short_name,
            url,
            user : {connect: {id: user?.id}},
            hits,
        },
    });

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

export async function updateLink(short_name:string, url:string, hits:number) {
    const link = await prisma.link.update({
        where: {
            short_name,
        },
        data: {
            short_name,
            url,
            hits,
        },
    });
}

export async function deleteLink(short_name:string) {
    const link = await prisma.link.delete({
        where: {
            short_name,
        },
    });
}
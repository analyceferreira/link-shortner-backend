import { CreateUserSchema, LoginUserSchema } from "../schemas/user.schemas";
import { prisma } from "../../src/lib/prisma";

export async function createUser(userToSave: CreateUserSchema) {
    const user = await prisma.user.create({
        data: {
            name: userToSave.name,
            email: userToSave.email,
            password: userToSave.password,
        },
    });
    return user;
}

export async function getUserByEmail(userToLogin: LoginUserSchema ) {
    const user = await prisma.user.findUnique({
        where: {
            email: userToLogin.email,
        },
    });

    return user;
}

export async function getAllUsers() {
    console.log('Entrou no service')
    const users = await prisma.user.findMany();

    return users;
}

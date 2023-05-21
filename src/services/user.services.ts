import { CreateUserSchema, LoginUserSchema, UserSchema } from "../schemas/user.schemas";
import { prisma } from "../../src/lib/prisma";

export async function createUser(userToSave: CreateUserSchema) {
    
    const userExists = await prisma.user.findUnique({
        where: {
            email: userToSave.email,
        },
    });
    console.log("createUser: userExists")
    console.log(userExists)
    if (!userExists) {
        const user = await prisma.user.create({
            data: {
                name: userToSave.name,
                email: userToSave.email,
                password: userToSave.password,
            },
        });
        return user;
    }
    console.log('Gerou o erro')
    throw new Error('User already exists');
}

export async function getUserByEmail(userToLogin: LoginUserSchema)  {
    const user = await prisma.user.findUnique({
        where: {
            email: userToLogin.email,
        },
    });

    return user;
}

export async function getAllUsers() {
    const users = await prisma.user.findMany();

    return users;
}

export async function updateUser(id: string, data: UserSchema): Promise<UserSchema> {
    const user = await prisma.user.update({
        where: {
            id,
        },
        data,
    });
    return user;

}

export async function deleteUser(id: string): Promise<Boolean> {
    const user = await prisma.user.delete({
            where: {
                id,
            },
        });
        console.log('delete user')
        console.log(user)
    return user ? true : false;
}
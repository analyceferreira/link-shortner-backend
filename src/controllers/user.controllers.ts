import { Request, Response } from 'express';
import { createUser, getAllUsers, getUserByEmail, deleteUser } from '../services/user.services';
import { CreateUserSchema, LoginUserSchema } from '../schemas/user.schemas';


export async function create(req:Request, res:Response) {
    const userToSave: CreateUserSchema = req.body;

    try {
        const user = await createUser( userToSave );

        res.status(201).json({
            success: true,
            message: 'User created successfully',
            data: user,
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

export async function login(req:Request, res:Response) {
    const userToLogin: LoginUserSchema = req.body;

    try {
        const user = await getUserByEmail( userToLogin );

        res.status(200).json({
            success: true,
            message: 'User logged successfully',
            data: user,
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

export async function getClients(req:Request, res:Response) {
    console.log('entrou no get clients')
    try {
        const users = await getAllUsers();

        res.status(200).json({
            success: true,
            message: 'Get users successfully',
            data: users,
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

export async function deleteClient(req:Request, res:Response) {
    console.log('entrou no delete client')
    try {
        await deleteUser(req.body.id);

        res.status(200).json({
            success: true,
            message: 'Delete user successfully',
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
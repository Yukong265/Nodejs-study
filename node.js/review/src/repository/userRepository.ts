import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class UserRepository {
    async createUser(accountId:string, password:string, username:string) {
        await prisma.user.create({
            data:{
                accountId:accountId,
                password:password,
                name:username,
            }
        })
    }
}
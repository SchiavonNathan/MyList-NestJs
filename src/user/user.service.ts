import { Injectable } from '@nestjs/common';
import { userDTO } from './DTO/user.dto';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class UserService {

    constructor(private prisma: PrismaService) {}


    async create(data: userDTO) {
        
        const userExists = await this.prisma.user.findFirst({
            where:{
                email: data.email
            }
        });

        if (userExists) {
            throw new Error('O Email já está sendo usado')
        }
        
        const user = await this.prisma.user.create({
            data,
        })

        return user
    }

}

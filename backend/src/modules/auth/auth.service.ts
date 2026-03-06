import { Injectable, ConflictException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService) {}

    async register(dto: RegisterDto) {
        const exists = await this.prisma.user.findUnique({
            where: {email: dto.email},
        });

        if (exists) {
            throw new ConflictException('Email already in use');
        }

        const passwordHash = await bcrypt.hash(dto.password, 12);

        const user = await this.prisma.user.create({
            data: {
                fullName: dto.fullName,
                email: dto.email,
                passwordHash,
                role: dto.role,
            },
        });

        return {
            id: user.id,
            fullName: user.fullName,
            email: user.email,
            role: user.role,
        };
    }
}

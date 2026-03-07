import { PrismaService } from '../../prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { MailService } from './mail.service';
export declare class AuthService {
    private readonly prisma;
    private readonly jwtService;
    private readonly mailService;
    constructor(prisma: PrismaService, jwtService: JwtService, mailService: MailService);
    register(dto: RegisterDto): Promise<{
        id: string;
        fullName: string;
        email: string;
        role: import("@prisma/client").$Enums.Role;
        message: string;
    }>;
    verifyEmail(token: string): Promise<{
        message: string;
    }>;
    login(dto: LoginDto): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    generateTokens(user: {
        id: string;
        email: string;
        role: string;
    }): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    getMe(userId: string): Promise<{
        fullName: string;
        email: string;
        role: import("@prisma/client").$Enums.Role;
        id: string;
        isVerified: boolean;
        restrictionLevel: number;
        createdAt: Date;
    } | null>;
}

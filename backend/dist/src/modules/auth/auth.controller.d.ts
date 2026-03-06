import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import type { Response, Request } from 'express';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(dto: RegisterDto): Promise<{
        id: string;
        fullName: string;
        email: string;
        role: import("@prisma/client").$Enums.Role;
    }>;
    login(dto: LoginDto, res: Response): Promise<{
        accessToken: string;
    }>;
    logout(res: Response): Promise<{
        message: string;
    }>;
    refresh(req: Request, res: Response): Promise<{
        accessToken: string;
    }>;
    getMe(req: Request): Promise<{
        fullName: string;
        email: string;
        role: import("@prisma/client").$Enums.Role;
        id: string;
        isVerified: boolean;
        restrictionLevel: number;
        createdAt: Date;
    } | null>;
}

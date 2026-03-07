import { Strategy } from "passport-jwt";
import { PrismaService } from "../../../prisma/prisma.service";
declare const JwtRefreshStrategy_base: new (...args: [opt: import("passport-jwt").StrategyOptionsWithRequest] | [opt: import("passport-jwt").StrategyOptionsWithoutRequest]) => Strategy & {
    validate(...args: any[]): unknown;
};
export declare class JwtRefreshStrategy extends JwtRefreshStrategy_base {
    private readonly prisma;
    constructor(prisma: PrismaService);
    validate(payload: {
        sub: string;
        email: string;
        role: string;
    }): Promise<{
        fullName: string;
        email: string;
        role: import("@prisma/client").$Enums.Role;
        id: string;
        passwordHash: string;
        isVerified: boolean;
        verificationToken: string | null;
        verificationExpiry: Date | null;
        noShowCount: number;
        lateCancelCount: number;
        restrictionLevel: number;
        isDeleted: boolean;
        deletedAt: Date | null;
        createdAt: Date;
    }>;
}
export {};

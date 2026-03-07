export declare class MailService {
    private transporter;
    sendVerificationEmail(email: string, fullName: string, token: string): Promise<void>;
}

import { EmailerService } from "src/adapters/services/EmailerService";

export default class SendEmail{
    constructor(
        private emailerService: EmailerService
    ){}
    async execute(email_destination: string, subject:string, html: string, text: string | null ): Promise<void> {
        await this.emailerService.sendEmail(email_destination, subject, html, text);
    }
}

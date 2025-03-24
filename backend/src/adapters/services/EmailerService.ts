import { String } from "aws-sdk/clients/cloudhsm";

export interface EmailerService {
    sendEmail(email_destination: string, subject:string, html: String, text: string | null ): Promise<void>;
}

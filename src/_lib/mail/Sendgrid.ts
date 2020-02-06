import * as sendgrid from '@sendgrid/mail';
import * as dotenv   from 'dotenv';

dotenv.config();

export class Sendgrid {

    public static send(to: string, from: string, templateId: string, dynamicTemplateData: { [ key: string ]: string }): void {

        sendgrid.setApiKey(process.env.SENDGRID_API_KEY);
        sendgrid.send({ to, from, templateId, dynamicTemplateData });

    }

}

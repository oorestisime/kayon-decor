import sendgrid from "@sendgrid/mail";

sendgrid.setApiKey(process.env.SENDGRID_KEY || "");

type EmailPayload = {
  to: string;
  from: string;
  subject: string;
  html: string;
  text?: string;
};

export const sendEmail = async (data: EmailPayload) => {
  await sendgrid.send(data);
};

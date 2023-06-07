import sendgrid from "@sendgrid/mail";

sendgrid.setApiKey(process.env.SENDGRID_KEY || "");

export const sendEmail = async (data: any) => {
  await sendgrid.send(data);
};

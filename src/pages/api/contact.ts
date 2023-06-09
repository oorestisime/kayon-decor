import type { NextApiRequest, NextApiResponse } from "next";
import { sendEmail } from "@/lib/email";

const template = `
Person contacted:

Name: {{name}}
Email: {{email}}
Message: {{message}}
`;

const validateEmail = (email: string) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }
  if (!req.body.name || !req.body.email || !req.body.message) {
    return res.status(400).json({ message: "Missing fields" });
  }
  if (!validateEmail(req.body.email)) {
    return res.status(400).json({ message: "Invalid email" });
  }
  await sendEmail({
    to: "kayondecor@gmail.com",
    from: "kayondecor@gmail.com",

    templateId: "d-9c55a19593e443248df6011c1ebce772",
    dynamicTemplateData: {
      name: req.body.name,
      email: req.body.email,
      subject: `${req.body.name} has contacted us!`,
      message: req.body.message,
    },
  });
  return res.status(200).json({ message: "Email sent successfully" });
}

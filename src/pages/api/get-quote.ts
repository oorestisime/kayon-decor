import type { NextApiRequest, NextApiResponse } from "next";
import { sendEmail } from "@/lib/email";
import { Products } from "@/components/Products";
import { CartItemType } from "@/lib/cart";

const template = `
Person contacted:

Name: {{name}}
Email: {{email}}
Items: {{items}}
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
  if (
    !req.body.email ||
    (req.body.items?.length || 0) === 0 ||
    !req.body.name
  ) {
    return res.status(400).json({ message: "Missing fields" });
  }
  if (!validateEmail(req.body.email)) {
    return res.status(400).json({ message: "Invalid email" });
  }
  const items = JSON.stringify(req.body.items);

  const products: string = JSON.stringify(
    req.body.items.map((item: CartItemType) => item.product)
  );

  await sendEmail({
    to: "kayondecor@gmail.com",
    from: "kayondecor@gmail.com",
    subject: "Get Quote - Kayon Decor",
    html: template
      .replace("{{name}}", req.body.name)
      .replace("{{email}}", req.body.email)
      .replace("{{items}}", items),
  });
  await sendEmail({
    to: req.body.email,
    from: "kayondecor@gmail.com",
    subject: `Thank you ${req.body.name} for your preorder request!`,
    templateId: "d-346f58fc3dad43549e8cc72b529aad7e",
    dynamicTemplateData: {
      name: req.body.name,
      products: products,
    },
  });

  return res.status(200).json({ message: "Email sent successfully" });
}

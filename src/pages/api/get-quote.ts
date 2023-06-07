import type { NextApiRequest, NextApiResponse } from "next";
import { sendEmail } from "@/lib/email";

import { CartItemType } from "@/lib/cart";

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

  await sendEmail({
    to: "kayondecor@gmail.com",
    from: "kayondecor@gmail.com",

    templateId: "d-4c070176727045449abc84bc7d2b07b2",
    dynamicTemplateData: {
      name: req.body.name,
      email: req.body.email,
      subject: `We got a new preorder from ${req.body.name}`,
      products: req.body.items.map((item: CartItemType) => ({
        productName: item.product,
        size: item.variant?.size,
        qty: item.quantity,
      })),
    },
  });
  await sendEmail({
    to: req.body.email,
    from: "kayondecor@gmail.com",
    templateId: "d-346f58fc3dad43549e8cc72b529aad7e",
    dynamicTemplateData: {
      name: req.body.name,
      subject: `Thank you ${req.body.name} for your Preorder Request!`,
    },
  });

  return res.status(200).json({ message: "Email sent successfully" });
}

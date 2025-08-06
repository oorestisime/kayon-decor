import { Metadata } from "next";
import { FAQ } from "@/components/FAQ";

export const metadata: Metadata = {
  title: "FAQ | Kayon Decor",
  description: "Visit our FAQ page for swift answers to commonly asked questions. From product inquiries to service details, we've compiled a comprehensive list to provide you with instant solutions. Explore and gain a clearer understanding of our offerings!",
  openGraph: {
    title: "FAQ | Kayon Decor",
    description: "Visit our FAQ page for swift answers to commonly asked questions. From product inquiries to service details, we've compiled a comprehensive list to provide you with instant solutions. Explore and gain a clearer understanding of our offerings!",
    url: "https://kayon-decor.com/faq",
  },
};

export default function faq() {
  const faqs = [
    {
      question: "What is unique about your products?",
      answer:
        "Each product from our store is handcrafted by our skilled balinese artisans. Given the nature of the material and the process, no two products are exactly alike. Each item carries a distinct character and uniqueness, making it a truly one-of-a-kind piece",
    },
    {
      question: "How do I place a pre-order?",
      answer:
        "You can request your quote directly on our website. Simply browse through our available products, choose your preferred item, and follow the prompt to get a quote. You'll be asked to provide some specific details depending on the item, such as dimensions or custom designs, if applicable. You will receive your quote within 24 hours with details of how to pre-order and the estimated delivery time. ",
    },
    {
      question: "How long does it take to receive my pre-ordered item?",
      answer:
        "The crafting process for our custom products typically takes between 1-2 months. This timeframe begins from the moment your pre-order is confirmed. We believe in giving our artisans the time they need to ensure your product is crafted to the highest standards. Your products will then be shipped along with many other orders. The shipping process from Indonesia to Cyprus typically takes 1-2 months. Total delivery time is approximately 3-4 months. ",
    },
    {
      question:
        "Can I request a custom design or size for my pre-ordered item?",
      answer:
        "Yes, we welcome custom requests. Once you select an item for getting a quote, one member of our team will contact you to discuss the requested custom design or size. Please note that significant alterations might extend the standard delivery timeframe.",
    },
    {
      question: "How can I track my order?",
      answer:
        "While we do not provide a traditional tracking code, we've created a more personalised approach to keep you updated on your order. After placing a pre-order, you'll receive a confirmation email, and from there, our team will send regular updates directly to your inbox. These updates will include the progress of your products and images to show how your unique pieces are coming along. This way, you'll be able to follow the crafting process from start to finish until it's ready for delivery. ",
    },
    {
      question: "How are the products shipped?",
      answer:
        "All our products are carefully packaged to ensure they reach you in perfect condition and to avoid any potential damages during transit. Additionally, we employ a fumigation process to protect the wooden products from any possible pests or environmental factors. This rigorous approach ensures your unique pieces arrive at your doorstep in excellent condition, ready for you to enjoy.",
    },
    {
      question: "How does the payment process work for pre-ordered items?",
      answer:
        "For all pre-orders, we follow a two-part payment process. Once you finalise your order, we require a 50% upfront payment to initiate the crafting process. This deposit secures your order and allows our artisans to begin their work. When your item is ready for delivery, we'll notify you to complete the remaining 50% of the payment. Only after this final payment is received will your custom products be dispatched for delivery.",
    },
    {
      question: "What if I want to cancel my order?",
      answer:
        "You may cancel your order within 48 hours of placing it. However, due to the custom nature of our products, cancellations after this period will not be refunded. ",
    },
    {
      question: "What is your return policy?",
      answer:
        "Given the custom nature of our products, we don't accept returns unless the product arrives damaged or doesn't match the specifications of your order. In such cases, please contact our customer service immediately.",
    },
    {
      question: " Is teak wood durable?",
      answer:
        "Teak wood is known for its exceptional durability and resistance to decay and termites. It's one of the most valued woods for this reason. With proper care, your teak wood product can last for decades.",
    },
    {
      question: "How do I care for my teak wood product?",
      answer:
        "Teak wood is naturally resistant to many elements, but to maintain its beauty, we recommend cleaning it with a soft, damp cloth. Avoid using harsh chemicals as they may damage the wood.For outdoor teak furniture, consider using teak-specific products to protect it from weathering.",
    },
  ];
  return (
    <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8 lg:py-40">
      <div className="mx-auto max-w-4xl divide-y divide-gray-900/10">
        <h2 className="text-2xl font-bold leading-10 tracking-tight text-gray-900">
          Frequently asked questions
        </h2>
        <FAQ data={faqs} />
      </div>
      <div className="mx-auto mt-24 max-w-4xl divide-y divide-gray-900/10">
        <h3 className="text-base leading-10 tracking-tight text-gray-900">
          If you have any other questions, please feel free to reach out to
          our customer service team. We're here to assist you.
        </h3>
      </div>
    </div>
  );
}
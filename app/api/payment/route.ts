import db from "@/lib/db";
import { notFound } from "next/navigation";
import { type NextRequest } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export async function POST(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);
  const origin = requestHeaders.get("origin");

  const { orderId, cartId } = await request.json();
  const order = await db.order.findUnique({
    where: {
      id: orderId,
    },
  });
  const cart = await db.cart.findUnique({
    where: {
      id: cartId,
    },
    include: { cartItems: { include: { product: true } } },
  });

  if (!order || !cart) notFound();

  const line_items = [
    ...cart.cartItems.map((cartItem) => ({
      quantity: cartItem.amount,
      price_data: {
        currency: "usd",
        product_data: {
          name: cartItem.product.name,
          images: [cartItem.product.image],
        },
        unit_amount: Math.round(cartItem.product.price * 100), // ensure integer
      },
    })),
    {
      quantity: 1,
      price_data: {
        currency: "usd",
        product_data: {
          name: "Tax",
        },
        unit_amount: Math.round(cart.tax * 100),
      },
    },
    {
      quantity: 1,
      price_data: {
        currency: "usd",
        product_data: {
          name: "Shipping",
        },
        unit_amount: Math.round(cart.shipping * 100),
      },
    },
  ];

  try {
    const session = await stripe.checkout.sessions.create({
      ui_mode: "embedded",
      metadata: { orderId, cartId },
      line_items: line_items,
      mode: "payment",
      return_url: `${origin}/api/confirm?session_id={CHECKOUT_SESSION_ID}`,
    });

    return Response.json({ clientSecret: session.client_secret });
  } catch (error) {
    console.error(error);
    return Response.json(null, {
      status: 500,
      statusText: "Internal Server Error",
    });
  }
}

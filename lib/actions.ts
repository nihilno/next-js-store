"use server";

import db from "@/lib/db";
import { auth, currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  imageSchema,
  productSchema,
  reviewSchema,
  validateWithZodSchema,
} from "./schemas";
import { deleteImage, uploadImage } from "./supabase";
import { Cart } from "@prisma/client";

//******************************************************************
// **************************** GET ROLES **************************
//******************************************************************

async function getAuthUser() {
  const user = await currentUser();
  if (!user) redirect("/");

  return user;
}

async function getAdminUser() {
  const user = await getAuthUser();
  if (user.id !== process.env.ADMIN_USER_ID) redirect("/");
  return user;
}

function renderError(error: unknown): { message: string } {
  return {
    message: error instanceof Error ? error.message : "An error occured",
  };
}

//******************************************************************
//***************************** PRODUCTS ***************************
//******************************************************************

export async function fetchFeaturedProductsAction() {
  const products = await db.product.findMany({
    where: {
      featured: true,
    },
  });
  return products;
}

export async function fetchAllProductsAction({
  search = "",
}: {
  search: string;
}) {
  const products = await db.product.findMany({
    where: {
      OR: [
        { name: { contains: search, mode: "insensitive" } },
        { company: { contains: search, mode: "insensitive" } },
      ],
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return products;
}

export async function fetchSingleProductAction(productId: string) {
  const product = await db.product.findUnique({
    where: {
      id: productId,
    },
  });

  if (!product) redirect("/products");
  return product;
}

// i need to remove image on failure
export async function createProductAction(
  prevState: unknown,
  formData: FormData,
): Promise<{ message: string }> {
  const user = await getAuthUser();

  try {
    const file = formData.get("image") as File;
    const validatedFile = validateWithZodSchema(imageSchema, { image: file });
    const fullPath = await uploadImage(validatedFile.image);

    const rawData = Object.fromEntries(formData);
    const validatedFields = validateWithZodSchema(productSchema, rawData);

    await db.product.create({
      data: {
        ...validatedFields,
        image: fullPath,
        clerkId: user.id,
      },
    });
  } catch (error) {
    return renderError(error);
  }

  redirect("/admin/products");
}

export async function fetchAdminProductsAction() {
  await getAdminUser();
  const product = await db.product.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return product;
}

export async function deleteProductAction(prevState: { productId: string }) {
  const { productId } = prevState;
  await getAdminUser();

  try {
    const product = await db.product.delete({
      where: {
        id: productId,
      },
    });

    await deleteImage(product.image);
    revalidatePath("/admin/products");

    return { message: "Product removed" };
  } catch (error) {
    return renderError(error);
  }
}

export async function fetchAdminProductsDetailsAction(productId: string) {
  await getAdminUser();
  const product = await db.product.findUnique({
    where: {
      id: productId,
    },
  });

  if (!product) redirect("/admin/products");
  return product;
}

export async function updateProductAction(
  prevState: unknown,
  formData: FormData,
) {
  await getAdminUser();
  try {
    const productId = formData.get("id") as string;
    const rawData = Object.fromEntries(formData);
    const validatedFields = validateWithZodSchema(productSchema, rawData);

    await db.product.update({
      where: {
        id: productId,
      },
      data: {
        ...validatedFields,
      },
    });

    revalidatePath(`/admin/products/${productId}/edit`);
    return { message: "Product updated successfully." };
  } catch (error) {
    return renderError(error);
  }
}

export async function updateProductImageAction(
  prevState: unknown,
  formData: FormData,
) {
  await getAdminUser();

  try {
    const productId = formData.get("id") as string; //hidden input in edit/page.tsx
    const image = formData.get("image") as File; //we're getting it as input type file is set with image in <ImageInput/>
    const oldImageUrl = formData.get("url") as string; //hidden input in edit/page/tsx

    const validatedFile = validateWithZodSchema(imageSchema, { image });
    const fullPath = await uploadImage(validatedFile.image);

    await deleteImage(oldImageUrl);

    await db.product.update({
      where: {
        id: productId,
      },
      data: {
        image: fullPath,
      },
    });
    revalidatePath(`/admin/products/${productId}/edit`);
    return { message: "Product Image updated successfully." };
  } catch (error) {
    return renderError(error);
  }
}

//******************************************************************
// **************************** FAVS *******************************
//******************************************************************

export async function fetchFavoriteId({ productId }: { productId: string }) {
  const user = await getAuthUser();
  const favorite = await db.favorite.findFirst({
    where: {
      productId,
      clerkId: user.id,
    },
    select: {
      id: true,
    },
  });

  return favorite?.id || null;
}

export async function toggleFavoriteAction(prevState: {
  productId: string;
  favoriteId: string | null;
  pathname: string;
}) {
  const user = await getAuthUser();
  const { productId, favoriteId, pathname } = prevState;

  try {
    if (favoriteId)
      await db.favorite.delete({
        where: {
          id: favoriteId,
        },
      });
    else
      await db.favorite.create({
        data: {
          productId,
          clerkId: user.id,
        },
      });

    revalidatePath(pathname);
    return {
      message: favoriteId ? "Removed from Favorites" : "Added to Favorites",
    };
  } catch (error) {
    return renderError(error);
  }
}

export async function fetchUserFavoritess() {
  const user = await getAuthUser();

  const favorites = db.favorite.findMany({
    where: {
      clerkId: user.id,
    },
    include: {
      product: true,
    },
  });

  return favorites;
}

//******************************************************************
// **************************** REVIEWS ****************************
//******************************************************************

export async function createReviewAction(
  prevState: unknown,
  formData: FormData,
) {
  const user = await getAuthUser();
  const rawData = Object.fromEntries(formData);
  const validatedFields = validateWithZodSchema(reviewSchema, rawData);

  await db.review.create({
    data: {
      ...validatedFields,
      clerkId: user.id,
    },
  });

  try {
    revalidatePath(`/products/${validatedFields.productId}`);
    return { message: "Review submitted successfully." };
  } catch (error) {
    return renderError(error);
  }
}

export async function fetchProductsReviewsAction(productId: string) {
  const review = await db.review.findMany({
    where: {
      productId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return review;
}

export async function fetchProductRatingAction(productId: string) {
  const result = await db.review.groupBy({
    by: ["productId"],
    _avg: { rating: true },
    _count: { rating: true },
    where: { productId },
  });

  return {
    rating: result[0]?._avg.rating?.toFixed(1) ?? 0,
    count: result[0]?._count.rating ?? 0,
  };
}

export async function fetchProductReviewsByUserAction() {
  const user = await getAuthUser();
  const reviews = db.review.findMany({
    where: {
      clerkId: user.id,
    },
    select: {
      id: true,
      rating: true,
      comment: true,
      product: {
        select: { image: true, name: true },
      },
    },
  });

  return reviews;
}

export async function deleteReviewAction(prevState: { reviewId: string }) {
  const { reviewId } = prevState;
  const user = await getAuthUser();

  try {
    await db.review.delete({
      where: {
        id: reviewId,
        clerkId: user.id,
      },
    });

    revalidatePath("/reviews");
    return { message: "Review deleted successfully." };
  } catch (error) {
    return renderError(error);
  }
}

// może zwrócić null/not-null, jeżeli zwróci not null (true), to oznacza, że user zostawił już review dla tego produktu
export async function findExistingReviewAction(
  userId: string,
  productId: string,
) {
  return db.review.findFirst({
    where: {
      clerkId: userId,
      productId,
    },
  });
}

//******************************************************************
//***************************** CART *******************************
//******************************************************************

export async function fetchCartItems() {
  const user = await auth();
  const cart = await db.cart.findFirst({
    where: {
      clerkId: user.userId ?? "",
    },
    select: {
      numItemsInCart: true,
    },
  });

  return cart?.numItemsInCart || 0;
}

export async function addToCartAction(prevState: unknown, formData: FormData) {
  const user = await getAuthUser();

  try {
    const productId = formData.get("productId") as string;
    const amount = Number(formData.get("amount"));

    await fetchProduct(productId);
    const cart = await fetchOrCreateCart({ userId: user.id });
    await updateOrCreateCartItem({ productId, cartId: cart.id, amount });
    await updateCart(cart);
  } catch (error) {
    renderError(error);
  }
  redirect("/cart");
}

// addToCartAction helpers

const includeProductClause = {
  cartItems: {
    include: {
      product: true,
    },
  },
};

async function fetchProduct(productId: string) {
  const product = await db.product.findUnique({
    where: {
      id: productId,
    },
  });

  if (!product) throw new Error("Product not found.");
  return product;
}

export async function fetchOrCreateCart({
  userId,
  errorOnFailure,
}: {
  userId: string;
  errorOnFailure?: boolean;
}) {
  let cart = await db.cart.findFirst({
    where: {
      clerkId: userId,
    },
    include: includeProductClause,
  });

  if (!cart && errorOnFailure) throw new Error("Cart not found.");
  if (!cart)
    cart = await db.cart.create({
      data: {
        clerkId: userId,
      },
      include: includeProductClause,
    });

  return cart;
}

async function updateOrCreateCartItem({
  productId,
  cartId,
  amount,
}: {
  productId: string;
  cartId: string;
  amount: number;
}) {
  let cartItem = await db.cartItem.findFirst({
    where: {
      productId,
      cartId,
    },
  });

  if (cartItem)
    cartItem = await db.cartItem.update({
      where: {
        id: cartItem.id,
      },
      data: {
        amount: cartItem.amount + amount,
      },
    });
  else
    cartItem = await db.cartItem.create({
      data: { productId, cartId, amount },
    });
}

export async function updateCart(cart: Cart) {
  const cartItems = await db.cartItem.findMany({
    where: {
      cartId: cart.id,
    },
    include: {
      product: true,
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  let numItemsInCart = 0;
  let cartTotal = 0;

  for (const item of cartItems) {
    numItemsInCart += item.amount;
    cartTotal += item.amount * item.product.price;
  }

  const tax = cart.taxRate * cartTotal;
  const shipping = cartTotal ? cart.shipping : 0;
  const orderTotal = cartTotal + tax + shipping;

  const currentCart = await db.cart.update({
    where: {
      id: cart.id,
    },
    data: { numItemsInCart, cartTotal, tax, orderTotal },
    include: includeProductClause,
  });

  return { currentCart, cartItems };
}

export async function removeCartItemAction(
  prevState: unknown,
  formData: FormData,
) {
  const user = await getAuthUser();

  try {
    const cartItemId = formData.get("id") as string;
    const cart = await fetchOrCreateCart({
      userId: user.id,
      errorOnFailure: true,
    });
    await db.cartItem.delete({
      where: {
        id: cartItemId,
        cartId: cart.id,
      },
    });
    await updateCart(cart);
    revalidatePath("/cart");
    return { message: "Item removed from Cart." };
  } catch (error) {
    return renderError(error);
  }
}

export async function updateCartItemAction({
  amount,
  cartItemId,
}: {
  amount: number;
  cartItemId: string;
}) {
  const user = await getAuthUser();

  try {
    const cart = await fetchOrCreateCart({
      userId: user.id,
      errorOnFailure: true,
    });
    await db.cartItem.update({
      where: {
        id: cartItemId,
        cartId: cart.id,
      },
      data: {
        amount,
      },
    });

    await updateCart(cart);
    revalidatePath("/cart");
    return { message: "Cart updated." };
  } catch (error) {
    return renderError(error);
  }
}

//******************************************************************
//***************************** ORDERS *****************************
//******************************************************************

export async function createOrderAction(
  prevState: unknown,
  formData: FormData,
) {
  const user = await getAuthUser();
  let orderId: null | string = null;
  let cartId: null | string = null;

  try {
    const cart = await fetchOrCreateCart({
      userId: user.id,
      errorOnFailure: true,
    });
    cartId = cart.id;

    await db.order.deleteMany({
      where: {
        clerkId: user.id,
        isPaid: false,
      },
    });

    const order = await db.order.create({
      data: {
        clerkId: user.id,
        products: cart.numItemsInCart,
        orderTotal: cart.orderTotal,
        tax: cart.tax,
        shipping: cart.shipping,
        email: user.emailAddresses[0].emailAddress,
      },
    });
    orderId = order.id;
  } catch (error) {
    return renderError(error);
  }

  redirect(`/checkout/?orderId=${orderId}&cartId=${cartId}`);
}

export async function fetchUserOrders() {
  const user = await getAuthUser();
  const orders = await db.order.findMany({
    where: {
      clerkId: user.id,
      isPaid: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return orders;
}

export async function fetchAdminOrders() {
  const user = await getAuthUser();
  const orders = await db.order.findMany({
    where: {
      clerkId: user.id,
      isPaid: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return orders;
}

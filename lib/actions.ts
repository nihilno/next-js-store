"use server";

import db from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { imageSchema, productSchema, validateWithZodSchema } from "./schemas";
import { deleteImage, uploadImage } from "./supabase";

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

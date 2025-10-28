"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SignInButton } from "@clerk/nextjs";
import { useFormStatus } from "react-dom";
import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { IoHeart, IoReload } from "react-icons/io5";

type ButtonSize = "default" | "lg" | "sm";
type SubmitButtonProps = {
  className?: string;
  text?: string;
  size?: ButtonSize;
};

type actionType = "edit" | "delete";

export function SubmitButton({
  className = "",
  text = "submit",
  size = "lg",
}: SubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      disabled={pending}
      className={cn("capitalize", className)}
      size={size}
    >
      {pending ? (
        <>
          <IoReload className="mr-2 h-4 w-4 animate-spin" />
          Please wait...
        </>
      ) : (
        text
      )}
    </Button>
  );
}

export function IconButton({ actionType }: { actionType: actionType }) {
  const { pending } = useFormStatus();
  function renderIcon() {
    switch (actionType) {
      case "edit":
        return <FaRegEdit className="scale-130" />;
      case "delete":
        return <FaRegTrashAlt className="scale-110" />;
      default:
        const never: never = actionType;
        throw new Error(`Invaqlid action type: ${never}`);
    }
  }

  return (
    <Button
      type="submit"
      size="icon"
      variant="link"
      className="cursor-pointer p-2"
      disabled={pending}
    >
      {pending ? <IoReload className="animate-spin" /> : renderIcon()}
    </Button>
  );
}

export function CardSignInButton() {
  return (
    <SignInButton mode="modal">
      <Button
        type="button"
        size="icon"
        variant="outline"
        className="cursor-pointer p-2"
        asChild
      >
        <IoHeart />
      </Button>
    </SignInButton>
  );
}

export function CardSubmitButton({ isFavorite }: { isFavorite: boolean }) {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      size="icon"
      variant={isFavorite ? "default" : "outline"}
      className="cursor-pointer p-2"
      disabled={pending}
    >
      {pending ? <IoReload className="animate-spin" /> : <IoHeart />}
    </Button>
  );
}

export function LookUpButton() {
  return (
    <Button
      type="button"
      size="icon"
      variant="outline"
      className="cursor-pointer p-2"
    >
      <FaMagnifyingGlass />
    </Button>
  );
}

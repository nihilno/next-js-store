"use client";

import { ImageInputContainerProps } from "@/lib/types";
import Image from "next/image";
import { useState } from "react";
import { Button } from "../ui/button";
import FormContainer from "./FormContainer";
import ImageInput from "./ImageInput";
import { SubmitButton } from "./Buttons";

function ImageInputContainer(props: ImageInputContainerProps) {
  const { image, name, action, text } = props;
  const [isUpdateFormVisible, setUpdateFormVisible] = useState(false);

  return (
    <div className="mb-8">
      <Image
        src={image}
        width={200}
        height={200}
        alt={name}
        className="mb-4 h-[200px] w-[200px] rounded object-cover select-none"
        priority
      />
      <Button
        variant="outline"
        size="sm"
        onClick={() => setUpdateFormVisible((prev) => !prev)}
        className="capitalize"
      >
        {isUpdateFormVisible ? "Hide details" : "Show details"}
      </Button>

      {isUpdateFormVisible && (
        <div className="mt-4 max-w-md">
          <FormContainer action={action}>
            {props.children}
            <div className="flex items-center gap-8">
              <ImageInput />
              <SubmitButton size="sm" text={text} />
            </div>
          </FormContainer>
        </div>
      )}
    </div>
  );
}

export default ImageInputContainer;

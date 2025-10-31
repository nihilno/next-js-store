"use client";

import { SubmitButton } from "@/components/form/Buttons";
import CheckboxInput from "@/components/form/CheckboxInput";
import FormContainer from "@/components/form/FormContainer";
import FormInput from "@/components/form/FormInput";
import ImageInput from "@/components/form/ImageInput";
import PriceInput from "@/components/form/PriceInput";
import TextAreaInput from "@/components/form/TextAreaInput";
import SectionTitle from "@/components/global/SectionTitle";
import { createProductAction } from "@/lib/actions";
import { faker } from "@faker-js/faker";

export default function Page() {
  const name = faker.commerce.productName();
  const company = faker.company.name();
  const description = faker.lorem.paragraph({ min: 10, max: 12 });

  return (
    <section>
      <SectionTitle text="Create product" border={false} />
      <div className="rounded-md border p-8">
        <FormContainer action={createProductAction}>
          <div className="my-4 grid gap-4 md:grid-cols-2">
            <FormInput
              name="name"
              type="text"
              label="product name"
              defaultValue={name}
            />
            <FormInput
              name="company"
              type="text"
              label="company"
              defaultValue={company}
            />
            <PriceInput />
            <ImageInput />
          </div>
          <TextAreaInput
            name="description"
            label="product description"
            defaultValue={description}
          />
          <div className="mt-6">
            <CheckboxInput name="featured" />
          </div>
          <SubmitButton text="create product" className="mt-8" />
        </FormContainer>
      </div>
    </section>
  );
}

import { fakerPT_BR as faker } from "@faker-js/faker";
import * as yup from "yup";

/*
name:""
summary:""
description:""
thumbnail:""
images:[""]
price:0
hotel:""
*/

export const fields = {
  text: {
    name: {
      label: "Nome",
    },
    summary: {
      label: "Súmario",
    },
    price: {
      label: "Preço",
    },
    description: {
      label: "Descrição",
      multline: true,
    },
  },
  images: {
    thumbnail: "",
    images: [""],
  },
};

export const initialValues = {
  name: faker.company.name(),
  summary: faker.lorem.sentence(),
  description: faker.lorem.paragraphs(),

  price: Math.floor(Math.random() * (199 - 20 + 1)) + 20,

  thumbnail: faker.image.urlLoremFlickr({ category: "business" }),
  images: [
    faker.image.urlLoremFlickr({ category: "nightlife" }),
    faker.image.urlLoremFlickr({ category: "people" }),
    faker.image.urlLoremFlickr({ category: "business" }),
  ],
};

export const validationSchema = yup.object().shape({
  name: yup.string().required(),
  summary: yup.string().required(),
  description: yup.string().required(),

  price: yup.number().required(),

  thumbnail: yup.string().required(),
  images: yup.array(yup.string().required()).required(),
});

export type InitialValues = typeof initialValues;

import { fakerPT_BR as faker } from "@faker-js/faker";
import * as yup from "yup";

export const fields = {
  name: {
    label: "Nome",
  },
  summary: {
    label: "Súmario",
  },
  description: {
    label: "Descrição",
    multline: true,
  },
};

export const imagesFields = {
  thumbnail: "",
  logo: "",
  images: [""],
};

export const initialValues = {
  name: faker.company.name(),
  summary: faker.lorem.sentence(),
  description: faker.lorem.paragraphs(),

  address: faker.location.street(),
  zipCode: faker.location.zipCode(),
  neighborhood: faker.location.secondaryAddress(),
  state: faker.location.state(),
  city: faker.location.city(),
  addressNumber: faker.location.buildingNumber(),
  longitude: faker.location.longitude(),
  latitude: faker.location.latitude(),

  thumbnail: faker.image.urlLoremFlickr({ category: "business" }),
  images: [
    faker.image.urlLoremFlickr({ category: "nightlife" }),
    faker.image.urlLoremFlickr({ category: "people" }),
    faker.image.urlLoremFlickr({ category: "business" }),
  ],
  logo: faker.image.urlLoremFlickr({ category: "business" }),
};

export const validationSchema = yup.object().shape({
  name: yup.string().required(),
  summary: yup.string().required(),
  description: yup.string().required(),

  address: yup.string().required(),
  zipCode: yup.string().required(),
  neighborhood: yup.string().required(),
  addressNumber: yup.string().required(),
  state: yup.string().required(),
  city: yup.string().required(),
  longitude: yup.number().required(),
  latitude: yup.number().required(),

  thumbnail: yup.string().required(),
  images: yup.array(yup.string().required()).required(),
  logo: yup.string().required(),
});

export type InitialValues = typeof initialValues;

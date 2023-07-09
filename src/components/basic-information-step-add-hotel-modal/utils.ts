import { Faker, es, pt_BR } from "@faker-js/faker";
import * as yup from "yup";

const faker = new Faker({
  locale: [pt_BR, es],
});

export const initialValues = {
  name: faker.company.name(),
  summary: faker.lorem.sentence(),
  description: faker.lorem.paragraphs(),
};

export const validationSchema = yup.object().shape({
  name: yup.string().required(),
  summary: yup.string().required(),
  description: yup.string().required(),
});

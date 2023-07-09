import { Faker, pt_BR } from "@faker-js/faker";
import * as yup from "yup";

const faker = new Faker({
  locale: [pt_BR],
});

export const initialValues = {};

export const validationSchema = yup.object().shape({});

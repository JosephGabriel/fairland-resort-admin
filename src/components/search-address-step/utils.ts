import { Faker, pt_BR } from "@faker-js/faker";
import * as yup from "yup";

const faker = new Faker({
  locale: [pt_BR],
});

export const initialValues = {
  address: faker.location.street(),
  zipCode: faker.location.zipCode(),
  neighborhood: faker.location.secondaryAddress(),
  state: faker.location.state(),
  city: faker.location.city(),
  addressNumber: faker.location.buildingNumber(),
  longitude: faker.location.longitude(),
  latitude: faker.location.latitude(),
};

export const validationSchema = yup.object().shape({
  address: yup.string().required(),
  zipCode: yup.string().required(),
  neighborhood: yup.string().required(),
  state: yup.string().required(),
  city: yup.string().required(),
  longitude: yup.number().required(),
  latitude: yup.number().required(),
  addressNumber: yup.string().required(),
});

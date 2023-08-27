import { UpdateHotelInput } from "@services/apollo/generated/hooks";
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
  name: "",
  summary: "",
  description: "",

  address: "",
  zipCode: "",
  neighborhood: "",
  state: "",
  city: "",
  addressNumber: "",
  longitude: 0,
  latitude: 0,

  thumbnail: "",
  images: ["", "", ""],
  logo: "",
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

import * as yup from "yup";

export const initialValues = {
  email: "",
  password: "",
};

export const validationSchema = yup.object().shape({
  email: yup
    .string()
    .email("Requer um email válido")
    .required("Requer um email"),
  password: yup
    .string()
    .required("Requer uma senha")
    .min(8, "A senha deve ter no mínimo 8 caracteres")
    .trim()
    .test(
      "contains-password",
      'A senha não deve conter a palavra "password"',
      (value) => !value.toLowerCase().includes("password")
    )
    .test(
      "contains-password",
      'A senha não deve conter a palavra "senha"',
      (value) => !value.toLowerCase().includes("senha")
    )
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
      "Para a senha ser válida, ela deve ter no mínimo 8 caracteres, ter no mínimo 1 caractere especial, 1 letra maiúscula e 1 número"
    ),
});

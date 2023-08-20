import { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useSnackbar } from "notistack";
import { useFormik } from "formik";

import {
  Grow,
  IconButton,
  InputAdornment,
  LinearProgress,
} from "@mui/material";

import { useLoginUserMutation } from "@services/apollo/generated/hooks";

import { useUserContext } from "@contexts/user";

import { initialValues, validationSchema } from "./utils";

import * as Material from "./styles";

export const LoginPage = () => {
  const [loginUser, { loading }] = useLoginUserMutation();

  const [isHidden, setIsHidden] = useState(false);

  const { setUser } = useUserContext();

  const { enqueueSnackbar } = useSnackbar();

  const onSubmit = async (values: typeof initialValues) => {
    await loginUser({
      variables: { data: values },
      onError(error) {
        if (error.networkError) {
          enqueueSnackbar("Erro ao fazer login, tente novamente mais tarde", {
            variant: "error",
          });
        }

        if (error.graphQLErrors) {
          error.graphQLErrors.map((err) => {
            enqueueSnackbar(err.message, {
              variant: "error",
            });
          });
        }
      },
      update(_, { data }) {
        if (!data?.loginUser.user) {
          return;
        }

        setUser(data?.loginUser.user);
      },
    });
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    validateOnMount: false,
    onSubmit,
  });

  return (
    <Material.Container
      container
      alignItems={"center"}
      justifyContent={"center"}
    >
      <Material.FormContainer item>
        <Grow in={loading}>
          <LinearProgress />
        </Grow>

        <Material.Form onSubmit={formik.handleSubmit}>
          <Material.Title variant="h4">Login</Material.Title>

          <Material.Subtitle variant="body1">
            insira suas informações para fazer login
          </Material.Subtitle>

          <Material.Input
            label="Email"
            name="email"
            value={formik.values.email}
            error={!!formik.errors.email}
            helperText={formik.errors.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            variant="outlined"
            fullWidth
          />

          <Material.Input
            label="Senha"
            name="password"
            type={isHidden ? "text" : "password"}
            value={formik.values.password}
            error={!!formik.errors.password}
            helperText={formik.errors.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            variant="outlined"
            fullWidth
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setIsHidden(!isHidden)}>
                    {isHidden ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Material.LoginButton
            size="large"
            variant="contained"
            fullWidth
            disabled={!formik.isValid}
            onClick={formik.submitForm}
          >
            {loading ? "Carregando..." : "Entrar"}
          </Material.LoginButton>
        </Material.Form>
      </Material.FormContainer>
    </Material.Container>
  );
};

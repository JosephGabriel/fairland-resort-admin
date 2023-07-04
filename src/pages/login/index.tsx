import { useState } from "react";
import { Close, Visibility, VisibilityOff } from "@mui/icons-material";
import { useFormik } from "formik";

import {
  Grow,
  IconButton,
  InputAdornment,
  LinearProgress,
  Snackbar,
} from "@mui/material";

import { useLoginUserMutation } from "../../services/apollo/generated";
import { LocalStorageService } from "../../services/local-storage";
import { authUser } from "../../services/apollo/variables/user";

import { initialValues, validationSchema } from "./utils";

import * as Material from "./styles";

export const LoginPage = () => {
  const [loginUser, { loading }] = useLoginUserMutation();

  const [errorMessage, setErrorMessage] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  const handleClose = (_: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }

    setIsOpen(false);
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    validateOnMount: false,
    validateOnBlur: true,
    validateOnChange: false,
    onSubmit: async (values) => {
      await loginUser({
        variables: { data: values },
        onError(error) {
          setErrorMessage(error.message);
          setIsOpen(true);
        },
        update(_, { data }) {
          LocalStorageService.getInstance().setItem(
            "token",
            `${data?.loginUser.token}`
          );

          authUser(data?.loginUser.user);
        },
      });
    },
  });

  return (
    <Material.Container
      container
      alignItems={"center"}
      justifyContent={"center"}
    >
      <Snackbar
        open={isOpen}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        autoHideDuration={6000}
        onClose={handleClose}
        message={errorMessage}
        action={
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleClose}
          >
            <Close fontSize="small" />
          </IconButton>
        }
      />

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

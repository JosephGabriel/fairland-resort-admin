import { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useSnackbar } from "notistack";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Grow,
  IconButton,
  InputAdornment,
  LinearProgress,
} from "@mui/material";

import { LocalStorageService } from "@services/local-storage";
import { useUserContext } from "@contexts/user";

import {
  LoginUserInput,
  useLoginUserMutation,
} from "@services/apollo/generated/hooks";

import { LoginSchema, TLoginSchema } from "./utils";

import * as Material from "./styles";

export const LoginPage = () => {
  const [loginUser, { loading }] = useLoginUserMutation();

  const [isHidden, setIsHidden] = useState(false);

  const { setUser } = useUserContext();

  const { enqueueSnackbar } = useSnackbar();

  const onSubmit = async (values: LoginUserInput) => {
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
      onCompleted() {
        enqueueSnackbar("Login Concluido", {
          variant: "success",
        });
      },
      update(_, { data }) {
        if (!data?.loginUser.user) {
          return;
        }

        LocalStorageService.getInstance().setItem(
          "token",
          data?.loginUser.token
        );

        setTimeout(() => {
          setUser(data?.loginUser.user);
        }, 1000);
      },
    });
  };

  const { register, handleSubmit, formState } = useForm<TLoginSchema>({
    resolver: zodResolver(LoginSchema),
    mode: "onChange",
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

        <Material.Form onSubmit={handleSubmit(onSubmit)}>
          <Material.Title variant="h4">Login</Material.Title>

          <Material.Subtitle variant="body1">
            insira suas informações para fazer login
          </Material.Subtitle>

          <Material.Input
            label="Email"
            {...register("email")}
            error={!!formState.errors.email}
            helperText={formState.errors.email?.message}
            variant="outlined"
            fullWidth
            inputProps={{
              "data-testid": "email-input",
            }}
          />

          <Material.Input
            label="Senha"
            type={isHidden ? "text" : "password"}
            {...register("password")}
            error={!!formState.errors.password}
            helperText={formState.errors.password?.message}
            variant="outlined"
            fullWidth
            inputProps={{
              "data-testid": "password-input",
            }}
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
            data-testid="submit-btn"
            disabled={!formState.isValid || formState.isSubmitting}
            type="submit"
          >
            {loading ? "Carregando..." : "Entrar"}
          </Material.LoginButton>
        </Material.Form>
      </Material.FormContainer>
    </Material.Container>
  );
};

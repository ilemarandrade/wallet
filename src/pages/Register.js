import React from "react";
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import yup from "../utils/validation";
import useRegisterUser from "../hook/api/useRegisterUser";
import { toast } from "react-hot-toast";
import { useHistory } from "react-router-dom";
import routes from "../constants/routes";

const Schema = yup.object().shape({
  name: yup.string().required(),
  lastname: yup.string().required(),
  document: yup.string().required(),
  phone: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().required(),
  confirmation_password: yup
    .string()
    .required("La confirmación de contraseña es requerida")
    .oneOf([yup.ref("password"), ""], "Las contraseñas no coinciden"),
});
function Register() {
  const history = useHistory();
  const { handleSubmit, control, reset } = useForm({
    defaultValues: { email: "", password: "" },
    resolver: yupResolver(Schema),
  });
  const { mutate } = useRegisterUser();
  const onSubmit = (values) => {
    mutate(values, {
      onSuccess: () => {
        reset();
        toast.success("Registro completado exitosamente");
        history.push(routes.LOGIN);
      },
      onError: ({ message }) => {
        toast.error(message || "Ha ocurrido un error");
      },
    });
  };

  return (
    <div>
      <h2 style={{ textAlign: "center", color: "white" }}>Sign up</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          control={control}
          name="name"
          render={({ field, fieldState }) => (
            <TextField
              {...{ ...field }}
              error={fieldState.error}
              helperText={fieldState?.error?.message}
              label="Nombre"
              variant="filled"
              fullWidth
            />
          )}
        />
        <Controller
          control={control}
          name="lastname"
          render={({ field, fieldState }) => (
            <TextField
              {...{ ...field }}
              error={fieldState.error}
              helperText={fieldState?.error?.message}
              label="Apellido"
              variant="filled"
              fullWidth
            />
          )}
        />
        <Controller
          control={control}
          name="email"
          render={({ field, fieldState }) => (
            <TextField
              {...{ ...field }}
              error={fieldState.error}
              helperText={fieldState?.error?.message}
              label="Email"
              variant="filled"
              fullWidth
            />
          )}
        />
        <Controller
          control={control}
          name="document"
          render={({ field, fieldState }) => (
            <TextField
              {...{ ...field }}
              error={fieldState.error}
              helperText={fieldState?.error?.message}
              label="Documento"
              variant="filled"
              fullWidth
            />
          )}
        />
        <Controller
          control={control}
          name="phone"
          render={({ field, fieldState }) => (
            <TextField
              {...{ ...field }}
              error={fieldState.error}
              helperText={fieldState?.error?.message}
              label="Telefono"
              variant="filled"
              fullWidth
            />
          )}
        />
        <Controller
          control={control}
          name="password"
          render={({ field, fieldState }) => (
            <TextField
              {...{ ...field }}
              error={fieldState.error}
              helperText={fieldState?.error?.message}
              label="Password"
              variant="filled"
              fullWidth
            />
          )}
        />
        <Controller
          control={control}
          name="confirmation_password"
          render={({ field, fieldState }) => (
            <TextField
              {...{ ...field }}
              error={fieldState.error}
              helperText={fieldState?.error?.message}
              label="Confirmation password"
              variant="filled"
              fullWidth
            />
          )}
        />
        <div className="perfectCentered">
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Registrar
          </Button>
        </div>
      </form>
    </div>
  );
}

export default Register;

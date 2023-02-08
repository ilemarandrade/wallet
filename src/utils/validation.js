import * as yup from "yup";
import i18next from "../utils/traductions/i18n";

yup.setLocale({
  mixed: {
    required: i18next.t("validation_message.required"),
  },
  string: {
    max: ({ max }) => `No puede tener más de ${max} caracteres`,
    min: ({ min }) => `Debe ser como minimo ${min} caracteres`,
    email: i18next.t("validation_message.email"),
  },
  number: {
    max: ({ max }) => `La cantidad maxima deberia ser ${max}`,
    min: ({ min }) => `La cantidad minima deberia ser ${min}`,
  },
});

yup.addMethod(yup.string, "password", function password(maxLength = 70) {
  // eslint-disable-next-line react/jsx-indent
  return this.min(8, "El mínimo número de caracteres es de 8 dígitos")
    .matches(/(.*[a-z].*)/, "Debe poseer un carácter con minúscula")
    .matches(/(.*[A-Z].*)/, "Debe poseer un carácter con mayúscula")
    .matches(/(.*\d.*)/, "Debe poseer un número")
    .matches(/[!@#$%^&*(),.?":{}|<>]/, "Debe poseer un carácter especial")
    .max(maxLength, `El máximo número de caracteres es de ${maxLength} dígitos`)
    .required("La contraseña es requerida");
});

export default yup;

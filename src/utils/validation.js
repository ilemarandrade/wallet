import * as yup from "yup";
import i18next from "../utils/traductions/i18n";

const { t } = i18next;
yup.setLocale({
  mixed: {
    required: t("validation_message.required"),
  },
  string: {
    max: ({ max }) => `No puede tener más de ${max} caracteres`,
    min: ({ min }) => `Debe ser como minimo ${min} caracteres`,
    email: t("validation_message.email"),
  },
  number: {
    max: ({ max }) => `La cantidad maxima deberia ser ${max}`,
    min: ({ min }) => `La cantidad minima deberia ser ${min}`,
  },
});

yup.addMethod(yup.string, "password", function password(maxLength = 70) {
  return this.min(8, t("validation_message.min_characters", { number: 8 }))
    .matches(/(.*[a-z].*)/, t("validation_message.should_have_lowercase"))
    .matches(/(.*[A-Z].*)/, t("validation_message.should_have_uppercase"))
    .matches(/(.*\d.*)/, t("validation_message.should_have_number"))
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      t("validation_message.should_have_special_character")
    )
    .max(
      maxLength,
      t("validation_message.max_characters", { number: maxLength })
    )
    .required();
});

export default yup;

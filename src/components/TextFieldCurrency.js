import React from "react";
import MaskedInput from "react-text-mask";
import TextFieldOwn from "./TextFieldOwn";
import createNumberMask from "text-mask-addons/dist/createNumberMask";

export const formatCurrencyToNumber = (value) => {
  return value.split(",").join("").slice(1);
};

const defaultMaskOptions = {
  prefix: "$",
  suffix: "",
  includeThousandsSeparator: true,
  thousandsSeparatorSymbol: ",",
  allowDecimal: true,
  decimalSymbol: ".",
  decimalLimit: 2, // how many digits allowed after the decimal
  integerLimit: 9, // limit length of integer numbers
  allowNegative: false,
  allowLeadingZeroes: false,
};

const CurrencyInput = ({ maskOptions, ...inputProps }) => {
  const currencyMask = createNumberMask({
    ...defaultMaskOptions,
    ...maskOptions,
  });

  return <MaskedInput mask={currencyMask} {...inputProps} />;
};

const TextFieldCurrency = ({ onChange, ...props }) => {
  return (
    <TextFieldOwn
      {...{
        ...props,
        onChange: (ref) =>
          onChange({
            ...ref,
            currentTarget: {
              ...ref.currentTarget,
              value: ref.currentTarget.value.trim(),
            },
          }),
        InputProps: { inputComponent: CurrencyInput },
      }}
    />
  );
};

export default TextFieldCurrency;

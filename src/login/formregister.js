export const formRegister = (
  requiredMessage,
  pattern,
  patternMessage,
  maxLength,
  maxLengthMessage,
  minLength,
  minLengthMessage
) => {
  return {
    required: requiredMessage,
    maxLength: { value: maxLength, message: maxLengthMessage },
    minLength: { value: minLength, message: minLengthMessage },
    pattern: {
      value: pattern,
      message: patternMessage,
    },
  };
};

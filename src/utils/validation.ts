export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const isValidUsername = (username: string): boolean => {
  // En az 3 karakter, sadece harf, rakam ve alt çizgi içerebilir
  const usernameRegex = /^[a-zA-Z0-9_]{3,}$/;
  return usernameRegex.test(username);
};

export const validatePassword = (
  password: string
): {
  isValid: boolean;
  message?: string;
} => {
  if (password.length < 6) {
    return { isValid: false, message: "Şifre en az 6 karakter olmalıdır" };
  }

  if (!/[A-Z]/.test(password)) {
    return {
      isValid: false,
      message: "Şifre en az bir büyük harf içermelidir",
    };
  }

  if (!/[0-9]/.test(password)) {
    return { isValid: false, message: "Şifre en az bir rakam içermelidir" };
  }

  return { isValid: true };
};

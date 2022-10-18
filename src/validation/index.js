export const registerErrors = (errorCode, registerError) => {
  if (errorCode === 'auth/email-already-in-use') {
    registerError.innerHTML = 'E-mail já cadastrado. Insira um e-mail diferente';
  } else if (errorCode === 'auth/invalid-email') {
    registerError.innerHTML = 'Insira um e-mail válido';
  } else {
    registerError.innerHTML = 'Algo deu errado. Por favor, tente novamente';
  }
};
export const loginErrors = (errorCode, loginError) => {
  if (errorCode === 'auth/user-not-found') {
    loginError.innerHTML = 'Insira um e-mail válido';
  } else if (errorCode === 'auth/wrong-password') {
    loginError.innerHTML = 'Insira uma senha válida';
  } else if (errorCode === 'auth/internal-error') {
    loginError.innerHTML = 'Insira um e-mail e senha válidos';
  } else if (errorCode === 'auth/invalid-email') {
    loginError.innerHTML = 'Insira um e-mail válido';
  } else {
    loginError.innerHTML = 'Algo deu errado. Por favor, tente novamente';
  }
};

export const validPass = (pass, password2, registerError) => {
  if (pass !== password2) {
    registerError.innerHTML = 'As senhas não são iguais. Por favor, insira senhas válidas';
  }
};

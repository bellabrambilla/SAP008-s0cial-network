// Importar serviço, se houver.
import { signUp, signInWithGoogle } from '../../lib/services.js';
import { navigateTo } from '../../navigation/navigate.js';
import { updateProfile, GoogleAuthProvider, getAuth } from '../../lib/firebase.js';
import { registerErrors, validPass } from '../../validation/index.js';

export default () => {
  const containerRegister = document.createElement('div');
  containerRegister.className = 'desktop-tela-cadastro';
  const register = `
  <div class="desktop-register">
    <img class="imagem" src="../img/wollball.png">
  </div>
  <div class="conteiner-cadastro">
    <nav class="back-to-login">
      <button class="btn-back inder btn" id="btn-back">&#8678Voltar</button>
    </nav>
    <header class="logo-paw">
      <img class="logo-cadastro" src="../img/cadastro.png">
    </header>
    <button class="btn inder" id="btn-entrar-google">Entrar com Google</button>
    <div class="dot"> &#9679 </div>
    <form id="form" class="register">
        <div class="conteiner-input">
          <label for="e-mail" class="itim">E-mail</label>
          <input type="text" class="input" id="email-register">
        </div>
        <div class="conteiner-input">
          <label for="nome" class="itim">Nome completo</label>
          <input type="text" class="input" id="name-register">
        </div>
        <div class="conteiner-input">
          <label for="display-name" class="itim">Nome do gato</label>
          <input type="text" class="input" id="display-name"/>
          <label for="senha" class="itim">Senha</label>
          <input type="password" class="input pass" id="password-register" placeholder="Digite sua senha"/>
          <input type="password" class="input pass" id="password-register2" placeholder="Repita sua senha"/>
        </div>
        <button class="btn inder" id="btn-register" type="submit">Cadastre-se</button>
    </form>
    <div class="register-error itim font-size" id="register-error"></div>
    <footer class="footer-info inder">
      <p>Desenvolvido por Isabella e Sara, 2022</p>
    </footer>
  </div>
  `;
  containerRegister.innerHTML = register;
  const email = containerRegister.querySelector('#email-register');
  const pass = containerRegister.querySelector('#password-register');
  const name = containerRegister.querySelector('#display-name');
  const form = containerRegister.querySelector('#form');
  const google = containerRegister.querySelector('#btn-entrar-google');
  const backToLogin = containerRegister.querySelector('#btn-back');
  const registerError = containerRegister.querySelector('#register-error');
  const password2 = containerRegister.querySelector('#password-register1');
  const newUser = (event) => {
    event.preventDefault();
    signUp(email.value, pass.value, name.value)
      .then((userCredential) => {
        // Signed in
        console.log(userCredential);
        const user = userCredential.user;
        updateProfile(user, {
          displayName: name.value,
        })
          .then(() => {
            navigateTo('#home');
          });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, ':', errorMessage);
        registerErrors(errorCode, registerError);
      });
  };
  const googleLogin = (event) => {
    event.preventDefault();
    signInWithGoogle()
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        console.log(token, user);
        navigateTo('#home');
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        // const email = error.customData.email;
        // // The AuthCredential type that was used.
        // const credential = GoogleAuthProvider.credentialFromError(error);
        console.log(errorCode, ':', errorMessage);
      });
  };
  const login = (event) => {
    event.preventDefault();
    navigateTo('#login');
  };
  google.addEventListener('click', googleLogin);
  form.addEventListener('submit', newUser);
  backToLogin.addEventListener('click', login);

  return containerRegister;
};

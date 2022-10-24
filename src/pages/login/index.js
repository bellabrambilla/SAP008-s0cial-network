import {
  logInWithEmailAndPassword,
  signInWithGoogle,
} from '../../lib/services.js';
import { navigateTo } from '../../navigation/navigate.js';
import { loginErrors } from '../../validation/index.js';
import { GoogleAuthProvider } from '../../lib/firebase.js';

export default () => {
  const containerLogin = document.createElement('div');
  containerLogin.className = 'telaLogin';
  const loginHtml = `
      <div class="desktop">
      <h1 class="title life-savers">mia.www</h1>
      <p class="text inder"> Lorem ipsum dolor sit amet! <br>
        Consectetur adipiscing elit, sed do eiusmod tempor <br>
         incididunt ut labore et dolore magna aliqua.<br>
        Ut enim ad minim veniam, quis nostrud exercitation ullamco<br>
         laboris nisi ut aliquip ex ea commodo consequat.<br>
        Duis aute irure dolor in reprehenderit in voluptate velit<br>
        esse cillum dolore eu fugiat nulla pariatur.<br>
        Excepteur sint occaecat cupidatat non.
      </p>
        <img class="imagem" alt="wollball" src="../img/wollball.png">
      </div>
      <div class="conteiner-login">
        <div class="logo">
         <img class="imagem" alt="logo-paw" src="../img/miawpaw.png">
        </div>
        <form class="login" id="form">
          <div class="inputs">
            <div class="email input2">
              <label for="e-mail" class="itim font-size">E-mail</label>
              <input type="email" class="input itim font-size" id="e-mail" />
            </div>
            <div class="password input2">
              <label for="password" class="itim font-size">Senha</label>
              <input type="password" class="input itim font-size" id="password"  />
            </div>
          </div>
          <div class="login-error itim font-size" id="login-error"></div>
          <div class="btns">
            <button class="btn itim" id="btn-login" type="submit">Entrar</button>
            <div class="dot">
              &#9679
            </div>
            <button class="btn itim" id="btn-login-Google" type="button">Entrar com Google</button>
            <button class="btn itim" id="btn-create-account">Criar conta</button>
          </div>
          <div class="forgot-password">
            <a href="#" class="forgot-password itim" id="forgot-password">Esqueci minha senha</a>
          </div>
        </form> 
        <footer class="footer-info inder">
         <p>Desenvolvido por Isabella e Sara, 2022</p>
        </footer>  
      </div>     
      
    
  `;
  containerLogin.innerHTML = loginHtml;

  const inputEmail = containerLogin.querySelector('#e-mail');
  const inputPassword = containerLogin.querySelector('#password');
  const btnCreateAccount = containerLogin.querySelector('#btn-create-account');
  const form = containerLogin.querySelector('#form');
  const btnLoginGoogle = containerLogin.querySelector('#btn-login-Google');
  const loginError = containerLogin.querySelector('#login-error');

  // Eventos da tela de login
  const login = (event) => {
    event.preventDefault();
    logInWithEmailAndPassword(inputEmail.value, inputPassword.value)
      .then(() => {
        navigateTo('#home');
      })
      .catch((error) => {
        const errorCode = error.code;
        loginErrors(errorCode, loginError);
      });
  };
  form.addEventListener('submit', login);

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
      }).catch((error) => {
      // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        // const email = error.customData.email;
        // // The AuthCredential type that was used.
        // const credential = GoogleAuthProvider.credentialFromError(error);
        console.log (errorCode, ':', errorMessage);
      });
  };
  btnLoginGoogle.addEventListener('click', googleLogin);

  // navegação para o cadastro
  const account = (event) => {
    event.preventDefault();
    navigateTo('#register');
  };
  // evento da navegação
  btnCreateAccount.addEventListener('click', account);

  return containerLogin;
};

import {
  logInWithEmailAndPassword,
  signInWithGoogle,
} from "../../lib/services.js";
import { navigateTo } from "../../navigation/navigate.js";
export default () => {
  let containerLogin = document.createElement("div");
  containerLogin.className= "telaLogin"

  const loginHtml = `
    
      <div class="logo">
        <img class="imagem" src="../img/logo.jpg">
      </div>
      <form class="login" id="form">
        <div class="inputs">
          <div class="email input2">
            <label for="e-mail">E-mail</label>
            <input type="email" class="input" id="e-mail" placeholder="Digite seu e-mail" />
          </div>
          <div class="password input2">
            <label for="password">Senha</label>
            <input type="password" class="input" id="password" placeholder="Digite sua senha" />
          </div>
        </div>
        <div class="login-error"></div>
        <div class="btns">
          <button class="btn" id="btn-login" type="submit">Entrar</button>
          <button class="btn" id="btn-login-Google" type="button">Entrar com Google</button>
          <button class="btn" id="btn-create-account">Criar conta</button>
        </div>
        <div class="forgotPassword">
          <a href="#" class="forgotLink" id="forgotPassword">Esqueci minha senha</a>
        </div>
      </form>    
        <footer class="footerInfo">Desenvolvido por Isabella e Sara,2022</footer> 
    
  `;
  containerLogin.innerHTML = loginHtml;

  const inputEmail = containerLogin.querySelector("#e-mail");
  const inputPassword = containerLogin.querySelector("#password");
  const btnLogin = containerLogin.querySelector("#btn-login");
  const btnCreateAccount = containerLogin.querySelector("#btn-create-account");
  const form = containerLogin.querySelector("#form");
  const btnLoginGoogle = containerLogin.querySelector("#btn-login-Google");

  //Eventos da tela de login
  const login = (event) => {
    event.preventDefault();
    logInWithEmailAndPassword(inputEmail.value, inputPassword.value);
    // .then(()=>{
    //   navigateTo("#home");
    // })
    // .catch((error) => {
    //   alert(error + "Revise suas informações!");
    // });
  };
  btnLogin.addEventListener("click", login);
  form.addEventListener("submit", login);

  const googleLogin = (event) => {
    event.preventDefault();
    signInWithGoogle();
    // .then(()=>{
    //   navigateTo("#profile");
    // })
  };
  btnLoginGoogle.addEventListener("click", googleLogin);

  const account = (event) => {
    event.preventDefault();
    navigateTo("#register");
  };

  btnCreateAccount.addEventListener("click", account);

  return containerLogin;
};

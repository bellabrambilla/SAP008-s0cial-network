import {
  logInWithEmailAndPassword,
  signInWithGoogle,
} from "../../lib/services.js";
import { navigateTo } from "../../navigation/navigate.js";
export default () => {
  let containerLogin = document.createElement("div");
  containerLogin.className= "telaLogin"
  const loginHtml = `
      <div class="desktop">Loren\fvbbdsvj
      <img class="imagem" src="../img/wollball.png">
      </div>
      <div class="logo">
        <img class="imagem" src="../img/miawpaw.png">
      </div>
      <form class="login" id="form">
        <div class="inputs">
          <div class="email input2">
            <label for="e-mail">E-mail</label>
            <input type="email" class="input" id="e-mail" />
          </div>
          <div class="password input2">
            <label for="password">Senha</label>
            <input type="password" class="input" id="password"  />
          </div>
        </div>
        <div class="login-error"></div>
        <div class="btns">
          <button class="btn" id="btn-login" type="submit">Entrar</button>
          <div class="dot">
          &#9679
          </div>
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
    logInWithEmailAndPassword(inputEmail.value, inputPassword.value)
    .then(()=>{
      navigateTo("#home");
    })
    .catch((error) => {
      alert(error + "Revise suas informações!");
    });
  };
  btnLogin.addEventListener("click", login);
  form.addEventListener("submit", login);

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
      navigateTo("#profile");
    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      // const email = error.customData.email;
      // // The AuthCredential type that was used.
      // const credential = GoogleAuthProvider.credentialFromError(error);
      console.log(errorCode, ":", errorMessage);
    });
  };
  btnLoginGoogle.addEventListener("click", googleLogin);

  //navegação para o cadastro
  const account = (event) => {
    event.preventDefault();
    navigateTo("#register");
  };
//evento da navegação
  btnCreateAccount.addEventListener("click", account);

  return containerLogin;
};

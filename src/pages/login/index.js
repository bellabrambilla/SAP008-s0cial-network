import { logInWithEmailAndPassword,signInWithGoogle} from "../../lib/services.js";
import { navigateTo } from "../../navigation/navigate.js";
export default () => {
  let containerLogin = document.createElement("div")
  
  const loginHtml = `
  <header>Logo</header>
    <main>
      <form class="login" id="form">
        <div class="email">
          <label for="e-mail">E-mail</label>
          <input type="email" class="input" id="e-mail" />
        </div>
        <div class="password">
          <label for="password">Senha</label>
          <input type="password" class="input" id="password" />
        </div>
        <div class="login-error"></div>
        <div class="btns">
        <button class="btn" id="btn-login" type="submit">Entrar</button>
        <button class="btn" id="btn-login-Google" type="button">Entrar com Google</button>
        <button class="btn" id="btn-create-account">Criar conta</button>
      </div>
      </form>    
    </main>
    <footer></footer> 
  `;
  containerLogin.innerHTML =loginHtml;
  
  const inputEmail= containerLogin.querySelector("#e-mail");
  const inputPassword= containerLogin.querySelector("#password");
  const btnLogin= containerLogin.querySelector("#btn-login");
  const btnCreateAccount= document.querySelector("#btn-create-account");
  const form = containerLogin.querySelector("#form");
  const btnLoginGoogle =containerLogin.querySelector("#btn-login-Google")
  
  //Eventos da tela de login
  const login = (event) => {
    event.preventDefault();
    logInWithEmailAndPassword(inputEmail.value, inputPassword.value)
    .then(()=>{
      navigateTo("#create-profile");
    });

  };
  btnLogin.addEventListener("click", login);
  form.addEventListener("submit",login);
  
  const googleLogin =(event) =>{
    event.preventDefault();
    signInWithGoogle();
  }
  btnLoginGoogle.addEventListener("click",googleLogin);

  // btnCreateAccount.addEventListener("click",)
  // window.location.hash="#register"
  
  return containerLogin;

}
  
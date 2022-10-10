//Importar serviço, se houver.
import { signUp } from "../../lib/services.js";
import { navigateTo } from "../../navigation/navigate.js";

export default () => {
  let containerRegister = document.createElement("div");
  containerLogin.className= "desktopTelaCadastro"
  const register = `<header>mia.www</header>

  <figure><img logo></figure>
  <text>Lorenbbdsvj</text>
  <figure><img novelo></figure>
  <div class="telaCadastro">
    <button class="btn" id="btn-entrar-Google">Entrar com Google</button>
      <form id="form" class="register">
        <div class="emailRegister">
          <label for="e-mail">E-mail</label>
          <input type="text" class="input" id="emailRegister">
        </div>
        <div class="nameRegister">
          <label for="nome">Nome completo</label>
          <input type="text" class="input" id="nameRegister">
        </div>
        <div class="usernameRegister">
          <label for="nome de usuario">Nome de usuário</label>
          <input type="text" class="input" id="usernameRegister">
        </div>
        <div class="passwordRegister">
          <label for="senha">Senha</label>
          <input type="text" class="input" id="passwordRegister">
        </div>
          <button class="btn" id="btnRegister">Cadastre-se</button>
      </form>
  </div>
  `;
  containerRegister.innerHTML = register;
  const email = containerRegister.querySelector("#emailRegister");
  const pass = containerRegister.querySelector("#passwordRegister");
  const btnReg = containerRegister.querySelector("#btnRegister");
  const newUser = (event) => {
    event.preventDefault()
    return signUp(email.value, pass.value)
  }
  btnReg.addEventListener("click", newUser);

  return containerRegister;
};

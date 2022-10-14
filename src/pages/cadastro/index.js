// Importar serviço, se houver.
import { signUp } from "../../lib/services.js";
import { navigateTo } from "../../navigation/navigate.js";

export default () => {
  const containerRegister = document.createElement("div");
  containerRegister.className = "desktopTelaCadastro"
  const register = `
  <div class="desktop">
    <img class="imagem" src="../img/wollball.png">
  </div>
  <header>
    <img class="logoCadastro" src="../img/cadastro.png">
  </header>
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
          <label for="displayName">Nome do gato</label>
          <input type="text" class="input" id="displayName">
        </div>
        <div class="passwordRegister">
          <label for="senha">Senha</label>
          <input type="text" class="input" id="passwordRegister">
        </div>
          <button class="btn" id="btnRegister" type="submit">Cadastre-se</button>
      </form>
  </div>
  `;
  containerRegister.innerHTML = register;
  const email = containerRegister.querySelector("#emailRegister");
  const pass = containerRegister.querySelector("#passwordRegister");
  const name = containerRegister.querySelector("#displayName");
  const form = containerRegister.querySelector("#form");
  const newUser = (event) => {
    event.preventDefault();
    return signUp(email.value, pass.value, name.value);
  };

  form.addEventListener("submit", newUser);

  return containerRegister;
};

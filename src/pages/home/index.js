import { getAuth } from '../../lib/firebase.js';
import { templatePost, createPost, getPosts, editPosts } from "../../lib/services.js";


export default () => {
  const auth = getAuth();

  let containerHome = document.createElement("div");
  containerHome.className = 'home';
  const home = `
  <div class="home">  
    <header>
      <nav class="menu">
      Menu
      </nav>
      <img class="home-logo" src="../img/homelogo.png">
    </header>
    <section class="welcome">
    <p>Bem-vinde, <b>${auth.currentUser.displayName}</b></p>
    </section>
    <section class="post">
     <form id="formPost" class="form">
        <img class="avatar" src="../img/avatarcat.png">
        <textarea class="input-post" id="inputPost" placeholder="Escreva aqui 🐈"></textarea>
        <button type="submit" class="submit-post" id="btnPost">Enviar</btn>
     </form>
    </section>
    <article class="feed" id="printPost">
    </article>
    <footer>
    </footer>
</div>
    `;
  containerHome.innerHTML = home;

  // const form = containerHome.querySelector("#formPost");
  const btnPost = containerHome.querySelector("#btnPost");
  const textPost = containerHome.querySelector("#inputPost");
  let printPost = containerHome.querySelector("#printPost");

  const postCreation = (event) => {
    event.preventDefault();
    //pensar em type error pra texto vazio
    const template = textPost.value;
    createPost(templatePost(template))
      .then(() => {
        printPost.innerHTML += template;
      })
      .catch((error) => {
        alert(error + "Algo deu errado, tente novamente.");
      });
  };

  btnPost.addEventListener("click", postCreation);

  getPosts().then((result) => {
    printPost.innerHTML = "";
    result.forEach((doc) => {
      const data = doc.data();
      const div = document.createElement("div");
      div.className = "content-post";
      div.innerHTML = `
          <div class="post-header">
            <img class="avatar" src="../img/avatarcat.png">      
            <text class="post-header-text"><b>${data.user_id}</b></text>
            <button type="button" class="post-btn" id="editPost" data-edit="${doc.id}">Editar</button>
            <button type="button" class="post-btn">Excluir</button>
         </div>
        <p class="text-post" id="textPost" contenteditable="false">${data.text}</p>
        <hr>
        <div class="post-footer">
            <button type="button" class="likecoment-btn">Curtir</button>
            <button type="button" class="likecoment-btn">Comentar</button>
        </div>

        `;
      //elementopai.insertBefore (elemento novo, elemento de referência.childNodes[posição])
      printPost.insertBefore(div, printPost.childNodes[0]);

      const editButton = containerHome.querySelector("#editPost");
      const editText = containerHome.querySelector("#textPost");
      const editId = editButton.getAttribute("data-edit");
      // editButton.addEventListener("click", () => {
      //   if 

      // });
      console.log(editText);
      // editPosts(text, postId).then(() => document. location. reload());
    });
  });
  



  return containerHome;
};
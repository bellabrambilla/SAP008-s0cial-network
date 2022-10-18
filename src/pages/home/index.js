import { templatePost, createPost, getPosts, editPosts } from "../../lib/services.js";

export default () => {
  let containerHome = document.createElement("div");

  const home = `
    <header>
      <nav>
      Menu
      </nav>
    </header>
    <section class="welcome">
    Bem-vinde, NOME
    </section>
    <section class="post">
     <form id="formPost">
        <input type="textarea" class="inputPost" id="inputPost" placeholder="Escreva aqui"> </input>
        <button type="submit" class"btn subimitPost" id="btnPost">Enviar</btn>
     </form>
    </section>
    <article class="feed" id="printPost">
    </article>
    <footer>
    </footer>
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
      const div = document.createElement('div');
      div.className = "contentPost"
      div.innerHTML = `<hr>
        
        <p>${data.user_id}</p>
        <p>${data.text}</p>
        <hr>
        `;
        //elementopai.insertBefor (elemento novo, elemento de referência.childNodes[posição])
        printPost.insertBefore(div, printPost.childNodes[0]);
    });
  });
  
  // editPosts(text, postId).then(() => document. location. reload());

  return containerHome;
};

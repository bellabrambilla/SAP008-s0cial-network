import { getAuth } from '../../lib/firebase.js';
import { templatePost, createPost, getPosts, editPosts} from '../../lib/services.js';

const auth = getAuth();
export default () => {
  const containerHome = document.createElement('div');

  // TROCAR CLASSES TAGS ESTILOS CSS
  const home = `
    <header>
      <nav>
      Menu
      </nav>
    </header>
    <section class="welcome">
    Bem-vinde, ${auth.currentUser.displayName}
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
  const btnPost = containerHome.querySelector('#btnPost');
  const textPost = containerHome.querySelector('#inputPost');
  const printPost = containerHome.querySelector('#printPost');

  const postCreation = (event) => {
    event.preventDefault();
    // pensar em type error pra texto vazio
    const template = textPost.value;
    createPost(templatePost(template))
      .then(() => {
        printPost.innerHTML += template;
      })
      .catch((error) => {
        alert(`${error}Algo deu errado, tente novamente.`);
      });
  };

  btnPost.addEventListener('click', postCreation);

  getPosts().then((result) => {
    printPost.innerHTML = '';
    result.forEach((doc) => {
      const data = doc.data();
      const div = document.createElement('div');
      div.className = 'contentPost';
      div.innerHTML = `<hr>
        <p>${data.name}</p>
        <p>${data.date}</p>
        <p class="text-post" id="textPost" contenteditable="false">${data.text}</p>
        <button type="button" class="edit-button" id="editPost" data-edit="${doc.id}">Editar</button>
        <button type="button" class="delete-button">Excluir</button>
        <hr>
        `;
      // elementopai.insertBefore (elemento novo, elemento de referência.childNodes[posição])
      printPost.insertBefore(div, printPost.childNodes[0]);
      const editButton = div.querySelector('#editPost');
      // const editText = containerHome.querySelector('#textPost');
      // const editId = editButton.getAttribute('data-edit');
      // console.log(editText);

      // editPosts(textPost.value, doc.id).then(() => document.location.reload());

      //   if doc_id === auth.currentUser.uid
      //         .collection("posts")
      //   .orderBy("", "asc")
      const postEdit = () => {
        editPosts(textPost.value, doc.id)
          .then(() => {
            document.location.reload();
          });
      };
      editButton.addEventListener('click', postEdit);
    });
  });
  return containerHome;
};

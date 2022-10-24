import {
  getAuth,
} from '../../lib/firebase.js';
import {
  templatePost, createPost, getPosts, editPosts, deletePost,
} from '../../lib/services.js';
import { postErrors } from '../../validation/index.js';

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
        <p class="post-error"></p>
     </form>
    </section>
    <article class="feed" data-new-post id="printPost">
    </article>
    <footer>
    </footer>
    `;
  containerHome.innerHTML = home;

  // const form = containerHome.querySelector("#formPost");
  const btnPost = containerHome.querySelector('#btnPost');
  const textPost = containerHome.querySelector('#inputPost');
  const printPost = containerHome.querySelector('#printPost');
  const postError = containerHome.querySelector('#post-error');

  function createTemplate(name, date, text, postId, userId) {
    const template = document.createElement('div');
    template.dataset.postId = postId;
    console.log(template);
    template.className = 'contentPost';
    const isUserPost = auth.currentUser.uid === userId;
    template.innerHTML = `<hr>
    <p>${name}</p>
    <p>${date}</p>
    <textarea class="text-post" id="textPost" data-text-id="${postId}" disabled>${text}</textarea>
    <p class="post-error"></p>
    <button type="button" class="edit-button post ${isUserPost ? '' : 'hide'}" id="editPost" data-user-id="${userId}" data-edit-id="${postId}">Editar</button>
    <button type="button" class="save-button post ${isUserPost ? '' : 'hide'}" id="save-button" data-post-id="${postId}">Salvar</button>
    <button type="button" class="delete-button post ${isUserPost ? '' : 'hide'}" id="delete-button" data-delete-id="${postId}">Excluir</button>
    <button type="button" class="like-button post" id="like-button" data-like-id="${postId}">&#128571</button>
    <hr>
      `;

    return template.innerHTML;
  }

  const postCreation = (event) => {
    event.preventDefault();
    const text = textPost.value;
    // pensar em type error pra texto vazio
    const post = templatePost(text);
    createPost(post)
      .then((docRef) => {
        const newPost = createTemplate(post.name, post.date, post.text, docRef.id, post.userId);
        printPost.innerHTML += newPost;
      })
      .catch((error) => {
        // const errorCode = error.code;
        // postErrors(text, postError, errorCode);
      });
  };

  btnPost.addEventListener('click', postCreation);

  getPosts().then((result) => {
    printPost.innerHTML = '';
    result.forEach((doc) => {
      const data = doc.data();
      createTemplate(data.name, data.date, data.text, doc.id, data.userId);
      // elementopai.insertBefore (elemento novo, elemento de referência.childNodes[posição])
      printPost.innerHTML += createTemplate(data.name, data.date, data.text, doc.id, data.userId);
    });
  });

  // Editando os posts
  const allPosts = containerHome.querySelector('[data-new-post]');

  allPosts.addEventListener('click', (e) => {
    const { target } = e;
    const postId = target.dataset.editId;
    if (postId) {
      const textEdit = containerHome.querySelector(`[data-text-id="${postId}"]`);
      const btnSave = containerHome.querySelector(`[data-post-id="${postId}"]`);
      textEdit.removeAttribute('disabled');
      btnSave.addEventListener('click', async () => {
        await editPosts(textEdit.value, postId);
        textEdit.setAttribute('disabled', '');
      });
    }
  });

  allPosts.addEventListener('click', (e) => {
    const { target } = e;
    const deleteId = target.dataset.deleteId;
    console.log(deleteId);
    if (deleteId) {
      const btnDelete = containerHome.querySelector(`[data-delete-id="${deleteId}"]`);
      // confirm edit entraria aqui
      btnDelete.addEventListener('click', async () => {
        await deletePost(deleteId);
        // o post deve apagar em seguida
      });
    }
  });

  return containerHome;
};

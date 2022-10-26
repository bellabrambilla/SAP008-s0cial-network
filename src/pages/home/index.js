import {
  getAuth,
} from '../../lib/firebase.js';
import {
  templatePost, createPost, getPosts, editPosts, deletePost,
} from '../../lib/services.js';
import { navigateTo } from '../../navigation/navigate.js';
import { postErrors } from '../../validation/index.js';

const auth = getAuth();
export default () => {
  const containerHome = document.createElement('div');
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
        <p class="post-error"></p>
     </form>
    </section>
    <article class="feed" data-new-post id="printPost">
    </article>
    <footer>
    </footer>
  </div>
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
    template.className = 'content-post';
    const isUserPost = auth.currentUser.uid === userId;
    template.innerHTML = `
    <div class="content-post">
    <div class="post-header">
      <img class="avatar" src="../img/avatarcat.png">
      <div class="post-header-text>      
        <text class="name">${name} </text>
        <p>${date}</p>
        <div class='container-btn'>
          <button type="button" class="post-btn ${isUserPost ? '' : 'hide'}" id="editPost" data-user-id="${userId}" data-edit-id="${postId}">Editar</button>
          <button type="button" class="post-btn ${isUserPost ? '' : 'hide'}" id="save-button" data-post-id="${postId}">Salvar</button>
          <button type="button" class="post-btn ${isUserPost ? '' : 'hide'}" id="delete-button" data-delete-id="${postId}">Excluir</button>
        </div>
      </div>
    </div>
    <textarea class="text-post" id="textPost" data-text-id="${postId}" disabled>${text}</textarea>
    <p class="post-error"></p>
    <div class="post-footer">
    <button type="button" class="likecoment-btn" id="like-button" data-like-id="${postId}">&#128571</button>
    </div>
    </div>
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
        navigateTo('#home');
        // o post deve apagar em seguida
      });
    }
  });

  return containerHome;
};

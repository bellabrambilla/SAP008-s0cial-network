import {
  getAuth,
} from '../../lib/firebase.js';
import {
  templatePost, createPost, getPosts, editPosts, deletePost, likePost, 
} from '../../lib/services.js';
import { navigateTo } from '../../navigation/navigate.js';
import { postErrors } from '../../validation/index.js';

export default () => {
  const auth = getAuth();
  const containerHome = document.createElement('div');
  const home = `
  <div class="home">
    <header>
      <nav class="menu">
      Menu
      </nav>
      <img class="home-logo" src="img/homelogo.png">
    </header>
    <section class="welcome">
    <p>Bem-vinde, <b>${auth.currentUser.displayName}</b></p>
    </section>
    <section class="post">
     <form id="formPost" class="form">
        <img class="avatar" src="img/avatarcat.png">
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

  function createTemplate(name, date, text, likes, postId, userId) {
    const template = document.createElement('div');
    template.dataset.postId = postId;
    template.className = 'content-post';
    const isUserPost = auth.currentUser.uid === userId;
    template.innerHTML = `
    <div class="content-post">
    <div class="post-header">
      <img class="avatar" src="img/avatarcat.png">
      <div class="post-header-text>      
        <h2 class="name">${name} </h2>
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
   <p data-num-like="${postId}">${likes.length || ''}</p><button type="button" class="likecoment-btn" id="btnLike" data-like-id="${postId}" >&#128571</button>
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
        const newPost = createTemplate(post.name, post.date, post.text, post.likes, docRef.id, post.userId);
        console.log(post.likes)
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
      printPost.innerHTML += createTemplate(data.name, data.date, data.text, data.likes, doc.id, data.userId);
    });
  });

  // Editando os posts
  const allPosts = containerHome.querySelector('[data-new-post]');

  allPosts.addEventListener('click', (e) => {
    const { target } = e;
    const postId = target.dataset.editId;
    const deleteId = target.dataset.deleteId;
    const likeId = target.dataset.likeId;
    if (postId) {
      const textEdit = containerHome.querySelector(`[data-text-id="${postId}"]`);
      const btnSave = containerHome.querySelector(`[data-post-id="${postId}"]`);
      textEdit.removeAttribute('disabled');
      btnSave.addEventListener('click', async () => {
        await editPosts(textEdit.value, postId);
        textEdit.setAttribute('disabled', '');
      });
    }
  
    if (likeId) {  
      likePost(likeId);
    }

    if (deleteId) {
      if (confirm('Tem certeza que quer excluir esse post?')) {
        deletePost(deleteId);
        const postElement = target.parentNode.parentNode.parentNode.parentNode;
        postElement.remove();
      }
    }
  });

  return containerHome;
};

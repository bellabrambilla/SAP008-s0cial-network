import {
  collection, getAuth, updateDoc, updateProfile,
} from '../../lib/firebase.js';
import {
  templatePost, createPost, getPosts, editPosts,
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
  const postError = containerHome.querySelector('#post-error');

  function createTemplate(name, date, text, id) {
    const template = document.createElement('div');
    template.className = 'contentPost';
    template.innerHTML = `<hr>
    <p>${name}</p>
    <p>${date}</p>
    <textarea class="text-post" id="textPost" disabled data-post-id="${id}">${text}</textarea>
    <p class="post-error"></p>
    <button type="button" class="edit-button" id="editPost" data-edit-id="${id}">Editar</button>
    <button type="button" class="save-button" id="save-button" data-save-id="${id}">Salvar</button>
    <button type="button" class="delete-button" id="delete-button" data-delete-id="${id}">Excluir</button>
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
        const newPost = createTemplate(post.name, post.date, post.text, docRef.id);
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
      createTemplate(data.name, data.date, data.text, doc.id);
      // elementopai.insertBefore (elemento novo, elemento de referência.childNodes[posição])
      printPost.innerHTML += createTemplate(data.name, data.date, data.text, doc.id);
    });
  });

  // Editando os posts
  const editButtons = containerHome.querySelectorAll('#editPost');
  editButtons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const postEdit = e.currentTarget.dataset.editId;
      const saveEdit = containerHome.querySelector(`[data-save-id=${postEdit}]`);
      const textEdit = containerHome.querySelector(`[data-post-id=${postEdit}]`);
      const editButton = containerHome.querySelector(`[data-edit-id=${postEdit}]`);
      const btnDelete = containerHome.querySelector(`[data-delete-id=${postEdit}]`);

      textEdit.removeAttribute('disabled');
      editButton.classList.add('hide');
      btnDelete.classList.add('hide');

      saveEdit.addEventListener('click', async () => {
        await editPosts(postEdit, textEdit.value);
        textEdit.setAttribute('false');
      });
    });
  });

  return containerHome;
};

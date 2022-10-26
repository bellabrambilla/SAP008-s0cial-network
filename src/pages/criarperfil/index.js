// Importar serviço, se houver.
import { navigateTo } from '../../navigation/navigate.js';
import { signOut, getAuth } from '../../lib/firebase.js';

const auth = getAuth();
export default () => {
  const containerProfile = document.createElement('div');
  containerProfile.className = 'telaProfile';
  const profile = `
  <header>
  <button class="btnLogout" type="submit">Sair</button>
  <button class="btnFeed" type="subimit" id="btnFeed">Feed</button>
  </header>
  <main> 
    <div class="cover"></div>
    <figure class="profile-pic"></figure>
    <text class="name"></div>
    <button class="edit">Editar</button>
    <button class="paw">Paw</button>
    <text class="bio"></text>
    <section class="container-post">
      <figure class="post-pic"></figure>
      <h1>Nome</h1>
      <time datetime="2017-10-31T11:21:00+02:00">Terça, 31 Outubro 2017</time>
      <link class="hash1"></link>
      <article class="post"></article>
    </section>
  </main>
  `;
  containerProfile.innerHTML = profile;

  const logOut = containerProfile.querySelector('btnLogout');
  const goToFeed = containerProfile.querySelector('#btnFeed');
  const feed = (event) => {
    event.preventDefault();
    navigateTo('#home');
  };
  // const logOuts = ()=>{
  // signOut(auth)
  // .then(() => {
  // // Sign-out successful.
  // }).catch((error) => {
  // // An error happened.
  // })
  // }

  goToFeed.addEventListener('click', feed);
  // logOut.addEventListener("click", signOut(auth));

  return containerProfile;
};

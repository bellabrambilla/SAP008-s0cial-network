// import { getAuth } from "../../lib/firebase.js";
// import { firebaseApp } from "../../lib/config.js";
// const auth = getAuth(firebaseApp)
//${auth.currentUser.displayName}

export default () => {
    let containerHome= document.createElement("div");
    
    const home = `
    <header>
      <nav>
      Menu
      </nav>
    </header>
    <section class="wellcome">
    Bem-vinde, NOME
    </section>
    <section class="post">
     <form>
        <input type="text" class="inputPost" placeholder="Escreva aqui"> </input>
        <button class"btn subimitPost">Enviar</btn>
     </form>
    </section>
    <section class="feed">
    Feed com postagens
    </section>
    <footer>
    </footer>
    `;
    containerHome.innerHTML = home;
    

    return containerHome;
  }
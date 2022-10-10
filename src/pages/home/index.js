import { addDoc } from "../../lib/firebase.js";
import { templatePost,createPost } from "../../lib/services.js";


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
     <form id="formPost">
        <input type="textarea" class="inputPost" id="inputPost" placeholder="Escreva aqui"> </input>
        <button type="submit" class"btn subimitPost" id="btnPost">Enviar</btn>
     </form>
    </section>
    <article class="feed" id="printPost" >
    Feed com postagens! :))))
    </article>
    <footer>
    </footer>
    `;
    containerHome.innerHTML = home;
    
    const form = containerHome.querySelector("#formPost");
    const btnPost = containerHome.querySelector("#btnPost");
    const textPost= containerHome.querySelector("#inputPost");
    let printPost= containerHome.querySelector("#printPost");
   
    const postCreation = (event)=>{
      event.preventDefault();
      const template=textPost.value
      createPost(templatePost(template))
      console.log()
      }
      
  
    printPost.conteinerHome= textPost.value
    
    btnPost.addEventListener("click", postCreation);
    return containerHome;
  }
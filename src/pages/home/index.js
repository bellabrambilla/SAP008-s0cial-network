import { getAuth} from "../../lib/firebase.js";
import { templatePost,createPost, } from "../../lib/services.js";

const auth = getAuth()
export default () => {
    let containerHome= document.createElement("div");
    console.log(auth)
    const home = `
    <header>
      <nav>
      Menu
      </nav>
    </header>
    <section class="wellcome">
    Bem-vinde, ${auth.currentUser.displayName}
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
      //pensar em type error pra texto vazio
      const template=textPost.value
      createPost(templatePost(template))
      .then(()=>{
        printPost.innerHTML += template;
      })
      .catch((error) => {
        alert(error + "Algo deu errado, tente novamente");
      });
      }
      
    btnPost.addEventListener("click", postCreation);
    return containerHome;
  }
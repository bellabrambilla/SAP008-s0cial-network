//Importar serviço, se houver.

export default () => {
    let containerProfile= document.createElement("div")
    containerProfile.className= "telaProfile"
    let profile = `
    <header>Perfil</header>

    <main> 
      <div class="cover"></div>
      <figure class="profile-pic"></figure>
      <text class="name"></div>
      <button class="edit"></button>
      <button class="paw"></button>
      <text class="bio"></text>
      <section class="container-post">
        <figure class="post-pic"></figure>
        <h1>Nome do gato</h1>
        <time datetime="2017-10-31T11:21:00+02:00">Terça, 31 Outubro 2017</time>
        <link class="hash1"></link>
        <article class="post"></article>
      </section>
    </main>
    `;
    containerProfile.innerHTML= profile
  
    return containerProfile ;
  }
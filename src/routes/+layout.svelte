<nav class="navClass">
  <a class="linkClass" href="/">Hem</a>
  <a class="linkClass" href="/cookieclicker">Cookieclicker</a>
  <a class="linkClass" href="/telltale">Telltale</a>
  <a class="linkClass" href="/todo">TodoApp</a>
  <a class="linkClass" href="/memory">Memory</a>
  <a class="linkClass" href="/elizabot">Elizabot</a>

  <a class="linkClass" target="_blank"  href="https://github.com/frofflo/frofflo.github.io" >GitHub</a>
</nav>

<hr />

<slot />

<style>
  :global(body){
    background: hsla(0, 0%, 100%, 1);
    background: linear-gradient(45deg, hsla(0, 0%, 100%, 1) 0%, hsla(199, 49%, 56%, 1) 100%);
    background: -moz-linear-gradient(45deg, hsla(0, 0%, 100%, 1) 0%, hsla(199, 49%, 56%, 1) 100%);  
    background: -webkit-linear-gradient(45deg, hsla(0, 0%, 100%, 1) 0%, hsla(199, 49%, 56%, 1) 100%);
      min-height: 100vh;
      background-position: center;
      background-repeat: no-repeat;
      background-size: cover;
  }
  
  .navClass{
    transform: translateY(-10px);
    display: flex;
    flex-direction: row;
    justify-content: center;
    justify-content: space-evenly;
    background-color: rgb(80,101,111);
    margin-bottom: -10px;
  }
  .linkClass{
    transition: background 0.3s;
    color: white;
    padding: 15px;
  }
  .linkClass:hover{
    background-color: rgb(48, 60, 65);
  }
  .linkClass:active{
    transform: translateY(-5px);
  }
  a {
    text-decoration: none;
  }

</style>
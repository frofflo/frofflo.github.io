<nav>
  <a href="/">Hem</a>
  <a href="/cookieclicker">Cookieclicker</a>
  <a href="/telltale">Telltale</a>
  <a
    target="_blank"
    href="https://github.com/frofflo/frofflo.github.io"
    >GitHub</a
  >
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
</style>
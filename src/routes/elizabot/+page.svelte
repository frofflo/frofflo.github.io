<script>
    import { enhance } from "$app/forms";
    import "elizabot";
    import ElizaBot from "elizabot";
    import "@picocss/pico";
    import { page } from "$app/stores";
  
    let eliza = new ElizaBot();

    let chat = [{ user: "Eliza", text: eliza.getInitial() }];
  

    async function write(message) {
    
        chat.push({ user: "You", text: message });
        chat = chat;

        if (eliza.quit){
        eliza.getFinal();

        }

        await new Promise((r) => setTimeout(r, 1000 + Math.random() * 1000));

        chat.push({ user: "Eliza", text: eliza.transform(message) });
        
        chat = chat;

        await new Promise((r) => setTimeout(r, 1000 + Math.random() * 1000));

        if (eliza.quit){
            location.reload()
        }
    }


    window.onbeforeunload = function (){
        eliza.reset();

    }

  </script>
  
  
  <svelte:head>
    <link rel="stylesheet" href="/pico.min.css" />
  </svelte:head>
  
  <div class="container">
    <h1>Chat GTP (frfr)</h1>
    <div class="scrollable">

    {#each chat as item, index}
    <article class="{item.user}">
        <span>
          {item.user}: {chat[index].text}
        </span>
      </article>
    {/each}

    </div>
    <form name="myForm"
      method="post"
      use:enhance={({data, cancel }) => {
        cancel();
       
        const text = data.get("text")
        write(text);

        document.getElementById("text").value="";
      }}
    >
      <input type="text" name="text" id="text" />
    </form>
  </div>

  <style>
    .Eliza{
        background-color: rgba(242, 242, 242, 0.5);
    }
    .You{
        background-color: rgba(196, 239, 239, 0.5);
        text-align: right;
    }
  </style>
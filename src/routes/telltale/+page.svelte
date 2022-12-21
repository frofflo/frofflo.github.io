<script>
  import { story_id_store } from "$lib/stores";
  import { stories } from "$lib/stories";

  import { fly } from "svelte/transition";

  $: story_id = $story_id_store;
  $: story = stories.find((story) => story.id == story_id);


</script>




<main>
  <div class="grid">
    {#key story_id}
      <div
        class="container"
        in:fly|local={{ x: 800, duration: 750 }}
        out:fly|local={{ x: -800, duration: 750 }}
      >
        <div class="center">
          {#if story}
            {#if story.img}
              <img src={story.img} alt={story.message} />
            {/if}
            {#if story.html}
              {@html story.html}
            {/if}
            <article>
              <span>{story.message}</span>
            </article>
            {#if story.question}
              <p>{story.question}</p>
            {/if}
            <div class="row">
              {#each story.choices as choice}
                <button
                  on:click={() => {
                    $story_id_store = choice.id;
                  }}>{choice.text}</button
                >
              {/each}
            </div>
          {:else}
            <p>STORY FOR ID {story_id} MISSING</p>
          {/if}
                </div>
        </div>
    {/key}
  </div>
</main>

<style>
  :global(body){
    overflow: hidden;
    height: 100%;

  }
  .grid {
    margin: 3%;
    display: grid;
    align-items: center;
    place-items: center;
    justify-content: center;
  }

  .container {
    grid-column-start: 1;
    grid-column-end: 2;
    grid-row-start: 1;
    grid-row-end: 2;
    height: 100%;
    width: 500px;
  }
  .center{
    display:flex;
    flex-direction: column;
    place-items: center;
    place-content: center;
    gap: 20px;
  }
  p{
    text-align: center;
    background-color: rgba(0, 0, 0, 0.1);
    padding: 10px;
    border-radius: 5px;
    margin-bottom: 30px;

  }
  article{
    text-align: center;
    width: 80%;
    background-color: rgba(0, 0, 0, 0.1);
    padding: 10px;
    border-radius: 5px;
  }
  .row {
    display: flex;
    flex-direction: row;
    gap: 20px;
  }

  img {
    width: 100%;
    border-radius: 20px;
  }

  button{
    background-color: rgba(0, 0, 0, 0.2);
    padding: 10px;
    border-radius: 5px;
    border: none;
  }

  button:hover{
    background-color: rgba(0, 0, 0, 0.3);
  }

  button:focus{
    background-color: rgba(0, 0, 0, 0.5);
  }

  main {
    max-width: 100%;
    overflow-x: hidden;
  }

  .edith{
    color: aquamarine;

  }


</style>

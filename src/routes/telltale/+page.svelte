<script>
  import { story_id_store } from "$lib/stores";
  import { stories } from "$lib/stories";

  /* https://svelte.dev/tutorial/in-and-out */
  import { fly } from "svelte/transition";

  /* https://svelte.dev/tutorial/reactive-statements */
  $: story_id = $story_id_store;
  $: story = stories.find((story) => story.id == story_id);


</script>




<main>
  <div class="grid">
    <!-- https://svelte.dev/tutorial/key-blocks -->
    {#key story_id}
      <!-- https://svelte.dev/tutorial/in-and-out -->
      <div
        class="container"
        in:fly|local={{ x: 800, duration: 750 }}
        out:fly|local={{ x: -800, duration: 750 }}
      >
        <div class="center">
          <!-- https://svelte.dev/tutorial/if-blocks -->
          {#if story}
            {#if story.img}
              <img src={story.img} alt={story.message} />
            {/if}
            {#if story.html}
              <!-- https://svelte.dev/tutorial/html-tags -->
              {@html story.html}
            {/if}
            <article>
              <span>{story.message}</span>
            </article>
            {#if story.question}
              <!-- https://svelte.dev/tutorial/html-tags -->
              <p>{story.question}</p>
            {/if}
            <div class="row">
              <!-- https://svelte.dev/tutorial/each-blocks -->
              {#each story.choices as choice}
                <button
                  on:click={() => {
                    $story_id_store = choice.id;
                  }}>{choice.text}</button
                >
              {/each}
            </div>
            <!-- https://svelte.dev/tutorial/else-blocks -->
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
    /* overflow: hidden; */
  }

  /* force the container to stay in the same position of the grid */
  /* we need this to ensure that the container div does not move weirdly
     when two divs coexist which they do while the out and in transition
     is playing simultaneously. Try removing the grid-column placement stuff
     and you might notice some weird behaviour.
  */
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

<script>

    let newItem = '';
    let todoList = [];

    function addToList(){
        todoList = [...todoList, {text: newItem, status: false}];
        newItem = '';
    }

    function removeFromList(index) {
		todoList.splice(index, 1)
		todoList = todoList;
    }
</script>



<div class="background">
    <h1>Todo List</h1>
    <hr class="hr">
    <input class="inputClass" bind:value={newItem} type="text" placeholder="Write something you want to do...">
    <button on:click={addToList}>Add</button>
    <center>
        <div class="textBackground">
            <br/>
            {#each todoList as item, index}
                <div class="row">
                    <input bind:checked={item.status} type="checkbox">
                    <span class:checked={item.status}>{item.text}</span>
                    <span on:click={() => removeFromList(index)}>❌</span>
                </div>
            <br/>
            {/each} 
        </div>
    </center>
    
</div>





<style>
    :global(body){
        background-color: #E8D9C1;
        height: 100%;
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
        overflow: hidden;

    }
    .background{
        width: 50%;
        background-color: grey;
        margin-left: auto;
        margin-right: auto;
        padding: 40px 20px 1000px;
        transform: translate(0,-10px);
        text-align: center;

    }
    .textBackground{
        padding: 0px 20px 0px;
        width:fit-content;
        background-color: rgba(230, 230, 230, 0.714);
        border-radius: 20px;

    }
    .checked {
        text-decoration: line-through;
        width:fit-content;
    }

    .row {
        display: flex;
        justify-items: left;
        place-items: left;
    }

    button{
        display: block;
        margin: auto;
        margin-bottom: 15px;
    }

    .inputClass{
        width: 60%;
        padding: 5px 5px;
        margin-top: 10px;
        margin-bottom: 10px;    
        border-radius: 5px;
        border: none;
    }

    input:focus{
        outline: none;
    }

    h1{
        margin:auto;
        margin-bottom: 20px;
        padding: 0 40px;
        border-radius: 5px;
        width: fit-content;
        font-family:Comic sans-serif;
        font-size: 3em;
        background-color: white;   
    }
    .hr{
        height: 5px;
        background-color: rgb(84, 84, 84);
        border: none;
        border-radius: 5px;
        width: 80%;
    }

</style>
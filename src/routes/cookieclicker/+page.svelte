<script>
  import { tick } from "svelte";

  let goofys=0;
  let rotateVar=0;
  let yuumis=0;
  let dmg=1;
  let damageScale=0;
  let yuumiCost=100;
  let minions=0;
  let minionCost=200;
  let autoClicks=0;
  let minionCostScale=0;

  
  /**
     * @type {HTMLImageElement}
     */
  let picture;

  function add(){
      rotateVar+=90
      goofys+=dmg
      
      
      picture.style.transform = 'rotate(' + rotateVar + 'deg)';
  } 

  function moreYuumis(){
      if(goofys >= yuumiCost){
          goofys -= yuumiCost
          yuumiCost *= 2
          damageScale++
          dmg += damageScale
          yuumis++
      }
  }
  
  function moreMinions(){
      if(goofys >= minionCost){
          goofys -= minionCost
          minions++
          if (minionCost < 2000){
              minionCostScale += 50
              minionCost += minionCostScale
          }
          else{
              minionCostScale += 50
              minionCost += minionCostScale
              minionCost *= 2.3
          }
          if (autoClicks != 0){
              autoClicks *= 2
          }
          else{
              autoClicks++
          }

      }

  }
  setInterval(function(){
      goofys += autoClicks
      if(autoClicks != 0){
          rotateVar+= 90
          picture.style.transform = 'rotate(' + rotateVar + 'deg)';
      }
  }, 1000);
  
</script>

<div class="background">
  <center>
  <h1>Goofy Clicker</h1>
  <h2>Goofys = {Math.ceil(goofys)}</h2>
  </center>
  
  <center>
  <figure>
      <button class = "cookieclass" type="click" on:click={()=>add()} value = cookieclass>
          <img bind:this={picture} class = "pictureclass" src="https://cdn-ssl.s7.disneystore.com/is/image/DisneyShopping/1234107182995?fmt=jpeg&qlt=90&wid=1215&hei=1215" alt="Fawking Goofy">
  </figure>
  <h2>Yuumis = {yuumis}</h2>
  <p>Yuumi Cost = {yuumiCost} goofys</p>
  <p>Gain bonus click multiplier</p>
  <figure>
      <button class = "yuumiclass" type="click" on:click={()=>moreYuumis()} value = yuumiclass>
          <img class = "yuumipictureclass" src="https://notagamer.net/wp-content/uploads/2020/01/Untitled-1-9.jpg" alt="Die Yuumi">
  </figure>
  
  <h2>Gragas = {minions}</h2>
  <p>Gragas Cost = {Math.ceil(minionCost)} goofys</p>
  <p>Gain 2x Autoclicks/s</p>
  <figure>
      <button class = "minionclass" type="click" on:click={()=>moreMinions()} value = minionclass>
          <img class = "minionpictureclass" src="https://live.staticflickr.com/4054/4294029007_b7495ca5e9_c.jpg" alt="Gragas">
  </figure>
  </center>
</div>



<style>

  .background{
      width: 50%;
      background-color: rgba(69, 81, 92, 0.8);
      margin-left: auto;
      margin-right: auto;
      padding-top: 20px;
      padding-bottom: 20px;
      transform: translate(0,-10px);
  }
  h1{
      color:gray;
      background-color: white;
      background-position: center;
      width: fit-content;
      padding-left: 20px;
      padding-right: 20px;
      border-radius: 20px;
      font-family:Comic sans-serif;
      font-size: 5em;
      outline-style: solid;
      outline-width: 5px;
      outline-color: rgb(59, 59, 59);
  }
  h2{
      color: gray;
      background-color: white;
      background-position: center;
      width: fit-content;
      padding-left: 20px;
      padding-right: 20px;
      font-family: Comic sans-serif;
      font-size: 2em;
      outline-style: outset;
      outline-width: 5px;
      outline-color: gray;
      padding-bottom: 2px;

  }
  p{
      color: white;
      
  }
  .cookieclass{
      background: white;
      width: 200px;
      height: 200px;
      border-radius: 50px;
      border: none;
      outline-style: solid;
      outline-width: 5px;
      outline-color: rgb(59, 59, 59);
  }
  .yuumiclass{
      background: transparent;
      width: 200px;
      height: 200px;
      border-radius: 10px;
      border: none;
  }
  .yuumiclass:focus{
      outline: none;
  }
  .minionclass{
      background: transparent;
      width: 400px;
      height: 250;
      border-radius: 10px;
      border: none;
  }
  .minionclass:focus{
      outline: none;
  }
  .pictureclass{
      width: 100%;
      height: 100%;
      border-radius: 50px;
  }
  .yuumipictureclass{
      width: 100%;
      height: 100%;
      outline-style: outset;
      outline-width: 10px;
      outline-color: white;
  }
  .minionpictureclass{
      width: 100%;
      height: 100%;
      outline-style: outset;
      outline-width: 10px;
      outline-color: white;
  }
</style>
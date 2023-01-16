<script>
  import { onMount, tick } from "svelte";

  let cookies=0;
  let dmg=1;
  let autoClicks=0;
  let activeTab="choicetab";
  let activeStoreTab="upgradesTab";
  let activeAlert=0;

  /**
     * @type {HTMLImageElement}
  */
  let picture;

  function add(){
    cookies+=dmg
    powerupList.forEach((powerup)=>{
      if (cookies*2 >= powerup.cost && ! powerup.isBought){
        powerup.isActive = true;
        powerupList = powerupList;
      }
    })
  }
  function upgrades(){
    activeStoreTab="upgradesTab"
  }
  function upgradeEnhancer(){
    activeStoreTab="upgrade-EnhancerTab"
  }
  function Powerups(){
    activeStoreTab="PowerupsTab"
    powerupList.forEach((powerup)=>{
      if (cookies*2 >= powerup.cost && ! powerup.isBought){
        powerup.isActive = true;
        powerupList = powerupList;
      }
    })
  }
  function Settings(){
    activeTab="settingstab";
  }
  function Save(){
    localStorage.setItem('cookies',cookies);
  }
  window.onbeforeunload = function (){
    localStorage.setItem('cookies',cookies);
  }
  // onMount();cookies = parseFloat(localStorage.getItem('cookies')); 
    
  function Load(){
    cookies = parseFloat(localStorage.getItem('cookies'));
  }
  function Back(){
    activeTab="choicetab"
  }
  class powerupIcon{
    constructor(isActive, cost, name, description, value, isBought){
      this.isActive=isActive
      this.cost=cost
      this.name=name
      this.description=description
      this.value=value
      this.isBought=isBought
      console.log(this);
    }

    buy(){
      if (cookies >= this.cost){
        this.isActive = false;
        this.isBought = true;
        cookies -= this.cost;
        powerupList = powerupList;
        if (this.value == "2" || this.value == "1.5"){
          dmg *= this.value
        }
      }
    }
    
  }
  let powerup1 = new powerupIcon(false, 100, "Click Boost", "Gives You A 2x Click Multiplier", "2", false)
  let powerup2 = new powerupIcon(false, 500, "Click Boost", "Gives You A 1.5x Click Multiplier", "1.5", false)
  let powerup3 = new powerupIcon(false, 5000, "Click Boost", "Gives You A 1.5x Click Multiplier", "1.5", false)
  let powerup4 = new powerupIcon(false, 50000, "Click Boost", "Gives You A 1.5x Click Multiplier", "1.5", false)
  let powerup5 = new powerupIcon(false, 100000, "Click Boost", "Gives You A 2x Click Multiplier", "2", false)
  let powerup6 = new powerupIcon(false, 350000, "Click Boost", "Gives You A 1.5x Click Multiplier", "1.5", false)
  let powerup7 = new powerupIcon(false, 1000000, "Click Boost", "Gives You A 2x Click Multiplier", "2", false)

  let powerupList = [
    powerup1,powerup2,powerup3,powerup4,powerup5,powerup6,powerup7
  ]

  
  setInterval(function(){
    cookies += autoClicks
  }, 1000);
</script>

<div class="background">

    <div class="cookiebackground">
      <h1>Cookie Clicker</h1>
      <h2>Cookies = {Math.ceil(cookies)}</h2>
      <div class="cookieWrap">
          <img type="cookie" on:click={()=>add()} on:keypress={()=>add()} bind:this={picture} class = "cookiepictureclass" src="Cookieimg.png" alt="Cookie">
      </div>
    </div>

    <div class="upgradePanel" class:hidden={activeStoreTab!="upgradesTab"}>
      <h1>Upgrades</h1>
      <div class="upgradesfolder">

      </div>
    </div>
    <div class="upgrade-Enhancerpanel" class:hidden={activeStoreTab!="upgrade-EnhancerTab"}>
      <h1>Upgrade-Enhancer</h1>
      <div class="upgrade-Enhancerfolder">

      </div>
    </div>
    <div class="Can't Afford" class:hidden={activeAlert!="cantAfford"}>
      <h2>Can't Afford</h2>
    </div>
    <div class="PowerupsPanel" class:hidden={activeStoreTab!="PowerupsTab"}>
      <h1>Powerups</h1>
      <div class="Powerupsfolder">
        {#each powerupList as powerup}
          <div class:hidden={!powerup.isActive}>
            <p>{powerup.name}</p>
            <img src="PixelArtHand.png" alt="powerup" class="powerupicon" on:click={()=>{powerup.buy()}} on:keypress={()=>{powerup.buy()}}>
            <p>{powerup.cost}</p>
            <h3 class="showOnHover">{powerup.description}</h3>
          </div>
        {/each}
      </div>
    </div>

</div>

<div class="choicetab" class:hidden={activeTab!="choicetab"}>
  <button class="button" on:click={()=>upgrades()}>Upgrades</button>
  <button class="button" on:click={()=>upgradeEnhancer()}>Upgrade-Enhancer</button>
  <button class="button" on:click={()=>Powerups()}>Powerups</button>
  <img type="settings" on:click={Settings} on:keypress={Settings} bind:this={picture} class = "settingspic" src="Settings.png" alt="settings">
</div>

<div class="settingstab" class:hidden={activeTab!="settingstab"}>
  <button class="button" on:click={()=>Save()}>Save</button>
  <button class="button" on:click={()=>Load()}>Load</button>
  <img type="backarrow" on:click={()=>Back()} on:keypress={()=>Back()} bind:this={picture} class = "arrowpic" src="Arrow.png" alt="back">
</div>



<style>
  :global(body){
    overflow: hidden;
  }
  .background{
    display: flex;
    flex-shrink: 1;
  }
  .cookiebackground{
    text-align: center;
    border: 12px solid rgba(0,0,0,0.4);
  }
  .upgradePanel{
    position: relative;
    text-align: center;
    background-color: rgba(0,0,0,0.5);
    height: 80vh;
    width: 35vw;
  }
  .upgrade-Enhancerpanel{
    position: relative;
    text-align: center;
    background-color: rgba(0,0,0,0.5);
    height: 80vh;
    width: 35vw;
  }
  .PowerupsPanel{
    position: relative;
    text-align: center;
    background-color: rgba(0,0,0,0.5);
    height: 80vh;
    width: 35vw;
  }
  .Powerupsfolder{
    display: grid;
    grid-template-columns: 6.2vw 6.2vw 6.2vw 6.2vw 6.2vw;
    grid-template-rows: 18.6vh 18.6vh 18.6vh 18.6vh;
    width: 95%;
    height: 95%;
    margin: auto;
  }
  .powerupicon{
    display: flex;
    width: 80%;
    height: 54%;
    background-color: black;
    outline: 6px;
    outline-offset: -1px;
    outline-style: solid;
    outline-color: rgba(33,46,53,255);
    margin-left: 5px;
    border-radius: 2px;
    justify-content: center;
    z-index: -1;
  }
  .powerupicon:hover{
    background-color: rgba(33,46,53,255);
  }
  .powerupicon:active{
    transform: translateY(-5px);
  }
  p{
    margin-top: 8px;
    margin-bottom: 8px;
    background-color: rgba(255, 255, 255, 0.2);
    border-radius: 5px;
    width: 80%;
    padding: 1px 5px 1px 5px;
    z-index: -1;
  }
  h3{
    position: relative;
    margin-top: -30px;
    width: 80%;
    background-color: rgba(0, 0, 0, 1);
    color: rgba(255, 255, 255, 0.8);
    z-index: 10;
    border-radius: 5px;
    padding: 1px 5px 1px 5px;
  }
  .choicetab{
    display: flex;
    justify-content: center;
    width: 100%;
    height: 100px;
    position: absolute;
    bottom: 0;
    margin-bottom: 10px;
  }
  .settingstab{
    display: flex;
    justify-content: center;
    width: 100%;
    height: 100px;
    position: absolute;
    bottom: 0;
    margin-bottom: 10px;
  }
  .button{
    width: 400px;
    height: 70px;
    margin:17px 30px 0px 10px;
    border-radius: 5px;
    border: none;
    background-color: rgba(255, 153, 76, 0.7);
    font-size: 2em;
    font-family: Courier new;
    font-weight: bold;
  }
  .button:hover{
    background-color: rgb(255, 144, 59);
    box-shadow: 0 12px 16px 0 rgba(0,0,0,0.24), 0 17px 50px 0 rgba(0,0,0,0.19);
  }
  .button:active{
    transform: translateY(-5px);
    background-color: rgb(255, 111, 0);
  }
  .button:focus{
    outline: none;
    border: none;
  }
  h1{
      text-align: center;
      background-color: rgba(0,0,0,0.2);
      color:rgb(251, 251, 251);
      width: 100%;
      font-family:Courier New;
      font-size: 2em;
  }
  h2{
    text-align: center;
    background-color: rgba(0,0,0,0.2);
    color:rgb(251, 251, 251);
    width: 100%;
    font-family:Courier New;
    font-size: 1.5em;
  }
  .cookieWrap{
    height: 400px;
    width: 65vw;
  }

  .cookiepictureclass{
    margin-top: 10px;
    height: 400px; 
    width: 400px;
    border-radius: 100%;
    transition: 100ms;
  }
  .cookiepictureclass:active{
    transform: scale(0.95);
  }
  .settingspic{
    display: flex;
    justify-content: center;
    height: 59px; 
    margin-top: 22.5px;
  }
  .settingspic:active{
    background-color: rgba(0, 0, 0, 0.3);
    transform: translateY(-5px);
  }
  .settingspic:hover{
    box-shadow: 0 12px 16px 0 rgba(0,0,0,0.24), 0 17px 50px 0 rgba(0,0,0,0.19);
  }
  .arrowpic{
    display: flex;
    justify-content: center;
    height: 59px;
    margin-top: 22.5px;
  }
  .arrowpic:active{
    background-color: rgba(0, 0, 0, 0.3);
    transform: translateY(-5px);
  }
  .arrowpic:hover{
    box-shadow: 0 12px 16px 0 rgba(0,0,0,0.24), 0 17px 50px 0 rgba(0,0,0,0.19);
  }
  .showOnHover{
    visibility: hidden;
  }
  img:hover ~ .showOnHover{
    visibility: visible;
  }
  .hidden{
    display: none;
  }

</style>
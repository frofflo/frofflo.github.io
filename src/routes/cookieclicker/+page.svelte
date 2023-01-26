<script>
    import { json } from "@sveltejs/kit";
  import { onMount, tick } from "svelte";

  let cookies=0;
  let dmg=1;
  let autoClicks=0;
  let activeTab="choicetab";
  let activeStoreTab="upgradesTab";
  let activeAlert=0;
  let isBoughtList = [];
  let isBoughtListUpgradeEnhancer = [];
  let cursors = 0;
  let cursorMultiplier = 1;
  let cursorCost = 50;

  /**
     * @type {HTMLImageElement}
  */
  let picture;

  function add(){

    cookies+=dmg

    console.log(cursorMultiplier);

    powerupList.forEach((powerup)=>{
      if (cookies*2 >= powerup.cost && ! powerup.isBought){
        powerup.isActive = true;
        powerupList = powerupList;
      }
    })

    powerupList.forEach(upgrade => {
        if(isBoughtList.includes(upgrade.cost)){
          upgrade.isActive = false;
        }
      })

      upgradeEnhancerList.forEach((upgradeEnhance)=>{
      if(cookies*2 >= upgradeEnhance.cost && ! upgradeEnhance.isBoughtUpgradeEnhancer){
        upgradeEnhance.isActive = true;
        upgradeEnhancerList = upgradeEnhancerList;
      }
    })
    isBoughtListUpgradeEnhancer = JSON.parse(localStorage.getItem('isBoughtUpgradeEnhancer') != null ? localStorage.getItem('isBoughtUpgradeEnhancer') : "")

    upgradeEnhancerList.forEach((upgradeEnhance)=>{
      if(isBoughtListUpgradeEnhancer.includes(upgradeEnhance.cost)){
        upgradeEnhance.isActive = false;
      }
    })
  }

  function plus(){
    if(cookies >= cursorCost){
      cursors += 1;
      cookies -= cursorCost;
      cursorCost *= 1.5;
      autoClicks = (0.1*cursors*cursorMultiplier);
    }
  }
  function minus(){
    if(cursors != 0 || cursors > 0){
      cursors -= 1;
      cursorCost /= 1.5;
      cookies += cursorCost/2;
    }
  }

  function upgrades(){
    activeStoreTab="upgradesTab"
  }

  function upgradeEnhancer(){
    activeStoreTab="upgrade-EnhancerTab"
    upgradeEnhancerList.forEach((upgradeEnhance)=>{
      if(cookies*2 >= upgradeEnhance.cost && ! upgradeEnhance.isBoughtUpgradeEnhancer){
        upgradeEnhance.isActive = true;
        upgradeEnhancerList = upgradeEnhancerList;
      }
    })
    isBoughtListUpgradeEnhancer = JSON.parse(localStorage.getItem('isBoughtUpgradeEnhancer') != null ? localStorage.getItem('isBoughtUpgradeEnhancer') : "")

    upgradeEnhancerList.forEach((upgradeEnhance)=>{
      if(isBoughtListUpgradeEnhancer.includes(upgradeEnhance.cost)){
        upgradeEnhance.isActive = false;
      }
    })
  }

  function Powerups(){
    activeStoreTab="PowerupsTab"
    powerupList.forEach((powerup)=>{
      if (cookies*2 >= powerup.cost && ! powerup.isBought){
        powerup.isActive = true;
        powerupList = powerupList;
      }
    })
    isBoughtList = JSON.parse(localStorage.getItem('isBought') != null ? localStorage.getItem('isBought') : "" )

    powerupList.forEach(upgrade => {
        if(isBoughtList.includes(upgrade.cost)){
          upgrade.isActive = false;
        }
      })
  }

  function Settings(){
    activeTab="settingstab";
  }

  window.onbeforeunload = function (){
    localStorage.setItem('cookies',cookies);
    localStorage.setItem('dmg', dmg);
    localStorage.setItem('cursors', cursors);
    localStorage.setItem('cursorCost', cursorCost);
    localStorage.setItem('autoClicks', autoClicks);
    localStorage.setItem('cursorMultiplier', cursorMultiplier);
  }

  onMount(()=>{
  
  cookies = parseFloat(localStorage.getItem('cookies')??0); 
  
  dmg = parseFloat(localStorage.getItem('dmg')??1);
  
  cursors = parseFloat(localStorage.getItem('cursors')??0);
  
  cursorCost = parseFloat(localStorage.getItem('cursorCost')??50);

  autoClicks = parseFloat(localStorage.getItem('autoClicks')??0);

  cursorMultiplier = parseFloat(localStorage.getItem('cursorMultiplier')??1);
  
  });
  

  function Save(){
    localStorage.setItem('cookies',cookies);
    localStorage.setItem('dmg', dmg);
    localStorage.setItem('cursors', cursors);
    localStorage.setItem('cursorCost', cursorCost);
    localStorage.setItem('autoClicks', autoClicks);
    localStorage.setItem('cursorMultiplier', cursorMultiplier);
  }
  function Load(){
  
  cookies = parseFloat(localStorage.getItem('cookies')??0); 
  
  dmg = parseFloat(localStorage.getItem('dmg')??1);
  
  cursors = parseFloat(localStorage.getItem('cursors')??0);
  
  cursorCost = parseFloat(localStorage.getItem('cursorCost')??50);

  autoClicks = parseFloat(localStorage.getItem('autoClicks')??0);

  cursorMultiplier = parseFloat(localStorage.getItem('cursorMultiplier')??1);
  
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
    }
    buy(){
      if (cookies >= this.cost){
        this.isActive = false
        this.isBought = true
        isBoughtList.push(this.cost);
        localStorage.setItem('isBought', JSON.stringify(isBoughtList)); 
        isBoughtList=isBoughtList
        cookies -= this.cost
        powerupList = powerupList
        dmg *= this.value
      }
    }
    
  }

  class upgradeEnhancerIcon{
    constructor(isActive, cost, name, description, value, isBoughtUpgradeEnhancer){
      this.isActive=isActive
      this.cost=cost
      this.name=name
      this.description=description
      this.value=value
      this.isBoughtUpgradeEnhancer=isBoughtUpgradeEnhancer    
    }
    buy(){
      if (cookies >= this.cost){
        this.isActive = false
        this.isBoughtUpgradeEnhancer = true
        isBoughtListUpgradeEnhancer.push(this.cost);
        localStorage.setItem('isBoughtUpgradeEnhancer', JSON.stringify(isBoughtListUpgradeEnhancer));
        isBoughtListUpgradeEnhancer=isBoughtListUpgradeEnhancer
        upgradeEnhancerList=upgradeEnhancerList
        cookies -= this.cost
        if(this.value == "2"){
          cursorMultiplier *= 2
        }
        if(this.value == "1.5"){
          cursorMultiplier *= 1.5
        }
      }
    }
  }

  let powerup1 = new powerupIcon(false, 100, "Click Boost", "Gives You A 2x Click Multiplier", "2", false)
  let powerup2 = new powerupIcon(false, 500, "Click Boost", "Gives You A 1.5x Click Multiplier", "1.5", false)
  let powerup3 = new powerupIcon(false, 2500, "Click Boost", "Gives You A 2x Click Multiplier", "2", false)
  let powerup4 = new powerupIcon(false, 5000, "Click Boost", "Gives You A 1.5x Click Multiplier", "1.5", false)
  let powerup5 = new powerupIcon(false, 50000, "Click Boost", "Gives You A 1.5x Click Multiplier", "1.5", false)
  let powerup6 = new powerupIcon(false, 100000, "Click Boost", "Gives You A 2x Click Multiplier", "2", false)
  let powerup7 = new powerupIcon(false, 350000, "Click Boost", "Gives You A 1.5x Click Multiplier", "1.5", false)
  let powerup8 = new powerupIcon(false, 1000000, "Click Boost", "Gives You A 2x Click Multiplier", "2", false)

  let upgradeEnhancer1 = new upgradeEnhancerIcon(false, 10, "More Cursors", "Gives You 2x Cursor Profits", "2", false)
  let upgradeEnhancer2 = new upgradeEnhancerIcon(false, 20, "More Cursors", "Gives You 1.5x Cursor Profits", "1.5", false)
  let upgradeEnhancer3 = new upgradeEnhancerIcon(false, 3000, "More Cursors", "Gives You 2x Cursor Profits", "2", false)
  let upgradeEnhancer4 = new upgradeEnhancerIcon(false, 4000, "More Cursors", "Gives You 1.5x Cursor Profits", "1.5", false)
  let upgradeEnhancer5 = new upgradeEnhancerIcon(false, 5000, "More Cursors", "Gives You 2x Cursor Profits", "2", false)


  let powerupList = [
    powerup1,powerup2,powerup3,powerup4,powerup5,powerup6,powerup7,powerup8
  ]
  let upgradeEnhancerList = [
    upgradeEnhancer1, upgradeEnhancer2, upgradeEnhancer3, upgradeEnhancer4, upgradeEnhancer5
  ]
  setInterval(function(){
    cursorCost = Math.round(cursorCost / 10) * 10
  }, 10);
  setInterval(function(){
    autoClicks = (0.1*cursors*cursorMultiplier);
    cursorCost = Math.round(cursorCost / 10) * 10
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

      <div class="upgradesFolder">
        <div class="upgradeTemplate">
          <div>
            <img class="upgradeImageTemplate pixelArtHand" src="PixelArtHand.png" alt="">
            <h3 class="showOnHover upgradeDescription">Buy one cursor to get 0.1 clicks / second</h3>
          </div>
          <div class="upgradeImageTemplate"><h4>{cursors}</h4></div>
          <div class="upgradeCostClass"><h5>{cursorCost}</h5></div>
          <div class="plusMinus">
            <div class="plusClass">
              <img on:click={minus(cursors)} on:keypress={minus(cursors)} class="plus" src="MinusSign.png" alt="Minus">
              <h3 class="showOnHover plusMinusDescription">Sells 1 Cursor for 50%</h3>
            </div>
            <div class="plusClass">
              <img on:click={plus(cursors)} on:keypress={plus(cursors)} class="plus" src="PlusSign.png" alt="Plus">
              <h3 class="showOnHover plusMinusDescription">Purchase 1 cursor for {cursorCost} cookies</h3>
            </div>
          </div>
          
        </div>
        <div class="upgradeTemplate">

        </div>
        <div class="upgradeTemplate">

        </div>
        <div class="upgradeTemplate">

        </div>
        <div class="upgradeTemplate">

        </div>
        <div class="upgradeTemplate">

        </div>
      </div>

    </div>
    <div class="upgrade-Enhancerpanel" class:hidden={activeStoreTab!="upgrade-EnhancerTab"}>
      <h1>Upgrade-Enhancer</h1>
      <div class="upgrade-Enhancerfolder">
        {#each upgradeEnhancerList as upgradeEnhancer}
          <div class:hidden={!upgradeEnhancer.isActive}>
            <p>{upgradeEnhancer.name}</p>
            <img src="PixelArtHand.png" alt="upgradeEnhancer" class="powerupicon" on:click={()=>{upgradeEnhancer.buy()}} on:keypress={()=>{upgradeEnhancer.buy()}}>
            <p>{upgradeEnhancer.cost}</p>
            <h3 class="showOnHover">{upgradeEnhancer.description}</h3>
          </div>
        {/each}
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
    overflow-x: hidden;
    overflow-y: auto;
    position: relative;
    text-align: center;
    background-color: rgba(0,0,0,0.5);
    height: 80vh;
    width: 35vw;
  }
  .upgradesFolder{
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .upgradeTemplate{
    display: grid;
    grid-template-columns: 9vw 7vw 7vw 10vw;
    justify-content: center;
    width: 30vw;
    height: 12vh;
    background-color: rgb(33,46,53);
    font-size: 2em;
    margin-bottom: 10px;
    border-radius: 5px;
  }
  .upgradeImageTemplate{
    margin-left: 3vw;
    margin-right: 3vw;
    margin-top: 1vh;
    max-width: 10vh;
    outline: 6px;
    outline-offset: -1px;
    outline-style: solid;
    outline-color: rgb(60, 70, 80);
    border-radius: 2px;
    background-color: rgb(60, 70, 80);
    width: fit-content;
    max-height: 10vh;
  }
  .upgradeDescription{
    transform: translate(48%, 30%);
    width: 10vh;
  }
  .pixelArtHand{
    height: 100%;
  }
  .upgradeCostClass{
    margin: auto;
    height: 5vh;
    outline: 6px;
    outline-offset: -1px;
    outline-style: solid;
    outline-color: rgb(60, 70, 80);
    border-radius: 2px;
    background-color: rgb(60, 70, 80);
  }
  .plusMinus{
    margin: auto;
    display: flex;
    flex: row;
    width: 5vw;
    height: 5vh;
    outline: 6px;
    outline-offset: -1px;
    outline-style: solid;
    outline-color: rgb(60, 70, 80);
    border-radius: 2px;
    background-color: rgb(60, 70, 80);
  }
  .plus{
    z-index: 100;
    position: relative;
    width: 2vw;
    height: 2vw;
    margin: auto;
  }
  .plusClass{
    margin: auto;
    transform: translateY(0.5vh);
  }
  .plusMinusDescription{
    transform: translate(-33%, 5vh);
  }
  .upgrade-Enhancerpanel{
    overflow-x: hidden;
    overflow-y: auto;
    position: relative;
    text-align: center;
    background-color: rgba(0,0,0,0.5);
    height: 80vh;
    width: 35vw;
  }
  .upgrade-Enhancerfolder{
    display: grid;
    grid-template-columns: 6.2vw 6.2vw 6.2vw 6.2vw 6.2vw;
    grid-template-rows: 18.6vh 18.6vh 18.6vh 18.6vh;
    width: 95%;
    height: 95%;
    margin: auto;
  }
  .PowerupsPanel{
    overflow-x: hidden;
    overflow-y: auto;
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
  h3{
    position: absolute;
    margin-top: -30px;
    width: 5vw;
    background-color: rgba(0, 0, 0, 1);
    color: rgba(255, 255, 255, 0.8);
    z-index: 10;
    border-radius: 5px;
    padding: 1px 5px 1px 5px;
    font-size: 16px;
  }
  h4{
    font-size: 150%;
    font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
    margin: auto;  
    transform:translateY(1vh);
  }
  h5{
    margin: auto;
    width: fit-content;
    font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
    transform: translateY(0.3vh);
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
<script>
  import { tick } from "svelte";

  let cookies=0;
  let dmg=1;
  let autoClicks=0;
  let activeTab="choicetab";
  let activeStoreTab="UpgradesTab";

  /**
     * @type {HTMLImageElement}
     */
  let picture;

  function add(){
    cookies+=dmg
  } 
  function Upgrades(){
    activeStoreTab="UpgradesTab"
  }
  function UpgradeEnhancer(){
    activeStoreTab="Upgrade-EnhancerTab"
  }
  function Powerups(){
    activeStoreTab="PowerupsTab"
  }
  function Settings(){
    activeTab="settingstab";
  }
  function Save(){
    localStorage.setItem('cookies',cookies);
  }
  function Load(){
    cookies = parseFloat(localStorage.getItem('cookies'));
  }
  function Back(){
    activeTab="choicetab"
  }
  
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

    <div class="Upgradepanel" class:hidden={activeStoreTab!="UpgradesTab"}>
      <h1>Upgrades</h1>
    </div>
    <div class="Upgrade-Enhancerpanel" class:hidden={activeStoreTab!="Upgrade-EnhancerTab"}>
      <h1>Upgrade-Enhancer</h1>
    </div>
    <div class="PowerupsPanel" class:hidden={activeStoreTab!="PowerupsTab"}>
      <h1>Powerups</h1>
    </div>

</div>

<div class="choicetab" class:hidden={activeTab!="choicetab"}>
  <button class="button" on:click={()=>Upgrades()}>Upgrades</button>
  <button class="button" on:click={()=>UpgradeEnhancer()}>Upgrade-Enhancer</button>
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
  .Upgradepanel{
    position: relative;
    text-align: center;
    background-color: rgba(0,0,0,0.5);
    height: 600px;
    width: 100%;
  }
  .Upgrade-Enhancerpanel{
    position: relative;
    text-align: center;
    background-color: rgba(0,0,0,0.5);
    height: 600px;
    width: 100%;
  }
  .PowerupsPanel{
    position: relative;
    text-align: center;
    background-color: rgba(0,0,0,0.5);
    height: 600px;
    width: 100%;
  }
  .choicetab{
    display: flex;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.1);
    width: 100%;
    height: 200px;
  }
  .settingstab{
    display: flex;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.1);
    width: 100%;
    height: 200px;
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
    height: 00px;
    width: 1000px;
  }

  .cookiepictureclass{
    margin-top: 15px;
    width: 400px;
    height: 400px; 
    border-radius: 100%;
    transition: 100ms;
  }
  .cookiepictureclass:active{
    transform: scale(0.95);
  }
  .settingspic{
    display: flex;
    justify-content: center;
    height: 30%;
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
    height: 30%;
    margin-top: 22px;
  }
  .arrowpic:active{
    background-color: rgba(0, 0, 0, 0.3);
    transform: translateY(-5px);
  }
  .arrowpic:hover{
    box-shadow: 0 12px 16px 0 rgba(0,0,0,0.24), 0 17px 50px 0 rgba(0,0,0,0.19);
  }
  .hidden{
    display: none;
  }

</style>
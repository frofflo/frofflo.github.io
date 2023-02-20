<script>
    let images = 
    [
    "https://www.ece.ucsd.edu/sites/www.ece.ucsd.edu/files/styles/standard_image/public/seminars/Sorger%20Photo.png?itok=nnEBjzVB", 
    "https://ece.engin.umich.edu/wp-content/uploads/2019/09/4083.jpg",
    "https://i.ytimg.com/vi/Plp_IKg_8Lg/maxresdefault.jpg",
    "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Kaisa_26.jpg",
    "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Teemo_7.jpg", 
    "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Teemo_27.jpg",
    "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Teemo_18.jpg", 
    "https://rare-gallery.com/mocahbig/57367-Teemo-League-Of-LegendsLeague-Of-Legends-HD-Wallpaper.jpg",
    ];
    let idList = [];
    let cards = [];
    for (let index = 0; index < 16; index++) {
      cards.push({
        id: index % (images.length), 
        img: images[index % (images.length)],
        flipped: false,
        completed: false,
      });
    }

    shuffleArray(cards)

    function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
   }
}

    let flipcount = 0;

    function flip(card) {

      card.flipped = true

      if (card.flipped && flipcount < 2 && card.completed == false) {
        flipcount ++
        idList.push(card.id)

        if (flipcount == 2) {
          if (idList[0] == idList[1]){
            console.log(idList)
            
            setTimeout(() => {
              cards = cards;
              flipcount = 0;
              idList = [];
              cards.forEach((card) => {
              card.completed = card.flipped;
              });

          }, 1000);
          }
          
          if (idList[0] != idList[1]){
            setTimeout(() => {
            cards.forEach((card) => {
              card.flipped = card.completed;
            });
            flipcount = 0;
            cards = cards;
            idList = [];

          }, 1000);
            }
        }
        cards = cards;
      } else {
        alert("chill");
      }
    }
  </script>
  
  <main>
    <div class="row">
      {#each cards as card, i}
        <div
          on:click={() => {
            flip(card);
          }}
          on:keypress={() => {
            flip(card);
          }}
          class:flipped={card.flipped}
          class="card"
        >
          <img class="front" src={card.img} alt="" />
          <img class="back" src="https://vanillatweaks.net/assets/images/grasstop.png" alt="" />
        </div>
      {/each}
    </div>
  </main>
  
  <style>
    main {
      margin-top: 50px;
      display: flex;
      place-content: center;
      place-items: center;
    }
    .row {
      display: grid;
      gap: 20px;
      grid-template-columns: repeat(4, 100px);
      grid-template-rows: repeat(4, 100px);
    }
    .card {
      cursor: pointer;
      transition: transform 1s;
      transform-style: preserve-3d;
      width: 100%;
      height: 100%;
    }
    .card.flipped {
      transform: rotateY(180deg);
    }
    .card .back {
      border-radius: 10px;
      transform: rotateY(0deg);
    }
    .card .front {
      border-radius: 10px;
      transform: rotateY(180deg);
    }
    .card img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      backface-visibility: hidden;
      -webkit-backface-visibility: hidden;
      position: absolute;
    }
  </style>
<script>
  import { json } from "@sveltejs/kit";
  import { elizaPostTransforms } from "elizabot/elizadata";
  import { onMount, tick } from "svelte";
  import { each } from "svelte/internal";

  let cookies = 0;
  let dmg = 1;
  let autoClicks = 0;
  let activeTab = "choicetab";
  let activeStoreTab = "upgradesTab";
  let activeAlert = 0;
  let isBoughtListPowerup = [];
  let isBoughtListUpgradeEnhancer = [];
  let particles = [];
  let mousePos = { x: 0, y: 0 };
  let time = 0;
  let cps = 0;
  let cookiesPerSecond = 0;
  var colors = [
    "#794e2e",
    "#ac8a5e",
    "#ceb288",
    "#bf9d70",
    "#d5c1a5",
    "#441f15",
    "#9f7547",
    "#552b1d",
  ];
  let randVar = 0;
  let needCookies = 0;
  let alertTabVar = false;

  let counterVar = 0;
  let timedMultiplier = 0.01;
  let durationVar = 0;

  let grandpas = 0;
  let grandpaMultiplier = 1;

  let cursors = 0;
  let cursorMultiplier = 1;

  let wheatfarms = 0;
  let wheatfarmMultiplier = 1;

  let sugarcanefarms = 0;
  let sugarcanefarmMultiplier = 1;

  let cacaofarms = 0;
  let cacaofarmMultiplier = 1;

  let milkyfarms = 0;
  let milkyfarmMultiplier = 1;

  let factories = 0;
  let factoryMultiplier = 1;

  /**
   * @type {HTMLImageElement}
   */
  let picture;
  let cookieScale = 1;

  function lerp(a, b, t) {
    return (b - a) * t + a;
  }

  function quad(p1, p2, p3, t) {
    const l1 = lerp(p1, p2, t);
    const l2 = lerp(p2, p3, t);
    return lerp(l1, l2, t);
  }

  function rand(value) {
    return Math.random() * value * 2 - value;
  }

  function add() {
    cookiesPerSecond = cookiesPerSecond;
    cps++;
    setTimeout(function () {
      cps--;
    }, 1000);

    cookies += dmg;

    randVar = Math.floor(Math.random() * 12);

    if (randVar <= 6 && randVar >= 2) {
      randVar += 2;
    }
    if (randVar < 2) {
      randVar += 6;
    }

    for (let i = 0; i < randVar; i++) {
      particles.push({
        color: colors[Math.floor(Math.random() * colors.length)],
        x: mousePos.x,
        y: mousePos.y,
        sx: mousePos.x,
        sy: mousePos.y,
        ex: mousePos.x + rand(500),
        ey: mousePos.y + Math.random() * 200 + 400,
        rotation: Math.random() * 360,
        time,
      });
    }

    powerupList.forEach((powerup) => {
      if (cookies * 2 >= powerup.cost && !powerup.isBoughtPowerup) {
        powerup.isActive = true;
        powerupList = powerupList;
      }
    });

    powerupList.forEach((powerup) => {
      if (isBoughtListPowerup.includes(powerup.cost)) {
        powerup.isActive = false;
      }
    });

    upgradeEnhancerList.forEach((upgradeEnhance) => {
      if (
        cookies * 2 >= upgradeEnhance.cost &&
        !upgradeEnhance.isBoughtUpgradeEnhancer
      ) {
        upgradeEnhance.isActive = true;
        upgradeEnhancerList = upgradeEnhancerList;
      }
    });

    upgradeEnhancerList.forEach((upgradeEnhance) => {
      if (isBoughtListUpgradeEnhancer.includes(upgradeEnhance.cost)) {
        upgradeEnhance.isActive = false;
      }
    });
  }

  function upgrades() {
    activeStoreTab = "upgradesTab";
  }

  function upgradeEnhancer() {
    activeStoreTab = "upgrade-EnhancerTab";
    upgradeEnhancerList.forEach((upgradeEnhance) => {
      if (
        cookies * 2 >= upgradeEnhance.cost &&
        !upgradeEnhance.isBoughtUpgradeEnhancer
      ) {
        upgradeEnhance.isActive = true;
        upgradeEnhancerList = upgradeEnhancerList;
      }
    });
    isBoughtListUpgradeEnhancer = JSON.parse(
      localStorage.getItem("isBoughtUpgradeEnhancer") != null
        ? localStorage.getItem("isBoughtUpgradeEnhancer")
        : ""
    );

    upgradeEnhancerList.forEach((upgradeEnhance) => {
      if (isBoughtListUpgradeEnhancer.includes(upgradeEnhance.cost)) {
        upgradeEnhance.isActive = false;
      }
    });
  }

  function Powerups() {
    activeStoreTab = "PowerupsTab";
    powerupList.forEach((powerup) => {
      if (cookies * 2 >= powerup.cost && !powerup.isBoughtPowerup) {
        powerup.isActive = true;
        powerupList = powerupList;
      }
    });

    isBoughtListPowerup = JSON.parse(
      localStorage.getItem("isBoughtPowerup") != null
        ? localStorage.getItem("isBoughtPowerup")
        : ""
    );

    powerupList.forEach((powerup) => {
      if (isBoughtListPowerup.includes(powerup.cost)) {
        powerup.isActive = false;
        powerup.isBoughtPowerup = true;
      }
    });
  }

  function Settings() {
    activeTab = "settingstab";
  }

  onMount(() => {
    window.onbeforeunload = function () {
      localStorage.setItem("cookies", cookies);
      localStorage.setItem("dmg", dmg);
      localStorage.setItem("upgrades", JSON.stringify(upgradeList));

      localStorage.setItem("cursors", cursors);
      localStorage.setItem("grandpas", grandpas);
      localStorage.setItem("wheatfarms", wheatfarms);
      localStorage.setItem("sugarcanefarms", sugarcanefarms);
      localStorage.setItem("cacaofarms", cacaofarms);
      localStorage.setItem("milkyfarms", milkyfarms);
      localStorage.setItem("factories", factories);

      localStorage.setItem("cursorMultiplier", cursorMultiplier);
      localStorage.setitem("grandpaMultiplier", grandpaMultiplier);
      localStorage.setitem("wheatfarmMultiplier", wheatfarmMultiplier);
      localStorage.setitem("sugarcanefarmMultiplier", sugarcanefarmMultiplier);
      localStorage.setitem("cacaofarmMultiplier", cacaofarmMultiplier);
      localStorage.setitem("milkyfarmMultiplier", milkyfarmMultiplier);
      localStorage.setItem("factoryMultiplier", factoryMultiplier);
    };

    cookies = parseFloat(localStorage.getItem("cookies") ?? 0);
    dmg = parseFloat(localStorage.getItem("dmg") ?? 1);
    upgradeList = JSON.parse(localStorage.getItem("upgrades") ?? "[]").map(
      (json) => Object.assign(new multipleUpgrades(), json)
    );

    cursors = parseFloat(localStorage.getItem("cursors") ?? 0);
    grandpas = parseFloat(localStorage.getItem("grandpas") ?? 0);
    wheatfarms = parseFloat(localStorage.getItem("wheatfarms") ?? 0);
    sugarcanefarms = parseFloat(localStorage.getItem("sugarcanefarms") ?? 0);
    cacaofarms = parseFloat(localStorage.getItem("cacaofarms") ?? 0);
    milkyfarms = parseFloat(localStorage.getItem("milkyfarms") ?? 0);
    factories = parseFloat(localStorage.getItem("factories") ?? 0);

    cursorMultiplier = parseFloat(
      localStorage.getItem("cursorMultiplier") ?? 1
    );
    grandpaMultiplier = parseFloat(
      localStorage.getItem("grandpaMultiplier") ?? 1
    );
    wheatfarmMultiplier = parseFloat(
      localStorage.getItem("wheatfarmMultiplier") ?? 1
    );
    sugarcanefarmMultiplier = parseFloat(
      localStorage.getItem("sugarcanefarmMultiplier") ?? 1
    );
    cacaofarmMultiplier = parseFloat(
      localStorage.getItem("cacaofarmMultiplier") ?? 1
    );
    milkyfarmMultiplier = parseFloat(
      localStorage.getItem("milkyfarmMultiplier") ?? 1
    );
    sugarcanefarmMultiplier = parseFloat(
      localStorage.getItem("sugarcanefarmMultiplier") ?? 1
    );

    onmousemove = handleMouseMove;
    function handleMouseMove(event) {
      event = event || window.event;

      mousePos = {
        x: event.pageX,
        y: event.pageY,
      };
    }

    const maxParticleTime = 1;
    function DoFrame(milliTime) {
      window.requestAnimationFrame(DoFrame);
      time = milliTime / 1000;

      particles.forEach((particle, index) => {
        const elapsed = time - particle.time;
        const t = elapsed / maxParticleTime;
        particle.x = quad(
          particle.sx,
          lerp(particle.sx, particle.ex, 0.5),
          particle.ex,
          t
        );
        particle.y = quad(
          particle.sy,
          lerp(particle.sy, particle.ey, 0.5) - 300,
          particle.ey,
          t
        );
        particle.rotation += 1;
        if (time - particle.time >= maxParticleTime) {
          particles.splice(index, 1);
        }
      });

      particles = particles;
    }

    window.requestAnimationFrame(DoFrame);
  });

  function Save() {
    localStorage.setItem("cookies", cookies);
    localStorage.setItem("dmg", dmg);
    localStorage.setItem("upgrades", JSON.stringify(upgradeList));
  }

  function Load() {
    cookies = parseFloat(localStorage.getItem("cookies") ?? 0);
    dmg = parseFloat(localStorage.getItem("dmg") ?? 1);
    upgradeList = JSON.parse(localStorage.getItem("upgrades") ?? "[]").map(
      (json) => Object.assign(new multipleUpgrades(), json)
    );
  }

  function Reset() {
    activeTab = "yesOrnoTab";
  }

  function wipeData() {
    localStorage.clear();

    cookies = parseFloat(localStorage.getItem("cookies") ?? 0);
    dmg = parseFloat(localStorage.getItem("dmg") ?? 1);

    cursorMultiplier = parseFloat(
      localStorage.getItem("cursorMultiplier") ?? 1
    );
    grandpaMultiplier = parseFloat(
      localStorage.getItem("grandpaMultiplier") ?? 1
    );
    wheatfarmMultiplier = parseFloat(
      localStorage.getItem("wheatfarmMultiplier") ?? 1
    );
    sugarcanefarmMultiplier = parseFloat(
      localStorage.getItem("sugarcanefarmMultiplier") ?? 1
    );
    cacaofarmMultiplier = parseFloat(
      localStorage.getItem("cacaofarmMultiplier") ?? 1
    );
    milkyfarmMultiplier = parseFloat(
      localStorage.getItem("milkyfarmMultiplier") ?? 1
    );
    factoryMultiplier = parseFloat(
      localStorage.getItem("factoryMultiplier") ?? 1
    );

    upgradeList = [
      upgrade1,
      upgrade2,
      upgrade3,
      upgrade4,
      upgrade5,
      upgrade6,
      upgrade7,
    ];

    cursors = 0;
    grandpas = 0;
    wheatfarms = 0;
    sugarcanefarms = 0;
    cacaofarms = 0;
    milkyfarms = 0;
    factories = 0;

    activeTab = "choicetab";

    localStorage.setItem("cookies", cookies);
    localStorage.setItem("dmg", dmg);
    localStorage.setItem("upgrades", JSON.stringify(upgradeList));

    location.reload();
  }

  function Back() {
    activeTab = "choicetab";
  }

  function checkPrice(value) {
    if (value >= 1000000000000)
      return `${Math.round((100 * value) / 1000000000000) / 100}T`;
    if (value >= 1000000000)
      return `${Math.round((100 * value) / 1000000000) / 100}B`;
    if (value >= 1000000)
      return `${Math.round((100 * value) / 1000000) / 100}M`;
    if (value >= 1000) return `${Math.round((100 * value) / 1000) / 100}K`;
    if (value < 1000) return `${Math.ceil(value)}`;
    return value;
  }

  class multipleUpgrades {
    constructor(
      name,
      upgradeCost,
      costMultiplier,
      description,
      ammount,
      autoClickAddValue,
      picURL
    ) {
      this.name = name;
      this.upgradeCost = upgradeCost;
      this.costMultiplier = costMultiplier;
      this.description = description;
      this.ammount = ammount;
      this.autoClickAddValue = autoClickAddValue;
      this.picURL = picURL;
    }
    plus() {
      alertTabVar = false;
      if (cookies >= this.upgradeCost) {
        cookies -= this.upgradeCost;
        this.upgradeCost *= this.costMultiplier;
        this.ammount += 1;

        if (this.name == "cursor") {
          cursors = this.ammount * this.autoClickAddValue;
        }
        if (this.name == "grandpa") {
          grandpas = this.ammount * this.autoClickAddValue;
        }
        if (this.name == "wheatfarm") {
          wheatfarms = this.ammount * this.autoClickAddValue;
        }
        if (this.name == "sugarcane -farm") {
          sugarcanefarms = this.ammount * this.autoClickAddValue;
        }
        if (this.name == "cacaofarm") {
          cacaofarms = this.ammount * this.autoClickAddValue;
        }
        if (this.name == "milkyfarm") {
          milkyfarms = this.ammount * this.autoClickAddValue;
        }
        if (this.name == "factory") {
          factories = this.ammount * this.autoClickAddValue;
        }
      }
      if (cookies < this.upgradeCost) {
        needCookies = this.upgradeCost - cookies;
        console.log(alertTabVar);
        alertTabVar = true;
        console.log(alertTabVar);
      }
      upgradeList = upgradeList;
    }
    minus() {
      alertTabVar = false;
      if (this.ammount != 0 || this.ammount > 0) {
        this.ammount -= 1;
        this.upgradeCost /= this.costMultiplier;
        cookies += this.upgradeCost / 2;

        if (this.name == "cursor") {
          cursors = this.ammount * this.autoClickAddValue;
        }
        if (this.name == "grandpa") {
          grandpas = this.ammount * this.autoClickAddValue;
        }
        if (this.name == "wheatfarm") {
          wheatfarms = this.ammount * this.autoClickAddValue;
        }
        if (this.name == "sugarcanefarm") {
          sugarcanefarms = this.ammount * this.autoClickAddValue;
        }
        if (this.name == "cacaofarm") {
          cacaofarms = this.ammount * this.autoClickAddValue;
        }
        if (this.name == "milkyfarm") {
          milkyfarms = this.ammount * this.autoClickAddValue;
        }
        if (this.name == "factory") {
          factories = this.ammount * this.autoClickAddValue;
        }
      }
      upgradeList = upgradeList;
    }
  }

  class powerupIcon {
    constructor(
      isActive,
      cost,
      name,
      description,
      value,
      isBoughtPowerup,
      picURL,
      multiplierValue,
      duration
    ) {
      this.isActive = isActive;
      this.cost = cost;
      this.name = name;
      this.description = description;
      this.value = value;
      this.isBoughtPowerup = isBoughtPowerup;
      this.picURL = picURL;
      this.multiplierValue = multiplierValue;
      this.duration = duration;
    }
    buy() {
      if (cookies >= this.cost) {
        this.isActive = false;
        this.isBoughtPowerup = true;
        isBoughtListPowerup.push(this.cost);
        localStorage.setItem(
          "isBoughtPowerup",
          JSON.stringify(isBoughtListPowerup)
        );
        isBoughtListPowerup = isBoughtListPowerup;
        cookies -= this.cost;
        powerupList = powerupList;
        if (this.name == "Click Boost") {
          dmg *= this.value;
        }
        if (this.name == "Cookies") {
          if (counterVar > 0) {
            counterVar = 0;
            timedMultiplier = 0.01;
          }
          if (counterVar < this.duration) {
            timedMultiplier = this.multiplierValue;
            durationVar = this.duration;
          }
          let intNr = setInterval(function () {
            if (counterVar < durationVar) {
              counterVar++;
              counterVar = counterVar;
            } else {
              clearInterval(intNr);
              timedMultiplier = 0.01;
            }
          }, 1000);
        }
      } else {
        needCookies = this.cost - cookies;
        alertTabVar = true;
      }
    }
  }

  class upgradeEnhancerIcon {
    constructor(
      isActive,
      cost,
      name,
      description,
      value,
      isBoughtUpgradeEnhancer,
      picURL
    ) {
      this.isActive = isActive;
      this.cost = cost;
      this.name = name;
      this.description = description;
      this.value = value;
      this.isBoughtUpgradeEnhancer = isBoughtUpgradeEnhancer;
      this.picURL = picURL;
    }
    buy() {
      if (cookies >= this.cost) {
        this.isActive = false;
        this.isBoughtUpgradeEnhancer = true;
        isBoughtListUpgradeEnhancer.push(this.cost);
        localStorage.setItem(
          "isBoughtUpgradeEnhancer",
          JSON.stringify(isBoughtListUpgradeEnhancer)
        );
        isBoughtListUpgradeEnhancer = isBoughtListUpgradeEnhancer;
        upgradeEnhancerList = upgradeEnhancerList;
        cookies -= this.cost;

        if (this.name == "Cursors") {
          cursorMultiplier *= this.value;
        }
        if (this.name == "Grandpas") {
          grandpaMultiplier *= this.value;
        }
        if (this.name == "Wheat") {
          wheatfarmMultiplier *= this.value;
        }
        if (this.name == "Sugar") {
          sugarcanefarmMultiplier *= this.value;
        }
        if (this.name == "Cacao") {
          cacaofarmMultiplier *= this.value;
        }
        if (this.name == "Milk") {
          milkyfarmMultiplier *= this.value;
        }
        if (this.name == "Factories") {
          factoryMultiplier *= this.value;
        }
      } else {
        needCookies = this.cost - cookies;
        alertTabVar = true;
      }
    }
  }

  // Upgrades
  let upgrade1 = new multipleUpgrades(
    "cursor",
    50,
    1.5,
    "Buy one Cursor to get 0.1 cookies / second",
    cursors,
    0.1,
    "PixelArtHand.png"
  );
  let upgrade2 = new multipleUpgrades(
    "grandpa",
    500,
    1.1,
    "Buy one Grandpa to get 1 cookies / second",
    grandpas,
    1,
    "grandpa.png"
  );
  let upgrade3 = new multipleUpgrades(
    "wheatfarm",
    1500,
    1.05,
    "Buy one Wheatfarm to get 10 cookies / second",
    wheatfarms,
    10,
    "wheat.png"
  );
  let upgrade4 = new multipleUpgrades(
    "sugarcane -farm",
    10000,
    1.075,
    "Buy one Sugarcane -farm to get 50 cookies / second",
    sugarcanefarms,
    50,
    "sugarcane.png"
  );
  let upgrade5 = new multipleUpgrades(
    "cacaofarm",
    50000,
    1.25,
    "Buy one cacaofarm to get 100 cookies / second",
    cacaofarms,
    100,
    "cacao.png"
  );
  let upgrade6 = new multipleUpgrades(
    "milkyfarm",
    125000,
    1.1,
    "Buy one milkyfarm to get 250 cookies / second",
    milkyfarms,
    250,
    "cow.png"
  );
  let upgrade7 = new multipleUpgrades(
    "factory",
    1000000,
    1.05,
    "Buy one Factory to get 1500 cookies / second",
    factories,
    1500,
    "factory.png"
  );

  // Powerups
  let powerup1 = new powerupIcon(
    false,
    100,
    "Click Boost",
    "Gives You A 2x Click Multiplier",
    2,
    false,
    "PixelArtHand.png"
  );
  let powerup2 = new powerupIcon(
    false,
    500,
    "Click Boost",
    "Gives You A 1.5x Click Multiplier",
    1.5,
    false,
    "PixelArtHand.png"
  );
  let powerup3 = new powerupIcon(
    false,
    2500,
    "Click Boost",
    "Gives You A 2x Click Multiplier",
    2,
    false,
    "PixelArtHand.png"
  );
  let powerup4 = new powerupIcon(
    false,
    5000,
    "Click Boost",
    "Gives You A 1.5x Click Multiplier",
    1.5,
    false,
    "PixelArtHand.png"
  );
  let powerup5 = new powerupIcon(
    false,
    55000,
    "Click Boost",
    "Gives You A 1.5x Click Multiplier",
    1.5,
    false,
    "PixelArtHand.png"
  );
  let powerup6 = new powerupIcon(
    false,
    100000,
    "Click Boost",
    "Gives You A 2x Click Multiplier",
    2,
    false,
    "PixelArtHand.png"
  );
  let powerup7 = new powerupIcon(
    false,
    350000,
    "Click Boost",
    "Gives You A 1.5x Click Multiplier",
    1.5,
    false,
    "PixelArtHand.png"
  );
  let powerup8 = new powerupIcon(
    false,
    1000000,
    "Click Boost",
    "Gives You A 2x Click Multiplier",
    2,
    false,
    "PixelArtHand.png"
  );
  let powerup9 = new powerupIcon(
    false,
    200,
    "Cookies",
    "Gives you 2x cookies for 60 seconds",
    1,
    false,
    "Cookieimg.png",
    0.02,
    60
  );
  let powerup10 = new powerupIcon(
    false,
    2000,
    "Cookies",
    "Gives you 3x cookies for 30 seconds",
    1,
    false,
    "Cookieimg.png",
    0.03,
    30
  );
  let powerup11 = new powerupIcon(
    false,
    50000,
    "Cookies",
    "Gives you 3x cookies for 30 seconds",
    1,
    false,
    "Cookieimg.png",
    0.03,
    30
  );
  let powerup12 = new powerupIcon(
    false,
    100000,
    "Cookies",
    "Gives you 3x cookies for 60 seconds",
    1,
    false,
    "Cookieimg.png",
    0.03,
    60
  );
  let powerup13 = new powerupIcon(
    false,
    250000,
    "Cookies",
    "Gives you 2x cookies for 30 seconds",
    1,
    false,
    "Cookieimg.png",
    0.02,
    30
  );

  // UpgradeEnhancers:
  let upgradeEnhancer1 = new upgradeEnhancerIcon(
    false,
    200,
    "Cursors",
    "Gives You 2x Cursor Profits",
    2,
    false,
    "PixelArtHand.png"
  );
  let upgradeEnhancer2 = new upgradeEnhancerIcon(
    false,
    500,
    "Cursors",
    "Gives You 1.5x Cursor Profits",
    1.5,
    false,
    "PixelArtHand.png"
  );
  let upgradeEnhancer3 = new upgradeEnhancerIcon(
    false,
    4500,
    "Cursors",
    "Gives You 2x Cursor Profits",
    2,
    false,
    "PixelArtHand.png"
  );
  let upgradeEnhancer4 = new upgradeEnhancerIcon(
    false,
    25000,
    "Cursors",
    "Gives You 1.5x Cursor Profits",
    1.5,
    false,
    "PixelArtHand.png"
  );
  let upgradeEnhancer5 = new upgradeEnhancerIcon(
    false,
    100000,
    "Cursors",
    "Gives You 2x Cursor Profits",
    2,
    false,
    "PixelArtHand.png"
  );
  let upgradeEnhancer6 = new upgradeEnhancerIcon(
    false,
    800000,
    "Cursors",
    "Gives You 5x Cursor Profits",
    5,
    false,
    "PixelArtHand.png"
  );

  let upgradeEnhancer7 = new upgradeEnhancerIcon(
    false,
    2000,
    "Grandpas",
    "Gives You 3x Grandpa Profits",
    3,
    false,
    "grandpa.png"
  );
  let upgradeEnhancer8 = new upgradeEnhancerIcon(
    false,
    5500,
    "Grandpas",
    "Gives You 3x Grandpa Profits",
    3,
    false,
    "grandpa.png"
  );
  let upgradeEnhancer9 = new upgradeEnhancerIcon(
    false,
    10000,
    "Grandpas",
    "Gives You 3x Grandpa Profits",
    3,
    false,
    "grandpa.png"
  );
  let upgradeEnhancer10 = new upgradeEnhancerIcon(
    false,
    26000,
    "Grandpas",
    "Gives You 5x Grandpa Profits",
    5,
    false,
    "grandpa.png"
  );
  let upgradeEnhancer11 = new upgradeEnhancerIcon(
    false,
    52000,
    "Grandpas",
    "Gives You 5x Grandpa Profits",
    5,
    false,
    "grandpa.png"
  );

  let upgradeEnhancer12 = new upgradeEnhancerIcon(
    false,
    5000,
    "Wheat",
    "Gives You 2.5x Profits",
    2.5,
    false,
    "wheat.png"
  );
  let upgradeEnhancer13 = new upgradeEnhancerIcon(
    false,
    27000,
    "Wheat",
    "Gives You 2.5x Profits",
    2.5,
    false,
    "wheat.png"
  );
  let upgradeEnhancer14 = new upgradeEnhancerIcon(
    false,
    54000,
    "Wheat",
    "Gives You 4x Profits",
    4,
    false,
    "wheat.png"
  );
  let upgradeEnhancer15 = new upgradeEnhancerIcon(
    false,
    110000,
    "Wheat",
    "Gives You 4x Profits",
    4,
    false,
    "wheat.png"
  );
  let upgradeEnhancer16 = new upgradeEnhancerIcon(
    false,
    200000,
    "Wheat",
    "Gives You 2.5x Profits",
    2.5,
    false,
    "wheat.png"
  );

  let upgradeEnhancer17 = new upgradeEnhancerIcon(
    false,
    50000,
    "Sugar",
    "Gives You 3x Sugarcane Profits",
    3,
    false,
    "sugarcane.png"
  );
  let upgradeEnhancer18 = new upgradeEnhancerIcon(
    false,
    275000,
    "Sugar",
    "Gives You 2x Sugarcane Profits",
    2,
    false,
    "sugarcane.png"
  );
  let upgradeEnhancer19 = new upgradeEnhancerIcon(
    false,
    550000,
    "Sugar",
    "Gives You 2x Sugarcane Profits",
    2,
    false,
    "sugarcane.png"
  );
  let upgradeEnhancer20 = new upgradeEnhancerIcon(
    false,
    2200000,
    "Sugar",
    "Gives You 5x Sugarcane Profits",
    5,
    false,
    "sugarcane.png"
  );

  let upgradeEnhancer21 = new upgradeEnhancerIcon(
    false,
    150000,
    "Cacao",
    "Gives You 4x Cacaofarm Profits",
    4,
    false,
    "cacao.png"
  );
  let upgradeEnhancer22 = new upgradeEnhancerIcon(
    false,
    300000,
    "Cacao",
    "Gives You 4x Cacaofarm Profits",
    4,
    false,
    "cacao.png"
  );
  let upgradeEnhancer23 = new upgradeEnhancerIcon(
    false,
    700000,
    "Cacao",
    "Gives You 3x Cacaofarm Profits",
    3,
    false,
    "cacao.png"
  );
  let upgradeEnhancer24 = new upgradeEnhancerIcon(
    false,
    2500000,
    "Cacao",
    "Gives You 4x Cacaofarm Profits",
    4,
    false,
    "cacao.png"
  );
  let upgradeEnhancer25 = new upgradeEnhancerIcon(
    false,
    5000000,
    "Cacao",
    "Gives You 3x Cacaofarm Profits",
    3,
    false,
    "cacao.png"
  );

  let upgradeEnhancer26 = new upgradeEnhancerIcon(
    false,
    250000,
    "Milk",
    "Gives You 3x Milkyfarm Profits",
    3,
    false,
    "cow.png"
  );
  let upgradeEnhancer27 = new upgradeEnhancerIcon(
    false,
    500000,
    "Milk",
    "Gives You 5x Milkyfarm Profits",
    5,
    false,
    "cow.png"
  );
  let upgradeEnhancer28 = new upgradeEnhancerIcon(
    false,
    1500000,
    "Milk",
    "Gives You 3x Milkyfarm Profits",
    3,
    false,
    "cow.png"
  );
  let upgradeEnhancer29 = new upgradeEnhancerIcon(
    false,
    2750000,
    "Milk",
    "Gives You 3x Milkyfarm Profits",
    3,
    false,
    "cow.png"
  );
  let upgradeEnhancer30 = new upgradeEnhancerIcon(
    false,
    5500000,
    "Milk",
    "Gives You 5x Milkyfarm Profits",
    5,
    false,
    "cow.png"
  );

  let upgradeEnhancer31 = new upgradeEnhancerIcon(
    false,
    2000000,
    "Factories",
    "Gives You 3x Factory Profits",
    3,
    false,
    "factory.png"
  );
  let upgradeEnhancer32 = new upgradeEnhancerIcon(
    false,
    10000000,
    "Factories",
    "Gives You 5x Factory Profits",
    5,
    false,
    "factory.png"
  );
  let upgradeEnhancer33 = new upgradeEnhancerIcon(
    false,
    25000000,
    "Factories",
    "Gives You 10x Factory Profits",
    10,
    false,
    "factory.png"
  );

  let upgradeList = [
    upgrade1,
    upgrade2,
    upgrade3,
    upgrade4,
    upgrade5,
    upgrade6,
    upgrade7,
  ];
  let powerupList = [
    powerup1,
    powerup2,
    powerup3,
    powerup4,
    powerup5,
    powerup6,
    powerup7,
    powerup8,
    powerup9,
    powerup10,
    powerup11,
    powerup12,
    powerup13,
  ];
  let upgradeEnhancerList = [
    upgradeEnhancer1,
    upgradeEnhancer2,
    upgradeEnhancer3,
    upgradeEnhancer4,
    upgradeEnhancer5,
    upgradeEnhancer6,
    upgradeEnhancer7,
    upgradeEnhancer8,
    upgradeEnhancer9,
    upgradeEnhancer10,
    upgradeEnhancer11,
    upgradeEnhancer12,
    upgradeEnhancer13,
    upgradeEnhancer14,
    upgradeEnhancer15,
    upgradeEnhancer16,
    upgradeEnhancer17,
    upgradeEnhancer18,
    upgradeEnhancer19,
    upgradeEnhancer20,
    upgradeEnhancer21,
    upgradeEnhancer22,
    upgradeEnhancer23,
    upgradeEnhancer24,
    upgradeEnhancer25,
    upgradeEnhancer26,
    upgradeEnhancer27,
    upgradeEnhancer28,
    upgradeEnhancer29,
    upgradeEnhancer30,
    upgradeEnhancer31,
    upgradeEnhancer32,
    upgradeEnhancer33,
  ];

  setInterval(function () {
    autoClicks =
      timedMultiplier *
      (cursors * cursorMultiplier +
        grandpas * grandpaMultiplier +
        wheatfarms * wheatfarmMultiplier +
        sugarcanefarms * sugarcanefarmMultiplier +
        cacaofarms * cacaofarmMultiplier +
        milkyfarms * milkyfarmMultiplier +
        factories * factoryMultiplier);
    cookiesPerSecond = autoClicks * 100;
    cookies += autoClicks * 2.5;

    upgradeEnhancerList.forEach((upgradeEnhance) => {
      upgradeEnhance.isActive =
        cookies * 2 >= upgradeEnhance.cost &&
        !upgradeEnhance.isBoughtUpgradeEnhancer;
      upgradeEnhancerList = upgradeEnhancerList;
    });

    powerupList.forEach((powerup) => {
      powerup.isActive =
        cookies * 2 >= powerup.cost && !powerup.isBoughtPowerup;
      powerupList = powerupList;
    });
  }, 25);
</script>

<div class="background">
  <div class="alertTab" class:alertTabSlide={alertTabVar}>
    <h2>Hold Up!</h2>
    <h4>You need {checkPrice(needCookies)} more cookies</h4>
  </div>

  <!-- <div class="alertTab">
      <h2>Hold up!</h2>
      <h4>Are you sure you want to reset?!</h4>
    </div> -->

  <div class="cookiebackground">
    <h1>Cookie Clicker</h1>
    <div class="cookieDisplayDiv">
      <h2 class="cookieDisplay">Cookies:{checkPrice(Math.ceil(cookies))}</h2>
    </div>
    <h6>Cookies/second:{Math.floor(cookiesPerSecond * 10) / 10}</h6>
    <h6>Clicks/second:{cps}</h6>
    <div class="cookieWrap">
      <img
        class="cookieButtonClass"
        on:mousedown={() => {
          cookieScale = 0.95;
        }}
        on:mouseup={() => {
          cookieScale = 1;
        }}
        on:click={() => add()}
        on:keypress={() => add()}
        alt="cookieBtn"
      />
      <img
        type="cookie"
        bind:this={picture}
        style="transform: scale({cookieScale})"
        class="cookiepictureclass"
        src="Cookieimg.png"
        alt="Cookie"
      />
    </div>
  </div>

  <div class="upgradePanel" class:hidden={activeStoreTab != "upgradesTab"}>
    <h1>Upgrades</h1>

    <div class="upgradesFolder">
      {#each upgradeList as upgrade}
        <div class="upgradeTemplate">
          <div>
            <img
              class="upgradeImageTemplate pixelArtHand"
              src={upgrade.picURL}
              alt="pic"
            />
            <h3 class="showOnHover upgradeDescription">
              {upgrade.description}
            </h3>
          </div>
          <div class="upgradeImageTemplate"><h4>{upgrade.ammount}</h4></div>
          <div class="upgradeCostClass">
            <h5>{checkPrice(upgrade.upgradeCost)}</h5>
          </div>
          <div class="plusMinus">
            <img
              on:click={() => {
                upgrade.minus();
              }}
              on:keypress={() => {
                upgrade.minus();
              }}
              class="plus"
              src="MinusSign.png"
              alt="Minus"
            />
            <h3 class="showOnHover minusDescription">
              Sell 1 {upgrade.name} for 50%
            </h3>

            <img
              on:click={() => {
                upgrade.plus();
              }}
              on:keypress={() => {
                upgrade.plus();
              }}
              class="plus"
              src="PlusSign.png"
              alt="Plus"
            />
            <h3 class="showOnHover plusDescription">
              Purchase 1 {upgrade.name} for {checkPrice(upgrade.upgradeCost)} cookies
            </h3>
          </div>
        </div>
      {/each}
    </div>
  </div>
  <div
    class="upgrade-Enhancerpanel"
    class:hidden={activeStoreTab != "upgrade-EnhancerTab"}
  >
    <h1>Upgrade-Enhancer</h1>
    <div class="upgrade-Enhancerfolder">
      {#each upgradeEnhancerList as upgradeEnhancer}
        <div class:hidden={!upgradeEnhancer.isActive}>
          <p>{upgradeEnhancer.name}</p>
          <img
            src={upgradeEnhancer.picURL}
            alt="upgradeEnhancer"
            class="powerupicon"
            on:click={() => {
              upgradeEnhancer.buy();
            }}
            on:keypress={() => {
              upgradeEnhancer.buy();
            }}
          />
          <p>{checkPrice(upgradeEnhancer.cost)}</p>
          <h3 class="showOnHover2">{upgradeEnhancer.description}</h3>
        </div>
      {/each}
    </div>
  </div>
  <div class="Can't Afford" class:hidden={activeAlert != "cantAfford"}>
    <h2>Can't Afford</h2>
  </div>
  <div class="PowerupsPanel" class:hidden={activeStoreTab != "PowerupsTab"}>
    <h1>Powerups</h1>
    <div class="Powerupsfolder">
      {#each powerupList as powerup}
        <div class:hidden={!powerup.isActive}>
          <p>{powerup.name}</p>
          <img
            src={powerup.picURL}
            alt="powerup"
            class="powerupicon"
            on:click={() => {
              powerup.buy();
            }}
            on:keypress={() => {
              powerup.buy();
            }}
          />
          <p>{powerup.cost}</p>
          <h3 class="showOnHover2">{powerup.description}</h3>
        </div>
      {/each}
    </div>
  </div>
</div>

<div class="choicetab" class:hidden={activeTab != "choicetab"}>
  <button class="button" on:click={() => upgrades()}>Upgrades</button>
  <button class="button" on:click={() => upgradeEnhancer()}
    >Upgrade-Enhancer</button
  >
  <button class="button" on:click={() => Powerups()}>Powerups</button>
  <img
    type="settings"
    on:click={Settings}
    on:keypress={Settings}
    bind:this={picture}
    class="settingspic"
    src="Settings.png"
    alt="settings"
  />
</div>

<div class="settingstab" class:hidden={activeTab != "settingstab"}>
  <button class="button" on:click={() => Save()}>Save</button>
  <button class="button" on:click={() => Load()}>Load</button>
  <button class="button" on:click={() => Reset()}>Reset</button>
  <img
    type="backarrow"
    on:click={() => Back()}
    on:keypress={() => Back()}
    bind:this={picture}
    class="arrowpic"
    src="Arrow.png"
    alt="back"
  />
</div>

<div class="yesOrnoTab" class:hidden={activeTab != "yesOrnoTab"}>
  <button class="button" on:click={() => wipeData()}>Yes</button>
  <button class="button" on:click={() => Back()}>No</button>
</div>

{#each particles as particle}
  <div
    style="width:{1}%;  background-color:{particle.color}; --x:{particle.x}px; --y:{particle.y}px; --rotation:{particle.rotation}deg"
    class="particle"
  />
{/each}

<style>
  :global(body) {
    overflow: hidden;
  }
  .background {
    display: flex;
    flex-shrink: 1;
    height: 75vh;
  }
  .particle {
    position: absolute;
    top: var(--y);
    left: var(--x);
    transform: translate(-50%, -50%) rotate(var(--rotation));
    aspect-ratio: 1/1;
    pointer-events: none;
  }
  .cookiebackground {
    text-align: center;
    border: 12px solid rgba(0, 0, 0, 0.4);
  }
  .upgradePanel {
    overflow-x: hidden;
    overflow-y: auto;
    position: relative;
    text-align: center;
    background-color: rgba(0, 0, 0, 0.5);
    height: 75vh;
    width: 35vw;
  }
  .upgradesFolder {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .upgradeTemplate {
    display: grid;
    grid-template-columns: 20% 13.5% 20% 20%;
    justify-content: center;
    justify-content: space-evenly;
    width: 30vw;
    height: 12vh;
    background-color: rgb(33, 46, 53);
    font-size: 2em;
    margin-bottom: 10px;
    border-radius: 5px;
  }
  .upgradeImageTemplate {
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
  .upgradeDescription {
    transform: translate(3.75%, 30%);
    width: 10vh;
  }
  .pixelArtHand {
    height: 100%;
  }
  .upgradeCostClass {
    margin: auto;
    height: 5vh;
    outline: 6px;
    outline-offset: -1px;
    outline-style: solid;
    outline-color: rgb(60, 70, 80);
    border-radius: 2px;
    background-color: rgb(60, 70, 80);
  }
  .plusMinus {
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
  .plus {
    z-index: 2;
    width: 2vw;
    height: 2vw;
    margin: auto;
  }

  .upgrade-Enhancerpanel {
    overflow-x: hidden;
    overflow-y: auto;
    position: relative;
    text-align: center;
    background-color: rgba(0, 0, 0, 0.5);
    height: 75vh;
    width: 35vw;
  }
  .upgrade-Enhancerfolder {
    display: grid;
    grid-template-columns: 6.2vw 6.2vw 6.2vw 6.2vw 6.2vw;
    grid-template-rows: 18.6vh 18.6vh 18.6vh 18.6vh;
    width: 97.5%;
    height: 95%;
    margin: auto;
  }
  .PowerupsPanel {
    overflow-x: hidden;
    overflow-y: auto;
    position: relative;
    text-align: center;
    background-color: rgba(0, 0, 0, 0.5);
    height: 75vh;
    width: 35vw;
  }
  .Powerupsfolder {
    display: grid;
    grid-template-columns: 6.2vw 6.2vw 6.2vw 6.2vw 6.2vw;
    grid-template-rows: 18.6vh 18.6vh 18.6vh 18.6vh;
    width: 97.5%;
    height: 95%;
    margin: auto;
  }
  .powerupicon {
    display: flex;
    width: 80%;
    height: 54%;
    background-color: black;
    outline: 6px;
    outline-offset: -1px;
    outline-style: solid;
    outline-color: rgba(33, 46, 53, 255);
    margin-left: 5px;
    border-radius: 2px;
    justify-content: space-evenly;
    z-index: -1;
  }
  .powerupicon:hover {
    background-color: rgba(33, 46, 53, 255);
  }
  .powerupicon:active {
    transform: translateY(-5px);
  }
  p {
    margin-top: 8px;
    margin-bottom: 8px;
    background-color: rgba(255, 255, 255, 0.2);
    border-radius: 5px;
    width: 80%;
    padding: 1px 5px 1px 5px;
    z-index: -1;
  }
  h1 {
    text-align: center;
    background-color: rgba(0, 0, 0, 0.2);
    color: rgb(251, 251, 251);
    width: 100%;
    font-family: Courier New;
    font-size: 2em;
  }
  h2 {
    color: rgb(251, 251, 251);
    width: 100%;
    font-family: Courier New;
    font-size: 1.5em;
  }
  .cookieDisplay {
    display: flex;
    justify-content: center;
    text-align: left;
    margin-left: 50%;
    transform: translateX(-50%);
    width: 13.5vw;
  }
  .cookieDisplayDiv {
    background-color: rgba(0, 0, 0, 0.2);
  }
  h3 {
    position: absolute;
    margin-top: -30px;
    width: 5vw;
    background-color: rgba(0, 0, 0, 1);
    color: rgba(255, 255, 255, 0.8);
    z-index: 100;
    border-radius: 5px;
    padding: 1px 5px 1px 5px;
    font-size: 16px;
  }
  h4 {
    font-size: 150%;
    font-family: Courier New;
    margin: auto;
    transform: translateY(1.5vh);
  }
  h5 {
    margin: auto;
    width: fit-content;
    font-family: Courier New;
    transform: translateY(0.3vh);
  }
  h6 {
    text-align: center;
    background-color: rgba(0, 0, 0, 0.2);
    color: rgb(251, 251, 251);
    width: 100%;
    font-family: Courier New;
    font-size: 1em;
    margin-top: -10px;
    margin-bottom: 13px;
  }
  .choicetab {
    display: flex;
    justify-content: center;
    width: 100%;
    height: 100px;
    position: absolute;
    bottom: 0;
    margin-bottom: 10px;
  }
  .settingstab {
    display: flex;
    justify-content: center;
    width: 100%;
    height: 100px;
    position: absolute;
    bottom: 0;
    margin-bottom: 10px;
  }
  .yesOrnoTab {
    display: flex;
    justify-content: center;
    width: 100%;
    height: 100px;
    position: absolute;
    bottom: 0;
    margin-bottom: 10px;
  }
  .button {
    width: 400px;
    height: 70px;
    margin: 17px 30px 0px 10px;
    border-radius: 5px;
    border: none;
    background-color: rgba(255, 153, 76, 0.7);
    font-size: 2em;
    font-family: Courier new;
    font-weight: bold;
  }
  .button:hover {
    background-color: rgb(255, 144, 59);
    box-shadow: 0 12px 16px 0 rgba(0, 0, 0, 0.24),
      0 17px 50px 0 rgba(0, 0, 0, 0.19);
  }
  .button:active {
    transform: translateY(-5px);
    background-color: rgb(255, 111, 0);
  }
  .button:focus {
    outline: none;
    border: none;
  }
  .cookieWrap {
    height: 400px;
    width: 65vw;
  }
  .cookiepictureclass {
    margin-top: 2.5vh;
    height: 80%;
    aspect-ratio: 1;
    border-radius: 100%;
    transition: 100ms;
  }
  .cookieButtonClass {
    margin-top: 2.5vh;
    height: 42.5%;
    aspect-ratio: 1;
    border-radius: 100%;
    opacity: 0;
    position: absolute;
    z-index: 10;
  }
  .settingspic {
    display: flex;
    justify-content: center;
    height: 59px;
    margin-top: 22.5px;
  }
  .settingspic:active {
    background-color: rgba(0, 0, 0, 0.3);
    transform: translateY(-5px);
  }
  .settingspic:hover {
    box-shadow: 0 12px 16px 0 rgba(0, 0, 0, 0.24),
      0 17px 50px 0 rgba(0, 0, 0, 0.19);
  }
  .arrowpic {
    display: flex;
    justify-content: center;
    height: 59px;
    margin-top: 22.5px;
  }
  .arrowpic:active {
    background-color: rgba(0, 0, 0, 0.3);
    transform: translateY(-5px);
  }
  .arrowpic:hover {
    box-shadow: 0 12px 16px 0 rgba(0, 0, 0, 0.24),
      0 17px 50px 0 rgba(0, 0, 0, 0.19);
  }
  .showOnHover {
    visibility: hidden;
  }
  img:hover + .showOnHover {
    visibility: visible;
    z-index: 10;
  }
  .showOnHover2 {
    visibility: hidden;
  }
  img:hover ~ .showOnHover2 {
    visibility: visible;
    z-index: 10;
  }
  .hidden {
    display: none;
  }
  .plusDescription {
    transform: translate(+17.5%, 10vh);
    z-index: 10;
    pointer-events: none;
  }
  .minusDescription {
    transform: translate(-27.5%, 10vh);
    z-index: 10;
    pointer-events: none;
  }
  .alertTab {
    width: 30vw;
    height: 20vh;
    background-color: rgba(50, 100, 50, 0.9);
    z-index: 100;
    position: absolute;
    margin-left: 50%;
    transform: translate(-50%, -150%);
    border-radius: 20px;
    text-align: center;
    animation: none;
  }
  .alertTabSlide {
    transform: translate(-50%, -150%);
    animation: 2s alertTabSlide forwards;
  }
  @keyframes alertTabSlide {
    0% {
      transform: translate(-50%, -150%);
    }
    30% {
      transform: translate(-50%, 0%);
    }
    80% {
      transform: translate(-50%, 0%);
    }
    100% {
      transform: translate(-50%, -150%);
    }
  }
</style>

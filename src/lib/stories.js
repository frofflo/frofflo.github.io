export let stories = [
     {id:"1",message: "The adventures of Rollin.", img:"CarChase.gif",choices:[{id:"2",text:"Click To Start"}]},
     {id:"2",message: "You are in prison charged with false accusations with another inmate, Otis. Otis is planning an escape from prison in two days time", img:"cell.jpg",question:"What are you gonna do?",choices:[{id:"3",text:"Snitch on Otis to the guards for reduced jail time"},{id:"4",text:"Follow Otis on the grand scheme to escape prison"}]},
     {id:"3",message: "The guards help you out and you get released from jail one week later. Meanwhile, Otis knows it is you that snitched on him and tells his friends outside of jail to hunt you down.",choices:[{id:"5",text:"Click to continue"}]},
     {id:"4",message: "The plan works out, you and Otis manage to escape prison but the police are on your tail.",choices:[{id:"6",text:"Click to continue"}]},
     {id:"5",message: "You go into a bar and notice 2 people stalking you. (One of them has a knife). You realize this is Otis’s underlings from outside of prison and they will probably kill you", img:"Bar.jpg",question:"What are you gonna do?",choices:[{id:"7",text:"Try to use the owner's gun to defend yourself"},{id:"8",text:"Try to leave through the bathroom’s emergency exit"}]},
     {id:"6",message: "There is a car chase and it leads up to you going into a smaller city to try and chase them away. You take a right hand turn and see two older people walking over the cross road with their grandchild",img:"Car.jpg",question:"You have to choose to take the right lane which kills the two elderly people, left lane which kills the child or to hit the brakes",choices:[{id:"9",text:"Run over the child"},{id:"10",text:"Hit the brakes"},{id:"11",text:"Run over the elders"}]},
     {id:"7",message: "You decide to take the fight and it ends up in your favor. The two perpetrators are now dead",img:"Kill.jpg",question:"Congrats!!",choices:[{id:"1",text:"Click to restart"}]},
     {id:"8",message: "You make a run to the door and see the perpetrators catching up in vicious speed. The bathroom is occupied and the men (possibly women since we can’t discriminate, but most likely men),  reaches you and brutally stabs you to death",img:"",choices:[{id:"1",text:"Click to restart"}]},
     {id:"9",message: "You decide to run over the child and manage to get away. After 10 years of depression the guilt overcomes you and you decide to end it all",question:"RIP!",choices:[{id:"1",text:"Click to restart"}]},
     {id:"10",message: "You decide to hit the brakes and the police catch you. You get put back into jail for lifetime",img:"Brakes.jpg",question:"RIP!",choices:[{id:"1",text:"Click to restart"}]},
     {id:"11",message: "You decide to run over the elders and shake off the cops. 10 years pass and when you walk alone in an alley a familiar face comes up to you and seeks revenge for his dead grandparents",question:"RIP!",choices:[{id:"1",text:"Click to restart"}]}]

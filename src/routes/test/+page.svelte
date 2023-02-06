<h3 id="pick" style="color:red;">
    Sample Text 1
</h3>
  
<h2 id="pick1" style="color:green;">
    Sample Text 2
</h2>

<div class="randColor" id="pick2" style="background-color:blue;">   

</div>

    
<button on:click={pickColor} on:keypress={pickColor}>
    Click to change color
</button>
  
<script>
    function pickColor() {

        var colors = [
            '#794e2e', '#ac8a5e', '#ceb288',
            '#bf9d70', '#d5c1a5', '#441f15',
            '#9f7547', '#552b1d', '#8b7269'
        ];

        var random_color = colors[Math.floor(Math.random() * colors.length)];
          
        var x = document.getElementById('pick');
        x.style.color = random_color;



        var random_color1 = colors[Math.floor(Math.random() * colors.length)];

        var x1 = document.getElementById('pick1');
        x1.style.color = random_color1;



        var random_backgroundcolor2 = colors[Math.floor(Math.random() * colors.length)];

        var x2 = document.getElementById('pick2');
        x2.style.backgroundColor = random_backgroundcolor2;
    }
</script>

<style>
    .randColor{
        width: 50px;
        height: 50px;
        border-radius: 50%;
    }
</style>
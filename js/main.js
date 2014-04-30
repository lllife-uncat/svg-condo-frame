function init() {
  var element = document.getElementById("image");
  if(!element.getElementsByTagName("object").length) {
    var obj = document.createElement("object");
    obj.type = "image/svg+xml";
    obj.data = "images/front.svg";
    element.appendChild(obj);
  }
  element.style.display = "block";
}

function load() {
  var snap = Snap("#image");
  Snap.load("images/front.svg",loadSVG);

  function loadSVG(data) {

    snap.append(data);

    var image = document.getElementsByTagName("image")[0];
    image.classList.add("animated");
    image.classList.add("fadeInLeft");
    image.setAttribute("href", "images/07-edificio1-elevacion-posterior-norte.gif")

    var paths = document.getElementsByTagName("image");
    var array = Array.prototype.slice.call(paths);
    var plan = array[0];

    var index = 1;
    plan.onclick = function() {
      if(index == array.length) index = 1;
      var img = array[index++]
      img.style.visibility= "visible";
      img.classList.add("animated");
      img.classList.add("rotateIn");
    };

    array = array.splice(1);
    array.forEach(function(path){

      path.style.visibility = "hidden";

      path.onclick = function() {
        console.log(this.x.baseVal.value);
        console.log(this.y.baseVal.value);
      };

      path.onmouseout = function() {
        this.style.visibility = "hidden";
        this.classList.remove("animated");
        this.classList.remove("rotateIn");
      };

    });
  }
}

  function startup() {
    load();
  }

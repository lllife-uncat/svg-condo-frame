var app = angular.module("condoApplication", []);

app.controller("MainController", function($scope, snap, register){
  angular.element(document).ready(function(){
    var obj = new snap.MySnap("#image","images/front.svg");
    obj.init();
  });
});

app.factory("register", function(){
  Element.prototype.addClasses = function(classes){
    var self = this;
    classes.forEach(function(cls){
      self.classList.add(cls);
    });
  }
  Element.prototype.removeClasses = function(classes){
    var self = this;
    classes.forEach(function(cls){
      self.classList.remove(cls);
    });
  };
});

app.factory("snap", function(){

  /**
  * Create new snap instance using new keyword
  * @params {string} element to display .svg image.
  * @params {string} .svg image path.
  */
  function MySnap(divId, svgPath) {

    // Inline initilize.
    var self = this;
    self._divId = divId;
    self._svgPath= svgPath;
    self.snap = Snap(self._divId);

    /**
    * On load svg handler.
    */
    this.load = function(data) {
      self.snap.append(data);
      self.style(self.snap);
    };

    /**
    * Initialilze component.
    */
    this.init = function() {
      Snap.load(this._svgPath, this.load);
    };

    /**
    * Styling the rect element.
    * @params {Element} root svg element.
    */
    this.style = function(snap){
      var rects = snap.selectAll("image");
      rects.forEach(function(rect){
        rect.mousedown(mouseDown);
        appendLabel(rect);

        var id = rect.attr("id");
        if(id != "plan") rect.drag();
      });
    };


    /**
    * Append rectangle label.
    * @params {Element} the rect element.
    */
    function appendLabel(rect) {
      var snap = self.snap;
      var x = rect.attr("x");
      var y = rect.attr("y");
      var id = rect.attr("id").substring(0,9);

      x = parseFloat(x) - 50;
      y = parseFloat(y) + 20;

      var text = snap.text(x, y, id);
      text.attr("class", "jw-text");
      text.attr("fill", "orange");
      text.drag();
    }

    /**
    * Mouse down event hander for rect.
    */
    function mouseDown() {
      var rect = this;
      var snap = self.snap;
      var sale = !rect.sale;

      var att = { fill: !sale ? "green" : "red" };
      rect.attr(att);
      rect.sale = sale;

      window.xsnap = snap;
      window.xrect = rect;
      console.log(rect);
    }
  }

  return {
    MySnap: MySnap
  };

});


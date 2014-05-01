var expect = require("chai").expect;
var fs = require("fs");

describe("[JSON]",function(){
  it("Should parse json file successful.", function(done){

    var file = "api/building.json";
    fs.readFile(file, "utf8", function(err, data){
      expect(err).to.equal(null);
      expect(data).to.not.equal(null);

      var json = JSON.parse(data);
      expect(json).to.not.equal(null);
      done();

    });
  });
});

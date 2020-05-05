let three_dimentional_demo_sketch = function(p) {
    p.setup = function(){
        p.myCnv = p.createCanvas(p.windowWidth*3/4, p.windowHeight, p.WEBGL);
        p.myCnv.position(p.windowWidth/4, 0);
        p.background(0);
        p.frameRate(10);        
    }

    p.draw = function(){
        p.fill(0);
        console.log(hello);
        
    }
}

let left_camera_raw_view_canvas = function(p) {
    p.setup = function(){
        p.myCnv = p.createCanvas(p.windowWidth/4, p.windowHeight/4);
        p.myCnv.position(0, 0);
        p.background(255, 0, 0);        
    }

    p.draw = function(){
        p.fill(0);
    }
}

var hello = 0;
let three_dimentional_demo = new p5(three_dimentional_demo_sketch);
let left_camera_raw_view = new p5(left_camera_raw_view_canvas);

function draw(){
    hello +=1 ;
}
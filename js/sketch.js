let table;
let angle_x, angle_y, angle_z, t;
let previousMouseX = 0;
let previousMouseY = 0;
let all_trajectories = []

let img1, img2, img3, img4;

class Table{
    constructor(){
        this.table_surface_texture;
        this.ground_texture;
        this.table_surface_texture = loadImage('textures//table_surface22.jpg');
        this.ground_texture = loadImage('textures//ground7.jpg');
    }

    drawTable(){
        //Table surface Plane
        push();
        texture(this.table_surface_texture);
        box(274, 154.5, 5);
        pop();

        //Ground Plane
        push();
        texture(this.ground_texture);
        translate(0, 0, -70);
        plane(700, 700);
        pop();

        //Table net
        push()
        translate(0, 0, 7.5);
        box(1, 154.5, 15);
        pop();

        //leg1
        push();
        translate(274/2-50, 154.5/2-20, -35);
        box(4, 4, 70);
        pop();

        //leg2
        push();
        translate(274/2-50, -(154.5/2-20), -35);
        box(4, 4, 70);
        pop();

        //leg3
        push();
        translate(-(274/2-50), 154.5/2-20, -35);
        box(4, 4, 70);
        pop();

        //leg4
        push();
        //texture(legs);
        translate(-(274/2-50), -(154.5/2-20), -35);
        box(4, 4, 70);
        pop();

        
        //leg5
        push();
        translate(274/2-100, 154.5/2-20, -35);
        box(4, 4, 70);
        pop();

        //leg6
        push();
        translate(274/2-100, -(154.5/2-20), -35);
        box(4, 4, 70);
        pop();

        //leg7
        push();
        translate(-(274/2-100), 154.5/2-20, -35);
        box(4, 4, 70);
        pop();


        //leg8
        push();
        //texture(legs);
        translate(-(274/2-100), -(154.5/2-20), -35);
        box(5, 5, 70);
        pop();

        //join1
        push();
        //texture(legs);
        translate(274/2-75, 154.5/2-20, -35);
        box(50, 4, 4);
        pop();

        //join2
        push();
        //texture(legs);
        translate(-(274/2-75), 154.5/2-20, -35);
        box(50, 4, 4);
        pop();
        
        //join3
        push();
        //texture(legs);
        translate(274/2-75, -(154.5/2-20), -35);
        box(50, 4, 4);
        pop();

        //join4
        push();
        //texture(legs);
        translate(-(274/2-75), -(154.5/2-20), -35);
        box(50, 4, 4);
        pop();

        //camera1
        push();
        //texture(legs);
        translate(-40, 0, 192);
        box(5, 5, 4);
        pop();

        //camera2
        push();
        //texture(legs);
        translate(40, 0, 192);
        box(5, 5, 4);
        pop();
    }
}

class Trajectory{
    constructor(initial, predicted){
        this.initial = initial;
        this.predicted = predicted;
    }

    showTrajectory(){
        for(let i = 0; i< this.initial.length; i++){
            push();
            let new_x = parseFloat(this.initial[i][0]) - 274/2;
            let new_y = parseFloat(this.initial[i][1]) - 154.5/2;
            let new_z = parseFloat(this.initial[i][2]) + 3;
            if(new_z < 4)
                new_z = 4
            translate(new_x, new_y, new_z);
            fill(255, 0, 0);
            sphere(2);
            pop();
        }

        for(let i = 0; i<this.predicted.length-10; i++){
            push();
            let new_x = parseFloat(this.predicted[i][0]) - 274/2;
            let new_y = parseFloat(this.predicted[i][1]) - 154.5/2;
            let new_z = parseFloat(this.predicted[i][2]) + 3;
            if(new_z < 4)
                new_z = 4
            translate(new_x, new_y, new_z);
            fill(0, 255, 0);
            sphere(2);
            pop();
        }
    }
}

class Trajectories{
    constructor(trajectories){
        this.current_trajectory = 0;
        this.trajectories = [];
        this.left_raw_images_path = trajectories['raw_images']['left'];
        this.right_raw_images_path = trajectories['raw_images']['right'];
        this.left_final_images_path = trajectories['final_images']['left'];
        this.right_final_images_path = trajectories['final_images']['right'];
        
        for(let i = 0; i < 10; i++){
            let temp_initial = []
            for(let j = 0; j < i; j++){
                temp_initial.push(trajectories['initial'][0][j])
            }
            this.trajectories.push(new Trajectory(temp_initial, []))
        }
        for(let i = 0; i< trajectories['predicted'].length; i++){
            this.trajectories.push(new Trajectory(trajectories['initial'][i], trajectories['predicted'][i]));
        }
    }
    showCurrentTrajectory(){
        this.trajectories[this.current_trajectory].showTrajectory();
        let current_image_index = parseInt((this.current_trajectory * this.left_raw_images_path.length) / this.trajectories.length);

        img1.attribute("src", this.left_final_images_path[current_image_index]);
        img1.attribute("width", "355px");
        img1.attribute("height", "200px");
        img1.position(windowWidth/50, windowHeight/50);
        

        img2.attribute("src", this.right_final_images_path[current_image_index]);
        img2.attribute("width", "355px");
        img2.attribute("height", "200px");
        img2.position(windowWidth - windowWidth/4, windowHeight/50);
        
        img3.attribute("src", this.left_raw_images_path[current_image_index]);
        img3.attribute("width", "355px");
        img3.attribute("height", "200px");
        img3.position(windowWidth/50, windowHeight - windowHeight/4);

        img4.attribute("src", this.right_raw_images_path[current_image_index]);
        img4.attribute("width", "355px");
        img4.attribute("height", "200px");
        img4.position(windowWidth - windowWidth/4, windowHeight - windowHeight/4);
        

        //img1.attribute("style", "width: 200px; height:100px")
        this.current_trajectory = (this.current_trajectory + 1) % this.trajectories.length;
    }
}

class CompleteData{
    constructor(data){
        this.current_entire_trajectory = 0;
        this.data = Object.values(data)
        this.entire_trajectories = [];
        for(let i=0; i<this.data.length; i++){
            this.entire_trajectories.push(new Trajectories(this.data[i]));
        }
    }

    showEntireTrajectory(){
        this.entire_trajectories[this.current_entire_trajectory].showCurrentTrajectory();
    }

    nextTajectory(){
        this.current_entire_trajectory = (this.current_entire_trajectory + 1) % this.entire_trajectories.length;
    }

    previousTajectory(){
        this.current_entire_trajectory = (this.entire_trajectories.length + this.current_entire_trajectory - 1) % this.entire_trajectories.length;
    }
}

function preload(){
    loadJSON('demo_mapping.json', loadData);
    table = new Table();
}

function loadData(data){
    all_trajectories =  new CompleteData(data);
}
let h1;
function setup() {
    myCnv = createCanvas(windowWidth, windowHeight, WEBGL);
    myCnv.position(0, 0);

    img1 = createImg();
    img1.attribute("class", "demo_img");
        
    img2 = createImg();
    img2.attribute("class", "demo_img");
        
    img3 = createImg();
    img3.attribute("class", "demo_img");
        
    img4 = createImg();
    img4.attribute("class", "demo_img");

    h1 = createElement('h1', 'PRESS A : FOR NEXT TRAJECTORY | PRESS S : FOR PREVIOUS TRAJECTORY');
    h1.attribute("class", "demo_img");

    myCnv.mouseMoved(mousedragged);
    previousMouseX = mouseX;
    previousMouseY = mouseY;
    angle_x = 1;
    angle_y = 0;
    angle_z = 1;
    t = 2;
    frameRate(10);
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function mouseMoved() {  
    previousMouseX = mouseX;
    previousMouseY = mouseY;
}

function keyPressed(){
    if(keyCode == 65){
        all_trajectories.nextTajectory();
    }
    if(keyCode == 68){
        all_trajectories.previousTajectory();
    }

}

function mousedragged(event){
    let changeX = mouseX - previousMouseX;
    let changeY = mouseY - previousMouseY;
    previousMouseX = mouseX;
    previousMouseY = mouseY;

    if(mouseY > height/2)
        angle_z -= changeX/100;
    else
        angle_z += changeX/100;
    angle_x -= changeY/100;
}

function mouseWheel(event) {
    t -= (abs(event.delta) / event.delta)/20;
}

function draw() {
    h1.position(windowWidth/3, windowHeight/50);

    pointLight(255, 255, 255, 0, 0, 192);
    directionalLight(255, 255, 255, -1, 1, -1);

    camera(0, 0, (height/2) / tan(PI/6), 0, 0, 0, 0, 1, 0);
    
    background(220);
    scale(t);
    rectMode(CENTER);
    
    noStroke();
    rotateX(angle_x);
    rotateY(angle_y);
    rotateZ(angle_z);
    
    table.drawTable();

    all_trajectories.showEntireTrajectory();
    
}
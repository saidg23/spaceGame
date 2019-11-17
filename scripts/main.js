let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

function random(min, max)
{
    return Math.random() * (max - min) + min;
}

let triangle = new Path2D();
triangle.moveTo(-1, 0.5);
triangle.lineTo(1, 0);
triangle.lineTo(-1, -0.5);

let entityList = [];

for(let i = 0; i < 100; ++i)
{
    let posx = random(0, canvas.width);
    let posy = random(0, canvas.height);
    let angle = random(0, 2 * Math.PI);
    let dir = getDirectionalVector(angle);

    let entity = new Entity(i);
    entity.addComponent(new PhysicsComp(dir, 1, 0));
    entity.addComponent(new GeometryComp(new Vector2(posx, posy), 10, triangle, angle));
    entityList.push(entity);
}

let player = new Entity(entityList.length);
player.addComponent(new PhysicsComp(new Vector2(1, 0), 0, 0));
player.addComponent(new GeometryComp(new Vector2(50, 50), 30, triangle, 0));
player.addComponent(new ControllableComp());
entityList.push(player);

function main()
{
    inputSystem(entityList);
    physicsSys(entityList);
    drawSys(entityList);

    window.requestAnimationFrame(main);
}

window.requestAnimationFrame(main);

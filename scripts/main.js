let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

let compType = {PHYSISCS: 0, GEOMETRY: 1};

function PhysicsComp(direction, speed = 0)
{
    this.type = compType.PHYSISCS;
    this.direction = direction;
    this.speed = speed;
}

function GeometryComp(pos, size, shape, angle)
{
    this.type = compType.GEOMETRY;
    this.pos = pos;
    this.angle = angle;
    this.size = size;
    this.shape = shape;
}

function Entity(id)
{
    this.id = id;
    this.compList = [];

    this.addComponent = function(newComp)
    {
        this.compList[newComp.type] = newComp;
    }
    
    this.getComponent = function(type)
    {
        return this.compList[type];
    }

    this.contains = function(type)
    {
        if(this.compList[type] !== undefined)
            return true;
        else
            return false;
    }
}

function drawSys(entityList)
{
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for(let i = 0; i < entityList.length; ++i)
    {
        if(entityList[i].contains(compType.GEOMETRY))
        {
            let geometryComp = entityList[i].getComponent(compType.GEOMETRY);
            
            ctx.setTransform(geometryComp.size, 0, 0, geometryComp.size, geometryComp.pos.x, geometryComp.pos.y);
            ctx.rotate(geometryComp.angle);
            ctx.fill(geometryComp.shape);
        }
    }
    ctx.resetTransform();
}

function getDirectionalVector(angle)
{
    let nx = Math.cos(angle);
    let ny = Math.sin(angle);
    return {x: nx, y: ny};
}

function addVectors(a, b)
{
    return {x: a.x + b.x, y: a.y + b.y};
}

function scaleVector(vec, scaleAmount)
{
    return {x: vec.x * scaleAmount, y: vec.y * scaleAmount};
}

function physicsSys(entityList)
{
    for(let i = 0; i < entityList.length; ++i)
    {
        if(entityList[i].contains(compType.PHYSISCS) && entityList[i].contains(compType.GEOMETRY))
        {
            let physicsComp = entityList[i].getComponent(compType.PHYSISCS);
            let geometryComp = entityList[i].getComponent(compType.GEOMETRY);
            
            let velocity = scaleVector(physicsComp.direction, physicsComp.speed);
            let newPos = addVectors(geometryComp.pos,velocity);

            if(newPos.x < 0)
            {
                newPos.x = canvas.width - 2;
            }
            else if(newPos.x >= canvas.width)
            {
                newPos.x = 0;
            }

            if(newPos.y < 0)
            {
                newPos.y = canvas.height - 2;
            }
            else if(newPos.y >= canvas.height)
            {
                newPos.y = 0;
            }

            geometryComp.pos = newPos;
        }
    }
}

function random(min, max)
{
    return Math.random() * (max - min) + min;
}

let triangle = new Path2D();
triangle.moveTo(-1, 0.5);
triangle.lineTo(1, 0);
triangle.lineTo(-1, -0.5);

let entityList = [];

for(let i = 0; i < 400; ++i)
{
    let posx = random(0, canvas.width);
    let posy = random(0, canvas.height);
    let angle = random(0, 2 * Math.PI);
    let dir = getDirectionalVector(angle);
    let speed = random(1, 5);

    let entity = new Entity(i);
    entity.addComponent(new PhysicsComp(dir, speed));
    entity.addComponent(new GeometryComp({x: posx, y: posy}, 10, triangle, angle));
    entityList.push(entity);
}

function main()
{
    physicsSys(entityList);
    drawSys(entityList);

    window.requestAnimationFrame(main);
}

window.requestAnimationFrame(main);

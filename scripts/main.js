let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

let compType = {PHYSICS: 0, GEOMETRY: 1, BOID: 2};

function PhysicsComp(direction, speed = 0)
{
    this.type = compType.PHYSICS;
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

function BoidComp()
{
    this.type = compType.BOID;
    this.viewRadius = 80;
    this.fov = Math.PI;
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
    ctx.fillStyle = "white";
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

function Vector(x = 0, y = 0)
{
    this.x = x;
    this.y = y;
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

function subtractVectors(a, b)
{
    return {x: a.x - b.x, y: a.y - b.y};
}

function scaleVector(vec, scaleAmount)
{
    return {x: vec.x * scaleAmount, y: vec.y * scaleAmount};
}

function getVectorMagnitude(vec)
{
    return Math.sqrt(vec.x * vec.x + vec.y * vec.y);
}

function normalizeVector(vec)
{
    let magnitude = getVectorMagnitude(vec);
    return new Vector(vec.x / magnitude, vec.y / magnitude);
}

function physicsSys(entityList)
{
    for(let i = 0; i < entityList.length; ++i)
    {
        if(entityList[i].contains(compType.PHYSICS) && entityList[i].contains(compType.GEOMETRY))
        {
            let physicsComp = entityList[i].getComponent(compType.PHYSICS);
            let geometryComp = entityList[i].getComponent(compType.GEOMETRY);
            let angle = Math.atan2(physicsComp.direction.y, physicsComp.direction.x);
            if(angle < 0)
            {
                angle = 2 * Math.PI + angle;
            }
            geometryComp.angle = angle;

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

function boidSys(entityList)
{
    for(let i = 0; i < entityList.length; ++i)
    {
        if(entityList[i].contains(compType.BOID) && entityList[i].contains(compType.PHYSICS) && entityList[i].contains(compType.GEOMETRY))
        {
            let boidComp = entityList[i].getComponent(compType.BOID);
            let physicsComp = entityList[i].getComponent(compType.PHYSICS);
            let geometryComp = entityList[i].getComponent(compType.GEOMETRY);
            let totalX = physicsComp.direction.x;
            let totalY = physicsComp.direction.y;
            let totalTargets = 1;

            for(let j = 0; j < entityList.length; ++j)
            {
                if(j === i)
                    continue;

                let targetGeometry = entityList[j].getComponent(compType.GEOMETRY);
                let targetPhysics = entityList[j].getComponent(compType.PHYSICS);
                let distance = getVectorMagnitude(subtractVectors(targetGeometry.pos, geometryComp.pos));

                if(distance < boidComp.viewRadius)
                {
                    totalX += targetPhysics.direction.x;
                    totalY += targetPhysics.direction.y;
                    ++totalTargets;
                }
            }

            physicsComp.direction = normalizeVector(new Vector(totalX / totalTargets, totalY / totalTargets));
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

for(let i = 0; i < 100; ++i)
{
    let posx = random(0, canvas.width);
    let posy = random(0, canvas.height);
    let angle = random(0, 2 * Math.PI);
    let dir = getDirectionalVector(angle);
    let speed = random(1, 5);

    let entity = new Entity(i);
    entity.addComponent(new PhysicsComp(dir, 2));
    entity.addComponent(new GeometryComp({x: posx, y: posy}, 10, triangle, angle));
    entity.addComponent(new BoidComp());
    entityList.push(entity);
}

function main()
{
    boidSys(entityList);
    physicsSys(entityList);
    drawSys(entityList);

    window.requestAnimationFrame(main);
}

window.requestAnimationFrame(main);

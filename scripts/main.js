let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

let compType = {PHYSISCS: 0, GRAPHICS: 1};

function PhysicsComp(nx = 0, ny = 0)
{
    this.type = compType.PHYSISCS;
    this.pos = {x: nx, y: ny};
}

function GraphicsComp(shape, size)
{
    this.type = compType.GRAPHICS;
    this.shape = shape;
    this.size = size;
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
        if(entityList[i].contains(compType.GRAPHICS) && entityList[i].contains(compType.PHYSISCS))
        {
            let graphicsComp = entityList[i].getComponent(compType.GRAPHICS);
            let physicsComp = entityList[i].getComponent(compType.PHYSISCS);
            
            ctx.save();
            ctx.translate(physicsComp.pos.x, physicsComp.pos.y);
            ctx.scale(graphicsComp.size, graphicsComp.size);
            ctx.fill(graphicsComp.shape);
            ctx.restore();
        }
    }
}

function random(min, max)
{
    return Math.random() * (max - min) + min;
}

let triangle = new Path2D();
triangle.moveTo(0.5, 0);
triangle.lineTo(1, 1);
triangle.lineTo(0, 1);

let entityList = [];

for(let i = 0; i < 100; ++i)
{
    let posx = random(0, canvas.width);
    let posy = random(0, canvas.height);
    let size = random(30, 80);

    let entity = new Entity(i);
    entity.addComponent(new PhysicsComp(posx, posy));
    entity.addComponent(new GraphicsComp(triangle, size));
    entityList.push(entity);
}

drawSys(entityList);

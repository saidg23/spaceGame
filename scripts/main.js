let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

let compType = {PHYSISCS: 0, GRAPHICS: 1};

function PhysicsComp(nx = 0, ny = 0)
{
    this.type = compType.PHYSISCS;
    this.pos = {x: nx, y: ny};
}

function GraphicsComp(shape)
{
    this.type = compType.GRAPHICS;
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

let triangle = new Path2d();

let test = new Entity(1);
test.addComponent(new PhysicsComp(canvas.width/2, canvas.height/2));
test.addComponent(new GraphicsComp());

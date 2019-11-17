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

            physicsComp.speed += physicsComp.acceleration;

            let velocity = physicsComp.direction.scale(physicsComp.speed);
            let newPos = addVector2(geometryComp.pos,velocity);

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

function inputSystem(entityList)
{
    for(let i = 0; i < entityList.length; ++i)
    {
        if(entityList[i].contains(compType.KEYBOARD_CONTROL))
        {
            let test = entityList[i].getComponent(compType.PHYSICS);
            if(keyPressed === "ArrowRight")
            {
                test.speed = 5;
                test.direction = new Vector2(1, 0);
            }
            else
            {
                test.speed = 0;
            }
        }

        if(entityList[i].contains(compType.POINT))
        {

        }

    }
}

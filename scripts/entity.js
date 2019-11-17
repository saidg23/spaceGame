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

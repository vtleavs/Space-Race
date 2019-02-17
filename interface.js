function onClick(event)
{
    if(event.target.id == "gl-canvas")
    {
        //console.log(((2*event.offsetX)/800 - 1.0), -((2*event.offsetY)/800 - 1.0));
    }
    else if(event.target.id == "button-previous")
    {
        if(level != 0)
        {
            previousLevel();
        }
    }
    else if(event.target.id == "button-reset")
    {
    }
    else if(event.target.id == "button-next")
    {
        if(level <= numPassed)
        {
            nextLevel();
        }
    }
}

function onKeyDown(event)
{
    if(lockKeys)
        return;
    //console.log(event.keyCode);
    if(event.keyCode == 87) // W
    {
        if(start)
            run();
        up = true;
    }
    else if(event.keyCode == 65) // A
    {
        if(start)
            run();
        left = true;
    }
    else if(event.keyCode == 83) // S
    {
        if(start)
            run();
        down = true;
    }
    else if(event.keyCode == 68) // D
    {
        if(start)
            run();
        right = true;
    }
}

function onKeyUp(event)
{
    //console.log(event.keyCode);
    lockKeys = false;
    if(event.keyCode == 87) // W
    {
        up = false;
    }
    else if(event.keyCode == 65) // A
    {
        left = false;
    }
    else if(event.keyCode == 83) // S
    {
        down = false;
    }
    else if(event.keyCode == 68) // D
    {
        right = false;
    }
}

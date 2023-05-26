//NOTE: You can refactor the code by instead of adding and removing eventListeners, use global booleans (6 months from now)

//Check if mouse is down
let mouseDown;
document.body.onmousedown = () => (mouseDown = true)
document.body.onmouseup = () => (mouseDown = false)

//generate page
BuildBoard();
Draw();

/*    Page is generated    */

function BuildBoard()
{
    let body = document.querySelector('body');
    let board = document.createElement('div');
    let title = document.querySelector('.title');
    board.classList.add('board');
    body.insertBefore(board, title);

    //default dimensions are 32 x 32 = 1024
    for (let i = 0; i < 1024; i++)
    {
        let tile = document.createElement('div');
        tile.classList.add('tile');

        //default brightness is set to 1
        tile.style.filter = 'brightness(1)';

        board.appendChild(tile);
    }
}

function Draw()
{
    //all options are called before you can draw
    ChangeGrid();
    Rainbow();
    Lighten();
    Darken();
    Erase();
    Clear();
    ChangeScale();

    let tiles = document.querySelectorAll('.tile');
    
    tiles.forEach((tile) => {

        tile.addEventListener('dragstart', (e) => {
            e.preventDefault();
        });
        tile.addEventListener('mouseover', Paint);
        tile.addEventListener('mousedown',Paint);
    });
}

function ChangeGrid()
{
    let gridButton = document.querySelector('#show-grid');
    let borderOn = false;

    gridButton.addEventListener('click', (e) =>
    {
        let tiles = document.querySelectorAll('.tile');

        if (borderOn == false)
        {
            tiles.forEach((tile) => {
                tile.style.border = '1px solid';
            });
            borderOn = true;

            //changes button to show when it is on
            e.currentTarget.style.backgroundColor = 'black';
            e.currentTarget.style.color = 'white';
        }
        else
        {
            tiles.forEach((tile) =>
            {
                tile.style.border = '';
            })
            borderOn = false;

            e.currentTarget.style.backgroundColor = 'white';
            e.currentTarget.style.color = 'black';
        }
    });


}

function Rainbow()
{
    let tiles = document.querySelectorAll('.tile');
    let rainbowButton = document.querySelector('#rainbow');
    let rainbowOn = false;

    rainbowButton.addEventListener('click', (e) =>
    {
        if (rainbowOn == false)
        {  
            //turning off Paint is not necessary because PaintRainbow this overrides it
            tiles.forEach((tile) => {
                tile.addEventListener('dragstart', (e) => {
                    e.preventDefault();
                });
                tile.addEventListener('mouseover', PaintRainbow);
                tile.addEventListener('mousedown',PaintRainbow);
            });
            rainbowOn = true;

            e.currentTarget.style.backgroundColor = 'black';
            e.currentTarget.style.color = 'white';
        }else
        {
            tiles.forEach((tile) => {
                tile.removeEventListener('dragstart', (e) => {
                    e.preventDefault();
                });
                tile.removeEventListener('mouseover', PaintRainbow);
                tile.removeEventListener('mousedown',PaintRainbow);
            });
            rainbowOn = false;

            e.currentTarget.style.backgroundColor = 'white';
            e.currentTarget.style.color = 'black';
        }
    })

    return;
}

function PaintRainbow(e)
{
    if (e.type === 'mouseover' && !mouseDown) return;

    let colorSelector = document.querySelector('#color-picker');
    colorSelector.value = GetRandColor();
    let selectedColor = colorSelector.value;

    e.currentTarget.style.backgroundColor = selectedColor;
}

function GetRandColor()
{
    let letters = '0123456789ABCDEF';
    let color = '#';

    for (let i = 0; i < 6; i++)
    {
        color += letters[Math.floor(Math.random() * 16)];
    }

    return color;
}

function Lighten()
{
    let tiles = document.querySelectorAll('.tile');
    let lightenButton = document.querySelector('#lighten');
    let lightenOn = false;

    lightenButton.addEventListener('click', (e) =>
    {
        if (lightenOn == false)
        {
            tiles.forEach((tile) => {
                tile.addEventListener('dragstart', (e) => {
                    e.preventDefault();
                });
                tile.addEventListener('mouseover', PaintLight);
                tile.addEventListener('mousedown',PaintLight);
            });

            tiles.forEach((tile) => {

                tile.removeEventListener('dragstart', (e) => {
                    e.preventDefault();
                });
                tile.removeEventListener('mouseover', Paint);
                tile.removeEventListener('mousedown',Paint);
            });

            lightenOn = true;

            e.currentTarget.style.backgroundColor = 'black';
            e.currentTarget.style.color = 'white';
        }else
        {
            tiles.forEach((tile) => {
                tile.removeEventListener('dragstart', (e) => {
                    e.preventDefault();
                });
                tile.removeEventListener('mouseover', PaintLight);
                tile.removeEventListener('mousedown',PaintLight);

            });

            tiles.forEach((tile) => {

                tile.addEventListener('dragstart', (e) => {
                    e.preventDefault();
                });
                tile.addEventListener('mouseover', Paint);
                tile.addEventListener('mousedown',Paint);
            });

            lightenOn = false;

            e.currentTarget.style.backgroundColor = 'white';
            e.currentTarget.style.color = 'black';
        }
    })
}
function PaintLight(e)
{
    if (e.type === 'mouseover' && !mouseDown) return;

    let currentBrightness = +e.currentTarget.style.filter.slice(11,-1);
    e.currentTarget.style.filter = `brightness(${currentBrightness + .10})`;
}

function Darken()
{
    let tiles = document.querySelectorAll('.tile');
    let darkenButton = document.querySelector('#darken');
    let darkenOn = false;

    darkenButton.addEventListener('click', (e) =>
    {
        if (darkenOn == false)
        {
            tiles.forEach((tile) => {
                tile.addEventListener('dragstart', (e) => {
                    e.preventDefault();
                });
                tile.addEventListener('mouseover', PaintDark);
                tile.addEventListener('mousedown',PaintDark);
            });

            tiles.forEach((tile) => {

                tile.removeEventListener('dragstart', (e) => {
                    e.preventDefault();
                });
                tile.removeEventListener('mouseover', Paint);
                tile.removeEventListener('mousedown',Paint);
            });

            darkenOn = true;

            e.currentTarget.style.backgroundColor = 'black';
            e.currentTarget.style.color = 'white';
        }else
        {
            tiles.forEach((tile) => {
                tile.removeEventListener('dragstart', (e) => {
                    e.preventDefault();
                });
                tile.removeEventListener('mouseover', PaintDark);
                tile.removeEventListener('mousedown',PaintDark);
            });

            tiles.forEach((tile) => {

                tile.addEventListener('dragstart', (e) => {
                    e.preventDefault();
                });
                tile.addEventListener('mouseover', Paint);
                tile.addEventListener('mousedown',Paint);
            });

            darkenOn = false;

            e.currentTarget.style.backgroundColor = 'white';
            e.currentTarget.style.color = 'black';
        }
    })
}

function PaintDark(e)
{
    if (e.type === 'mouseover' && !mouseDown) return;

    let currentBrightness = +e.currentTarget.style.filter.slice(11,-1);
    e.currentTarget.style.filter = `brightness(${currentBrightness - .10})`;
}

function Erase()
{
    let tiles = document.querySelectorAll('.tile');
    let eraseButton = document.querySelector('#eraser')
    let eraseOn = false;
    
    eraseButton.addEventListener('click', (e) =>
    {
        if (eraseOn == false)
        {
            tiles.forEach((tile) => {
                tile.addEventListener('dragstart', (e) => {
                    e.preventDefault();
                });
                tile.addEventListener('mouseover', PaintErase);
                tile.addEventListener('mousedown',PaintErase);
            });

            //turn off the Paint function while erase is on
            tiles.forEach((tile) => {

                tile.removeEventListener('dragstart', (e) => {
                    e.preventDefault();
                });
                tile.removeEventListener('mouseover', Paint);
                tile.removeEventListener('mousedown',Paint);
            });

            eraseOn = true;

            e.currentTarget.style.backgroundColor = 'black';
            e.currentTarget.style.color = 'white';
        }else
        {
            tiles.forEach((tile) => {
                tile.removeEventListener('dragstart', (e) => {
                    e.preventDefault();
                });
                tile.removeEventListener('mouseover', PaintErase);
                tile.removeEventListener('mousedown',PaintErase);

            });

            //turn the Paint function back on
            tiles.forEach((tile) => {

                tile.addEventListener('dragstart', (e) => {
                    e.preventDefault();
                });
                tile.addEventListener('mouseover', Paint);
                tile.addEventListener('mousedown',Paint);
            });

            eraseOn = false;

            e.currentTarget.style.backgroundColor = 'white';
            e.currentTarget.style.color = 'black';
        }
    });
}

function PaintErase(e)
{
    if (e.type === 'mouseover' && !mouseDown) return;

    e.currentTarget.style.backgroundColor = 'white';
    e.currentTarget.style.filter = 'brightness(1)';
}

function Clear()
{
    let clearButton = document.querySelector('#clear');
    let tiles = document.querySelectorAll('.tile');

    clearButton.addEventListener('click', (e) =>
    {
        tiles.forEach((tile) => 
        {
            tile.style.backgroundColor = 'white';
            tile.style.filter = 'brightness(1)';
        });

        //Clear does not stay on, so a slight indicator for it being on it made
        let button = e.currentTarget;
        
        button.style.backgroundColor = 'black';
        button.style.color = 'white';

        setTimeout(() =>
        {
            button.style.backgroundColor = 'white';
            button.style.color = 'black';
        },100)
    });
}

function ChangeScale()
{
    let slider = document.querySelector('#slider');
    let sliderDesc = document.querySelector('#slider-desc');

    slider.min = '1';

    slider.onmousemove =  () =>
    {
        sliderDesc.textContent = `${slider.value} x ${slider.value}`;
    }

    slider.onchange = () =>
    {
        ReloadSite(slider.value);
    }
}

function ReloadSite(inputDimensions)
{
    let body = document.querySelector('body');
    let title = document.querySelector('.title');
    let board = document.querySelector('.board');

    body.removeChild(board);

    let newBoard = document.createElement('div');
    newBoard.classList.add('board');
    newBoard.style.gridTemplateColumns = `repeat(${inputDimensions}, 1fr)`;
    newBoard.style.gridTemplateRows = `repeat(${inputDimensions}, 1fr)`;

    body.insertBefore(newBoard, title);


    for (let i = 0; i < (inputDimensions * inputDimensions); i++)
    {
        let tile = document.createElement('div');
        tile.classList.add('tile');
        newBoard.appendChild(tile);
    }
    
    //after page is reloaded draw is called in order for its query selector to reselect the new grid
    Draw();
}

function Paint(e)
{
    if (e.type === 'mouseover' && !mouseDown) return;

    let colorSelector = document.querySelector('#color-picker');
    let selectedColor = colorSelector.value;

    e.currentTarget.style.backgroundColor = selectedColor;
}

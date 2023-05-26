let mouseDown;
document.body.onmousedown = () => (mouseDown = true)
document.body.onmouseup = () => (mouseDown = false)

BuildBoard();
Draw();

function BuildBoard()
{
    let body = document.querySelector('body');
    let board = document.createElement('div');
    let title = document.querySelector('.title');
    board.classList.add('board');
    body.insertBefore(board, title);

    for (let i = 0; i < 1024; i++)
    {
        let tile = document.createElement('div');
        tile.classList.add('tile');
        tile.style.filter = 'brightness(1)';
        board.appendChild(tile);
    }
}

function Draw()
{
    ChangeScale();
    ChangeGrid();
    Erase();
    Clear();
    Rainbow();
    Lighten();
    Darken();

    let tiles = document.querySelectorAll('.tile');
    
    tiles.forEach((tile) => {

        tile.addEventListener('dragstart', (e) => {
            e.preventDefault();
        });
        tile.addEventListener('mouseover', Paint);
        tile.addEventListener('mousedown',Paint);
    });
}

function Paint(e)
{
    if (e.type === 'mouseover' && !mouseDown) return;

    let colorSelector = document.querySelector('#color-picker');
    let selectedColor = colorSelector.value;

    e.currentTarget.style.backgroundColor = selectedColor;
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

function Erase()
{
    let eraseButton = document.querySelector('#eraser')
    let colorSelector = document.querySelector('#color-picker');
    
    eraseButton.addEventListener('click', (e) =>
    {
        let button = e.currentTarget;

        colorSelector.value = '#FFFFFF';

        button.style.backgroundColor = 'black';
        button.style.color = 'white';

        setTimeout(() =>
        {
            button.style.backgroundColor = 'white';
            button.style.color = 'black';
        },100)
    });
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
        });

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

function Rainbow()
{
    let tiles = document.querySelectorAll('.tile');
    let rainbowButton = document.querySelector('#rainbow');
    let rainbowOn = false;

    rainbowButton.addEventListener('click', (e) =>
    {
        if (rainbowOn == false)
        {

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

    Draw();
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

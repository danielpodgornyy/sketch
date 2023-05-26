let mouseDown;
document.body.onmousedown = () => (mouseDown = true)
document.body.onmouseup = () => (mouseDown = false)

buildBoard();
draw();

function buildBoard()
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
        board.appendChild(tile);
    }
}

function draw()
{
    changeScale();
    changeGrid();
    erase();
    clear();
    rainbow();
    let tiles = document.querySelectorAll('.tile');
    
    tiles.forEach((tile) => {

        tile.addEventListener('dragstart', (e) => {
            e.preventDefault();
        });
        tile.addEventListener('mouseover', paint);
        tile.addEventListener('mousedown',paint);
    });
}

function paint(e)
{
    if (e.type === 'mouseover' && !mouseDown) return;

    let colorSelector = document.querySelector('#color-picker');
    let selectedColor = colorSelector.value;

    e.currentTarget.style.backgroundColor = selectedColor;
}

function changeGrid()
{
    let gridButton = document.querySelector('#show-grid');
    let borderOn = false;

    gridButton.addEventListener('click', () =>
    {
        let tiles = document.querySelectorAll('.tile');

        console.log('hi')
        if (borderOn == false)
        {
            tiles.forEach((tile) => {
                tile.style.border = '1px solid';
                borderOn = true;
            });
        }
        else
        {
            tiles.forEach((tile) =>
            {
                tile.style.border = '';
                borderOn = false;
            })
        }
    });


}

function erase()
{
    let eraseButton = document.querySelector('#eraser')
    let colorSelector = document.querySelector('#color-picker');
    
    eraseButton.addEventListener('click', () =>
    {
        colorSelector.value = '#FFFFFF';
    });
}

function clear()
{
    let clearButton = document.querySelector('#clear');
    let tiles = document.querySelectorAll('.tile');

    clearButton.addEventListener('click', () =>
    {
        tiles.forEach((tile) => 
        {
            tile.style.backgroundColor = 'white';
        });
    });
}

function rainbow()
{
    let tiles = document.querySelectorAll('.tile');
    let rainbowButton = document.querySelector('#rainbow');
    let rainbowOn = false;

    rainbowButton.addEventListener('click', () =>
    {
        if (rainbowOn == false)
        {

            tiles.forEach((tile) => {
                tile.addEventListener('dragstart', (e) => {
                    e.preventDefault();
                });
                tile.addEventListener('mouseover', paintRainbow);
                tile.addEventListener('mousedown',paintRainbow);
            });
            rainbowOn = true;
        }else
        {
            tiles.forEach((tile) => {
                tile.removeEventListener('dragstart', (e) => {
                    e.preventDefault();
                });
                tile.removeEventListener('mouseover', paintRainbow);
                tile.removeEventListener('mousedown',paintRainbow);
            });
            rainbowOn = false;
        }
    })

    return;
}

function paintRainbow(e)
{
    if (e.type === 'mouseover' && !mouseDown) return;

    let colorSelector = document.querySelector('#color-picker');
    colorSelector.value = getRandColor();
    let selectedColor = colorSelector.value;

    e.currentTarget.style.backgroundColor = selectedColor;
}

function getRandColor()
{
    let letters = '0123456789ABCDEF';
    let color = '#';

    for (let i = 0; i < 6; i++)
    {
        color += letters[Math.floor(Math.random() * 16)]
    }

    return color;
}

function changeScale()
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
        reloadSite(slider.value);
    }
}

function reloadSite(inputDimensions)
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

    draw();
}
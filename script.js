let mouseDown;
document.body.onmousedown = () => (mouseDown = true)
document.body.onmouseup = () => (mouseDown = false)

buildSite();
draw();

function buildSite()
{
    //build grid
    let body = document.querySelector('body');
    let board = document.createElement('div');
    board.classList.add('board');
    body.appendChild(board);

    for (let i = 0; i < 1024; i++)
    {
        let tile = document.createElement('div');
        tile.classList.add('tile');
        board.appendChild(tile);
    }
    
    //build title
    let title = document.createElement('div');
    let titleText = document.createElement('h1');

    body.appendChild(title);
    title.appendChild(titleText);

    title.classList.add('title');
    titleText.textContent = 'SKETCH';

    //build tab
    let sideTab = document.createElement('div');

    sideTab.classList.add('side-tab');

    body.appendChild(sideTab);

    let gridButton = document.createElement('button');
    let colorPickerContainer = document.createElement('div');
    let colorPicker = document.createElement('input');
    let fillContainer = document.createElement('div');
    let fill = document.createElement('button');
    let shadeContainer = document.createElement('div');
    let lighten = document.createElement('button');
    let darken = document.createElement('button');
    let eraserContainer = document.createElement('div');
    let eraser = document.createElement('button');
    let clearContainer = document.createElement('div');
    let clear = document.createElement('button');
    let sliderContainer = document.createElement('div');
    let slider = document.createElement('input');
    let sliderDesc = document.createElement('h1');

    gridButton.id = 'show-grid';
    gridButton.textContent = '\u25A6';

    colorPickerContainer.classList.add('container');
    colorPickerContainer.id = 'color-picker-container';
    colorPicker.id = 'color-picker';
    colorPicker.type = 'color';
    colorPicker.value = '#333333'

    fillContainer.classList.add('container');
    fillContainer.id = 'fill-container';
    fill.id = 'fill';
    fill.textContent = 'FILL';

    shadeContainer.classList.add('container');
    shadeContainer.id = 'shade-container';
    lighten.id = 'lighten';
    lighten.textContent = 'LIGHTEN';
    darken.id = 'darken';
    darken.textContent = 'DARKEN';

    eraserContainer.classList.add('container');
    eraserContainer.id = 'eraser-container';
    eraser.id = 'eraser';
    eraser.textContent = 'ERASER';

    clearContainer.classList.add('container');
    clearContainer.id = 'clear-container';
    clear.id = 'clear';
    clear.textContent = 'CLEAR';

    sliderContainer.classList.add('container');
    sliderContainer.id = 'slider-container';
    slider.id = 'slider';
    slider.type = 'range';
    slider.value = '16';
    sliderDesc.id = 'slider-desc';
    sliderDesc.textContent = '16 x 16';

    sideTab.appendChild(gridButton);
    sideTab.appendChild(colorPickerContainer);
    colorPickerContainer.appendChild(colorPicker);
    sideTab.appendChild(fillContainer);
    fillContainer.appendChild(fill);
    sideTab.appendChild(shadeContainer);
    shadeContainer.appendChild(lighten);
    shadeContainer.appendChild(darken);
    sideTab.appendChild(eraserContainer);
    eraserContainer.appendChild(eraser);
    sideTab.appendChild(clearContainer);
    clearContainer.appendChild(clear);
    sideTab.appendChild(sliderContainer);
    sliderContainer.appendChild(slider);
    sliderContainer.appendChild(sliderDesc);

}

function draw()
{
    let board = document.querySelector('.board');
    let tiles = document.querySelectorAll('.tile');
    let colorSelector = document.querySelector('#color-picker');
    let selectedColor = colorSelector.value;

    changeGrid();
    erase();
    clear();

    
    tiles.forEach((tile) => {
        tile.addEventListener('mouseover', paint);
        tile.addEventListener('mousedown', paint);
        tile.addEventListener('dragstart', (e) => {
            e.preventDefault();
        });
    })
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
    let tiles = document.querySelectorAll('.tile');
    let borderOn = false;

    gridButton.addEventListener('click', () =>
    {
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
    })
}
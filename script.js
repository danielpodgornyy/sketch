let mouseDown;
document.body.onmousedown = () => (mouseDown = true)
document.body.onmouseup = () => (mouseDown = false)

buildGrid();
draw();

function buildGrid()
{
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
    /*
    let title = document.createElement('div');
    let titleText = document.createElement('h1');
    let sideTab = document.createElement('div');

    title.classList.add('title');
    titleText.textContent = 'SKETCH';
    sideTab.classList.add('side-tab');

    body.appendChild(title);
    title.appendChild(titleText);
    body.appendChild(sideTab);
    */
}

function draw()
{
    let board = document.querySelector('.board');
    let tiles = document.querySelectorAll('.tile');
    
    tiles.forEach((tile) => {
        tile.addEventListener('mouseover', changeColor);
        tile.addEventListener('mousedown', changeColor);
        tile.addEventListener('dragstart', (e) => {
            e.preventDefault();
        });
    })

}

function changeColor(e)
{
    if (e.type === 'mouseover' && !mouseDown) return;

    e.currentTarget.style.cssText = 'background-color: black;'

}
const cellElements = document.querySelectorAll("[data-cell]");
const board = document.querySelector("[data-board]");
const winningMessageTextElement = document.querySelector("[data-winning-message-texto]");
const winningMessage = document.querySelector("[data-winning-message]");
const restartButton = document.querySelector("[data-restart-button]");

let isCirculoTurn = false;

const comecarJogo = () => {
    for (const cell of cellElements) {
        cell.classList.remove("circulo");
        cell.classList.remove("X");
        cell.removeEventListener("click", handleClick);
        cell.addEventListener("click", handleClick, { once: true });
    }

    isCirculoTurn = false;

    board.classList.add("X");
    winningMessage.classList.remove("show-winning-message");
};

const fimDeJogo = (isDraw) => {
    if (isDraw) {
        winningMessageTextElement.innerText = "Empate!"
    } else {
        winningMessageTextElement.innerText = isCirculoTurn ? "Circulo Venceu!" : "X Venceu!";
    }

    winningMessage.classList.add("show-winning-message");
};

const combinacoesDeVitoria = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];


const checagemDeVitoria = (currentPlayer) => {
    return combinacoesDeVitoria.some((combination) => {
        return combination.every((index) => {
            return cellElements[index].classList.contains(currentPlayer);
        });
    });

};

const checagemEmpate = () => {
    return [...cellElements].every(cell => {
        return cell.classList.contains("X") || cell.classList.contains("circulo");
    })
}

const placeMark = (cell, classToAdd) => {
    cell.classList.add(classToAdd);
};

const trocaDeTurnos = () => {
    isCirculoTurn = !isCirculoTurn;

    board.classList.remove('circulo');
    board.classList.remove('X');

    if (isCirculoTurn) {
        board.classList.add('circulo');
    } else {
        board.classList.add('X');
    }
};

const handleClick = (e) => {
    //colocando a marca do X ou CIRCULO 
    const cell = e.target;
    const classToAdd = isCirculoTurn ? "circulo" : "X";

    placeMark(cell, classToAdd);

    //verificando vitória 
    const isWin = checagemDeVitoria(classToAdd);

    //checando empate
    const isDraw = checagemEmpate();
    if (isWin) {
        fimDeJogo(false)
    } else if (isDraw) {
        fimDeJogo(true)
    }

    // verificando empate
    if (isDraw) {
        fimDeJogo(true)
    }
    // muda para X ou CIRCULO
    trocaDeTurnos();
};

comecarJogo();

restartButton.addEventListener("click", comecarJogo);
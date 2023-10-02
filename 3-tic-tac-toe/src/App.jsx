import { useState } from 'react'

function Square({ value, onSquareClick }) {
    /* const [value, setValue] = useState('');

  function handleClick(){
    setValue('X');
  } */

    return (
        <button className="square" onClick={onSquareClick}>
            {value}
        </button>
    )
}

function Board({ xIsNext, squares, onPlay }) {
    // console.log(squares)
    function handleClick(i) {
        if (squares[i] || calculateWinner(squares)) return // kalau udah ada isinya keluar dari fungsi

        // console.log({ squares })

        const nextSquares = squares.slice()

        // nextSquares[i] = 'X'; // ['X', null, null, null, null, null, null, null, null]
        nextSquares[i] = xIsNext ? 'X' : 'O'
        // setSquares(nextSquares)
        // setXIsNext(!xIsNext) // Inverse Conditions

        onPlay(nextSquares)
    }

    // Calculate Winner
    const winner = calculateWinner(squares)
    let status = winner
        ? `Winner:  ${winner}`
        : `Next player: ${xIsNext ? 'X' : 'O'}`

    return (
        <>
            <div className="status">{status}</div>
            <div className="board">
                <Square
                    value={squares[0]}
                    onSquareClick={() => handleClick(0)}
                />
                <Square
                    value={squares[1]}
                    onSquareClick={() => handleClick(1)}
                />
                <Square
                    value={squares[2]}
                    onSquareClick={() => handleClick(2)}
                />
                <Square
                    value={squares[3]}
                    onSquareClick={() => handleClick(3)}
                />
                <Square
                    value={squares[4]}
                    onSquareClick={() => handleClick(4)}
                />
                <Square
                    value={squares[5]}
                    onSquareClick={() => handleClick(5)}
                />
                <Square
                    value={squares[6]}
                    onSquareClick={() => handleClick(6)}
                />
                <Square
                    value={squares[7]}
                    onSquareClick={() => handleClick(7)}
                />
                <Square
                    value={squares[8]}
                    onSquareClick={() => handleClick(8)}
                />
            </div>
        </>
    )
}

// Main
export default function Game() {
    // const [xIsNext, setXIsNext] = useState(true)
    const [history, setHistory] = useState([Array(9).fill(null)])
    const [currentMove, setCurrentMove] = useState(0)
    const xIsNext = currentMove % 2 === 0 ? true : false // Genap X, Ganji O
    // const currentSquares = history[history.length - 1]
    const currentSquares = history[currentMove]

    // console.log({ currentSquares, currentMove })

    function jumpTo(nextMove) {
        setCurrentMove(nextMove)
        // setXIsNext(nextMove % 2 === 0) // Genap X, Ganji O
    }

    function handlePlay(nextSquares) {
        const nextHistory = [...history.slice(0, currentMove + 1), nextSquares]
        // setHistory([...history, nextSquares])
        setHistory(nextHistory)
        setCurrentMove(nextHistory.length - 1)
        // setXIsNext(!xIsNext)
    }

    const moves = history.map((squares, move) => {
        let description = ''
        if (move > 0) {
            description = `Go to move #${move}`
        } else {
            description = 'Go to game start'
        }

        return (
            <li key={move}>
                <button onClick={() => jumpTo(move)}>{description}</button>
            </li>
        )
    })

    return (
        <div className="game">
            <div className="game-board">
                <Board
                    xIsNext={xIsNext}
                    squares={currentSquares}
                    onPlay={handlePlay}
                />
            </div>
            <div className="game-info">
                <ol>{moves}</ol>
            </div>
        </div>
    )
}

function calculateWinner(squares) {
    const lines = [
        // Horizontal
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],

        // Vertical
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],

        // Diagonal
        [0, 4, 8],
        [2, 4, 6],
    ]

    for (let i = 0; i < lines.length; i++) {
        /* const a = lines[i][0]; // 0
    const b = lines[i][1]; // 1
    const c = lines[i][2]; // 2 */

        const [a, b, c] = lines[i]
        // ['X', 'X', 'X', 'O', 'O', null, null, null, null]

        if (squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a]
        }
    }

    return false
}

// export default Board

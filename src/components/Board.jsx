import Button from "./Button";
import React, { useEffect, useState } from "react";

function Board() {
    const [board, setBoard] = useState(Array(9).fill(null));

    const player1 = localStorage.getItem("player1");
    const player2 = localStorage.getItem("player2");

    const [score, setScore] = useState({ player1: 0, player2: 0 });

    const [isPlayer1X, setIsPlayer1X] = useState(true);
    const [isXNext, setIsXNext] = useState(true);

    var status = ''

    useEffect(() => {
        const isWin = checkWin();

        status = isWin
            ? `Победили ${isXNext ? "Нолики" : "Крестики"}`
            : `Следующие ходят: ${
                isXNext
                    ? `${isPlayer1X ? player1 : player2} Крестики`
                    : `${isPlayer1X ? player2 : player1} Нолики`
            }`;
        
    }, [board]);

    
    console.log(status)

    const handleClick = (fieldNum) => {
        const boardCopy = board.slice();
        boardCopy[fieldNum] = isXNext ? "x" : "o";
        setBoard(boardCopy);
        setIsXNext(!isXNext);
    };

    function checkWin() {
        const winCombs = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
        for (const i in winCombs) {
            const [a, b, c] = winCombs[i];
            if (
                board[a] === board[b] &&
                board[b] === board[c] &&
                board[a] != null
            ) {
                // setIsPlayer1X(!isPlayer1X);
                const newScore = { ...score };
                let winner = ''
                if (isPlayer1X) {
                    if (board[a] === "X") {
                        winner = player1;
                    } else {
                        winner = player2;
                    }
                } else {
                    if (board[a] === "X") {
                        winner = player2;
                    } else {
                        winner = player1;
                    }
                }
                newScore[winner] += 1;
                setScore(newScore);
                return board[a];
            }
        }
        return null;
    }

    return (
        <div>
            <h2 className="mb-4">{status}</h2>
            <h3>
                {player1}: {score.player1}
            </h3>
            <h3>
                {player2}: {score.player2}
            </h3>
            <div className="d-flex flex-column">
                <div>
                    <Button value={board[0]} onclick={() => handleClick(0)} />
                    <Button value={board[1]} onclick={() => handleClick(1)} />
                    <Button value={board[2]} onclick={() => handleClick(2)} />
                </div>
                <div>
                    <Button value={board[3]} onclick={() => handleClick(3)} />
                    <Button value={board[4]} onclick={() => handleClick(4)} />
                    <Button value={board[5]} onclick={() => handleClick(5)} />
                </div>
                <div>
                    <Button value={board[6]} onclick={() => handleClick(6)} />
                    <Button value={board[7]} onclick={() => handleClick(7)} />
                    <Button value={board[8]} onclick={() => handleClick(8)} />
                </div>
            </div>
        </div>
    );
}

export default Board;

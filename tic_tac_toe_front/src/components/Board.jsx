import Button from "./Button";
import React, { useEffect, useState } from "react";

function Board() {
    const [ws, setWS] = useState(null);
    const [board, setBoard] = useState(Array(9).fill(null));

    const nickname = localStorage.getItem("nickname");

    const player1 = "a";
    const player2 = "b";

    const [score, setScore] = useState({ player1: 0, player2: 0 });
    const [roomName, setRoomName] = useState(localStorage.getItem("roomName"));

    const [isPlayer1X, setIsPlayer1X] = useState(true);
    const [isXNext, setIsXNext] = useState(true);

    const [status, setStatus] = useState(`Ход Крестика (${player1})`);

    function sendBoard(new_board) {
        ws.send(
            JSON.stringify({
                message: new_board,
            })
        );
    }

    useEffect(() => {
        const socket = new WebSocket(`ws://ttt_backend:8000/ws/game/${roomName}`);

        socket.onopen = () => {
            console.log("Connected");
            setWS(socket);
        };

        socket.onmessage = (event) => {
            console.log(event);
            const data = JSON.parse(event.data);
            setBoard(data.message);
        };
        socket.onerror = (err) => console.log(err);
    }, [roomName]);

    const handleClick = (fieldNum) => {
        const boardCopy = board.slice();
        boardCopy[fieldNum] = isXNext ? "x" : "o";
        setBoard(boardCopy);
        setIsXNext(!isXNext);
        sendBoard(boardCopy);

        checkWin();
        console.log(score);
    };

    const restartButtonClick = () => {
        setBoard(Array(9).fill(null));
        setStatus(
            `Ход ${
                isXNext
                    ? `Крестика (${isPlayer1X ? player1 : player2})`
                    : `Нолика (${isPlayer1X ? player2 : player1})`
            }`
        );
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
                setIsPlayer1X(!isPlayer1X);
                const newScore = { ...score };
                let winner = "";
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
                setStatus(`Победили ${isXNext ? "Нолики" : "Крестики"}`);

                return null;
            }
        }
        setStatus(
            `Ход ${
                isXNext
                    ? `Крестика (${isPlayer1X ? player1 : player2})`
                    : `Нолика (${isPlayer1X ? player2 : player1})`
            }`
        );

        return null;
    }

    return (
        <div className="container py-4">
            <h2 className="mb-4 text-center text-primary">{status}</h2>
            <div className="mb-4 text-center">
                <h3 className="d-inline-block me-3">
                    {player1}:{" "}
                    <span className="text-success">{score.player1}</span>
                </h3>
                <h3 className="d-inline-block">
                    {player2}:{" "}
                    <span className="text-danger">{score.player2}</span>
                </h3>
            </div>
            <div className="d-flex flex-column align-items-center">
                <div
                    className="d-grid"
                    style={{
                        gridTemplateColumns: "repeat(3, 100px)",
                        gap: "10px",
                    }}
                >
                    <Button
                        className="btn btn-outline-primary"
                        value={board[0]}
                        onclick={() => handleClick(0)}
                    />
                    <Button
                        className="btn btn-outline-primary"
                        value={board[1]}
                        onclick={() => handleClick(1)}
                    />
                    <Button
                        className="btn btn-outline-primary"
                        value={board[2]}
                        onclick={() => handleClick(2)}
                    />
                    <Button
                        className="btn btn-outline-primary"
                        value={board[3]}
                        onclick={() => handleClick(3)}
                    />
                    <Button
                        className="btn btn-outline-primary"
                        value={board[4]}
                        onclick={() => handleClick(4)}
                    />
                    <Button
                        className="btn btn-outline-primary"
                        value={board[5]}
                        onclick={() => handleClick(5)}
                    />
                    <Button
                        className="btn btn-outline-primary"
                        value={board[6]}
                        onclick={() => handleClick(6)}
                    />
                    <Button
                        className="btn btn-outline-primary"
                        value={board[7]}
                        onclick={() => handleClick(7)}
                    />
                    <Button
                        className="btn btn-outline-primary"
                        value={board[8]}
                        onclick={() => handleClick(8)}
                    />
                </div>
            </div>
            <button onClick={restartButtonClick}>Играть снова</button>
        </div>
    );
}

export default Board;

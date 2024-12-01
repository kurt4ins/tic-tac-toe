import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Board from "./components/Board";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function App() {
    const [ws, setWS] = useState(null);
    const [player1, setPlayer1] = useState("Крестик");
    const [player2, setPlayer2] = useState("Нолик");
    const navigate = useNavigate();

    useEffect(() => {
        const socket = new WebSocket("ws://localhost:8000/ws/game/abc");

        socket.onopen = () => {
            console.log("Connected");
            setWS(socket);
        };

        socket.onmessage = (event) => {
            console.log(event);
        }
        socket.onerror = (err) => console.log(err);
    }, [player1]);

    function sendWS(){
        ws.send(JSON.stringify({
            'message': 'привет'
        }))
    }

    function handleSubmit(event) {
        if (!player1 || !player2) {
            alert("Введите имя игроков");
            return null;
        }

        localStorage.setItem("player1", player1);
        localStorage.setItem("player2", player2);

        navigate("/tic-tac-toe");
    }

    return (
        <div className="app container text-center">
            <h1>Крестики нолики</h1>
            <form onSubmit={handleSubmit}>
                <label>Игрок 1</label>
                <input
                    type="text"
                    value={player1}
                    onChange={(event) => setPlayer1(event.currentTarget.value)}
                />
                <label>Игрок 2</label>
                <input
                    type="text"
                    value={player2}
                    onChange={(event) => setPlayer2(event.currentTarget.value)}
                />
                <button type="submit"></button>
            </form>
            <button onClick={sendWS}>Кнопка</button>
        </div>
    );
}

export default App;

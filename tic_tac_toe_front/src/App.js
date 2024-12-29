import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Board from "./components/Board";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function App() {
    const [ws, setWS] = useState(null);
    const [roomName, setRoomName] = useState("");
    const [nickname, setNickname] = useState("");
    const navigate = useNavigate();

    function sendWS() {
        ws.send(
            JSON.stringify({
                message: "привет",
            })
        );
    }

    function handleSubmit(event) {
        if (!roomName || !nickname) {
            alert("Заполните все поля!");
            return null;
        }

        localStorage.setItem("roomName", roomName);
        localStorage.setItem("nickname", nickname);

        navigate("/tic-tac-toe");
    }

    return (
        <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
            <div
                className="card p-4 shadow-lg rounded text-center"
                style={{ maxWidth: "600px", width: "100%" }}
            >
                <h1 className="mb-4 text-primary">Крестики Нолики</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label fw-bold">
                            Название комнаты
                        </label>
                        <input
                            className="form-control"
                            type="text"
                            placeholder="Введите название комнаты"
                            value={roomName}
                            onChange={(event) =>
                                setRoomName(event.currentTarget.value)
                            }
                        />
                    </div>
                    <div className="mb-4">
                        <label className="form-label fw-bold">Ваше имя</label>
                        <input
                            className="form-control"
                            type="text"
                            placeholder="Введите ваше имя"
                            value={nickname}
                            onChange={(event) =>
                                setNickname(event.currentTarget.value)
                            }
                        />
                    </div>
                    <button
                        className="btn btn-primary w-100 py-2"
                        type="submit"
                    >
                        Войти в игру
                    </button>
                </form>
            </div>
        </div>
    );
}

export default App;

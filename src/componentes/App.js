import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

import TokenContext from "../contextos/TokenContext";
import TopoEMenu from "./TopoEMenu";
import Home from "./Home";
import Cadastro from "./Cadastro";
import Hoje from "./Hoje";
import Habitos from "./Habitos";
import Historico from "./Historico";

export default function App() {
    const [token, setToken] = useState("");
    const [imagemPerfil, setImagemPerfil] = useState("");
    const [listaHabitos, setListaHabitos] = useState([]);
    const [listaHabitosHoje, setListaHabitosHoje] = useState([]);
    const [habitosDiarios, setHabitosDiarios] = useState([]);
    const [porcentagem, setPorcentagem] = useState({ base: 0, total: 1 });

    function receberHistorico() {
        const url = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits";
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };
        const promise = axios.get(url, config);
        promise.then((response) => {
            const { data } = response;
            setListaHabitos(data);
        })
        promise.catch((err) => {
            const { response } = err;
            const { data } = response;
            const { message } = data;
            alert(message);
        })
    }

    function receberHabitosHoje() {
        const url = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today";
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };
        const promise = axios.get(url, config);
        promise.then((response) => {
            const { data } = response;
            const feitos = data.filter(atividade => {
                if (atividade.done === true) {
                    return atividade;
                }
            })
            setPorcentagem({
                base: feitos.length,
                total: data.length
            });
            setListaHabitosHoje(data);
        })
        promise.catch((err) => {
            const { response } = err;
            const { data } = response;
            const { message } = data;
            alert(message);
        })
    }

    function receberHabitosDiarios() {
        const url = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/history/daily";
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };
        const promise = axios.get(url, config);
        promise.then((response) => {
            const { data } = response;
            setHabitosDiarios(data);
        })
        promise.catch((err) => {
            const { response } = err;
            const { data } = response;
            const { message } = data;
            alert(message);
        })
    }

    return (
        <TokenContext.Provider
            value={{
                token,
                setToken,
                imagemPerfil,
                setImagemPerfil,
                listaHabitos,
                setListaHabitos,
                receberHistorico,
                receberHabitosHoje,
                receberHabitosDiarios,
                listaHabitosHoje,
                habitosDiarios,
                porcentagem
            }}
        >
            <BrowserRouter>
                <TopoEMenu />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/cadastro/" element={<Cadastro />} />
                    <Route path="/hoje/" element={<Hoje />} />
                    <Route path="/habitos/" element={<Habitos />} />
                    <Route path="/historico/" element={<Historico />} />
                </Routes>
            </BrowserRouter>
        </TokenContext.Provider>
    )
}
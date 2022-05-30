import { useContext } from "react";
import styled from "styled-components";
import axios from "axios";
import TokenContext from "../contextos/TokenContext";
import lixeira from "../assets/lixeira.svg";

export default function HabitosLista({id, nome, dias}) {
    const { token, receberHistorico, receberHabitosHoje, receberHabitosDiarios } = useContext(TokenContext);

    function apagar() {
        const url = `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}`;
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };
        const promise = axios.delete(url, config);
        promise.then((response) => {
            receberHistorico();
            receberHabitosHoje();
            receberHabitosDiarios();
        })
        promise.catch((err) => {
            const { response } = err;
            const { data } = response;
            const { message } = data;
            alert(message);
        })
    }

    return (
        <CaixaHabito>
            <h2>{nome}</h2>
            <div>
                {dias.includes(0) ? <Selecionado>D</Selecionado> : <NaoSelecionado>D</NaoSelecionado>}
                {dias.includes(1) ? <Selecionado>S</Selecionado> : <NaoSelecionado>S</NaoSelecionado>}
                {dias.includes(2) ? <Selecionado>T</Selecionado> : <NaoSelecionado>T</NaoSelecionado>}
                {dias.includes(3) ? <Selecionado>Q</Selecionado> : <NaoSelecionado>Q</NaoSelecionado>}
                {dias.includes(4) ? <Selecionado>Q</Selecionado> : <NaoSelecionado>Q</NaoSelecionado>}
                {dias.includes(5) ? <Selecionado>S</Selecionado> : <NaoSelecionado>S</NaoSelecionado>}
                {dias.includes(6) ? <Selecionado>S</Selecionado> : <NaoSelecionado>S</NaoSelecionado>}
            </div>
            <img
                src={lixeira}
                alt="lixeira"
                onClick={() => {
                    const confirmar = window.confirm("Deseja mesmo apagar este hábito da sua lista?");
                    if (confirmar) {
                        apagar();
                    }
                }}
            />
        </CaixaHabito>
    )
}

const CaixaHabito = styled.article`
padding: 13px;
background: #FFFFFF;
border-radius: 5px;
display: flex;
flex-direction: column;
justify-content: space-between;
position: relative;
margin-bottom: 10px;
h2 {
    font-size: 20px;
    margin-bottom: 8px;
}
div {
    display: flex;
}
img {
    width: 13px;
    height: 15px;
    position: absolute;
    top: 10px;
    right: 10px;
}
`
const Selecionado = styled.h2`
margin-bottom: 0px;
width: 30px;
height: 30px;
margin-right: 4px;
background: #DBDBDB;
color: #FFFFFF;
border: 1px solid #D5D5D5;
border-radius: 5px;
display: flex;
justify-content: center;
align-items: center;
`

const NaoSelecionado = styled.h2`
margin-bottom: 0px;
width: 30px;
height: 30px;
margin-right: 4px;
background: #FFFFFF;
color: #DBDBDB;
border: 1px solid #D5D5D5;
border-radius: 5px;
display: flex;
justify-content: center;
align-items: center;
`
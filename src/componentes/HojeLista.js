import { useContext } from "react";
import axios from "axios";
import styled from "styled-components";
import check_marca from "../assets/checkbox-marca.svg";
import TokenContext from "../contextos/TokenContext";

export default function HojeLista({ id, name, done, currentSequence, highestSequence }) {
    const { token, receberHistorico, receberHabitosHoje, receberHabitosDiarios } = useContext(TokenContext);

    function marcarDesmarcarHabito() {
        if (done === false) {
            const url =
                `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}/check`;
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };
            const promise = axios.post(url, true, config);
            promise.then((response) => {
                receberHistorico();
                receberHabitosHoje();
                receberHabitosDiarios();
            });
            promise.catch((err) => {
                const { response } = err;
                const { data } = response
                const { message } = data;
                alert(message);
            });
        } else {
            const url =
                `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}/uncheck`;
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };
            const promise = axios.post(url, false, config);
            promise.then((response) => {
                receberHabitosDiarios();
                receberHabitosHoje();
            });
            promise.catch((err) => {
                const { response } = err;
                const { data } = response
                const { message } = data;
                alert(message);
            });
        }
    }

    return (
        done === false ?
            <CaixaHabitoHoje>
                <section>
                    <h2>{name}</h2>
                    <div>
                        <h3>Sequência atual: {currentSequence} dias</h3>
                        <h3>Seu recorde: {highestSequence} dias</h3>
                    </div>
                </section>
                <Desmarcado onClick={marcarDesmarcarHabito}>
                    <img src={check_marca} alt="Caixa de Marcar" />
                </Desmarcado>
            </CaixaHabitoHoje>
            :
            <CaixaHabitoHoje>
                <section>
                    <h2>{name}</h2>
                    <div>
                        <h3>Sequência atual<MarcadoSequencia>: {currentSequence} dias</MarcadoSequencia></h3>
                        {currentSequence === highestSequence ? <h3>Seu recorde<MarcadoSequencia>: {highestSequence} dias</MarcadoSequencia></h3> : <h3>Seu recorde: {highestSequence} dias</h3>}
                    </div>
                </section>
                <Marcado onClick={marcarDesmarcarHabito}>
                    <img src={check_marca} alt="Caixa de Marcar" />
                </Marcado>
            </CaixaHabitoHoje>
    )
}

const CaixaHabitoHoje = styled.article`
padding: 13px;
background: #FFFFFF;
border-radius: 5px;
display: flex;
justify-content: space-between;
align-items: center;
margin-bottom: 10px;
section {
    div {
        display: flex;
        flex-direction: column;
    }
    h2 {
        font-size: 20px;
        margin-bottom: 10px;
    }
    h3 {
        display: inline-flex;
        font-size: 13px;
        margin-bottom: 3px;
    }
}
`

const Desmarcado = styled.figure`
width: 69px;
height: 69px;
background: #EBEBEB;
border: 1px solid #E7E7E7;
border-radius: 5px;
display: flex;
justify-content: center;
align-items: center;
img {
    height: 28px;
}
`

const Marcado = styled.figure`
width: 69px;
height: 69px;
background: #8FC549;
border: 1px solid #E7E7E7;
border-radius: 5px;
display: flex;
justify-content: center;
align-items: center;
img {
    height: 28px;
}
`

const MarcadoSequencia = styled.h3`
color: #8FC549;
`
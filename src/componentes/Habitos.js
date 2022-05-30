import { useState, useContext } from "react";
import { ThreeDots } from "react-loader-spinner";
import styled from "styled-components";
import axios from "axios";
import HabitosLista from "./HabitosLista";
import HabitosListaDiasDaSemana from "./HabitosListaDiasDaSemana";
import TokenContext from "../contextos/TokenContext";

export default function Habitos() {
    const [adicionarHabito, setAdicionarHabito] = useState(false);
    const [habitoNovo, setHabitoNovo] = useState({ name: "", days: [] });
    const [carregandoHabitoNovo, setCarregandoHabitoNovo] = useState(false);
    const arraySemana = ["D", "S", "T", "Q", "Q", "S", "S"];
    
    const { token, listaHabitos, setListaHabitos, receberHistorico, receberHabitosHoje, receberHabitosDiarios } = useContext(TokenContext);

    function tirarElemento(array, item) {
        return array.filter(elemento => {
            return elemento !== item;
        });
    }

    function enviarHabito(e) {
        e.preventDefault();
        setCarregandoHabitoNovo(true);
        const url =
            "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits";
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }; 
        const promise = axios.post(url, habitoNovo, config);
        promise.then((response) => {
            const { data } = response;
            receberHistorico();
            receberHabitosHoje();
            receberHabitosDiarios();
            setListaHabitos([...listaHabitos, data]);
            setHabitoNovo({ name: "", days: [] });
            setCarregandoHabitoNovo(false)
            setAdicionarHabito(false);
        });
        promise.catch((err) => {
            const { response } = err;
            const { data } = response
            const { message } = data;
            alert(message);
            setHabitoNovo({ name: "", days: [] });
            setCarregandoHabitoNovo(false)
        });
    }

    function renderizarDiasDaSemana() {
        return arraySemana.map((dia, indice) => {
            return (
                <HabitosListaDiasDaSemana
                    key={indice}
                    indice={indice}
                    dia={dia}
                    habitoNovo={habitoNovo}
                    setHabitoNovo={setHabitoNovo}
                    tirarElemento={tirarElemento}
                    carregandoHabitoNovo={carregandoHabitoNovo}
                />
            )
        })
    }

    const renderizarListaDiasDaSemana = renderizarDiasDaSemana();

    function renderizarHabitos() {
        if (listaHabitos.length > 0) {
            return (
                <>
                    {adicionarHabito ?
                        carregandoHabitoNovo === false ?
                            <JanelaAdicionarHabito onSubmit={enviarHabito}>
                                <input
                                    type="text"
                                    value={habitoNovo.name}
                                    onChange={(e) => setHabitoNovo({ ...habitoNovo, name: e.target.value })}
                                    nome="nome do hábito"
                                    id="nome do hábito"
                                    placeholder="nome do hábito"
                                />
                                <menu>
                                    {renderizarListaDiasDaSemana}
                                </menu>
                                <div>
                                    <BotaoSalvar type="submit" onClick={() => setHabitoNovo({ ...habitoNovo, days: habitoNovo.days.sort() })}>Salvar</BotaoSalvar>
                                    <BotaoCancelar onClick={() => setAdicionarHabito(false)}>Cancelar</BotaoCancelar>
                                </div>
                            </JanelaAdicionarHabito>
                            :
                            <JanelaAdicionarHabito onSubmit={enviarHabito}>
                                <input
                                    type="text"
                                    value={habitoNovo.name}
                                    onChange={(e) => setHabitoNovo({ ...habitoNovo, name: e.target.value })}
                                    nome="nome do hábito"
                                    id="nome do hábito"
                                    placeholder="nome do hábito"
                                    disabled
                                />
                                <menu>
                                    {renderizarListaDiasDaSemana}
                                </menu>
                                <div>
                                    <BotaoSalvar disabled type="submit" onClick={() => setHabitoNovo({ ...habitoNovo, days: habitoNovo.days.sort() })}>
                                        <ThreeDots color="#FFFFFF" height={20} width={20} />
                                    </BotaoSalvar>
                                    <BotaoCancelar disabled onClick={() => setAdicionarHabito(false)}>Cancelar</BotaoCancelar>
                                </div>
                            </JanelaAdicionarHabito>
                        :
                        <></>}
                    {listaHabitos.map(habito => {
                        const { id, name, days } = habito;
                        return (
                            <HabitosLista
                                key={id}
                                id={id}
                                nome={name}
                                dias={days}
                            />
                        )
                    })}
                </>
            )
        } else {
            return (
                <>
                    {adicionarHabito ?
                        carregandoHabitoNovo === false ?
                            <JanelaAdicionarHabito onSubmit={enviarHabito}>
                                <input
                                    type="text"
                                    value={habitoNovo.name}
                                    onChange={(e) => setHabitoNovo({ ...habitoNovo, name: e.target.value })}
                                    nome="nome do hábito"
                                    id="nome do hábito"
                                    placeholder="nome do hábito"
                                />
                                <menu>
                                    {renderizarListaDiasDaSemana}
                                </menu>
                                <div>
                                    <BotaoSalvar type="submit" onClick={() => setHabitoNovo({ ...habitoNovo, days: habitoNovo.days.sort() })}>Salvar</BotaoSalvar>
                                    <BotaoCancelar onClick={() => setAdicionarHabito(false)}>Cancelar</BotaoCancelar>
                                </div>
                            </JanelaAdicionarHabito>
                            :
                            <JanelaAdicionarHabito onSubmit={enviarHabito}>
                                <input
                                    type="text"
                                    value={habitoNovo.name}
                                    onChange={(e) => setHabitoNovo({ ...habitoNovo, name: e.target.value })}
                                    nome="nome do hábito"
                                    id="nome do hábito"
                                    placeholder="nome do hábito"
                                    disabled
                                />
                                <menu>
                                    {renderizarListaDiasDaSemana}
                                </menu>
                                <div>
                                    <BotaoSalvar disabled type="submit" onClick={() => setHabitoNovo({ ...habitoNovo, days: habitoNovo.days.sort() })}>
                                        <ThreeDots color="#FFFFFF" height={20} width={20} />
                                    </BotaoSalvar>
                                    <BotaoCancelar disabled onClick={() => setAdicionarHabito(false)}>Cancelar</BotaoCancelar>
                                </div>
                            </JanelaAdicionarHabito>
                        :
                        <></>}
                    <p>Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!</p>
                </>
            )
        }
    }
    const renderizarListaHabitos = renderizarHabitos()

    return (
        <HabitosExibido>
            <section>
                <h1>Meus hábitos</h1>
                <button onClick={() => setAdicionarHabito(true)}>+</button>
            </section>
            {renderizarListaHabitos}
        </HabitosExibido>
    )
}

const HabitosExibido = styled.main`
margin: 92px 15px 129px 15px;
section {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 28px;
    h1 {
        font-size: 23px;
        color: #126BA5;
    }
    button {
        width: 40px;
        height: 35px;
        background-color: #52B6FF;
        border: none;
        border-radius: 5px;

        font-family: 'Lexend Deca', sans-serif;
        font-size: 27px;
        color: #FFFFFF;
    }
}
`

const JanelaAdicionarHabito = styled.form`
padding: 13px;
background: #FFFFFF;
border-radius: 5px;
display: flex;
flex-direction: column;
justify-content: space-between;
position: relative;
margin-bottom: 10px;
input {
    width: 100%;
    height: 45px;
    margin-bottom: 10px;
    background: #FFFFFF;
    color: #666666;
    border: 1px solid #D5D5D5;
    border-radius: 5px;
    font-size: 20px;
}
input::placeholder {
    font-size: 20px;
    color: #DBDBDB;
}
menu {
    display: flex;
    margin-bottom: 29px;
}
div {
    display: flex;
    flex-direction: row-reverse;
}
`

const BotaoSalvar = styled.button`
height: 35px;
background: #52B6FF;
border-radius: 5px;
border: none;
margin-left: 4px;
padding: 8px 17px;

font-size: 16px;
color: #FFFFFF;
`

const BotaoCancelar = styled.button`
height: 35px;
background: #FFFFFF;
border-radius: 5px;
border: none;
margin-left: 4px;
padding: 8px 17px;

font-size: 16px;
color: #52B6FF;
`
import { useState, useContext } from "react";
import Calendar from "react-calendar";
import styled from "styled-components";
import dayjs from "dayjs";
import TokenContext from "../contextos/TokenContext";
import 'react-calendar/dist/Calendar.css';

export default function Historico() {
    const { habitosDiarios } = useContext(TokenContext);
    const [listaDeHabitos, setListaDeHabitos] = useState([]);

    function mostrarHabitosNoCalendario(data) {
        let dataFormatada = dayjs(data).format("DD/MM/YYYY");
        let habitosAtuais = null;

        habitosDiarios.forEach(habito => {
            if (habito.day === dataFormatada) {
                habitosAtuais = habito.habits;
            }
        });

        if (!habitosAtuais || dayjs(data).format("DD/MM/YYYY") === dayjs().locale("pt-br").format("DD/MM/YYYY")) {
            return <p>{dayjs(data).format("DD")}</p>
        }

        let habitosFeitos = habitosAtuais.filter((h) => h.done);

        if (habitosFeitos.length === habitosAtuais.length) {
            return <DiaFeito>{dayjs(data).format("DD")}</DiaFeito>;
        } else {
            return <DiaNaoFeito>{dayjs(data).format("DD")}</DiaNaoFeito>;
        }
    }

    function listarHabitos(data) {
        const dataFormatada = dayjs(data).format("DD/MM/YYYY");
        let habitosAtuais = [];
        habitosDiarios.forEach((habito) => {
            if (habito.day === dataFormatada) {
                habitosAtuais = habito.habits;
            }
        });

        setListaDeHabitos(habitosAtuais);
    }

    function mostrarTituloDosHabitosDoDiaClicado() {
        let habitoDoDia = "";
        if (listaDeHabitos.length > 0) {
            habitoDoDia = listaDeHabitos[0].date;
        }

        return listaDeHabitos.length > 0 ?
            (
                <TextoPrincipal>Hábitos do dia {dayjs(habitoDoDia).locale("pt-br").format("DD/MM")}</TextoPrincipal>
            )
            :
            (
                <></>
            );
    }

    let TituloDosHabitosDoDiaClicado = mostrarTituloDosHabitosDoDiaClicado();

    function mostrarHabitosDoDiaClicado() {
        return listaDeHabitos.length > 0 ? (
            <div className="habits-list">
                {listaDeHabitos.map((habito, indice) => (
                    <div key={indice} className="habits">
                        <TextoAtividade className="habito-name">{habito.name}: </TextoAtividade>
                        {habito.done ? <TextoFeito>Feita</TextoFeito> : <TextoNaoFeito>Não Feita</TextoNaoFeito>}
                    </div>
                ))}
            </div>
        )
            :
            (
                <></>
            );
    }

    let HabitosDoDiaClicado = mostrarHabitosDoDiaClicado();

    return (
        <HistoricoExibido>
            <h1>Histórico</h1>
            <EstiloDoCalendario>
                <Calendar
                    calendarType="US"
                    formatDay={(locale, date) => mostrarHabitosNoCalendario(date)}
                    onClickDay={(data) => listarHabitos(data)}
                />
            </EstiloDoCalendario>
            {TituloDosHabitosDoDiaClicado}
            {HabitosDoDiaClicado}
        </HistoricoExibido>
    )
}

const HistoricoExibido = styled.main`
margin: 98px 15px 129px 15px;
h1 {
    margin-bottom: 17px;
    font-size: 23px;
    color: #126BA5;
}
`

const EstiloDoCalendario = styled.div`
.react-calendar {
	width: 100%;
	line-height: 1.125em;
	border-radius: 10px;
	box-shadow: 0px -1px 1px rgba(0, 0, 0, 0.15);
}
.react-calendar__navigation {
	margin-bottom: 2em;
}
.react-calendar__navigation button:disabled {
	background-color: #F0F0F0;
}
.react-calendar__navigation button:enabled:hover,
.react-calendar__navigation button:enabled:focus {
	background-color: #E6E6E6;
}
.react-calendar__month-view__weekdays {
    text-decoration: dotted underline;
}
.react-calendar__month-view__days__day--weekend {
	color: #D10000;
}
.react-calendar__month-view__days__day--neighboringMonth {
	color: #757575;
}
.react-calendar__tile {
	padding: 14px 6.6667px;
	background: none;
	line-height: 30px;
}
.react-calendar__tile:disabled {
	background-color: #F0F0F0;
}
.react-calendar__tile--now {
	background: #FFFF76;
}
.react-calendar__tile--now:enabled:hover,
.react-calendar__tile--now:enabled:focus {
	background: #FFFFA9;
}
`;

const DiaFeito = styled.p`
width: 30px;
background-color: #8CC654;
border-radius: 50px;
color: white;
text-align: center;
margin-left: calc((100% - 30px) / 2);
`

const DiaNaoFeito = styled.p`
width: 30px;
background-color: #E95766;
border-radius: 50px;
color: white;
text-align: center;
margin-left: calc((100% - 30px) / 2);
`

const TextoPrincipal = styled.h2`
margin-top: 10px;
color: #126BA5;
`

const TextoAtividade = styled.h2`
margin-top: 10px;
font-size: 16px;
`

const TextoFeito = styled.h2`
font-size: 16px;
color: #8CC654;
`

const TextoNaoFeito = styled.h2`
font-size: 16px;
color: #E75665;
`
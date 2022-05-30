import { useContext } from "react";
import styled from "styled-components";
import dayjs from "dayjs";
import HojeLista from "./HojeLista";
import TokenContext from "../contextos/TokenContext";

export default function Hoje() {
    const { listaHabitosHoje, porcentagem } = useContext(TokenContext);

    require("dayjs/locale/pt-br");
    dayjs.locale("pt-br");
    let diaMes = dayjs().format('DD/MM');
    let diaSemana = dayjs().format('dddd');
    let stringSemana = diaSemana.charAt(0).toUpperCase() + diaSemana.slice(1);

    function renderizarHabitosHoje() {
        if (listaHabitosHoje.length > 0) {
            return listaHabitosHoje.map(habito => {
                const { id, name, done, currentSequence, highestSequence } = habito;
                return (
                    <HojeLista
                        key={id}
                        id={id}
                        name={name}
                        done={done}
                        currentSequence={currentSequence}
                        highestSequence={highestSequence}
                    />
                )
            })
        }
    }
    const renderizarListaHabitosHoje = renderizarHabitosHoje()

    return (
        <HojeExibido>
            <h1>{stringSemana}, {diaMes}</h1>
            {porcentagem.base === 0 ? <TextoCinza>Nenhum hábito concluído ainda</TextoCinza> : <TextoVerde>{((porcentagem.base/porcentagem.total) * 100).toFixed()}% dos hábitos concluídos</TextoVerde>}
            {renderizarListaHabitosHoje}
        </HojeExibido>
    )
}

const HojeExibido = styled.main`
margin: 98px 15px 129px 15px;
h1 {
    margin-bottom: 3px;
    font-size: 23px;
    color: #126BA5;
}
`
const TextoCinza = styled.p`
color: #BABABA;
margin-bottom: 28px;
`

const TextoVerde = styled.p`
color: #8FC549;
margin-bottom: 28px;
`
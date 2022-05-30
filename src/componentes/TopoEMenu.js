import { useContext } from "react";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import { Link } from "react-router-dom";
import styled from "styled-components";
import TokenContext from "../contextos/TokenContext";
import 'react-circular-progressbar/dist/styles.css';


export default function TopoEMenu() { 
    const { token, imagemPerfil, receberHistorico, receberHabitosHoje, porcentagem, receberHabitosDiarios } = useContext(TokenContext);

    if (token !== "") {
        return (
            <>
                <Topo onLoad={() => {
                    receberHistorico();
                    receberHabitosHoje();
                    receberHabitosDiarios();
                }}>
                    <h1>TrackIt</h1>
                    <img src={imagemPerfil} alt="foto" />
                </Topo>
                <Base>
                    <Link to="/habitos/">
                        <h1>Hábitos</h1>
                    </Link>
                    <Link to="/historico/">
                        <h1>Histórico</h1>
                    </Link>
                </Base>
                <Link to="/hoje/">
                    <BotaoHoje onClick={receberHabitosHoje}>
                        <CircularProgressbar
                            value={porcentagem.base}
                            maxValue={porcentagem.total}
                            text={"Hoje"}
                            styles={buildStyles({
                                pathColor: `rgba(255, 255, 255, ${(porcentagem.base/porcentagem.total) * 100})`,
                                textColor: '#FFFFFF',
                                trailColor: '#52B6FF',
                            })}
                        ></CircularProgressbar>
                    </BotaoHoje>
                </Link>
            </>
        )
    } else return <></>
}

const Topo = styled.header`
position: fixed;
display: flex;
justify-content: space-between;
align-items: center;
top: 0;
width: 100vw;
padding: 10px 18px;
background-color: #126BA5;
box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
z-index: 1;
h1 {
    font-family: 'Playball';
    font-size: 39px;
    color: #FFFFFF;
}
img {
    width: 51px;
    height: 51px;
    border-radius: 50%;
}
`

const Base = styled.footer`
position: fixed;
display: flex;
justify-content: space-between;
align-items: center;
bottom: 0;
width: 100vw;
padding: 26px 36px;
background-color: #FFFFFF;
z-index: 1;
h1 {
    color: #52B6FF;
}
`
const BotaoHoje = styled.figure`
position: fixed;
bottom: 10px;
left: calc(50vw - 45px);
width: 90px;
height: 90px;
padding: 6px;
border-radius: 50%;
background-color: #52B6FF;
z-index: 2;
`
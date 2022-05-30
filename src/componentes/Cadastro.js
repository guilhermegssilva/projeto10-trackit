import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import axios from "axios";
import styled from "styled-components";
import logo from "../assets/logo.svg";

export default function Cadastro() {
    const navigate = useNavigate();
    const [dadosContaNova, setDadosContaNova] = useState({ email: "", name: "", image: "", password: "" });
    const [carregandoCadastro, setCarregandoCadastro] = useState(false);

    function cadastrarConta(e) {
        e.preventDefault()
        setCarregandoCadastro(true);
        const promise = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/sign-up", dadosContaNova);
        promise.then(response => {
            navigate("/");
        });
        promise.catch(err => {
            const { response } = err;
            const { data } = response
            const { message } = data;
            alert(message);
            setDadosContaNova({ email: "", name: "", image: "", password: "" });
            setCarregandoCadastro(false);
        }); 
    }

    return (
        <Fundo>
            <FrenteCadastro>
                <img src={logo} alt="logo" />
                {carregandoCadastro === false ?
                    <form onSubmit={cadastrarConta}>
                        <input
                            type="email"
                            value={dadosContaNova.email}
                            onChange={(e) => setDadosContaNova({ ...dadosContaNova, email: e.target.value })}
                            nome="email"
                            id="email"
                            placeholder="email"
                            required
                        />
                        <input
                            type="password"
                            value={dadosContaNova.password}
                            onChange={(e) => setDadosContaNova({ ...dadosContaNova, password: e.target.value })}
                            nome="senha"
                            id="senha"
                            placeholder="senha"
                            required
                        />
                        <input
                            type="text"
                            value={dadosContaNova.name}
                            onChange={(e) => setDadosContaNova({ ...dadosContaNova, name: e.target.value })}
                            nome="nome"
                            id="nome"
                            placeholder="nome"
                            required
                        />
                        <input
                            type="url"
                            value={dadosContaNova.image}
                            onChange={(e) => setDadosContaNova({ ...dadosContaNova, image: e.target.value })}
                            nome="foto"
                            id="foto"
                            placeholder="foto"
                            required
                        />
                        <button type="submit">Cadastrar</button>
                    </form> :
                    <form onSubmit={cadastrarConta}>
                        <input
                            type="email"
                            value={dadosContaNova.email}
                            onChange={(e) => setDadosContaNova({ ...dadosContaNova, email: e.target.value })}
                            nome="email"
                            id="email"
                            placeholder="email"
                            required
                            disabled
                        />
                        <input
                            type="password"
                            value={dadosContaNova.password}
                            onChange={(e) => setDadosContaNova({ ...dadosContaNova, password: e.target.value })}
                            nome="senha"
                            id="senha"
                            placeholder="senha"
                            required
                            disabled
                        />
                        <input
                            type="text"
                            value={dadosContaNova.name}
                            onChange={(e) => setDadosContaNova({ ...dadosContaNova, name: e.target.value })}
                            nome="nome"
                            id="nome"
                            placeholder="nome"
                            required
                            disabled
                        />
                        <input
                            type="url"
                            value={dadosContaNova.image}
                            onChange={(e) => setDadosContaNova({ ...dadosContaNova, image: e.target.value })}
                            nome="foto"
                            id="foto"
                            placeholder="foto"
                            required
                            disabled
                        />
                        <button disabled>
                            <ThreeDots color="#FFFFFF" height={13} width={13} />
                        </button>
                    </form>
                }
                <Link to="/">
                    <h1>Já tem uma conta? Faça login!</h1>
                </Link>
            </FrenteCadastro>
        </Fundo>
    )
}

const Fundo = styled.figure`
position: fixed;
height: 100vh;
width: 100vw;
background-color: #FFFFFF;
`

const FrenteCadastro = styled.section`
display: flex;
flex-direction: column;
align-items: center;
margin-top: calc(50vh - (498px / 2));
img {
    width: 180px;
    margin-bottom: 33px;
}
form {
    width: 303px;
    display: flex;
    flex-direction: column;
    align-items: center;
    * {
        width: 100%;
    }
    input {
        height: 45px;
        background: #FFFFFF;
        border: 1px solid #D5D5D5;
        border-radius: 5px;
        margin-bottom: 6px;

        font-size: 20px;
    }
    input::placeholder {
        font-size: 20px;
        color: #DBDBDB;
    }
    button {
        height: 45px;
        background: #52B6FF;
        border-radius: 5px;
        border: none;
        margin-bottom: 25px;

        font-size: 21px;
        color: #FFFFFF;
    }
}
h1 {
    font-size: 14px;
    text-decoration-line: underline;
    color: #52B6FF;
}
`
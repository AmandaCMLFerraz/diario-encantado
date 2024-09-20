import axios from "axios";

const ApiCep = axios.create({
    baseURL:'https://viacep.com.br/ws/'
})

export default ApiCep;
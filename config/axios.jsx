import axios from 'axios';

console.log('URL DE SUBIDA', process.env.backendURL);

const clientAxios = axios.create({
    baseURL: process.env.backendURL
});

export default clientAxios;
import React, { useReducer } from 'react';
import AuthContext from './AuthContext';
import AuthReducer from './AuthReducer';
import authTypes from '../../types/authTypes';
import clienteAxios from '../../config/axios';
import tokenAuth from '../../config/tokenAuth';
import clientAxios from '../../config/axios';

const {
    USUARIO_AUTENTICADO,
    REGISTRO_EXITOSO,
    REGISTRO_ERROR,
    LIMPIAR_ALERTA,
    LOGIN_EXITOSO,
    LOGIN_ERROR,
    CERRAR_SESION
} = authTypes


const AuthService = (props) => {

    // Definimos el tate inicial
    const initialState = {
        token: typeof window !== 'undefined' ? localStorage.getItem('token') || '' : '',
        autenticado: false,
        usuario: null,
        mensaje: ''
    };

    // Definir el reducer
    const [ state, dispatch ] = useReducer(AuthReducer, initialState);

    const iniciarSesion = async (datos) => {
        try {

            const response = await clienteAxios.post('/api/auth', datos);

            console.log(response);
            
            dispatch({
                type: LOGIN_EXITOSO,
                payload: response.data.token
            });

        } catch(error) {
            dispatch({
                type: LOGIN_ERROR,
                payload: error.response.data.msg
            });
        }

        setTimeout(() => {
            dispatch({
                type: LIMPIAR_ALERTA
            });
        }, 1500);
    }

    const usuarioAutenticado = async () => {

        const token = localStorage.getItem('token');

        if(token) {
            tokenAuth(token);
        }

        try {

           const response = await clientAxios.get('/api/auth');

           if(response.data.usuario) {
            dispatch({
                type: USUARIO_AUTENTICADO,
                payload: response.data.usuario
            });
           }

        } catch (error) {
            console.log(error);
            dispatch({
                type: LOGIN_ERROR,
                payload: error.response.data.msg
            });
        }
    }

    const regitrarUsuario = async (values) => {
        try {
            
            const response = await clienteAxios.post('/api/usuarios/create', values);
            console.log(response);

            dispatch({
                type: REGISTRO_EXITOSO,
                payload: response.data.msg
            });

        } catch (error) {
            console.log(error.response.data.msg);

            dispatch({
                type: REGISTRO_ERROR,
                payload: error.response.data.msg
            });
        }

        setTimeout(() => {
            dispatch({
                type: LIMPIAR_ALERTA
            });
        }, 1500);
    }

    const cerrarSesion = async () => {
        try {
            dispatch({
                type: CERRAR_SESION
            });
        } catch (error) {
            console.log(error);
        }
    }



    return (
        <AuthContext.Provider
            value={{
                ...state,
                usuarioAutenticado,
                regitrarUsuario,
                iniciarSesion,
                cerrarSesion
                // token: state.token,
                // autenticado: state.autenticado,
                // usuario: state.usuario,
                // mensaje: state.mensaje
            }}
        >
        {props.children}
        </AuthContext.Provider>
    );
}
 
export default AuthService;
import React, { useReducer } from 'react';
import AppReducer from './AppReducer';
import AppContext from './AppContext';
import clientAxios from '../../config/axios';
import appTypes from '../../types/appTypes';

const {
    SUBIR_ARCHIVO_EXITO,
    SUBIR_ARCHIVO_ERROR,
    SUBIR_ARCHIVO,
    CREAR_ENLACE_EXITO,
    CREAR_ENLACE_ERROR,
    MOSTRAR_ALERTA,
    OCULTAR_ALERTA,
    LIMPIAR_STATE,
    AGREGAR_PASSWORD,
    AGREGAR_DESCARGAS
} = appTypes;

const AppService = (props) => {

    const initialState = {
        mensaje_archivo: null,
        nombre: '',
        nombre_original: '',
        cargando: null,
        descargas: 1,
        password: '',
        autor: null,
        url: ''
    }

    const [ state, dispatch ] = useReducer(AppReducer, initialState);


    const mostrarAlerta = (msg) => {
        dispatch({
            type: MOSTRAR_ALERTA,
            payload: msg
        });

        setTimeout(() => {
            dispatch({
                type: OCULTAR_ALERTA
            });
        }, 3000);
    }

    const subirArchivo = async (formData, filename) => {

        dispatch({
            type: SUBIR_ARCHIVO
        });

        try {

            const result = await clientAxios.post('/api/archivos', formData);

            dispatch({
                type: SUBIR_ARCHIVO_EXITO,
                payload: {
                    nombre: result.data.archivo,
                    nombre_original: filename
                } 
            });

        } catch (error) {
            console.log(error);
            dispatch({
                type: SUBIR_ARCHIVO_ERROR,
                payload: error.response.data.msg
            });
        }
    }

    const crearEnlace = async () => {

        const data = {
            nombre: state.nombre,
            nombre_original: state.nombre_original,
            descargas: state.descargas,
            password: state.password,
            autor: state.autor
        }

        try {
            
            const resultado = await clientAxios.post('/api/enlaces', data);
            
            dispatch({
                type: CREAR_ENLACE_EXITO,
                payload: resultado.data.msg
            });

        } catch (error) {
            console.log(error);
            dispatch({
                type: CREAR_ENLACE_ERROR
            });
        }
    }

    const limpiarState = () => {
       dispatch({
           type: LIMPIAR_STATE
       });
    }

    // Agregue el password
    const agregarPassword = (password) => {
        dispatch({
            type: AGREGAR_PASSWORD,
            payload: password
        });
    }

    // Agrega un número de descargas
    const agregarDescargas = (descargas) => {
        dispatch({
            type: AGREGAR_DESCARGAS,
            payload: descargas
        });
    }


    return (
        <AppContext.Provider
            value={{
                ...state,
                mostrarAlerta,
                subirArchivo,
                crearEnlace,
                limpiarState,
                agregarPassword,
                agregarDescargas
            }}
        >
            {props.children}
        </AppContext.Provider>
    );
};

export default AppService;
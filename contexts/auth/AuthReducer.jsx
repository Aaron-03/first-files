import authTypes from '../../types/authTypes';


const {
    USUARIO_AUTENTICADO,
    REGISTRO_EXITOSO,
    REGISTRO_ERROR,
    LIMPIAR_ALERTA,
    LOGIN_EXITOSO,
    LOGIN_ERROR,
    CERRAR_SESION
} = authTypes


export default function authReducer(state, action) {
    switch(action.type) {

        case USUARIO_AUTENTICADO:
            return {
                ...state,
                usuario: action.payload,
                autenticado: true
            };

        case LOGIN_ERROR:
        case REGISTRO_ERROR:
        case REGISTRO_EXITOSO:
            return {
                ...state,
                mensaje: action.payload
            };

        case LIMPIAR_ALERTA:
            return {
                ...state,
                mensaje: ''
            };
        
        case LOGIN_EXITOSO:

            localStorage.setItem('token', action.payload);

            return {
                ...state,
                token: action.payload,
                autenticado: true
            };
        case CERRAR_SESION:

            localStorage.removeItem('token');

            return {
                ...state,
                usuario: null,
                token: null,
                autenticado: false
            };

        default:
            return state;
    }
};

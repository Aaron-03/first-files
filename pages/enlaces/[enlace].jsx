import React, { Fragment, useContext, useState } from 'react';
import Alerta from '../../components/Alerta';
import Layout from '../../components/Layout';
import clientAxios from '../../config/axios';
import AppContext from '../../contexts/app/AppContext';


export async function getServerSideProps({ params }) {
    
    const { enlace } = params;
    const resultado = await clientAxios.get(`/api/enlaces/${enlace}`);

    return {
        props: {
            enlace: resultado.data
        }
    }
}

export async function getServerSidePaths() {
    const enlaces = await clientAxios.get('/api/enlaces');

    return {
        paths: enlaces.data.enlaces.map(enlace => ({
            params: { enlace: enlace.url }
        })),
        fallback: false
    }
};



const Enlace = ({ enlace }) => {

    const { mostrarAlerta, mensaje_archivo } = useContext(AppContext);

    const [ tienePassword, setTienePassword ] = useState(enlace.password);
    const [ password, setPassword ] = useState('');

    const verificarPassword = async (e) => {
        e.preventDefault();

        const data = {
            password
        }

        try {

            const result = await clientAxios.post(`/api/enlaces/${enlace.enlace}`, data);
            setTienePassword(result.data.password);

        } catch (error) {
            mostrarAlerta(error.response.data.msg);
        }
    }

    return (
        <Layout>
            {
            tienePassword
            ? <Fragment>
                <p className="text-center p-2">Este enlace está protegido con un password...</p>
                {mensaje_archivo && <Alerta />}
                <div className="flex justify-center mt-5">
                    <div className="w-full max-w-lg">
                        <form
                            className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4"
                            onSubmit={ e => verificarPassword(e) }
                        >
                             <div className="mb-4">
                                <label
                                    className="block text-black text-sm font-bold mb-2"
                                    htmlFor="password"
                                >Password</label>

                                <input
                                    id="password"
                                    type="password"
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    placeholder="Password del Enlace"
                                    value={password}
                                    onChange={ e => setPassword(e.target.value) }
                                />
                            </div>

                            <button
                                type="submit"
                                className="bg-red-500 hover:bg-gray-900 w-full p-2 text-white uppercase font-bold"
                            >Validar Password</button>
                        </form>
                    </div>
                </div>
            </Fragment>
            : (
                <Fragment>
                    <h1 className="text-4xl text-center text-gray-700">Desde tu archivo</h1>
                    <div className="flex items-center justify-center mt-10">
                        <a
                            href={`${process.env.backendURL}/api/archivos/${enlace.archivo}`}
                            className="bg-red-500 text-center px-10 py-3 rounded uppercase font-bold text-white cursor-pointer">
                            Aquí
                        </a>
                    </div>
                </Fragment>
            )
            }
        </Layout>
    );
};

export default Enlace;
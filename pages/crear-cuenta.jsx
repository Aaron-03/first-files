import React, { useContext, useEffect } from 'react';
import Layout from '../components/Layout';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import authContext from '../contexts/auth/AuthContext';
import Alerta from '../components/Alerta';



const CrearCuentaPage = () => {

    const { mensaje, regitrarUsuario, usuarioAutenticado } = useContext(authContext);

    // Formulario y validaciones con Formik y Yup
    const formik = useFormik({
        initialValues: {
            nombre: '',
            email: '',
            password: ''
        },
        validationSchema: Yup.object({
            nombre: Yup.string()
                    .required('El Nombre es obligatorio'),
            email: Yup.string()
                    .email('El email no es válido')
                    .required('El Email es obligatorio'),
            password: Yup.string()
                    .required('El Password es obligatorio')
                    .min(6, 'El password debe de tener al menos 6 caracteres')
        }),
        onSubmit: (values) => {
            regitrarUsuario(values);
        }
    });



    return (
        <Layout>
            <div className="md:w-4/5 xl:w-3/5 mx-auto mb-32">
                <h2 className="text-4xl font-sans font-bold text-gray-800 text-center my-4">Crear Cuenta</h2>

                {
                mensaje
                ? <Alerta />
                : null
                }

                <div className="flex justify-center mt-5">
                    <div className="w-full max-w-lg">
                        <form
                            className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4"
                            onSubmit={formik.handleSubmit}
                        >
                            <div className="mb-4">
                                <label
                                    className="block text-black text-sm font-bold mb-2"
                                    htmlFor="nombre"
                                >Nombre</label>

                                <input
                                    id="nombre"
                                    type="text"
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    placeholder="Nombre de Usuario"
                                    value={formik.values.nombre}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />

                                { formik.touched.nombre && formik.errors.nombre ?
                                    <div className="my-2 bg-gray-200 border-l-4 border-red-500 text-red-700 pl-2">
                                        <p className="font-bold">Error</p>
                                        <p>{formik.errors.nombre}</p>
                                    </div>
                                : null }
                            </div>

                            <div className="mb-4">
                                <label
                                    className="block text-black text-sm font-bold mb-2"
                                    htmlFor="email"
                                >Email</label>

                                <input
                                    id="email"
                                    type="email"
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    placeholder="Email de Usuario"
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />

                                { formik.touched.email && formik.errors.email ?
                                    <div className="my-2 bg-gray-200 border-l-4 border-red-500 text-red-700 pl-2">
                                        <p className="font-bold">Error</p>
                                        <p>{formik.errors.email}</p>
                                    </div>
                                : null }
                            </div>

                            <div className="mb-4">
                                <label
                                    className="block text-black text-sm font-bold mb-2"
                                    htmlFor="password"
                                >Password</label>

                                <input
                                    id="password"
                                    type="password"
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    placeholder="Password de Usuario"
                                    value={formik.values.password}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />

                                { formik.touched.password && formik.errors.password ?
                                    <div className="my-2 bg-gray-200 border-l-4 border-red-500 text-red-700 pl-2">
                                        <p className="font-bold">Error</p>
                                        <p>{formik.errors.password}</p>
                                    </div>
                                : null }
                            </div>

                            <button
                                type="submit"
                                className="bg-red-500 hover:bg-gray-900 w-full p-2 text-white uppercase font-bold"
                            >Crear Cuenta</button>
                        </form>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
 
export default CrearCuentaPage;
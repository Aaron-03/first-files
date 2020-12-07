import React, { Fragment, useContext, useEffect } from 'react';
import Layout from '../components/Layout';
import AuthContext from '../contexts/auth/AuthContext';
import Link from 'next/link';
import Dropzone from '../components/Dropzone';
import AppContext from '../contexts/app/AppContext';
import Alerta from '../components/Alerta';

const IndexPage = () => {

  const { usuarioAutenticado } = useContext(AuthContext);

  // Extraer mensaje de error de archivos
  const { mensaje_archivo, url } = useContext(AppContext);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if(token) {
      usuarioAutenticado();
    }
  }, []);


  return (
    <Layout>
      <div className="md:w-4/5 xl:w-3/5 mx-auto mb-32">
        {
          url
          ? <Fragment>
              <p className="text-center text-2xl uppercase mt-10">
                <span className="font-bold text-red-700 text-4xl">Tu URL es:</span>
                Tu URL es {`${process.env.frontendURL}/enlaces/${url}`}
              </p>

              <button
                  type="button"
                  className="bg-red-500 hover:bg-gray-900 w-full p-2 text-white uppercase font-bold mt-10"
                  onClick={() => navigator.clipboard.writeText(`${process.env.frontendURL}/enlaces/${url}`)}
              >Copiar Enlace</button>
          </Fragment>
          : (
            <Fragment>
              {mensaje_archivo && <Alerta />}
              
              <div className="lg:flex md:shadow-lg p-5 bg-white rounded-lg py-10">
                <Dropzone />

                <div className="md:flex-1 mb-3 mx-2 mt-16 lg:mt-0">
                  <h2 className="text-4xl font-sans font-bold text-gray-800 my-4">Compartir arhivos de forma sencilla y privada</h2>  

                  <p>
                    <span className="text-red-500 font-bold">ReactNodeSend </span>

                    te permite compartir archivos con cifrado de extremo a extremo y un enlace que caduca automáticamente. Por lo tanto, puede mantener lo que comparte en privado y asegurarse de que sus cosas no permanezcan en línea para siempre.
                  </p>

                  <Link href="/crear-cuenta">
                    <a className="text-red-500 font-bold text-lg hover:text-red-700">Crea una cuenta para mayores beneficios</a>
                  </Link>
                </div>
              </div>
            </Fragment>
          )
        }
      </div>
    </Layout>
  );
}
 
export default IndexPage;

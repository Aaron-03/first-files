import AppService from '../contexts/app/AppService';
import AuthService from '../contexts/auth/AuthService';



function MyApp({ Component, pageProps }) {
  return (
    <AuthService>
      <AppService>
        <Component {...pageProps} />
      </AppService>
    </AuthService>
  );
}

export default MyApp

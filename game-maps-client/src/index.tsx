import ReactDOM from 'react-dom/client';
import App from './pages';
import "./styles/globals.css"
import "./styles/style.css"
import { Provider } from 'react-redux';
import store from './redux/store';
import { CookiesProvider } from 'react-cookie';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

fetch("/appsettings.json").then(r => r.json())
  .then((res: Appsettings) => {
    window.settings = res;
    root.render(
      <CookiesProvider>
        <Provider store={store}>
          <App />
        </Provider>
      </CookiesProvider>
    );
  })


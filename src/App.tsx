import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Router from './routes';
import { GlobalStyles } from './styles/global';

const App = () => (
  <>
    <ToastContainer autoClose={2000} position={toast.POSITION.BOTTOM_RIGHT} />
    <GlobalStyles />
    <Router />
  </>
);

export default App;

import "@/styles/style.css";
import '../components/modal.css';
import Modal from 'react-modal';
Modal.setAppElement('#__next');

function App({ Component, pageProps }) {
	return <Component {...pageProps} />;
}

export default App;
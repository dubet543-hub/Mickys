import { createRoot } from 'react-dom/client';
import App from './App';
import './tailwind.css';   /* Tailwind base + utilities (must come first) */
import './styles.css';     /* Site custom CSS — cascades on top of Tailwind */

createRoot(document.getElementById('root')).render(<App />);

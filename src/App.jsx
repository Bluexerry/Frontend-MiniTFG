import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import Navbar from './components/Layout/Navbar';
import Footer from './components/Layout/Footer';

function App() {
    return (
        <Router>
            <div className="flex flex-col min-h-screen pt-16"> {/* Agregamos padding-top para descontar el NavBar fijo */}
                <Navbar />
                <main className="flex-grow container mx-auto px-4 py-8">
                    <Routes>
                        <Route path="/exercises" element={<div className="text-center text-2xl font-bold">Página de Ejercicios</div>} />
                        <Route path="/rutinas" element={<div className="text-center text-2xl font-bold">Página de Rutinas</div>} />
                        <Route path="/comentarios" element={<div className="text-center text-2xl font-bold">Página de Comentarios</div>} />
                        <Route path="*" element={<div className="text-center text-2xl font-bold">Bienvenido a FitnessApp</div>} />
                    </Routes>
                </main>
                <Footer />
            </div>
        </Router>
    );
}

export default App;
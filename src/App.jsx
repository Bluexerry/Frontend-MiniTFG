import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Layout/Navbar';
import Footer from './components/Layout/Footer';
import Exercises from './components/Home/Exercises';
import Comments from './components/Home/Comments';
import CreateRoutines from './components/Home/CreateRoutines';
import VisualizeRoutines from './components/Home/VisualizeRoutines';
import LandingPage from './components/Home/LandingPage';

function App() {
    return (
        <Router>
            <div className="flex flex-col min-h-screen pt-16">
                <Navbar />
                <main className="flex-grow container mx-auto px-4 py-8">
                    <Routes>
                        <Route path="/exercises" element={<Exercises />} />
                        <Route path="/comments" element={<Comments />} />
                        <Route path="/crearRutinas" element={<CreateRoutines />} />
                        <Route path="/verRutinas" element={<VisualizeRoutines />} />
                        <Route path="/" element={<LandingPage />} />
                    </Routes>
                </main>
                <Footer />
            </div>
        </Router>
    );
}

export default App;
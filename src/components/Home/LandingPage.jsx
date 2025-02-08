import { Link } from 'react-router-dom';
import { MdFitnessCenter, MdComment, MdDirectionsRun, MdDashboard, MdGroup, MdStar } from 'react-icons/md';

export default function LandingPage() {
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-5xl font-extrabold text-center mb-16 tracking-wide text-slate-800 animate-fadeInUp">
                Bienvenidos a FitnessApp
            </h1>

            <section className="mb-16">
                <h2 className="text-3xl font-bold text-center mb-8 text-slate-700">¿Qué es FitnessApp?</h2>
                <p className="text-lg text-gray-700 leading-relaxed text-center max-w-3xl mx-auto">
                    FitnessApp es tu compañero ideal para alcanzar tus objetivos de fitness. Con nuestra aplicación, puedes crear rutinas personalizadas, seguir tus progresos y compartir tus experiencias con una comunidad apasionada por el fitness.
                </p>
            </section>

            <section className="mb-16">
                <h2 className="text-3xl font-bold text-center mb-8 text-slate-700">Características Principales</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <div className="p-6 border border-gray-300 rounded-xl shadow bg-white hover:bg-gray-50 transition-transform hover:scale-105 hover:shadow-lg">
                        <MdFitnessCenter className="text-5xl text-blue-500 mb-4 mx-auto" />
                        <h3 className="text-xl font-bold text-center mb-2">Catálogo de Ejercicios</h3>
                        <p className="text-gray-700 text-center">
                            Explora una amplia variedad de ejercicios para cada parte del cuerpo, con descripciones detalladas y niveles de dificultad.
                        </p>
                    </div>
                    <div className="p-6 border border-gray-300 rounded-xl shadow bg-white hover:bg-gray-50 transition-transform hover:scale-105 hover:shadow-lg">
                        <MdDirectionsRun className="text-5xl text-green-500 mb-4 mx-auto" />
                        <h3 className="text-xl font-bold text-center mb-2">Rutinas Personalizadas</h3>
                        <p className="text-gray-700 text-center">
                            Crea y guarda tus propias rutinas de entrenamiento, ajustando cada detalle para adaptarse a tus necesidades y objetivos.
                        </p>
                    </div>
                    <div className="p-6 border border-gray-300 rounded-xl shadow bg-white hover:bg-gray-50 transition-transform hover:scale-105 hover:shadow-lg">
                        <MdComment className="text-5xl text-red-500 mb-4 mx-auto" />
                        <h3 className="text-xl font-bold text-center mb-2">Comentarios y Feedback</h3>
                        <p className="text-gray-700 text-center">
                            Comparte tus experiencias y recibe feedback de otros usuarios para mejorar continuamente.
                        </p>
                    </div>
                    <div className="p-6 border border-gray-300 rounded-xl shadow bg-white hover:bg-gray-50 transition-transform hover:scale-105 hover:shadow-lg">
                        <MdDashboard className="text-5xl text-purple-500 mb-4 mx-auto" />
                        <h3 className="text-xl font-bold text-center mb-2">Seguimiento de Progreso</h3>
                        <p className="text-gray-700 text-center">
                            Monitorea tu progreso con estadísticas detalladas y ajusta tus rutinas según tus resultados.
                        </p>
                    </div>
                    <div className="p-6 border border-gray-300 rounded-xl shadow bg-white hover:bg-gray-50 transition-transform hover:scale-105 hover:shadow-lg">
                        <MdGroup className="text-5xl text-yellow-500 mb-4 mx-auto" />
                        <h3 className="text-xl font-bold text-center mb-2">Comunidad Activa</h3>
                        <p className="text-gray-700 text-center">
                            Únete a una comunidad activa de entusiastas del fitness, comparte tus logros y motívate con las historias de otros usuarios.
                        </p>
                    </div>
                    <div className="p-6 border border-gray-300 rounded-xl shadow bg-white hover:bg-gray-50 transition-transform hover:scale-105 hover:shadow-lg">
                        <MdStar className="text-5xl text-orange-500 mb-4 mx-auto" />
                        <h3 className="text-xl font-bold text-center mb-2">Logros y Recompensas</h3>
                        <p className="text-gray-700 text-center">
                            Gana logros y recompensas a medida que alcanzas tus objetivos y superas tus límites.
                        </p>
                    </div>
                </div>
            </section>

            <section className="mb-16">
                <h2 className="text-3xl font-bold text-center mb-8 text-slate-700">Empieza Ahora</h2>
                <div className="flex justify-center space-x-4">
                    <Link
                        to="/exercises"
                        className="bg-blue-500 text-white px-6 py-3 rounded shadow hover:bg-blue-600 transition"
                    >
                        Explorar Ejercicios
                    </Link>
                    <Link
                        to="/crearRutinas"
                        className="bg-green-500 text-white px-6 py-3 rounded shadow hover:bg-green-600 transition"
                    >
                        Crear Rutina
                    </Link>
                    <Link
                        to="/comments"
                        className="bg-red-500 text-white px-6 py-3 rounded shadow hover:bg-red-600 transition"
                    >
                        Ver Comentarios
                    </Link>
                </div>
            </section>

            <section className="mb-16">
                <h2 className="text-3xl font-bold text-center mb-8 text-slate-700">Únete a Nuestra Comunidad</h2>
                <p className="text-lg text-gray-700 leading-relaxed text-center max-w-3xl mx-auto">
                    FitnessApp no es solo una herramienta, es una comunidad. Conéctate con otros entusiastas del fitness, comparte tus logros y motívate con las historias de otros usuarios.
                </p>
            </section>
        </div>
    );
}
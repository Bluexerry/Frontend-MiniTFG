export default function Footer() {
    return (
        <footer className="bg-gradient-to-r from-gray-900 via-gray-800 to-black text-gray-300 pt-12 pb-6 border-t border-gray-700">
            <div className="max-w-7xl mx-auto px-6 py-8 grid md:grid-cols-4 gap-8 animate-fadeInUp">
                {/* Branding & Slogan */}
                <div className="md:col-span-2">
                    <h3 className="text-3xl font-extrabold text-white mb-4 drop-shadow-lg transition transform hover:scale-105">
                        FitnessApp
                    </h3>
                    <p className="text-sm leading-relaxed">
                        Potencia tu rendimiento con rutinas personalizadas y seguimiento minucioso. Conecta con la mejor versión de ti mismo en cada entrenamiento.
                    </p>
                </div>
                {/* Navegación */}
                <div>
                    <h3 className="text-xl font-bold text-white mb-3">Navegación</h3>
                    <ul className="space-y-2">
                        <li className="hover:text-white transition-colors">
                            <a href="/exercises">Ejercicios</a>
                        </li>
                        <li className="hover:text-white transition-colors">
                            <a href="/rutinas">Rutinas</a>
                        </li>
                        <li className="hover:text-white transition-colors">
                            <a href="/comentarios">Comentarios</a>
                        </li>
                    </ul>
                </div>
                {/* Contacto */}
                <div>
                    <h3 className="text-xl font-bold text-white mb-3">Contacto</h3>
                    <ul className="space-y-2 text-sm">
                        <li>
                            Correo:{" "}
                            <a
                                href="mailto:info@fitnessapp.com"
                                className="hover:underline hover:text-white transition duration-200"
                            >
                                info@fitnessapp.com
                            </a>
                        </li>
                        <li>
                            Tel:{" "}
                            <a
                                href="tel:+1234567890"
                                className="hover:underline hover:text-white transition duration-200"
                            >
                                +123 456 7890
                            </a>
                        </li>
                    </ul>
                    <div className="mt-4 flex space-x-4">
                        {/* Íconos con efecto flotante */}
                        <a
                            href="#"
                            className="text-gray-400 hover:text-white transition-transform transform hover:-translate-y-1"
                        >
                            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M22.46 6c-.77.35-1.6.59-2.46.7a4.3 4.3 0 001.88-2.38 8.59 8.59 0 01-2.72 1.04 4.28 4.28 0 00-7.29 3.9A12.12 12.12 0 013 4.79a4.28 4.28 0 001.32 5.71 4.24 4.24 0 01-1.94-.54v.05a4.28 4.28 0 003.43 4.19 4.3 4.3 0 01-1.93.07 4.28 4.28 0 004 2.97 8.6 8.6 0 01-5.3 1.83A8.73 8.73 0 012 19.54a12.12 12.12 0 006.56 1.92c7.88 0 12.2-6.53 12.2-12.2 0-.19-.01-.38-.02-.57A8.75 8.75 0 0024 5.34a8.52 8.52 0 01-2.54.7z" />
                            </svg>
                        </a>
                        <a
                            href="#"
                            className="text-gray-400 hover:text-white transition-transform transform hover:-translate-y-1"
                        >
                            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M19.615 3.184a2.998 2.998 0 00-2.121-2.12C15.16.672 8.84.672 6.506 1.064 4.172 1.44 2.53 3.082 2.154 5.416c-.392 2.334-.392 8.654 0 10.988.376 2.334 2.018 3.976 4.352 4.352 2.334.392 8.654.392 10.988 0 2.334-.376 3.976-2.018 4.352-4.352.392-2.334.392-8.654 0-10.988.064-.464.018-.937-.136-1.386zM9.545 15.568V8.432l6.182 3.568-6.182 3.568z" />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
            <div className="mt-6 border-t border-gray-700 pt-4 text-center">
                <p className="text-xs text-gray-500">
                    &copy; {new Date().getFullYear()} FitnessApp. Todos los derechos reservados.
                </p>
            </div>
        </footer>
    );
}
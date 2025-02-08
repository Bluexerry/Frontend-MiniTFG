import { useState, useEffect } from 'react';
import {
    MdDashboard,
    MdFitnessCenter,
    MdDirectionsRun,
    MdAccessibility,
    MdSportsMma,
    MdBuild,
    MdSelfImprovement
} from 'react-icons/md';

export default function Exercises() {
    const [exercises, setExercises] = useState([]);
    const [selectedBodyPart, setSelectedBodyPart] = useState("Todos");
    const [allBodyParts, setAllBodyParts] = useState([]);

    useEffect(() => {
        const fetchExercises = async () => {
            const query =
                selectedBodyPart && selectedBodyPart !== "Todos"
                    ? `?bodyPart=${encodeURIComponent(selectedBodyPart)}`
                    : "";
            const response = await fetch(`http://localhost:3000/exercises${query}`);
            const data = await response.json();
            setExercises(data);
        };
        fetchExercises();
    }, [selectedBodyPart]);

    useEffect(() => {
        const fetchAll = async () => {
            const response = await fetch(`http://localhost:3000/exercises`);
            const data = await response.json();
            const parts = Array.from(new Set(data.map((ex) => ex.bodyPart))).filter(Boolean);
            setAllBodyParts(parts);
        };
        fetchAll();
    }, []);

    const groupedExercises =
        selectedBodyPart === "Todos"
            ? exercises.reduce((groups, exercise) => {
                const key = exercise.bodyPart || "Otros";
                if (!groups[key]) groups[key] = [];
                groups[key].push(exercise);
                return groups;
            }, {})
            : null;

    // Función mejorada para asignar iconos según el bodyPart
    const getIconForBodyPart = (bodyPart) => {
        const bpLower = bodyPart.toLowerCase();
        if (bpLower.includes("pecho")) {
            return <MdFitnessCenter className="inline-block mr-1" />;
        } else if (bpLower.includes("pierna")) {
            return <MdDirectionsRun className="inline-block mr-1" />;
        } else if (bpLower.includes("espalda")) {
            return <MdAccessibility className="inline-block mr-1" />;
        } else if (bpLower.includes("brazo")) {
            return <MdSportsMma className="inline-block mr-1" />;
        } else if (bpLower.includes("hombro")) {
            return <MdBuild className="inline-block mr-1" />;
        } else if (bpLower.includes("abdominal")) {
            return <MdSelfImprovement className="inline-block mr-1" />;
        }
        return <MdFitnessCenter className="inline-block mr-1" />;
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-5xl font-extrabold text-center mb-16 tracking-wide text-slate-800">
                Catálogo de Ejercicios
            </h1>

            <div className="flex flex-wrap justify-center gap-4 mb-10">
                <button
                    onClick={() => setSelectedBodyPart("Todos")}
                    className={`px-6 py-2 rounded-full border transition-all duration-300 focus:outline-none transform
            ${selectedBodyPart === "Todos"
                            ? "bg-slate-700 text-white shadow-md"
                            : "bg-white text-slate-700 hover:shadow-lg hover:bg-slate-50 hover:scale-105"}`}
                >
                    <span className="inline-block mr-2"><MdDashboard /></span>
                    Todos
                </button>
                {allBodyParts.map((bp, index) => (
                    <button
                        key={index}
                        onClick={() => setSelectedBodyPart(bp)}
                        className={`px-6 py-2 rounded-full border transition-all duration-300 focus:outline-none transform
              ${selectedBodyPart === bp
                                ? "bg-slate-700 text-white shadow-md"
                                : "bg-white text-slate-700 hover:shadow-lg hover:bg-slate-50 hover:scale-105"}`}
                    >
                        <span className="inline-block mr-2">{getIconForBodyPart(bp)}</span>
                        {bp}
                    </button>
                ))}
            </div>

            {selectedBodyPart === "Todos" ? (
                Object.keys(groupedExercises).map((group, index) => (
                    <div key={index} className="mb-12">
                        <h2 className="text-3xl font-semibold mb-6 bg-slate-600 text-white px-5 py-3 rounded-md shadow-lg">
                            {group.toUpperCase()}
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {groupedExercises[group].map((ex, i) => (
                                <div
                                    key={i}
                                    className="p-5 border border-gray-300 rounded-lg shadow bg-gray-50 hover:bg-gray-100 transition-transform hover:scale-105"
                                >
                                    <h3 className="text-2xl font-bold text-slate-800 mb-2">{ex.name}</h3>
                                    <p className="text-gray-700 mb-1">{ex.description}</p>
                                    <div className="text-sm text-gray-500">
                                        <span>Equipo: {ex.equipment}</span>
                                        <span className="ml-3">Dificultad: {ex.difficulty}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))
            ) : (
                <div className="mb-12">
                    <h2 className="text-3xl font-semibold mb-6 bg-slate-600 text-white px-5 py-3 rounded-md shadow-lg">
                        {selectedBodyPart.toUpperCase()}
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {exercises.map((ex, i) => (
                            <div
                                key={i}
                                className="p-5 border border-gray-300 rounded-lg shadow bg-gray-50 hover:bg-gray-100 transition-transform hover:scale-105"
                            >
                                <h3 className="text-2xl font-bold text-slate-800 mb-2">{ex.name}</h3>
                                <p className="text-gray-700 mb-1">{ex.description}</p>
                                <div className="text-sm text-gray-500">
                                    <span>Equipo: {ex.equipment}</span>
                                    <span className="ml-3">Dificultad: {ex.difficulty}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
import { useEffect, useState } from "react";

export default function VisualizeRoutines() {
    const [routines, setRoutines] = useState([]);
    const [allExercises, setAllExercises] = useState([]);
    const [selectedExercise, setSelectedExercise] = useState(null);
    const [routineToDelete, setRoutineToDelete] = useState(null);
    const [routineToComment, setRoutineToComment] = useState(null);
    const [commentData, setCommentData] = useState({ username: "", comment: "" });
    const [selectedNote, setSelectedNote] = useState(null);

    // Carga de rutinas
    useEffect(() => {
        fetch("http://localhost:3000/daily_routine")
            .then((res) => res.json())
            .then((data) => setRoutines(data))
            .catch((err) => console.error(err));
    }, []);

    // Carga de todos los ejercicios
    useEffect(() => {
        fetch("http://localhost:3000/exercises")
            .then((res) => res.json())
            .then((data) => setAllExercises(data))
            .catch((err) => console.error(err));
    }, []);

    const handleDeleteRoutine = async (id) => {
        try {
            const response = await fetch(`http://localhost:3000/daily_routine/${id}`, {
                method: "DELETE",
            });
            if (!response.ok) throw new Error("Error al eliminar la rutina");
            setRoutineToDelete(null);
            setRoutines(routines.filter((routine) => routine._id !== id));
        } catch (err) {
            console.error(err);
        }
    };

    const handleCreateComment = async (e) => {
        e.preventDefault();
        const newComment = {
            routineId: routineToComment._id,
            username: commentData.username,
            comment: commentData.comment,
        };
        try {
            await fetch("http://localhost:3000/comments", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newComment),
            });
            setRoutineToComment(null);
            setCommentData({ username: "", comment: "" });
            alert("Comentario creado con éxito.");
        } catch (err) {
            console.error(err);
        }
    };

    const handleDownloadRoutine = (routine) => {
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(routine, null, 2));
        const downloadAnchorNode = document.createElement('a');
        downloadAnchorNode.setAttribute("href", dataStr);
        downloadAnchorNode.setAttribute("download", `routine_${routine._id}.json`);
        document.body.appendChild(downloadAnchorNode);
        downloadAnchorNode.click();
        downloadAnchorNode.remove();
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-5xl font-extrabold text-center mb-16 tracking-wide text-slate-800">
                Rutinas Guardadas
            </h1>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {routines.map((routine) => (
                    <div
                        key={routine._id}
                        className="border border-gray-300 rounded-xl shadow bg-white hover:bg-gray-50 p-6 transition-transform hover:scale-105 hover:shadow-lg space-y-4"
                    >
                        <div className="border-b border-gray-200 pb-3 mb-3">
                            <h2 className="text-2xl font-extrabold text-slate-700">{routine.day}</h2>
                            <p className="text-sm text-slate-500 tracking-wide">{routine._id}</p>
                        </div>

                        <div className="space-y-2">
                            <div>
                                <span className="block text-sm font-semibold uppercase text-gray-500">
                                    Focus:
                                </span>
                                <span className="block text-lg font-bold text-gray-700">
                                    {routine.focus}
                                </span>
                            </div>
                            <div>
                                <span className="block text-sm font-semibold uppercase text-gray-500">
                                    Descripción:
                                </span>
                                <p className="text-gray-700">{routine.description}</p>
                            </div>
                        </div>

                        <div className="pt-3 border-t border-gray-200 space-y-2">
                            <p className="text-lg font-semibold text-gray-600">Ejercicios</p>
                            <ul className="space-y-1 text-gray-700 text-sm">
                                {routine.exercises?.map((ex, index) => {
                                    const foundExercise = allExercises.find(
                                        (item) => item._id === ex.exerciseId
                                    );
                                    return (
                                        <li
                                            key={index}
                                            className="flex items-center justify-between bg-gray-100 p-2 rounded"
                                        >
                                            <button
                                                type="button"
                                                onClick={() => setSelectedExercise(foundExercise)}
                                                className="relative group font-medium underline decoration-dotted cursor-pointer"
                                            >
                                                ID: {ex.exerciseId}
                                            </button>
                                            <div className="flex gap-2">
                                                <span className="font-medium">Sets:</span>
                                                <span>{ex.sets}</span>
                                                <span className="font-medium">Reps:</span>
                                                <span>{ex.repetitions}</span>
                                                {ex.note ? (
                                                    <button
                                                        type="button"
                                                        onClick={() => setSelectedNote(ex.note)}
                                                        className="text-blue-500 underline hover:text-blue-700 transition"
                                                    >
                                                        Ver Nota
                                                    </button>
                                                ) : (
                                                    <span className="text-gray-400">Sin Nota</span>
                                                )}
                                            </div>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>

                        <div className="flex justify-between mt-4">
                            <button
                                onClick={() => setRoutineToDelete(routine)}
                                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                            >
                                Eliminar
                            </button>
                            <button
                                onClick={() => setRoutineToComment(routine)}
                                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                            >
                                Comentar
                            </button>
                            <button
                                onClick={() => handleDownloadRoutine(routine)}
                                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
                            >
                                Descargar
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {selectedExercise && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/40 transition-opacity duration-300">
                    <div
                        className="bg-white p-6 rounded shadow-lg text-center transition-transform duration-300 ease-out"
                        style={{ animation: "fadeInScale 0.3s ease-out forwards" }}
                    >
                        <h2 className="text-xl font-semibold mb-4">Detalles del ejercicio</h2>
                        <div className="mb-6 text-left space-y-2">
                            <p>
                                <span className="font-semibold">ID:</span> {selectedExercise._id}
                            </p>
                            <p>
                                <span className="font-semibold">Nombre:</span> {selectedExercise.name}
                            </p>
                            <p>
                                <span className="font-semibold">Descripción:</span> {selectedExercise.description}
                            </p>
                            <p>
                                <span className="font-semibold">Parte del cuerpo:</span>{" "}
                                {selectedExercise.bodyPart}
                            </p>
                            <p>
                                <span className="font-semibold">Dificultad:</span> {selectedExercise.difficulty}
                            </p>
                            <p>
                                <span className="font-semibold">Equipo:</span> {selectedExercise.equipment}
                            </p>
                        </div>
                        <button
                            onClick={() => setSelectedExercise(null)}
                            className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 transition"
                        >
                            Cerrar
                        </button>
                    </div>
                </div>
            )}

            {selectedNote && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/40 transition-opacity duration-300">
                    <div
                        className="bg-white p-8 rounded-lg shadow-lg text-center transition-transform duration-300 ease-out max-w-lg w-full"
                        style={{ animation: "fadeInScale 0.3s ease-out forwards" }}
                    >
                        <h2 className="text-2xl font-semibold mb-6">Nota del Ejercicio</h2>
                        <p className="mb-6 text-left">{selectedNote}</p>
                        <button
                            onClick={() => setSelectedNote(null)}
                            className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 transition"
                        >
                            Cerrar
                        </button>
                    </div>
                </div>
            )}

            {routineToDelete && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/40 transition-opacity duration-300">
                    <div
                        className="bg-white p-6 rounded shadow-lg text-center transition-transform duration-300 ease-out"
                        style={{ animation: "fadeInScale 0.3s ease-out forwards" }}
                    >
                        <h2 className="text-xl font-semibold mb-4">¿Estás seguro?</h2>
                        <p className="mb-6">Esta acción eliminará la rutina permanentemente.</p>
                        <div className="flex justify-center space-x-4">
                            <button
                                onClick={() => handleDeleteRoutine(routineToDelete._id)}
                                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                            >
                                Eliminar
                            </button>
                            <button
                                onClick={() => setRoutineToDelete(null)}
                                className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 transition"
                            >
                                Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {routineToComment && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/40 transition-opacity duration-300">
                    <div
                        className="bg-white p-6 rounded shadow-lg text-center transition-transform duration-300 ease-out"
                        style={{ animation: "fadeInScale 0.3s ease-out forwards" }}
                    >
                        <h2 className="text-xl font-semibold mb-4">Comentar Rutina</h2>
                        <form onSubmit={handleCreateComment} className="space-y-4">
                            <div>
                                <label className="block text-sm font-semibold">Usuario:</label>
                                <input
                                    type="text"
                                    value={commentData.username}
                                    onChange={(e) => setCommentData({ ...commentData, username: e.target.value })}
                                    className="w-full p-2 border rounded"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold">Comentario:</label>
                                <textarea
                                    value={commentData.comment}
                                    onChange={(e) => setCommentData({ ...commentData, comment: e.target.value })}
                                    className="w-full p-2 border rounded"
                                    required
                                />
                            </div>
                            <div className="flex justify-center space-x-4">
                                <button
                                    type="submit"
                                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                                >
                                    Comentar
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setRoutineToComment(null)}
                                    className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 transition"
                                >
                                    Cancelar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
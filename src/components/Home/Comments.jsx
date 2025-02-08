import { useState, useEffect } from 'react';
import { MdChatBubble, MdOutlineDateRange, MdPerson } from 'react-icons/md';

export default function Comments() {
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [commentToDelete, setCommentToDelete] = useState(null);
    const [selectedRoutine, setSelectedRoutine] = useState(null);

    const fetchComments = async () => {
        setLoading(true);
        try {
            const response = await fetch('https://backend-minitfg.onrender.com/comments');
            if (!response.ok) throw new Error("Error al obtener comentarios");
            const data = await response.json();
            setComments(data);
        } catch (err) {
            setError(err.message);
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const fetchRoutineById = async (id) => {
        try {
            const response = await fetch(`https://backend-minitfg.onrender.com/daily_routine?id=${id}`);
            if (!response.ok) throw new Error("Error al obtener la rutina");
            const data = await response.json();
            setSelectedRoutine(data[0]);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchComments();
    }, []);

    const confirmDelete = async (id) => {
        try {
            const response = await fetch(`https://backend-minitfg.onrender.com/comments/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) throw new Error("Error al eliminar el comentario");
            setCommentToDelete(null);
            fetchComments();
        } catch (err) {
            console.error(err);
        }
    };

    const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        return isNaN(date.getTime()) ? dateStr : date.toLocaleString();
    };

    return (
        <div className="container mx-auto p-4 relative">
            <h1 className="text-5xl font-extrabold text-center mb-12 tracking-wide text-slate-800">
                Comentarios
            </h1>

            {loading && <p className="text-center text-lg">Cargando comentarios...</p>}
            {error && <p className="text-center text-red-500">{error}</p>}
            {!loading && comments.length === 0 && <p className="text-center text-lg">No se encontraron comentarios.</p>}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {comments.map((c) => (
                    <div key={c._id} className="p-6 border border-gray-200 rounded-lg shadow bg-gray-50 hover:bg-gray-100 transition-transform hover:scale-105 relative">
                        <div className="flex items-center mb-3">
                            <MdChatBubble className="text-3xl text-slate-700 mr-2" />
                            <h2 className="text-2xl font-semibold text-slate-800">
                                {c.routineId && (
                                    <button
                                        onClick={() => fetchRoutineById(c.routineId)}
                                        className="text-blue-500 hover:underline"
                                    >
                                        {c.routineId}
                                    </button>
                                )}
                            </h2>
                        </div>
                        <p className="flex items-center text-lg text-slate-700 mb-2">
                            <MdPerson className="mr-1 text-xl" />
                            <span className="font-semibold mr-1">Usuario:</span>{c.username}
                        </p>
                        <p className="text-base text-slate-600 mb-2">
                            <span className="font-semibold">Comentario:</span> {c.comment}
                        </p>
                        {c.date && (
                            <p className="flex items-center text-sm text-gray-500">
                                <MdOutlineDateRange className="mr-1" />
                                <span className="font-semibold mr-1">Fecha:</span> {formatDate(c.date)}
                            </p>
                        )}
                        <button
                            onClick={() => setCommentToDelete(c._id)}
                            className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                        >
                            Eliminar
                        </button>
                    </div>
                ))}
            </div>

            {commentToDelete && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/40 transition-opacity duration-300">
                    <div
                        className="bg-white p-6 rounded shadow-lg text-center transition-transform duration-300 ease-out"
                        style={{ animation: 'fadeInScale 0.3s ease-out forwards' }}
                    >
                        <h2 className="text-xl font-semibold mb-4">¿Estás seguro?</h2>
                        <p className="mb-6">Esta acción eliminará el comentario permanentemente.</p>
                        <div className="flex justify-center space-x-4">
                            <button
                                onClick={() => confirmDelete(commentToDelete)}
                                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                            >
                                Eliminar
                            </button>
                            <button
                                onClick={() => setCommentToDelete(null)}
                                className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 transition"
                            >
                                Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {selectedRoutine && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/40 transition-opacity duration-300">
                    <div
                        className="bg-white p-8 rounded-lg shadow-lg text-center transition-transform duration-300 ease-out max-w-lg w-full"
                        style={{ animation: 'fadeInScale 0.3s ease-out forwards' }}
                    >
                        <h2 className="text-2xl font-semibold mb-6">Detalles de la Rutina</h2>
                        <div className="mb-6 text-left space-y-4">
                            <p>
                                <span className="font-semibold">ID:</span> {selectedRoutine._id}
                            </p>
                            <p>
                                <span className="font-semibold">Día:</span> {selectedRoutine.day}
                            </p>
                            <p>
                                <span className="font-semibold">Focus:</span> {selectedRoutine.focus}
                            </p>
                            <p>
                                <span className="font-semibold">Descripción:</span> {selectedRoutine.description}
                            </p>
                            <div>
                                <span className="font-semibold">Ejercicios:</span>
                                <ul className="list-disc ml-6 mt-2 space-y-1">
                                    {selectedRoutine.exercises.map((ex, index) => (
                                        <li key={index}>
                                            <span className="font-semibold">ID:</span> {ex.exerciseId}, <span className="font-semibold">Sets:</span> {ex.sets}, <span className="font-semibold">Reps:</span> {ex.repetitions}, <span className="font-semibold">Descanso:</span> {ex.restTime}s
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <button
                            onClick={() => setSelectedRoutine(null)}
                            className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 transition"
                        >
                            Cerrar
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
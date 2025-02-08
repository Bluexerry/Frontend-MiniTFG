import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Routines() {
    const focusOptions = ["pecho", "espalda", "tren inferior", "hombro", "triceps", "biceps"];
    const daysOptions = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];

    const [step, setStep] = useState(1);
    const [day, setDay] = useState("");
    const [description, setDescription] = useState("");
    const [selectedFocus, setSelectedFocus] = useState([]);
    const [mainExercisesCount, setMainExercisesCount] = useState("");
    const [exercisesData, setExercisesData] = useState([]);
    const [mainExercises, setMainExercises] = useState([]);
    const [coreExercises, setCoreExercises] = useState([]);
    const [cardioExercise, setCardioExercise] = useState(null);

    useEffect(() => {
        fetch("http://localhost:3000/exercises")
            .then((res) => res.json())
            .then((data) => setExercisesData(data))
            .catch((err) => console.error(err));
    }, []);

    const handleFocusChange = (option) => {
        if (selectedFocus.includes(option)) {
            setSelectedFocus(selectedFocus.filter((f) => f !== option));
        } else if (selectedFocus.length < 2) {
            setSelectedFocus([...selectedFocus, option]);
        }
    };

    const updateMainExercises = (index, field, value) => {
        setMainExercises((prev) => {
            const updated = [...prev];
            updated[index] = { ...updated[index], [field]: value };
            return updated;
        });
    };

    const updateCoreExercises = (index, field, value) => {
        setCoreExercises((prev) => {
            const updated = [...prev];
            updated[index] = { ...updated[index], [field]: value };
            return updated;
        });
    };

    const updateCardioExercise = (field, value) => {
        setCardioExercise((prev) => ({ ...prev, [field]: value }));
    };

    useEffect(() => {
        const count = Number(mainExercisesCount);
        if (!count || count < 4 || count > 6) return;
        setMainExercises((prev) => {
            if (prev.length < count) {
                const diff = count - prev.length;
                const extra = Array.from({ length: diff }, () => ({
                    exerciseId: "",
                    sets: 3,
                    repetitions: 10,
                    restTime: 60,
                    note: ""
                }));
                return [...prev, ...extra];
            } else if (prev.length > count) {
                return prev.slice(0, count);
            }
            return prev;
        });
    }, [mainExercisesCount]);

    // Inicializa core + cardio
    useEffect(() => {
        if (coreExercises.length === 0) {
            setCoreExercises([
                { exerciseId: "", sets: 3, repetitions: 15, restTime: 60, note: "" },
                { exerciseId: "", sets: 3, repetitions: 15, restTime: 60, note: "" },
            ]);
        }
        if (!cardioExercise) {
            setCardioExercise({ exerciseId: "", sets: 1, repetitions: 10, restTime: 0, note: "" });
        }
    }, [coreExercises, cardioExercise]);

    // Paso 1 -> Paso 2 habilitado
    const canProceedToStep2 = () => {
        const count = Number(mainExercisesCount);
        return (
            day.trim() &&
            description.trim() &&
            selectedFocus.length >= 1 &&
            count >= 4 &&
            count <= 6
        );
    };

    // Guardar habilitado
    const canSubmitRoutine = () => {
        const missingMain = mainExercises.some((ex) => !ex.exerciseId);
        const missingCore = coreExercises.some((ex) => !ex.exerciseId);
        const missingCardio = !cardioExercise?.exerciseId;
        return !missingMain && !missingCore && !missingCardio;
    };

    // Crea la rutina
    const handleCreateRoutine = async (e) => {
        e.preventDefault();
        const focusString = selectedFocus.join(" + ");
        const newRoutine = {
            day,
            focus: focusString,
            description,
            exercises: [...mainExercises, ...coreExercises, cardioExercise],
        };
        try {
            await fetch("http://localhost:3000/daily_routine", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newRoutine),
            });
            alert("Rutina creada con éxito.");
            handleReset();
        } catch (err) {
            console.error(err);
        }
    };

    const handleReset = () => {
        setStep(1);
        setDay("");
        setDescription("");
        setSelectedFocus([]);
        setMainExercisesCount("");
        setMainExercises([]);
        setCoreExercises([]);
        setCardioExercise(null);
    };

    const groupExercisesByBodyPart = (list) => {
        return list.reduce((groups, ex) => {
            const bp = ex.bodyPart || "Otros";
            if (!groups[bp]) groups[bp] = [];
            groups[bp].push(ex);
            return groups;
        }, {});
    };

    return (
        <div className="container mx-auto p-4">
            {/* Botón para ver rutinas */}
            <div className="text-center mb-8">
                <Link
                    to="/verRutinas"
                    className="inline-block text-white bg-blue-600 px-4 py-2 rounded shadow hover:bg-blue-700 transition"
                >
                    Ver Rutinas
                </Link>
            </div>

            <h1 className="text-5xl font-extrabold text-center mb-16 tracking-wide text-slate-800">
                Crear Nueva Rutina
            </h1>

            <div className="mb-12 p-5 border border-gray-300 rounded-lg shadow bg-gray-50 hover:bg-gray-100 transition-transform hover:scale-105">
                <form onSubmit={handleCreateRoutine}>
                    {step === 1 && (
                        <div className="space-y-6">
                            <div>
                                <label className="block mb-2 font-semibold">Día de la semana:</label>
                                <select
                                    value={day}
                                    onChange={(e) => setDay(e.target.value)}
                                    className="w-full p-2 border rounded"
                                    required
                                >
                                    <option value="">-- Elige un día --</option>
                                    {daysOptions.map((option) => (
                                        <option key={option} value={option}>
                                            {option}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block mb-2 font-semibold">Descripción:</label>
                                <textarea
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    placeholder="Descripción de la rutina"
                                    required
                                    className="w-full p-2 border rounded"
                                />
                            </div>

                            <div>
                                <p className="font-semibold mb-2">Focus (1 o 2):</p>
                                <div className="flex flex-wrap gap-4">
                                    {focusOptions.map((option) => (
                                        <label key={option} className="flex items-center cursor-pointer space-x-1">
                                            <input
                                                type="checkbox"
                                                checked={selectedFocus.includes(option)}
                                                onChange={() => handleFocusChange(option)}
                                            />
                                            <span>{option}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label className="block mb-2 font-semibold">Ejercicios principales (4 a 6):</label>
                                <select
                                    value={mainExercisesCount}
                                    onChange={(e) => setMainExercisesCount(e.target.value)}
                                    className="w-32 p-2 border rounded"
                                    required
                                >
                                    <option value="">-- Elige --</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                    <option value="6">6</option>
                                </select>
                            </div>

                            <div className="flex justify-between">
                                <button
                                    type="button"
                                    onClick={() => setStep(2)}
                                    disabled={!canProceedToStep2()}
                                    className={`px-4 py-2 rounded transition text-white ${canProceedToStep2() ? "bg-blue-500 hover:bg-blue-600" : "bg-gray-400"
                                        }`}
                                >
                                    Siguiente
                                </button>
                                <button
                                    type="button"
                                    onClick={handleReset}
                                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                                >
                                    Reiniciar
                                </button>
                            </div>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="space-y-6">
                            <div>
                                <p className="font-semibold text-xl mb-2">Ejercicios principales:</p>
                                {mainExercises.map((ex, index) => {
                                    const focusFiltered = exercisesData.filter((e) =>
                                        selectedFocus.includes(e.bodyPart?.toLowerCase())
                                    );
                                    const grouped = groupExercisesByBodyPart(focusFiltered);

                                    return (
                                        <div
                                            key={index}
                                            className="p-4 mb-4 border border-gray-200 rounded-lg shadow bg-white hover:bg-gray-50 transition-transform hover:scale-[1.01]"
                                        >
                                            <h3 className="font-semibold mb-2">Principal #{index + 1}</h3>
                                            <select
                                                value={ex.exerciseId}
                                                onChange={(e) => updateMainExercises(index, "exerciseId", e.target.value)}
                                                className="p-2 border rounded w-full"
                                                required
                                            >
                                                <option value="">-- Elige un ejercicio --</option>
                                                {Object.keys(grouped).map((bodyPart) => (
                                                    <optgroup key={bodyPart} label={bodyPart.toUpperCase()}>
                                                        {grouped[bodyPart].map((opt) => (
                                                            <option key={opt._id} value={opt._id}>
                                                                {opt.name}
                                                            </option>
                                                        ))}
                                                    </optgroup>
                                                ))}
                                            </select>
                                            <div className="flex space-x-2 mt-2">
                                                <div className="w-1/4">
                                                    <label className="block text-sm font-semibold">Sets:</label>
                                                    <input
                                                        type="number"
                                                        min={1}
                                                        value={ex.sets}
                                                        onChange={(e) =>
                                                            updateMainExercises(index, "sets", Number(e.target.value))
                                                        }
                                                        className="w-full p-1 border rounded"
                                                        required
                                                    />
                                                </div>
                                                <div className="w-1/4">
                                                    <label className="block text-sm font-semibold">Reps:</label>
                                                    <input
                                                        type="number"
                                                        min={1}
                                                        value={ex.repetitions}
                                                        onChange={(e) =>
                                                            updateMainExercises(index, "repetitions", Number(e.target.value))
                                                        }
                                                        className="w-full p-1 border rounded"
                                                        required
                                                    />
                                                </div>
                                                <div className="w-1/4">
                                                    <label className="block text-sm font-semibold">Descanso (s):</label>
                                                    <input
                                                        type="number"
                                                        min={0}
                                                        value={ex.restTime}
                                                        onChange={(e) =>
                                                            updateMainExercises(index, "restTime", Number(e.target.value))
                                                        }
                                                        className="w-full p-1 border rounded"
                                                        required
                                                    />
                                                </div>
                                                <div className="w-1/4">
                                                    <label className="block text-sm font-semibold">Nota:</label>
                                                    <input
                                                        type="text"
                                                        value={ex.note}
                                                        onChange={(e) =>
                                                            updateMainExercises(index, "note", e.target.value)
                                                        }
                                                        className="w-full p-1 border rounded"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            <div>
                                <p className="font-semibold text-xl mb-2">Ejercicios de Core (2):</p>
                                {coreExercises.map((coreEx, i) => {
                                    const coreList = exercisesData.filter(
                                        (e) => e.bodyPart?.toLowerCase() === "core"
                                    );
                                    const groupedCore = groupExercisesByBodyPart(coreList);

                                    return (
                                        <div
                                            key={i}
                                            className="p-4 mb-4 border border-gray-200 rounded-lg shadow bg-white hover:bg-gray-50 transition-transform hover:scale-[1.01]"
                                        >
                                            <h3 className="font-semibold mb-2">Core #{i + 1}</h3>
                                            <select
                                                value={coreEx.exerciseId}
                                                onChange={(e) => updateCoreExercises(i, "exerciseId", e.target.value)}
                                                className="p-2 border rounded w-full"
                                                required
                                            >
                                                <option value="">-- Elige un ejercicio de core --</option>
                                                {Object.keys(groupedCore).map((bp) => (
                                                    <optgroup key={bp} label={bp.toUpperCase()}>
                                                        {groupedCore[bp].map((opt) => (
                                                            <option key={opt._id} value={opt._id}>
                                                                {opt.name}
                                                            </option>
                                                        ))}
                                                    </optgroup>
                                                ))}
                                            </select>
                                            <div className="flex space-x-2 mt-2">
                                                <div className="w-1/4">
                                                    <label className="block text-sm font-semibold">Sets:</label>
                                                    <input
                                                        type="number"
                                                        min={1}
                                                        value={coreEx.sets}
                                                        onChange={(e) =>
                                                            updateCoreExercises(i, "sets", Number(e.target.value))
                                                        }
                                                        className="w-full p-1 border rounded"
                                                        required
                                                    />
                                                </div>
                                                <div className="w-1/4">
                                                    <label className="block text-sm font-semibold">Reps:</label>
                                                    <input
                                                        type="number"
                                                        min={1}
                                                        value={coreEx.repetitions}
                                                        onChange={(e) =>
                                                            updateCoreExercises(i, "repetitions", Number(e.target.value))
                                                        }
                                                        className="w-full p-1 border rounded"
                                                        required
                                                    />
                                                </div>
                                                <div className="w-1/4">
                                                    <label className="block text-sm font-semibold">Descanso (s):</label>
                                                    <input
                                                        type="number"
                                                        min={0}
                                                        value={coreEx.restTime}
                                                        onChange={(e) =>
                                                            updateCoreExercises(i, "restTime", Number(e.target.value))
                                                        }
                                                        className="w-full p-1 border rounded"
                                                        required
                                                    />
                                                </div>
                                                <div className="w-1/4">
                                                    <label className="block text-sm font-semibold">Nota:</label>
                                                    <input
                                                        type="text"
                                                        value={coreEx.note}
                                                        onChange={(e) =>
                                                            updateCoreExercises(i, "note", e.target.value)
                                                        }
                                                        className="w-full p-1 border rounded"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            <div>
                                <p className="font-semibold text-xl mb-2">Ejercicio de Cardio (1):</p>
                                {cardioExercise && (
                                    <div className="p-4 mb-4 border border-gray-200 rounded-lg shadow bg-white hover:bg-gray-50 transition-transform hover:scale-[1.01]">
                                        <select
                                            value={cardioExercise.exerciseId}
                                            onChange={(e) => updateCardioExercise("exerciseId", e.target.value)}
                                            className="p-2 border rounded w-full"
                                            required
                                        >
                                            <option value="">-- Elige un ejercicio de cardio --</option>
                                            {Object.entries(
                                                groupExercisesByBodyPart(
                                                    exercisesData.filter((e) => e.bodyPart?.toLowerCase() === "cardio")
                                                )
                                            ).map(([bp, items]) => (
                                                <optgroup key={bp} label={bp.toUpperCase()}>
                                                    {items.map((opt) => (
                                                        <option key={opt._id} value={opt._id}>
                                                            {opt.name}
                                                        </option>
                                                    ))}
                                                </optgroup>
                                            ))}
                                        </select>
                                        <div className="flex space-x-2 mt-2">
                                            <div className="w-1/4">
                                                <label className="block text-sm font-semibold">Sets:</label>
                                                <input
                                                    type="number"
                                                    min={1}
                                                    value={cardioExercise.sets}
                                                    onChange={(e) => updateCardioExercise("sets", Number(e.target.value))}
                                                    className="w-full p-1 border rounded"
                                                    required
                                                />
                                            </div>
                                            <div className="w-1/4">
                                                <label className="block text-sm font-semibold">Reps:</label>
                                                <input
                                                    type="number"
                                                    min={1}
                                                    value={cardioExercise.repetitions}
                                                    onChange={(e) =>
                                                        updateCardioExercise("repetitions", Number(e.target.value))
                                                    }
                                                    className="w-full p-1 border rounded"
                                                    required
                                                />
                                            </div>
                                            <div className="w-1/4">
                                                <label className="block text-sm font-semibold">Descanso (s):</label>
                                                <input
                                                    type="number"
                                                    min={0}
                                                    value={cardioExercise.restTime}
                                                    onChange={(e) =>
                                                        updateCardioExercise("restTime", Number(e.target.value))
                                                    }
                                                    className="w-full p-1 border rounded"
                                                    required
                                                />
                                            </div>
                                            <div className="w-1/4">
                                                <label className="block text-sm font-semibold">Nota:</label>
                                                <input
                                                    type="text"
                                                    value={cardioExercise.note}
                                                    onChange={(e) =>
                                                        updateCardioExercise("note", e.target.value)
                                                    }
                                                    className="w-full p-1 border rounded"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="flex justify-between">
                                <button
                                    type="submit"
                                    disabled={!canSubmitRoutine()}
                                    className={`px-4 py-2 rounded text-white transition ${canSubmitRoutine() ? "bg-green-500 hover:bg-green-600" : "bg-gray-400"
                                        }`}
                                >
                                    Guardar Rutina
                                </button>
                                <button
                                    type="button"
                                    onClick={handleReset}
                                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                                >
                                    Reiniciar
                                </button>
                            </div>
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
}
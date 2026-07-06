import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { refreshRequest } from "../../api";

export default function Professional({
    schedule,
    setSchedule,
    setView
}) {

    const [professionals, setProfessionals] = useState([]);
    const [selectedProfessionalId, setSelectedProfessionalId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const selectProfessional = (professional) => {
        setSelectedProfessionalId(professional.id);

        setSchedule(prev => ({
            ...prev,
            professional
        }));
    };

    useEffect(() => {
        if (!error) return;

        const timer = setTimeout(() => {
            setView(1);
        }, 2500);

        return () => clearTimeout(timer);
    }, [error, setView]);

    useEffect(() => {
        const loadProfessionals = async () => {
            const accessToken = localStorage.getItem("accessToken");

            try {
                const response = await fetch(
                    `http://localhost:6050/user/listarProfissionais?data=${schedule.selectedDay}&horario=${schedule.time}`,
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${accessToken}`
                        }
                    }
                );

                if (response.status === 401) {
                    await refreshRequest();
                    return;
                }

                if (!response.ok) {
                    throw new Error("Falha ao carregar profissionais.");
                }

                const data = await response.json();
                setProfessionals(data);

            } catch (err) {
                setError(err.message || "Falha interna do servidor");
            } finally {
                setLoading(false);
            }
        };

        loadProfessionals();
    }, [schedule.selectedDay, schedule.time]);

    return (
        <>
            {loading ? (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="min-h-screen bg-linear-to-br from-violet-700 via-blue-600 to-black flex flex-col justify-center items-center"
                >

                    <div className="loadingContainer">
                        <div className="loadingCircle"></div>
                        <div className="loadingCircleMinor"></div>
                        <div className="loadingCircleMajor"></div>
                        <div className="loadingCircleReverse"></div>
                    </div>

                    <p className="text-violet-100 text-3xl mt-8 tracking-widest">
                        Carregando profissionais...
                    </p>

                </motion.div>
            ) : (
                <motion.div
                    initial={{ opacity: 0, y: 25 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="min-h-screen bg-linear-to-br from-violet-700 via-blue-600 to-black flex justify-center items-center px-6"
                >

                    <div className="w-full max-w-lg bg-white/10 backdrop-blur-xl rounded-3xl border border-violet-400/20 shadow-2xl p-8">

                        <h1 className="text-4xl font-bold text-center text-white">
                            Escolha o profissional
                        </h1>

                        <p className="text-violet-200 text-center mt-3">
                            Selecione quem realizará seu atendimento.
                        </p>

                        <div className="mt-8 space-y-4">

                            {professionals.map((professional) => {

                                const selected =
                                    selectedProfessionalId === professional.id;

                                return (
                                    <motion.div
                                        key={professional.id}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={() => selectProfessional(professional)}
                                        className={`
                                            cursor-pointer rounded-2xl border transition-all duration-300 overflow-hidden
                                            ${selected
                                                ? "bg-violet-600 border-violet-300 shadow-2xl"
                                                : "bg-white/10 border-violet-400/20 hover:bg-violet-500/20"
                                            }
                                        `}
                                    >

                                        <div className="flex items-center gap-5 px-6 py-5">

                                            <motion.img
                                                src={professional.photo}
                                                alt={professional.username}
                                                animate={{
                                                    scale: selected ? 1.08 : 1
                                                }}
                                                transition={{ duration: 0.2 }}
                                                className={`
                                                    w-20 h-20 rounded-full object-cover border-4
                                                    ${selected
                                                        ? "border-white"
                                                        : "border-violet-400/40"
                                                    }
                                                `}
                                            />

                                            <h2 className="text-2xl font-bold text-white">
                                                {professional.username}
                                            </h2>

                                        </div>

                                    </motion.div>
                                );
                            })}

                        </div>

                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.97 }}
                            disabled={!selectedProfessionalId}
                            onClick={() => setView(3)}
                            className="w-full mt-8 py-4 rounded-xl bg-violet-600 hover:bg-violet-500 disabled:bg-violet-900 disabled:cursor-not-allowed text-white text-xl font-semibold"
                        >
                            Continuar →
                        </motion.button>

                    </div>

                </motion.div>
            )}
        </>
    );
}
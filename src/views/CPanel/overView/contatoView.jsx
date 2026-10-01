import React, { useEffect, useState } from 'react';
import { motion } from "framer-motion";
import { FaX } from 'react-icons/fa6';

export default function ContatoOverView({ userId, setEditContato, editContato, isCreating, setShowEditContato }) {

    const saveContato = async () => {
        console.log("ação saveContato!")

        const auth = localStorage.getItem("accessToken");

        if (isCreating) {

            try {
                const response = await fetch(
                    import.meta.env.VITE_APP_BASE_URL + "/admin/cadastrarContato?userId=" + userId,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": "Bearer " + auth
                        },
                        body: JSON.stringify({
                            numero: editContato.numero,
                            categoria: editContato.categoria,
                            descricao: editContato.descricao
                        }),
                    }
                );

                if (!response.ok) {
                    throw new Error("Erro ao cadastrar contato.");
                }

                const data = await response.json();
                setShowEditContato(false);


            } catch (err) {

            }
        }
        if (!isCreating) {
            try {
                const response = await fetch(
                    import.meta.env.VITE_API_BASE_URL + "/admin/editarContato?id=" + editContato.id,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": "Bearer " + auth
                        },
                        body: JSON.stringify({
                            id: editContato.id,
                            numero: editContato.numero,
                            categoria: editContato.categoria,
                            descricao: editContato.descricao
                        }),
                    }
                );

                if (!response.ok) {
                    throw new Error("Erro ao cadastrar contato.");
                }

                const data = await response.json();
                setShowEditContato(false);


            } catch (err) {

            }
        }
    }

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.5, x: 500 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0, x: 500 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-6"
        >
            <div className="w-full max-w-3xl rounded-3xl shadow-2xl p-10 border border-purple-700 bg-linear-to-br from-gray-800 to-black">

                {/* Cabeçalho */}
                <div className="border-b border-purple-500/20 px-2 pb-6 mb-8 flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-bold text-white">
                            Cadastrar contato
                        </h2>

                        <p className="text-gray-400 text-sm mt-1">
                            Adicione um novo contato ao usuário.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={() => setShowEditContato(false)}
                        className="border border-gray-600 text-white py-3 px-4 rounded-2xl
                           shadow-blue-400 shadow-2xl hover:scale-110
                           hover:text-white transition-all duration-100 cursor-pointer"
                    >
                        <FaX size={22} className="text-red-600" />
                    </button>
                </div>

                {/* Formulário */}
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        saveContato();
                    }}
                >

                    {/* Número */}
                    < div className="w-full mb-6" >
                        <label className="block text-sm font-semibold text-gray-300 mb-2">
                            Número
                        </label>

                        <input
                            type="tel"
                            value={editContato.numero || ""}
                            onChange={(e) =>
                                setEditContato({
                                    ...editContato,
                                    numero: e.target.value,
                                })
                            }
                            className="w-full rounded-xl border border-gray-600
                               bg-gray-900 text-white px-4 py-3
                               outline-none transition
                               focus:border-purple-500
                               focus:ring-2 focus:ring-purple-500/30"
                            placeholder="(00) 00000-0000"
                            required
                        />
                    </div >

                    {/* Categoria */}
                    < div className="w-full mb-6" >
                        <label className="block text-sm font-semibold text-gray-300 mb-2">
                            Categoria
                        </label>

                        <select
                            value={editContato.categoria || ""}
                            onChange={(e) =>
                                setEditContato({
                                    ...editContato,
                                    categoria: e.target.value,
                                })
                            }
                            className="w-full rounded-xl border border-gray-600
                               bg-gray-900 text-white px-4 py-3
                               outline-none transition
                               focus:border-purple-500
                               focus:ring-2 focus:ring-purple-500/30
                               cursor-pointer"
                            required
                        >
                            <option value="" disabled>
                                Selecione uma categoria
                            </option>

                            <option value="Pessoal">
                                Pessoal
                            </option>

                            <option value="Comercial">
                                Comercial
                            </option>

                            <option value="Residencial">
                                Residencial
                            </option>

                            <option value="TelefoneRural">
                                Telefone Rural
                            </option>
                        </select>
                    </div >

                    {/* Descrição */}
                    < div className="w-full mb-8" >
                        <label className="block text-sm font-semibold text-gray-300 mb-2">
                            Descrição
                        </label>

                        <input
                            type="text"
                            value={editContato.descricao || ""}
                            onChange={(e) =>
                                setEditContato({
                                    ...editContato,
                                    descricao: e.target.value,
                                })
                            }
                            className="w-full rounded-xl border border-gray-600
                               bg-gray-900 text-white px-4 py-3
                               outline-none transition
                               focus:border-purple-500
                               focus:ring-2 focus:ring-purple-500/30"
                            placeholder="Ex: WhatsApp pessoal"
                        />
                    </div >

                    {/* Botões */}
                    < div className="flex justify-end gap-4 border-t border-purple-500/20 pt-6" >

                        <button
                            type="button"
                            onClick={() => setShowEditContato(false)}
                            className="border border-gray-600
                               text-white py-3 px-6 rounded-2xl
                               hover:bg-gray-700
                               transition-all duration-200
                               cursor-pointer"
                        >
                            Cancelar
                        </button>

                        <button
                            type="submit"
                            className="bg-purple-700
                               text-white py-3 px-8 rounded-2xl
                               shadow-lg shadow-purple-500/30
                               hover:bg-purple-600
                               hover:scale-105
                               transition-all duration-200
                               cursor-pointer"
                        >
                            Salvar contato
                        </button>

                    </div >
                </form >
            </div >
        </motion.div >
    )
}
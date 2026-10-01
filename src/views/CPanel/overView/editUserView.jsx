import React, {useEffect, useState} from 'react';
import { motion } from "framer-motion";

import EditContatoView from './contatoView';
export default function EditUserView({setOverView, userId}) {

    const [error, setError]=useState("");
    const [showConfirm, setShowConfirm]=useState(false);
    const [showEditContato, setShowEditContato]=useState(false);
    const [showResult, setShowResult]=useState(false);
    const [editUser, setEditUser] = useState({
    id: "",
    username: "",
    contatos: [],
    email: "",
    role: ""
  })
  const [editContato, setEditContato]=useState({
    id:"",
    numero:"",
    categoria:"",
    descricao:""
  })
  const [isCreating, setIsCreating]=useState(true);

  const [loading, setLoading] = useState(true);

  const desatribuirContato = async () => {
    const accessToken = localStorage.getItem("accessToken");

    try {
      const response = await fetch(
        import.meta.env.VITE_APP_BASE_URL + "/admin/desatribuirContatoUsuario?userId=", {
          method:"PUT",
          headers:{
            "Authorization":"Bearer " + accessToken
          }
        }
      )

      const data = await response.json();

      setRes

    } catch (err) {
      setError(err.message || "Não foi possível desatribuir o contato ao usuario!");
    }
  }

  useEffect(() => {
    const carregarUsuario = async () => {
      const accessToken = localStorage.getItem("accessToken");

      try {
        setLoading(true);

        const [userResponse, contatosResponse] = await Promise.all([
          fetch(
          import.meta.env.VITE_APP_BASE_URL + "/admin/findUserById?id=" + userId,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + accessToken
              }
            }
          ),

          fetch(
            import.meta.env.VITE_APP_BASE_URL + "/admin/contatosUsuario?userId=" + userId,
            {
              method: "GET",
              headers: {
                "Authorization": "Bearer " + accessToken
              }
            }
          )
        ]);

        if (!userResponse.ok) {
          throw new Error("Não foi possível encontrar o usuário.");
        }

        if (!contatosResponse.ok) {
          throw new Error("Não foi possível encontrar os contatos.");
        }

        const userData = await userResponse.json();
        const contatosData = await contatosResponse.json();

        // Só atualiza o estado depois que TODAS as informações chegaram
        setEditUser({
          id: userData.id,
          username: userData.username,
          email: userData.email,
          role: userData.role,
          foto: userData.foto,
          contatos: contatosData
        });

        setError("");
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    carregarUsuario();
  }, [userId]);

  async function editarUsuario(editUser) {
    
    const auth = localStorage.getItem('accessToken')
    
    try {
      const response = await fetch(import.meta.env.VITE_APP_BASE_URL + "/admin/editarUsuario", {
        method:'PUT',
        headers:{
          'Content-Type':'application/json',
          'Authorization':'Bearer ' + auth
        },
        body:JSON.stringify({
            id: editUser.id,
            username: editUser.username,
            email: editUser.email,
            role: editUser.role
        })

        
      })
    } catch(err) {
      if (err.status === 401) {
        setError("Não autorizado");
      }
    }
  }

    /*try {
      const response = await fetch("http://localhost:6050/admin/contatosUsuario?userId=" + editUser.id, {
        method:"GET",
        headers: {"Authorization":"Bearer " + accessToken}
      })

      const data = await response.json();

      if (!data.lenght === 0) {
        setEditUser({
          ...editUser,
          contatos: {data}
        })
      }
    } catch (err) {
      
    }*/

    if (!loading) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.5, x: 500 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0, x: 500 }}
            transition={10}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm "
        >
          {/*OverViews */}
          {showEditContato && <EditContatoView userId={editUser.id} setEditContato={setEditContato} editContato={editContato} isCreating={isCreating} setShowEditContato={setShowEditContato}/>}

          {showResult }

        <div className="w-full max-w-3xl rounded-3xl bg-white shadow-2xl overflow-hidden">
                {/* Header */}
                <div className="bg-linear-to-r from-purple-600 to-purple-400 px-8 py-6 text-white">
                    <h1 className="text-2xl font-bold"> Editar usuário </h1>
                    <p className="text-sm text-purple-100 mt-1"> Atualize as informações do usuário abaixo.
                    </p>
                </div>
                {/* Form */}
                <form
                    onSubmit={(e) => { e.preventDefault(); setShowConfirm(true); }}
                    className="p-5" >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        {/* Informações principais */}
                        <div className="flex flex-col items-center">
                            {/* Foto */}
                            <div className="mb-2">
                                <div className="w-full h-full p-10 aspect-square rounded-full overflow-hidden border-4 border-purple-200 shadow-lg bg-gray-100 flex items-center justify-center">
                                    {editUser.foto ? (
                                        <img src={editUser.foto} alt={`Foto de ${editUser.username}`}
                                            className="w-full h-full object-cover" />
                                    ) : (
                                        <span
                                            className="text-4xl font-bold text-purple-400">
                                            {editUser.username?.charAt(0).toUpperCase()} </span>)}
                                </div>
                            </div>
                            <div className="w-full">
                                <label className="block text-lg font-medium text-gray-700 mb-1">
                                    Nome de usuário
                                </label>
                                <input type="text" value={editUser.username || ""}
                                    onChange={(e) => setEditUser({ ...editUser, username: e.target.value })}
                                    className="w-full rounded-xl border border-gray-300 bg-gray-50 px-3 py-2 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-200 font-medium"
                                    placeholder="Nome de usuário" />
                            </div>
                        </div>
                        {/* Dados de contato */}
                        <div className="flex flex-col gap-5">
                            {/* Email */}
                            <div>
                                <label className="block text-lg font-semibold text-gray-700 mb-2"> E-mail </label>
                                <input type="email"
                                    value={editUser.email || ""}
                                    onChange={(e) => setEditUser({
                                        ...editUser,
                                        email: e.target.value
                                    })} className="w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-200" placeholder="email@exemplo.com" />
                            </div>
                            {/* Role */}
                            <div>
                                <label className="block text-lg font-semibold text-gray-700 mb-2"> Nível de permissão
                                </label>
                                <div className="w-full rounded-xl border border-gray-200 bg-gray-100 px-4 py-3"> <span className="font-semibold text-purple-600"> {editUser.role}
                                </span>
                                </div>
                            </div>
                        </div>
                        {/* Contatos */}
<div className="md:col-span-2">
    <div className="rounded-2xl border border-gray-200 bg-gray-50 p-5">

        {/* Cabeçalho */}
        <div className=" flex items-center justify-between">
            <div>
                <h2 className="text-lg font-bold text-gray-800">
                    Contatos
                </h2>

                <p className="text-sm text-gray-800 font-medium">
                    Telefones e outros meios de contato
                </p>
            </div>

            <span className="rounded-full bg-purple-100 px-4 py-1 text-sm font-semibold text-purple-600">
                {editUser.contatos?.length || 0}
            </span>
        </div>

        {/* Lista */}
        {editUser.contatos?.length > 0 ? (
            <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                {editUser.contatos.map((contato) => (
                    <div
                        key={contato.id}
                        className="group flex items-center justify-between rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition hover:border-purple-300 hover:shadow-md"
                    >
                        {/* Informações */}
                        <div className="flex min-w-0 items-center gap-3">

                            {/* Ícone */}
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-purple-100 text-purple-600">
                                ☎
                            </div>

                            {/* Dados */}
                            <div className="min-w-0">
                                <div className="flex items-center gap-2">
                                    <span className="font-semibold text-gray-800">
                                        {contato.numero}
                                    </span>

                                    {contato.categoria && (
                                        <span className="rounded-full bg-purple-50 px-2 py-0.5 text-xs font-medium text-purple-600">
                                            {contato.categoria}
                                        </span>
                                    )}
                                </div>

                                {contato.descricao && (
                                    <p className="mt-1 truncate text-sm text-gray-500">
                                        {contato.descricao}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Ações */}
                        <div className="ml-3 flex shrink-0 gap-2">

                            <button
                                type="button"
                                className="rounded-lg p-2 text-gray-400 transition hover:bg-purple-50 hover:text-purple-600"
                                title="Editar contato"
                            >
                                ✎
                            </button>

                            <button
                                type="button"
                                onClick={() => desatribuirContato()}
                                className="rounded-lg p-2 text-gray-400 transition hover:bg-red-50 hover:text-red-500"
                                title="Remover contato"
                            >
                                ✕
                            </button>

                        </div>
                    </div>
                ))}
            </div>
        ) : (
            /* Nenhum contato */
            <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-gray-300 bg-white px-6 py-10 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 text-xl text-gray-400">
                    ☎
                </div>

                <h3 className="font-semibold text-gray-700">
                    Nenhum contato cadastrado
                </h3>

                <p className="mt-1 text-sm text-gray-400">
                    Este usuário ainda não possui contatos.
                </p>
                <div onClick={() => {
                  setShowEditContato(true);
                  setIsCreating(true);
                  setEditContato({
                    id:"",
                    numero:"",
                    categoria:"",
                    descricao:""
                  });
                }}
                className="p-1 text-purple-600 flex justify-center align-middle border-2 border-purple-400 shadow-2xl cursor-pointer rounded-2xl hover:scale-110 hover:text-white hover:bg-purple-600 transition-all duration-100 font-bold">
                  Cadastrar Contato
                </div>
            </div>
        )}

    </div>
</div>
                    </div>
                    {/* Botões */}
                    <div className="flex justify-end gap-4 mt-10 pt-6 border-t border-gray-200">
                        <button type="button"
                            onClick={() => setOverView(0)} className="rounded-xl border border-gray-300 px-6 py-3 font-semibold text-gray-600 transition hover:bg-gray-100" > Voltar
                        </button>
                        <button type="submit" className="rounded-xl bg-purple-600 px-6 py-3 font-semibold text-white shadow-lg transition hover:bg-purple-700 hover:shadow-xl" >
                            Salvar alterações
                        </button>
                    </div>
                </form>
            </div>
            {/* Popup de confirmação */}
            {showConfirm && (
                <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/50 backdrop-blur-sm p-6">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="w-full max-w-md rounded-2xl bg-white p-7 shadow-2xl" >
                        <h2 className="text-xl font-bold text-gray-800">
                            Tem certeza?
                        </h2>
                        <p className="mt-3 text-gray-600">
                            Você está prestes a salvar as alterações deste usuário. Deseja continuar?
                        </p>
                        <div className="flex justify-end gap-3 mt-7">
                            <button type="button"
                                onClick={() => setShowConfirm(false)} className="rounded-xl border border-gray-300 px-5 py-2.5 font-semibold text-gray-600 transition hover:bg-gray-100" >
                                Cancelar
                            </button>
                            <button type="button" onClick={() => { setShowConfirm(false); editarUsuario(editUser) }}
                                className="rounded-xl bg-purple-600 px-5 py-2.5 font-semibold text-white transition hover:bg-purple-700" > Sim, salvar
                            </button>
                        </div>
                    </motion.div>
                    {showResult && (
  <div className="fixed inset-0 z-70 flex items-center justify-center bg-black/50 backdrop-blur-sm p-6">

    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className="w-full max-w-md rounded-2xl bg-white p-7 shadow-2xl text-center"
    >

      <div className="mb-4 text-5xl">
        {resultMessage.includes("sucesso") ? "✓" : "✕"}
      </div>

      <h2 className="text-xl font-bold text-gray-800">
        {resultMessage.includes("sucesso")
          ? "Edição concluída"
          : "Erro"}
      </h2>

      <p className="mt-3 text-gray-600">
        {resultMessage}
      </p>

      <button
        type="button"
        onClick={() => {
          setShowResult(false);

          // opcional: voltar para a lista
          if (resultMessage.includes("sucesso")) {
            setOverView(0);
          }
        }}
        className="mt-7 rounded-xl bg-purple-600 px-6 py-3 font-semibold text-white hover:bg-purple-700"
      >
        OK
      </button>

    </motion.div>

  </div>
)}
                </div>)}
        </motion.div >
    )
}}
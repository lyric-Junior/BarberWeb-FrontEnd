import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

//Mui Material
import {
  Button,
  Popover,
  RadioGroup,
  FormControlLabel,
  Radio
} from "@mui/material";

//Icons
import { FaFilter, FaUser, FaPen, FaArrowAltCircleLeft } from "react-icons/fa";

import { FaMagnifyingGlass } from "react-icons/fa6";

export default function Users(setView) {

  const [editUser, setEditUser] = useState({
    id: String,
    username: "",
    numero: "",
    email: "",
    role: ""
  })

  const [showConfirm, setShowConfirm]=useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState('');
  const [search, setSearch] = useState('');

  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);

  async function findUserById(id) {
    const accessToken = localStorage.getItem('accessToken');
    try {
      const response = await fetch('http://localhost:6050/admin/findUserById?id=' + id, {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + accessToken
        }
      }
      )

      const data = await response.json();

      setEditUser({
        ...editUser,
        id: data.id,
        username: data.username,
        numero: data.numero,
        email: data.email,
        role: data.role,
        foto: data.foto
      });

      setIsEditing(true);
      setError(null);

    } catch (err) {
      setError(err.message);
    }
  }

  async function editarUsuario(editUser) {
    
    const auth = localStorage.getItem('accessToken')
    
    try {
      const response = await fetch('http://localhost:6050/admin/editarUsuario', {
        method:'PUT',
        headers:{
          'Content-Type':'application/json',
          'Authorization':'Bearer ' + auth
        },
        body:JSON(editUser)
      })
    } catch(err) {
      if (err.status === 401) {
        setError("Não autorizado")
      }
    }
  }

  useEffect(() => {
    const handleUsers = async () => {
      const accessToken = localStorage.getItem('accessToken');

      try {
        const response = await fetch('http://localhost:6050/admin/listarUsuarios', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + accessToken
          }
        })

        const data = await response.json();

        setUsers(data);
        console.log(data);
      } catch (err) {
        if (err.status === 401) {
          setError("Sessão expirada, atualize a pagina!")
        }
      }
    }
    handleUsers();
  }, [])

  const searchUsers = async (e) => {
    e.preventDefault();

    const accessToken = localStorage.getItem("accessToken");

    try {

      const query = new URLSearchParams();

      if (filter === "username") {
        query.append("username", search);
      }

      if (filter === "email") {
        query.append("email", search);
      }

      if (filter === "cpf") {
        query.append("cpf", search);
      }

      const response = await fetch(
        `http://localhost:6050/admin/listarUsuariosComFiltro?${query.toString()}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`
          }
        }
      );

      if (!response.ok) {
        throw new Error("Erro ao buscar usuários.");
      }

      if (response.ok) {
        setError(null);
      }

      const data = await response.json();
      setUsers(data);

    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex-1 p-8 ml-56">
      <button
        onClick={() => setIsEditing(false)}
        className=""
      >

      </button>
      {isEditing ? (
        <motion.div 
        initial={{ opacity: 0, scale: 0.5, x:500 }}
        animate={{ opacity: 1, scale: 1 , x:0}} 
        exit={{ opacity: 0, scale: 0 ,x:500}} 
        transition={10}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-6" 
        > 
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
            className="p-8" > 
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10"> 
              {/* Informações principais */} 
              <div className="flex flex-col items-center"> 
                {/* Foto */} 
                <div className="mb-6"> 
                  <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-purple-200 shadow-lg bg-gray-100 flex items-center justify-center"> 
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
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Nome de usuário 
                  </label> 
                  <input type="text" value={editUser.username || ""} 
                  onChange={(e) => setEditUser({ ...editUser, username: e.target.value })} 
                  className="w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-200" 
                  placeholder="Nome de usuário" /> 
                </div> 
                </div> 
                {/* Dados de contato */} 
                <div className="flex flex-col gap-5"> 
                  {/* Email */} 
                  <div> 
                    <label className="block text-sm font-semibold text-gray-700 mb-2"> E-mail </label> 
                    <input type="email" 
                    value={editUser.email || ""} 
                    onChange={(e) => setEditUser({ 
                      ...editUser, 
                      email: e.target.value })} className="w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-200" placeholder="email@exemplo.com" /> 
                  </div> 
                  {/* Número */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2"> Número de contato 
                    </label> 
                    <input type="tel" 
                    value={editUser.numero || ""} 
                    onChange={(e) => setEditUser({ 
                      ...editUser, 
                      numero: e.target.value })} className="w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-200" 
                      placeholder="(00) 00000-0000" /> 
                    </div> 
                    {/* Role */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2"> Nível de permissão 
                      </label> 
                      <div className="w-full rounded-xl border border-gray-200 bg-gray-100 px-4 py-3"> <span className="font-semibold text-purple-600"> {editUser.role} 
                      </span> 
                    </div> 
                  </div> 
                </div> 
              </div> 
            {/* Botões */} 
          <div className="flex justify-end gap-4 mt-10 pt-6 border-t border-gray-200"> 
        <button type="button" 
        onClick={() => setIsEditing(false)} className="rounded-xl border border-gray-300 px-6 py-3 font-semibold text-gray-600 transition hover:bg-gray-100" > Voltar 
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
    <button type="button" onClick={() => { setShowConfirm(false); editarUsuario(editUser)}} 
    className="rounded-xl bg-purple-600 px-5 py-2.5 font-semibold text-white transition hover:bg-purple-700" > Sim, salvar 
  </button> 
</div> 
</motion.div> 
</div>)} 
</motion.div >
      ) : (
  <div className="hidden"></div>
)}
{/* Cabeçalho */ }
<motion.div
  initial={{ opacity: 0, x: -100 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ duration: 0.4 }}
  className="mb-8"
>
  <h1 className="text-3xl font-bold text-gray-800">
    Gerenciamento de Usuários
  </h1>
  <p className="text-gray-500">
    Visualize e pesquise usuários cadastrados.
  </p>
</motion.div>

{/* Card de estatísticas */ }
<motion.div
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.4 }}
  className="bg-white rounded-2xl shadow-md p-6 flex justify-between items-center mb-8"
>
  <div>
    <p className="text-gray-500">Usuários cadastrados</p>
    <h2 className="text-4xl font-bold text-violet-600">
      {users.length}
    </h2>
  </div>

  <FaUser size={50} className="text-violet-600" />
</motion.div>

{/* Barra de pesquisa */ }
<motion.div
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
>
  <form
    onSubmit={searchUsers}
    className="bg-white rounded-2xl shadow-md p-5 flex items-center gap-4"
  >
    <Button
      variant="contained"
      onClick={(e) => setAnchorEl(e.currentTarget)}
    >
      <FaFilter className="mr-2" />
      Filtro
    </Button>

    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={() => setAnchorEl(null)}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
    >
      <RadioGroup
        value={filter}
        defaultValue="username"
        onChange={(e) => setFilter(e.target.value)}
        sx={{ p: 2 }}
      >
        <FormControlLabel
          value="username"
          control={<Radio />}
          label="Nome"
        />
        <FormControlLabel
          value="email"
          control={<Radio />}
          label="Email"
        />
        <FormControlLabel
          value="cpf"
          control={<Radio />}
          label="CPF"
        />
      </RadioGroup>
    </Popover>

    <input
      type="text"
      value={search}
      placeholder="Pesquisar..."
      className="flex-1 rounded-xl border border-gray-300 px-4 py-2 outline-none focus:border-violet-500"
      onChange={(e) => setSearch(e.target.value)}
    />

    <button
      type="submit"
      className="bg-violet-600 text-white rounded-xl p-3 hover:bg-violet-700 transition-all"
    >
      <FaMagnifyingGlass />
    </button>
  </form>
</motion.div>

{/* Lista de usuários */ }
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ delay: 0.2 }}
  className="mt-8 bg-white rounded-2xl shadow-md overflow-hidden"
>
  <table className="w-full">
    <thead className="bg-violet-600 text-white">
      <tr>
        <th className="text-left p-4">Nome</th>
        <th className="text-left p-4">Email</th>
        <th className="text-left p-4">Numero</th>
        <th className="text-left p-4"></th>
      </tr>
    </thead>

    <tbody>
      {users.length > 0 ? (
        users.map((user) => (
          <tr
            key={user.id}
            className="border-b hover:bg-gray-100 transition-colors"
          >
            <td className="p-4">{user.username}</td>
            <td className="p-4">{user.email}</td>
            <td className="p-4">{user.numero}</td>
            <td><button
              onClick={() => findUserById(user.id)}
              className="text-white p-2 rounded-xl bg-purple-800 hover:bg-purple-400
                    "
            >
              <FaPen size={20} />
            </button></td>
          </tr>
        ))
      ) : (
        <tr>
          <td
            colSpan={3}
            className="text-center p-8 text-gray-500"
          >
            Nenhum usuário encontrado.
          </td>
        </tr>
      )}
    </tbody>
  </table>
</motion.div>
{
  error && (
    <p className="mt-4 text-red-600 font-medium">
      {error}
    </p>
  )
}
    </div >
  );
  }
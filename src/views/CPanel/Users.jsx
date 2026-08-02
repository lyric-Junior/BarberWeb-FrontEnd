import React, {useEffect, useState} from "react";
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
import { FaFilter, FaUser } from "react-icons/fa";

//Sidebar import
import Sidebar from './sidebar';
import { FaMagnifyingGlass } from "react-icons/fa6";

export default function Users({setView}) {

    const [users, setUsers]=useState([]);
    const [error, setError]=useState('');
    const [loading, setLoading]=useState(false);
    const [filter, setFilter]=useState('');
    const [search, setSearch]=useState('');

     const [anchorEl, setAnchorEl] = useState(null);

    const open = Boolean(anchorEl);

    const findUserById = async(e) => {
        e.preventDefault();
        const accessToken = localStorage.getItem('accessToken');
        try {
            const response = await fetch('http://localhost:6050/admin/findUserById')
        } catch(err) {
            setError(err.message);
        }
    }

    useEffect(() => {
        const handleUsers = async() => {
            const accessToken = localStorage.getItem('accessToken');
            console.log('comecando')

            try {
                const response = await fetch('http://localhost:6050/admin/listarUsuarios', {
                    headers: {
                        'Content-Type':'application/json',
                        'Authorization':'Bearer ' + accessToken
                    }
                })

                const data = await response.json();

                setUsers(data);
                console.log(data);
            } catch(err){
                setError(err.message || 'nope');
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

        const data = await response.json();
        setUsers(data);

    } catch (err) {
        setError(err.message);
    }
};

    return (
  <div className="flex min-h-screen bg-gray-100">
    {/* Sidebar */}
    <Sidebar setView={setView}/>

    {/* Conteúdo Principal */}
    <div className="flex-1 p-8 ml-56">

      {/* Cabeçalho */}
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

      {/* Card de estatísticas */}
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

      {/* Barra de pesquisa */}
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

      {/* Lista de usuários */}
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
            </tr>
          </thead>

          <tbody>
            {users.length > 0 ? (
              users.map((user) => (
                <tr
                onClick={(e) => findUserById()}
                  key={user.id}
                  className="border-b hover:bg-gray-100 transition-colors"
                >
                    <td className="p-4">{user.username}</td>
                    <td className="p-4">{user.email}</td>
                    <td className="p-4">{user.numero}</td>
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

      {error && (
        <p className="mt-4 text-red-600 font-medium">
          {error}
        </p>
      )}
    </div>
  </div>
);
}
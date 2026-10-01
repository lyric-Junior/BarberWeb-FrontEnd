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

import EditUserView from "./overView/editUserView"

//Icons
import { FaFilter, FaUser, FaPen, FaArrowAltCircleLeft, FaCopy } from "react-icons/fa";

import { FaMagnifyingGlass } from "react-icons/fa6";

export default function Users(setView) {

  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState('');
  const [search, setSearch] = useState('');
  const [overView, setOverView]=useState("0");

  const [selectedUserId, setSelectedUserId]=useState("");

  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);

  useEffect(() => {
    const handleUsers = async () => {
      const accessToken = localStorage.getItem('accessToken');

      try {
        const response = await fetch(import.meta.env.VITE_APP_BASE_URL + '/admin/listarUsuarios', {
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
    <div className="flex-1 p-8">

      {overView === 1 && <EditUserView setOverView={setOverView} userId={selectedUserId} />}
      

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

  <FaUser size={30} className="text-violet-600" />
</motion.div>

      {/* Barra de pesquisa */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-3xl"
      >
        <form
          onSubmit={searchUsers}
          className="
      w-full
      rounded-2xl
      bg-white
      p-3 sm:p-4
      shadow-md
      flex
      flex-col
      gap-3
      sm:flex-row
      sm:items-center
    "
        >
          {/* Filtro */}
          <Button
            variant="contained"
            onClick={(e) => setAnchorEl(e.currentTarget)}
            className="w-full sm:w-auto"
          >
            <FaFilter className="mr-2" />
            Filtro
          </Button>

          {/* Popover */}
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

          {/* Campo de pesquisa */}
          <input
            type="text"
            value={search}
            placeholder="Pesquisar..."
            className="
        w-full
        min-w-0
        flex-1
        rounded-xl
        border
        border-gray-300
        bg-white
        px-4
        py-3
        text-sm sm:text-base
        outline-none
        transition
        focus:border-violet-500
        focus:ring-2
        focus:ring-violet-200
      "
            onChange={(e) => setSearch(e.target.value)}
          />

          {/* Botão pesquisar */}
          <button
            type="submit"
            className="
        w-full
        sm:w-auto
        shrink-0
        rounded-xl
        bg-violet-600
        p-3
        text-white
        transition-all
        hover:bg-violet-700
        active:scale-95
        flex
        items-center
        justify-center
      "
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
        className="mt-8 w-full"
      >
        {users.length > 0 ? (
          <>
            {/* Desktop / Tablet */}
            <div className="hidden sm:block w-full overflow-x-auto rounded-lg bg-white shadow-md">
              <table className="w-full min-w-150">
                <thead className="bg-violet-600 text-white">
                  <tr>
                    <th className="w-20 p-4 text-center">Id</th>
                    <th className="p-4 text-left">Nome</th>
                    <th className="p-4 text-left">Email</th>
                    <th className="w-20 p-4 text-center">Ações</th>
                  </tr>
                </thead>

                <tbody>
                  {users.map((user) => (
                    <tr
                      key={user.id}
                      className="border-b transition-colors hover:bg-gray-100"
                    >
                      <td className="p-4 text-center">
                        <button
                          type="button"
                          onClick={() =>
                            navigator.clipboard.writeText(user.id)
                          }
                          className="mx-auto flex items-center justify-center text-orange-500 transition-colors hover:text-purple-500"
                          title="Copiar ID"
                        >
                          <FaCopy size={22} />
                        </button>
                      </td>

                      <td className="p-4">
                        <span className="wrap-break-word">
                          {user.username}
                        </span>
                      </td>

                      <td className="p-4">
                        <span className="break-all">
                          {user.email}
                        </span>
                      </td>

                      <td className="p-4 text-center">
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedUserId(user.id);
                            setOverView(1);
                          }}
                          className="rounded-xl bg-purple-800 p-2 text-white transition-colors hover:bg-purple-400"
                          title="Editar usuário"
                        >
                          <FaPen size={20} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile */}
            <div className="flex flex-col gap-4 sm:hidden">
              {users.map((user) => (
                <div
                  key={user.id}
                  className="rounded-xl bg-white p-4 shadow-md"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-semibold uppercase text-gray-500">
                        Nome
                      </p>

                      <p className="mt-1 wrap-break-word font-medium text-gray-800">
                        {user.username}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        navigator.clipboard.writeText(user.id)
                      }
                      className="shrink-0 text-orange-500 transition-colors hover:text-purple-500"
                      title="Copiar ID"
                    >
                      <FaCopy size={22} />
                    </button>
                  </div>

                  <div className="mt-4">
                    <p className="text-xs font-semibold uppercase text-gray-500">
                      Email
                    </p>

                    <p className="mt-1 break-all text-gray-700">
                      {user.email}
                    </p>
                  </div>

                  <div className="mt-4 flex justify-end border-t pt-4">
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedUserId(user.id);
                        setOverView(1);
                      }}
                      className="flex items-center gap-2 rounded-xl bg-purple-800 px-4 py-2 text-white transition-colors hover:bg-purple-400"
                    >
                      <FaPen size={18} />
                      <span>Editar</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="rounded-lg bg-white p-8 text-center text-gray-500 shadow-md">
            Nenhum usuário encontrado.
          </div>
        )}
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
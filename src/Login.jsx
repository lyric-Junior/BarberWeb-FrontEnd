import React, {useState, useEffect } from 'react'
import {AnimatePresence, motion} from 'framer-motion'
import { useNavigate } from 'react-router'

function Login() {
  
  //Loadings
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingMain, setIsLoadingMain] = useState(true);
  //User Informations
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [numero, setNumero] = useState('');

  //Login || Registro
  const [isLogin, setIsLogin] = useState(true);

  //DOM content needs it
  const [error, setError] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  //Use navigate good enough
  const navigate =  useNavigate();
  
  //Loading screen before loginView ignoring DOMContentLoaded
  useEffect(() => {
  const timer = setTimeout(() => {
    setIsLoadingMain(false);
  }, 2000);

  return () => clearTimeout(timer);
  }, []);

  const handleLogin = async() => {
    setIsLoading(true);
    try {
      const response = await fetch(`http://localhost:6050/auth/login`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({email, password})
      })

      if (!response.ok) {
        throw new Error(response.message && response.status || 'nope')
      }

      const data = await response.json();

      localStorage.setItem('email', email);
      localStorage.setItem('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);
      localStorage.setItem('username', data.username);
      localStorage.setItem('numero', data.numero);
      localStorage.setItem('userId', data.userId)

      if (data.role === 'DEVELOPER' || data.role === 'ADMIN') {
        navigate('/CPanel');
      } else {
        navigate('/panel')
      }
    } catch (err) {
      setError(err.message);
      console.log(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  const handleRegister = async() => {
    setIsLoading(true);
    try {
      const response = await fetch(`http://localhost:6050/auth/cadastrarUsuario`, {
        method: 'POST',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify({username, email, password, numero})
      })

      if (!response.ok) {
        throw new Error(response.message && response.status || 'Nice try!')
      }

      const data = await response.json();

      setIsLogin(true);
    } catch (err) {
      setError(err.message && err.status)
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div>
      <>
  <AnimatePresence mode="wait">
    {isLoadingMain ? (
      <motion.div
  key="loading"
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  exit={{ opacity: 0 }}
  transition={{ duration: 0.4 }}
  className="min-h-screen bg-linearX         -to-br from-violet-700 via-indigo-700 to-black flex flex-col justify-center items-center"
>
  <div className="loadingContainer">
    <div className="loadingCircle"></div>
    <div className="loadingCircleMinor"></div>
    <div className="loadingCircleMajor"></div>
    <div className="loadingCircleReverse"></div>

    {/* Núcleo */}
    <div className="w-4 h-4 rounded-full bg-violet-300 shadow-[0_0_30px_#c084fc]"></div>
  </div>

  <h1 className="mt-10 text-3xl font-semibold tracking-widest text-violet-100">
    Loading...
  </h1>
</motion.div>
    ) : (
      <motion.div
        key="auth"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
        className="min-h-screen bg-linear-to-br from-violet-700 via-blue-700 to-black flex items-center justify-center px-4"
      >
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-md"
        >
          <div className="backdrop-blur-xl bg-black/30 border border-white/10 rounded-3xl shadow-2xl p-8">
            <div className="mb-8 text-center">
              <h1 className="text-4xl font-bold text-white">
                {isLogin ? "Entrar" : "Criar Conta"}
              </h1>

              <p className="text-gray-300 mt-2">
                {isLogin
                  ? "Acesse sua conta"
                  : "Cadastre-se para continuar"}
              </p>
            </div>

            {error && (
              <div className="mb-5 rounded-xl bg-red-500/20 border border-red-500/30 p-3 text-red-300 text-sm">
                {error}
              </div>
            )}

            <AnimatePresence mode="wait">
              {isLogin ? (
                <motion.div
                  key="login"
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 15 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-4"
                >
                  <input
                    type="email"
                    placeholder="E-mail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-xl bg-white/10 border border-white/10 text-white placeholder-gray-400 px-4 py-3 outline-none focus:border-blue-400"
                  />

                  <input
                    type="password"
                    placeholder="Senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-xl bg-white/10 border border-white/10 text-white placeholder-gray-400 px-4 py-3 outline-none focus:border-blue-400"
                  />

                  <button
                    disabled={isLoading}
                    onClick={handleLogin}
                    className="w-full py-3 rounded-xl bg-linear-to-r from-blue-600 to-violet-600 text-white font-semibold hover:scale-[1.02] transition-all disabled:opacity-50"
                  >
                    {isLoading ? "Entrando..." : "Entrar"}
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  key="register"
                  initial={{ opacity: 0, x: 15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -15 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-4"
                >
                  <input
                    type="text"
                    placeholder="Usuário"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full rounded-xl bg-white/10 border border-white/10 text-white placeholder-gray-400 px-4 py-3 outline-none focus:border-violet-400"
                  />

                  <input
                    type="text"
                    placeholder="Número"
                    value={numero}
                    onChange={(e) => setNumero(e.target.value)}
                    className="w-full rounded-xl bg-white/10 border border-white/10 text-white placeholder-gray-400 px-4 py-3 outline-none focus:border-violet-400"
                  />

                  <input
                    type="email"
                    placeholder="E-mail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-xl bg-white/10 border border-white/10 text-white placeholder-gray-400 px-4 py-3 outline-none focus:border-violet-400"
                  />

                  <input
                    type="password"
                    placeholder="Senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-xl bg-white/10 border border-white/10 text-white placeholder-gray-400 px-4 py-3 outline-none focus:border-violet-400"
                  />

                  <input
                    type="password"
                    placeholder="Confirmar senha"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full rounded-xl bg-white/10 border border-white/10 text-white placeholder-gray-400 px-4 py-3 outline-none focus:border-violet-400"
                  />

                  <button
                    disabled={isLoading}
                    onClick={handleRegister}
                    className="w-full py-3 rounded-xl bg-linear-to-r from-violet-600 to-blue-600 text-white font-semibold hover:scale-[1.02] transition-all disabled:opacity-50"
                  >
                    {isLoading ? "Criando conta..." : "Cadastrar"}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="mt-8 text-center">
              <button
                onClick={() => {
                  setError('');
                  setIsLogin(!isLogin);
                }}
                className="text-blue-300 hover:text-white transition"
              >
                {isLogin
                  ? "Não possui conta? Cadastre-se"
                  : "Já possui conta? Entrar"}
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
</>
    </div>
  )
}

export default Login

import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {checkIsAuth, registrationUser} from '../redux/features/auth/authSlice'
import {toast} from 'react-toastify'
import { useState, useEffect } from 'react'
import 'react-toastify/dist/ReactToastify.css'

const RegistrationPage = () => {
  const [username, setUserName] = useState(' ')
  const [password, setPassword] = useState(' ')
  
  const {status} = useSelector((state) => state.auth)
  const isAuth = useSelector(checkIsAuth)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  
  useEffect(() => {
    if(status) toast(status)
    if(isAuth) navigate('/')
  }, [status, isAuth, navigate])

  const handleSubmit = () => {
    try {
      dispatch(registrationUser({username, password}))
      setPassword('')
      setUserName('')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <form onSubmit={e => e.preventDefault()} className='w-1/4 h-60 mx-auto mt-40'>
      <h1 className='text-lg text-white text-center'>Регистрация</h1>
      <label className="text-xs text-gray-400">
        <input
          type="text"
          value={username}
          onChange={(e) => setUserName(e.target.value)}
          placeholder='Имя пользователя'
          className='mt-5 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-xs outline-none placeholder:text-gray-700'
        />
      </label>
      <label className="text-xs text-gray-400">
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder='Пароль'
          className='mt-3 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-xs outline-none placeholder:text-gray-700'
        />
      </label>
      <div className="flex gap-8 justify-center mt-4">
        <button
          type='submit'
          onClick={handleSubmit}
          className='flex justify-center items-center text-xs bg-gray-600 text-white rounded-sm py-2 px-4'
        >
          Подтвердить
        </button>
        <Link
          to='/login'
          className='flex justify-center items-center text-xs text-center text-white'
        >
          Уже зарегистрированы? <br />
          Войдите!
        </Link>
      </div>
    </form>
  )
}

export default RegistrationPage
import React, {ChangeEvent, FC, useState} from 'react'
import {IAuthRequest} from '../models/IAuth'
import {useAppDispatch} from '../hooks/redux'
import {useNavigate} from 'react-router-dom'
import {useLoginMutation} from '../services/api'
import {setCredentials} from '../store/slices/authSlice'

const Login: FC = () => {
  const [formError, setFormError] = useState<string>('')
  const [form, setForm] = useState<IAuthRequest>({
    email: '',
    password: ''
  })
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [login, {isLoading}] = useLoginMutation()
  const handleFormChange = ({target: {name, value}}: ChangeEvent<HTMLInputElement>) => {
    setForm(prevState => ({...prevState, [name]: value}))
  }

  const formSubmit = async () => {
    try {
      setFormError('')
      const userData = await login(form).unwrap()
      dispatch(setCredentials(userData))
      localStorage.setItem('userData', JSON.stringify({
        userId: userData.user.id,
        token: userData.accessToken
      }))
      navigate('/')
    } catch (e: any) {
      setFormError(e.data.message)
    }
  }

  return (
    <div>
      {isLoading && <h1>Загрузка...</h1>}
      <input
        type='email'
        name='email'
        placeholder='email'
        onChange={handleFormChange}
      />
      <input
        type='password'
        name='password'
        placeholder='password'
        onChange={handleFormChange}
      />
      <button onClick={formSubmit}>Войти</button>
      {formError && <h1>{formError}</h1>}
    </div>
  )
}

export default Login
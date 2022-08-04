import React, {ChangeEvent, FC, FormEvent, HTMLInputTypeAttribute, useEffect, useState} from 'react'
import {useLoginMutation} from '../store/reducers/auth/authApiSlice'
import {setCredentials} from '../store/reducers/auth/authSlice'
import {useAppDispatch} from '../hooks/redux'
import {useNavigate} from 'react-router-dom'
import {InputHandler} from 'concurrently'

const Login: FC = () => {
  const dispatch = useAppDispatch()
  const [login, {isLoading}] = useLoginMutation()
  const [err, setErr] = useState<string>('')
  const [user, setUser] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const navigate = useNavigate()

  useEffect(() => {
    setErr('')
  }, [password, user])

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    try {
      const userData = await login({ user, password }).unwrap()
      dispatch(setCredentials({...userData, email: user}))
      setUser('')
      setPassword('')
      navigate('/')
    } catch (e: any){
      console.log(e)
      setErr(e.message)
    }
  }

  const handleUserInput = (e: ChangeEvent<HTMLInputElement>) => setUser(e.target.value)
  const handlePasswordInput = (e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)

  return (
    <div>
      {isLoading && <h1>Loading...</h1>}
      <form>
        <input
          type='email '
          value={user}
          onChange={handleUserInput}
          required
          placeholder='email'
        />
        <input
          type='password'
          value={password}
          onChange={handlePasswordInput}
          required
          placeholder='password'
        />
        <button onClick={(e) => handleSubmit(e)}>Sign In</button>
      </form>
      {err && <h1>{err}</h1>}
    </div>
  )
}

export default Login
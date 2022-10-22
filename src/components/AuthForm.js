import React, { useState } from "react";
import { authService } from "fBase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { Button, Input } from "@chakra-ui/react";


const AuthForm = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [newAccount, setNewAccount] = useState(false)

  const toggleAccount = () => { setNewAccount((prev) => !prev) }

  const onChange = (event) => {
    const { target: {name, value} } = event
    if (name === "email") {
      setEmail(value)
    } else if (name === "password") {
      setPassword(value)
    }
  }

  const onSubmit = async (event) => {
    event.preventDefault()
    try {
      if (newAccount) {
        await createUserWithEmailAndPassword(authService, email, password)
      } else {
        await signInWithEmailAndPassword(authService, email, password)
      }
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <>
    <Button onClick={toggleAccount}>{newAccount? "to Log In" : "to Create Account"}</Button>
    <form onSubmit={onSubmit}>
      <Input
        type="email"
        placeholder="Email"
        required
        name="email"
        onChange={onChange}
        value={email} />
      <Input
        type="password"
        placeholder="Password"
        required
        name="password"
        onChange={onChange}
        value={password} />
      <Button type="submit">{newAccount? "Create Account" : "Log In"}</Button>
      <span className="error">{ error }</span>
    </form>
    </>
  )
}

export default AuthForm
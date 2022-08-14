import { authService } from "fBase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";

export default () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [newAccount, setNewAccount] = useState(true)
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
      let data
      if (newAccount) {
        data = await createUserWithEmailAndPassword(authService, email, password)
      } else {
        data = await signInWithEmailAndPassword(authService, email, password)
      }
      console.log(data)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          type="email"
          placeholder="Email"
          required
          name="email"
          onChange={onChange}
          value={email} />
        <input
          type="password"
          placeholder="Password"
          required
          name="password"
          onChange={onChange}
          value={password} />
        <input type="submit" value={newAccount? "Create Account" : "Log In"} />
      </form>
      <div>
        <button>Continue with Google</button>
        <button>Continue with GitHub</button>
      </div>
    </div>
  )
}
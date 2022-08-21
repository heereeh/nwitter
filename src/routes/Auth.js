import { authService } from "fBase";
import { createUserWithEmailAndPassword, GithubAuthProvider, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import React, { useState } from "react";

const Auth = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [newAccount, setNewAccount] = useState(true)
  const [error, setError] = useState("")
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
      setError(err.message)
    }
  }

  const toggleAccount = () => { setNewAccount((prev) => !prev) }
  const onSocialClick = async (event) => {
    const { target: {name} } = event
    let provider = ""
    switch(name) {
      case "github":
        provider = new GithubAuthProvider()
        break
      case "google":
        provider = new GoogleAuthProvider()
        break
      default: return
    }
    await signInWithPopup(authService, provider)
  }

  return (
    <div>
      <button onClick={toggleAccount}>{newAccount? "to Log In" : "to Create Account"}</button>
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
      <span className="error">{ error }</span>
      </form>
      <div>
        <button name="google" onClick={onSocialClick}>Continue with Google</button>
        <button name="github" onClick={onSocialClick}>Continue with GitHub</button>
      </div>
    </div>
  )
}

export default Auth
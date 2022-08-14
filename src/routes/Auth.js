import React, { useState } from "react";

export default () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const onChange = (event) => {
    const { target: {name, value} } = event
    if (name === "email") {
      setEmail(value)
    } else if (name === "password") {
      setPassword(value)
    }
  }
  const onSubmit = (event) => {
    event.preventDefault()
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
        <input type="submit" value="Log In" />
      </form>
      <div>
        <button>Continue with Google</button>
        <button>Continue with GitHub</button>
      </div>
    </div>
  )
}
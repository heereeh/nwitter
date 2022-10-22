import { Button } from "@chakra-ui/react";
import AuthForm from "components/AuthForm";
import { authService } from "fBase";
import { GithubAuthProvider, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import React from "react";

const Auth = () => {
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
      <AuthForm />
      <div>
        <Button name="google" onClick={onSocialClick}>Continue with Google</Button>
        <Button name="github" onClick={onSocialClick}>Continue with GitHub</Button>
      </div>
    </div>
  )
}

export default Auth
import { useEffect, useState } from "react";
import AppRouter from "components/Router";
import { authService } from "fBase"
import { Container } from "@chakra-ui/react";

function App() {
  const [init, setInit] = useState(false)
  const [userObj, setUserObj] = useState(null)

  // firebase 초기화
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setUserObj({
          displayName: user.displayName,
          uid: user.uid,
        })
      } else {
        setUserObj(null)
      }
      setInit(true)
    })
  }, []) // mounted
  const refreshUser = () => {
    const user = authService.currentUser
    setUserObj({
      displayName: user.displayName,
      uid: user.uid,
    })
  }
  return (
    <>
    <Container>
      { init? <AppRouter
        refreshUser={refreshUser}
        isLoggedIn={userObj !== null}
        userObj={userObj} /> : "Initializing..." }
    </Container>
      <footer>&copy; {new Date().getFullYear()} Nwitter</footer>
    </>
  );
}

export default App;

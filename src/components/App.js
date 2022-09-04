import { useEffect, useState } from "react";
import AppRouter from "components/Router";
import { authService } from "fBase"

function App() {
  const [init, setInit] = useState(false)
  const [userObj, setUserObj] = useState(null)

  // firebase 초기화
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setUserObj(user)
      } else {
        setUserObj(null)
      }
      setInit(true)
    })
  }, []) // mounted
  return (
    <>
      { init? <AppRouter isLoggedIn={userObj !== null} userObj={userObj} /> : "Initializing..." }
      <footer>&copy; {new Date().getFullYear()} Nwitter</footer>
    </>
  );
}

export default App;

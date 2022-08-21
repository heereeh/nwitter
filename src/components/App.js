import { useEffect, useState } from "react";
import AppRouter from "components/Router";
import { authService } from "fBase"

function App() {
  const [init, setInit] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  // firebase 초기화
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true)
      } else {
        setIsLoggedIn(false)
      }
      setInit(true)
    })
  }, []) // mounted
  return (
    <>
      { init? <AppRouter isLoggedIn={isLoggedIn} /> : "Initializing..." }
      <footer>&copy; {new Date().getFullYear()} Nwitter</footer>
    </>
  );
}

export default App;

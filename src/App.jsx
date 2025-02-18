import AppRoutes from "./components/AppRoutes"
import { Navbar } from "./components/Navbar"
import { BrowserRouter as Router } from "react-router-dom"
import { ToastContainer } from 'react-toastify'
import { AuthProvider } from "./context/AuthContext"

function App() {

  return (
    <>
      <AuthProvider>
        <Router>
          <Navbar />
          <ToastContainer
            position="bottom-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss={false}
            draggable
            pauseOnHover={false}
            bodyClassName="text-xl"
          />
          <AppRoutes />
        </Router>
      </AuthProvider>
    </>
  )
}

export default App
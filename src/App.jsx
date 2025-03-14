import AppRoutes from "./components/AppRoutes"
import { Navbar } from "./components/Navbar"
import { BrowserRouter as Router } from "react-router-dom"
import { ToastContainer } from 'react-toastify'
import { AuthProvider } from "./context/AuthContext"
import { GoogleOAuthProvider } from "@react-oauth/google";

function App() {

  return (
    <>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
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
              bodyClassName="text-xl z-60"
            />
            <AppRoutes />
          </Router>
        </AuthProvider>
      </GoogleOAuthProvider>
    </>
  )
}

export default App
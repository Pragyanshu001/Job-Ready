import { RouterProvider } from "react-router"
import { router } from "./app.routes.jsx"
import { AuthProvider } from "./context/auth.context.jsx"
import { InterviewProvider } from "./context/interview.context.jsx"
import { ThemeProvider } from "./context/theme.context.jsx"
import { SnackbarProvider } from "./context/snackbar.context.jsx"

function App() {
  return (
    <ThemeProvider>
      <SnackbarProvider>
        <AuthProvider>
          <InterviewProvider>
            <RouterProvider router={router} />
          </InterviewProvider>
        </AuthProvider>
      </SnackbarProvider>
    </ThemeProvider>
  )
}

export default App

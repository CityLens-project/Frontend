import WelcomePanel from '../Components/Login/WelcomePanel'
import LoginForm from '../Components/Login/LoginForm'

export default function Login() {
  return (
    <div className="relative flex min-h-screen flex-col bg-white md:flex-row">
      <div className="absolute left-0 top-0 z-10">
        <WelcomePanel />
      </div>

      <LoginForm />
    </div>
  )
}
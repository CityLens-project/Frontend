import WelcomePanel from '../Components/Login/WelcomePanel'
import LoginForm from '../Components/Login/LoginForm'

export default function Login() {
  return (
    <div className="flex min-h-screen flex-col bg-white md:flex-row">
      <WelcomePanel />
      <LoginForm />
    </div>
  )
}
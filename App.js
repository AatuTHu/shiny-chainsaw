import Navigation from './services/Navigation'
import AuthPage from './components/AuthPage';
import RegisterPage from './components/RegisterPage'
import HomePage from './components/HomePage'

export default function App() {

    return (
      <Navigation>
        <AuthPage/>
        <RegisterPage/>
        <HomePage/>
      </Navigation>
    )
  }
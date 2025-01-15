import Navigation from './services/Navigation'
import Auth from './components/AuthPage';
import RegisterPage from './components/RegisterPage'
import Home from './components/HomePage'
import Start from  './components/StartPage'

export default function App() {

    return (
      <Navigation>
        <AuthPage/>
        <RegisterPage/>
        <HomePage/>
      </Navigation>
    )
  }
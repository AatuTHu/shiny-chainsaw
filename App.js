import Navigation from './services/Navigation'
import Auth from './components/AuthPage';
import Register from './components/RegisterPage'
import Home from './components/HomePage'
import Start from  './components/StartPage'
import Edit from './components/EditPage'

export default function App() {

    return (
      <Navigation>
        <Auth/>
        <Register/>
        <Home/>
        <Start/>
        <Edit/>
      </Navigation>
    )
  }
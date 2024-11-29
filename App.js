import { StyleSheet } from 'react-native';
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0e0e14',
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text:{
    fontSize:20,
    color: '#fff',
  }
});

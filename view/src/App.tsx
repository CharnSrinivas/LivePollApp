import './App.css';
import { Switch, BrowserRouter as Router, Route } from 'react-router-dom'
import Home from './Containers/Home';
import Vote from './Containers/Vote';
import Create from './Containers/Create';
import SignIn from './Containers/Signin'
import SignUp from './Containers/Signup'
import { createTheme } from '@mui/material';
import { ThemeProvider } from '@emotion/react';


function App() {
  const theme = createTheme({
    palette: {
      mode: 'light',
      primary:
      {
        main: '#9C19E0'
      },
      secondary:
      {
        main: '#670FF7'
      }
    }
  })
  const handleFontSize = () => {
    let width = window.innerWidth;
    if (width <= 1000) {
      let per = Math.floor((width / 10) - 10);
      if (per <= 75) { document.documentElement.style.fontSize = '75%' }
      else {
        document.documentElement.style.fontSize = per.toString() + '%';
      }
    }
  }


  handleFontSize();
  window.addEventListener('resize', handleFontSize)
  return (
    <ThemeProvider theme={theme}>

      <Router>
        <Switch>
          <Route path={'/vote'} component={Vote}></Route>
          <Route exact path={'/create'} component={Create}></Route>
          <Route exact path={'/signin'} component={SignIn}></Route>
          <Route exact path={'/signup'} component={SignUp}></Route>
          <Route exact path={'/home'} component={Home}></Route>
          <Route exact path={'/'} component={Home}></Route>

        </Switch>
      </Router>

    </ThemeProvider>

  );
}

export default App;

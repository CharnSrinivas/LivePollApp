import { Switch, BrowserRouter as Router, Route } from 'react-router-dom'
import Home from './Containers/Home';
import Vote from './Containers/Vote';
import Create from './Containers/Create';
import SignIn from './Containers/Signin'
import SignUp from './Containers/Signup'
import { createTheme } from '@mui/material';
import { ThemeProvider } from '@emotion/react';
import { primary_color, secondary_color, Min_Percentage_of_FontSize } from './config';

function App() {
  const theme = createTheme({
    palette: {
      mode: 'light',
      primary:
      {
        main: primary_color
      },
      secondary:
      {
        main: secondary_color
      }
    }
  })
  const handleFontSize = () => {
    let width = window.innerWidth;
    if (width <= 1000) {
      let per = Math.floor((width / 10) - 10);
      if (per <= Min_Percentage_of_FontSize) { document.documentElement.style.fontSize = `${Min_Percentage_of_FontSize}%` }
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

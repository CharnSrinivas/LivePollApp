import { Switch, BrowserRouter as Router, Route } from 'react-router-dom'
import Home from './Containers/Home';
import Vote from './Containers/Vote';
import Create from './Containers/Create';
import SignIn from './Containers/Signin'
import SignUp from './Containers/Signup'
import Dashboard from './Containers/Dashboard/'
import { createTheme } from '@mui/material';
import { ThemeProvider } from '@emotion/react';
import { primary_color, secondary_color, Min_Percentage_of_FontSize, SERVER_URL } from './config';
import { setIsAuth as setAuth } from './Utils/utils';
import React from 'react';
class App extends React.Component {
  theme = createTheme({
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
  componentDidMount() {
    fetch(`${SERVER_URL}/is_auth`, { method: 'GET', credentials: 'include', mode: 'cors' }).then(fetch_res => fetch_res.json()).then(res_json => {
      const is_auth = res_json.is_auth;
      setAuth(is_auth);
    }).catch(err => { console.error(err) })
    this.handleFontSize()
    window.addEventListener('resize', this.handleFontSize);
  }

  handleFontSize = () => {
    let width = window.innerWidth;
    if (width <= 1000) {
      let per = Math.floor((width / 10) - 10);
      if (per <= Min_Percentage_of_FontSize) { document.documentElement.style.fontSize = `${Min_Percentage_of_FontSize}%` }
      else {
        document.documentElement.style.fontSize = per.toString() + '%';
      }
    }
  }
  render() {
    return (
      <ThemeProvider theme={this.theme} >

        <Router>
          <Switch>
            <Route path={'/vote'} component={Vote}></Route>
            <Route path={'/share/vote'} component={Vote}></Route>
            <Route exact path={'/create'} component={Create}></Route>
            <Route exact path={'/signin'} component={SignIn}></Route>
            <Route exact path={'/signup'} component={SignUp}></Route>
            <Route exact path={'/dashboard'} component={Dashboard}></Route>
            <Route exact path={'/home'} component={Home}></Route>
            <Route exact path={'/'} component={Home}></Route>
          </Switch>
        </Router>

      </ThemeProvider>

    );
  }
}
export default App;
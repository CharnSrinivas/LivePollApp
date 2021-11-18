import './App.css';
import { Switch, BrowserRouter as Router, Route } from 'react-router-dom'
import Home from './Containers/Home';
import Vote from './Containers/Vote';
import Create from './Containers/Create';
import { createTheme } from '@mui/material';
import { ThemeProvider} from '@emotion/react';

function App() {
  const theme = createTheme({
    palette:{mode:'light'}
  })
  return (
    <ThemeProvider theme={theme}>
      
        <Router>
          <Switch>
            <Route  path={'/vote'} component={Vote}></Route>
            <Route exact path={'/create'} component={Create}></Route>
            <Route exact path={'/'} component={Home}></Route>
            <Route exact path={'/home'} component={Home}></Route>
          </Switch>
        </Router>
      
    </ThemeProvider>

  );
}

export default App;

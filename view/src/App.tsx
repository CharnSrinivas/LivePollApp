import './App.css';
import {Switch,BrowserRouter as Router, Route } from 'react-router-dom'
import Home from './Containers/Home';
import Vote from './Containers/Vote';
import Create from './Containers/Create';
function App() {
   
  return (
    <Router>
      <Switch>
        <Route exact path={'/vote'} component={Vote}></Route>
        <Route exact path={'/create'} component={Create}></Route>
        <Route path={'/'} component={Home}></Route>
      </Switch>
    </Router>
  );
}

export default App;

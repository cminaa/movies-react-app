import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import MoviePage from './components/MoviePage';
import ItemsProvider from './context/ItemsContext';

function App() {
  return (
    <Router>
      <ItemsProvider>
        <div className="App">
          <header className="App-header">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/:isMovieParam/:idParam" component={MoviePage} />
            </Switch>
          </header>
        </div>
      </ItemsProvider>
    </Router>
  );
}

export default App;

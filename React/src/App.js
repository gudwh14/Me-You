import './App.css';
import {BrowserRouter, Switch, Route} from "react-router-dom";
import routes from "./routes/routes";

function App() {
  return (
      <BrowserRouter>
          <div className="App">
                  <Switch>
                      {routes.map((route)=> {
                          return(
                              <Route key={route.path} path={route.path} exact={route.exact}>
                                <route.component/>
                              </Route>
                          )
                      })}
                  </Switch>
          </div>
      </BrowserRouter>
  );
}

export default App;

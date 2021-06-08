import Header from "../components/Header";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import {useEffect} from "react";
import homeRoute from "../routes/homeRoute";

const Home = () => {
    useEffect(()=> {
        window.scrollTo(0,0);
    },[])

    return (
        <BrowserRouter>
            <div className='home-container'>
                <Header/>
                    <Switch>
                        {homeRoute.map((route)=> {
                            return (
                              <Route key={route.component} exact={route.exact} path={route.path}>
                                  <route.component/>
                              </Route>
                            );
                        })}
                    </Switch>
            </div>
        </BrowserRouter>
    );
};

export default Home;
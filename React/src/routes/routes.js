import Welcome from "../pages/Welcome";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import Hello from "../pages/Hello";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound";

const routes = [
    {
        path: "/",
        component : Welcome,
        exact : true
    },
    {
        path: "/home",
        component : Home,
        exact : false
    },
    {
        path: "/login",
        component: Login,
        exact : false
    },
    {
        path: "/signup",
        component: SignUp,
        exact : false
    },
    {
        path: "/hello",
        component : Hello,
        exact : false
    },
    {
        component : NotFound,
        exact: false,
    }
];



export default routes;
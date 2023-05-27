import Home from '../components/Home/Home';
import ListUsers from '../components/ListUser/ListUser';
import Login from '../components/Login/Login';
import routes from '../config/routes';

const publicRoutes = [
    { path: routes.home, component: Home },
    { path: routes.users, component: ListUsers },
    { path: routes.login, component: Login },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };

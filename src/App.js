import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import { useContext, useEffect } from 'react';

// import Home from './components/Home/Home';
// import ListUser from './components/ListUser/ListUser';
// import Login from './components/Login/Login';

import Header from './components/Header/Header';
import { UserContext } from './context/UserContext';
import { publicRoutes } from './routes';

function App() {
    const { login } = useContext(UserContext);

    useEffect(() => {
        if (localStorage.getItem('token')) {
            login(localStorage.getItem('email'), localStorage.getItem('token'));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="App">
            <Header />
            <Container>
                <Routes>
                    {publicRoutes.map((route, index) => {
                        const Page = route.component;
                        return <Route key={index} path={route.path} element={<Page />} />;
                    })}
                </Routes>
            </Container>
        </div>
    );
}

export default App;

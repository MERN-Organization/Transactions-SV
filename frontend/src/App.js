import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';

import HeaderComponent from './Components/HeaderComponent';
import FooterComponent from './Components/FooterComponent';
import ProtectedRoute from './Authentication/ProtectedRoute';
import TransectForm from './Components/TransectForm';

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <HeaderComponent />
                <Routes>
                    <Route path="/" element={<LoginPage />} />

                    <Route element={<ProtectedRoute />}>
                        <Route path="/transect" element={<TransectForm />} />
                    </Route>

                    <Route path="*" element="Page Does not Exist" />
                </Routes>
                <FooterComponent />
            </BrowserRouter>
        </div>
    );
}

export default App;

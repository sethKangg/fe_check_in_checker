import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import 'bootstrap/dist/css/bootstrap.min.css'
import {
    BrowserRouter,
    Route,
    Routes
} from 'react-router-dom'
import User from './components/User/User'
import Admin from './components/Admin/Admin'
const root = ReactDOM.createRoot(
    document.getElementById('root')
)
root.render(
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<App />}>
                <Route
                    path='/users'
                    element={<User />}
                />
                <Route
                    path='/admins'
                    element={<Admin />}
                />
            </Route>
        </Routes>
    </BrowserRouter>
)

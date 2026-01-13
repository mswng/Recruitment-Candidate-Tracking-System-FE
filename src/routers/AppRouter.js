import { Route, Routes } from 'react-router-dom'
import { adminRouter, publicRouter, hrRouter, interviewerRouter, candidateRouter } from './routes'
import DefaultLayout from '../components/layouts/defaultlayout/DefaultLayout';
import { useState, useEffect } from 'react';

function AppRouter() {
    const [userRole, setUserRole] = useState(localStorage.getItem('userRole') || 'candidate');

    // Listen for storage changes to update role when user logs in/out
    useEffect(() => {
        const handleStorageChange = () => {
            const newRole = localStorage.getItem('userRole') || 'candidate';
            setUserRole(newRole);
        };

        // Listen for storage changes from other tabs/windows
        window.addEventListener('storage', handleStorageChange);

        // Also listen for custom event in same tab
        window.addEventListener('userRoleChanged', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
            window.removeEventListener('userRoleChanged', handleStorageChange);
        };
    }, []);

    const getRoleRoutes = () => {
        switch(userRole) {
            case 'admin':
                return adminRouter;
            case 'hr':
                return hrRouter;
            case 'interviewer':
                return interviewerRouter;
            case 'candidate':
                return candidateRouter;
            default:
                return candidateRouter;
        }
    };

    const roleRoutes = getRoleRoutes();

    return (
        <Routes>
            {publicRouter.map((item, index) => (
                <Route key={index} path={item.path} element={item.element}></Route>
            ))}
            {roleRoutes.map((item, index) => (
                <Route key={index} path={item.path} element={
                    <DefaultLayout>
                        {item.element}
                    </DefaultLayout>
                }></Route>
            ))}
        </Routes>
    )
}
export default AppRouter;
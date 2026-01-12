import { Route, Routes } from 'react-router-dom'
import { adminRouter, publicRouter, hrRouter, interviewerRouter, candidateRouter } from './routes'
import DefaultLayout from '../components/layouts/defaultlayout/DefaultLayout';

function AppRouter() {
    const userRole = localStorage.getItem('userRole') || 'candidate';

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
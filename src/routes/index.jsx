import { Routes, Route } from 'react-router-dom'

import privateRoutes, { Auth } from './private'
import publicRoutes, { UnAuth } from './public'

export default () => {
    return (
        <Routes key={'project-routes'}>
            {/* Public routes */}
            <Route path='/' element={<UnAuth />}>
                {publicRoutes.map((route, index) => (
                    <Route
                        index={route.index}
                        path={route.path}
                        element={<route.component />}
                        key={index + '-public-route'}
                    />
                ))}
            </Route>

            {/* Private routes */}
            <Route path='/projects' element={<Auth />}>
                {privateRoutes.map((route, index) => (
                    <Route
                        index={route.index}
                        path={route.path}
                        element={<route.component />}
                        key={index + '-private-route'}
                    />
                ))}
            </Route>
        </Routes>
    )
}
import { Routes, Route } from 'react-router-dom'

import privateRoutes, { Auth } from './private'
import publicRoutes, { UnAuth } from './public'
import NotFound from '../pages/public/NotFound'

export default () => {
    return (
        <Routes key={'project-routes'}>
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

            {/* Not found */}
            <Route path='*' element={<NotFound />} />
        </Routes>
    )
}
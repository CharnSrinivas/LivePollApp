import { lazy, Suspense } from 'react';
import { CircularProgress } from '@mui/material'
const HomeComponent = lazy(() => import('./Home'));

export default function () {

    return (
        <Suspense fallback={<CircularProgress id='circular-loader'/>}>
            <HomeComponent />
        </Suspense>
    )
}
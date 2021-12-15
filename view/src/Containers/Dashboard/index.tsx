import { lazy, Suspense } from 'react';
import { CircularProgress } from '@mui/material'
const DashboardComponent = lazy(() => import('./Dashboard'));

export default function () {

    return (
        <Suspense fallback={<CircularProgress id='circular-loader'/>}>
            <DashboardComponent />
        </Suspense>
    )
}
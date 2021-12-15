import { lazy, Suspense } from 'react';
import { CircularProgress } from '@mui/material'
const CreateComponent = lazy(() => import('./Create'));

export default function () {

    return (
        <Suspense fallback={<CircularProgress id='circular-loader'/>}>
            <CreateComponent />
        </Suspense>
    )
}
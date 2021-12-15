import { lazy, Suspense } from 'react';
import { CircularProgress } from '@mui/material'
const SignUpComponent = lazy(() => import('./Signup'));

export default function () {

    return (
        <Suspense fallback={<CircularProgress id='circular-loader'/>}>
            <SignUpComponent />
        </Suspense>
    )
}
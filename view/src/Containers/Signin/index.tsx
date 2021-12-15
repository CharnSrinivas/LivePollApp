import { lazy, Suspense } from 'react';
import { CircularProgress } from '@mui/material'
const SignInComponent = lazy(() => import('./Signin'));

export default function () {

    return (
        <Suspense fallback={<CircularProgress id='circular-loader'/>}>
            <SignInComponent />
        </Suspense>
    )
}
import { lazy, Suspense } from 'react';
import { CircularProgress } from '@mui/material'
const VoteComponent = lazy(() => import('./Vote'));

export default function () {

    return (
        <Suspense fallback={<CircularProgress id='circular-loader'/>}>
            <VoteComponent />
        </Suspense>
    )
}
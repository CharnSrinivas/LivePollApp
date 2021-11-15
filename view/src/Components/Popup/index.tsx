import { Backdrop, Container } from '@mui/material'
interface Props {
    content: JSX.Element;
    onExit?: Function;
}

export default function index({ content, onExit }: Props): JSX.Element {
    return (
        <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open onMouseDown={() => { if (onExit) onExit() }}>
            <Container>
                {content}
            </Container>
        </Backdrop>
    )
}
//https://github.com/timanovsky/subdir-heroku-buildpack
//https://github.com/mars/create-react-app-buildpack
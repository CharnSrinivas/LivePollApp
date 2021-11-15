import React from 'react';
import { SERVER_URL } from '../../config';
import { Container, Button, Stack, Dialog } from '@mui/material'
interface StateProps {
    show_join_poll_popup: boolean,
    poll_id?: number
}
export default class extends React.Component<any, StateProps> {

    constructor(props: any) {
        super(props);
        this.state = { show_join_poll_popup: false, poll_id: undefined }
    }
    toggleJoinPopup = () => {

        this.setState({ show_join_poll_popup: !this.state.show_join_poll_popup });
    }

    joinPoll = async () => {
        let input = document.getElementById('join-id-input') as HTMLInputElement;
        if (!(input && input.value)) return;
        if (input.value.length > 10) return;
        fetch(`${SERVER_URL}/?id=${input.value}`, { method: 'GET', }).then(res => {
            res.json().then(data => {
                console.log(data);
            })
        })
    }
    render(): React.ReactNode {

        return (
                <Container 
                maxWidth='sm' sx={{marginTop:'3rem'}}>
                    <Stack sx={{ alignItems: 'center' }} direction='column' spacing={4} >
                        <Button size='medium' sx={{ width: '50%' }} variant='contained' onClick={this.toggleJoinPopup}>Join</Button>
                        <Button href='/create' size='medium' sx={{ width: '50%' }} variant='text'>Create</Button>
                        {this.state.show_join_poll_popup &&

                            <Dialog open maxWidth='md' onClose={this.toggleJoinPopup}>
                                <Stack maxWidth='md' direction={'column'} sx={{ alignItems: 'center', padding: '15px' }}>
                                    <h1 style={{ textAlign: 'center' }}>Enter poll id.</h1>
                                    <p style={{ fontSize: '90%', textAlign: 'center' }}>To vote poll id is required.Ask the creator of poll for poll id.</p>
                                    <Stack direction={'row'} spacing={0} >
                                        <input type={'text'} id='join-id-input' autoFocus onKeyDown={(e) => { if (e.keyCode === 13 || e.key === 'Enter') { this.joinPoll() } }} />
                                        <Button size='medium' variant='contained' onClick={this.joinPoll}>Join</Button>
                                    </Stack>
                                </Stack>

                            </Dialog>
                        }
                    </Stack>
                </Container>
        )
    };
}
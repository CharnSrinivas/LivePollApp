import React from 'react';
import { SERVER_URL } from '../../config';
import { Box, Button, Stack, Dialog,  TextField, Paper } from '@mui/material'
import { getQuestionData, savePollId } from '../../Utils/utils';
interface StateProps {
    show_join_poll_popup: boolean,
    invalid_poll_id: boolean,

}
export default class Home extends React.Component<{}, StateProps> {

    constructor(props: any) {
        super(props);
        this.state = {
            show_join_poll_popup: false,
            invalid_poll_id: false
        }
    }
    toggleJoinPopup = () => {

        this.setState({ show_join_poll_popup: !this.state.show_join_poll_popup });
    }

    joinPoll = () => {
        let input = document.getElementById('join-id-input') as HTMLInputElement;
        if (!(input && input.value)) return;
        if (input.value.length > 10) return;
        getQuestionData(input.value).then(res => {

            if (res.status !== 200) {
                this.setState({ invalid_poll_id: true }); return;
            }
            res.json().then(data => {
                let props = this.props as any;
                if (!data.question_id) return;
                savePollId(data.question_id)
                props.history.push(`/vote?id=${data.question_id}`)
            })
        })
    }

    render(): React.ReactNode {

        return (
            <Paper
                variant='elevation'
                elevation={0}
                sx={{ p: '1.5rem' }}
            // sx={{position:'absolute', top: 0, left: 0, right: 0, bottom: 0 }} 
            >
                <Box
                    maxWidth='sm' sx={{ margin: '3rem auto auto auto', p: '1rem', borderRadius: '3px' }} boxShadow={2}
                >
                    <Stack direction='column' spacing={4} sx={{ margin: '3rem auto', alignItems: 'center' }}>
                        <Button size='medium' variant='contained' onClick={this.toggleJoinPopup}>Join</Button>
                        <Button href='/create' size='medium' variant='text'>Create</Button>
                    </Stack>
                    {this.state.show_join_poll_popup &&

                        <Dialog open maxWidth='md' onClose={this.toggleJoinPopup}>
                            <Stack maxWidth='md' direction={'column'} sx={{ alignItems: 'center', padding: '15px' }}>
                                <h1 style={{ textAlign: 'center' }}>Enter poll id.</h1>
                                <p style={{ fontSize: '90%', textAlign: 'center' }}>To vote poll id is required.Ask the creator of poll for poll id.</p>
                                <Stack direction={'row'} spacing={2} justifyContent={'space-between'} alignItems={'baseline'}>
                                    <TextField
                                        error={this.state.invalid_poll_id}
                                        helperText='Invalid poll id'
                                        type={'text'}
                                        id='join-id-input'
                                        autoFocus
                                        variant='standard'
                                        onKeyDown={(e) => { if (e.keyCode === 13 || e.key === 'Enter') { this.joinPoll() }}} />
                                    <Button size='medium' variant='contained' onClick={this.joinPoll}>Join</Button>
                                </Stack>
                            </Stack>

                        </Dialog>
                    }
                </Box>
            </Paper>
        )
    };
}
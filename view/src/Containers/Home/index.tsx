import React from 'react';
import { Button, Stack, Dialog, TextField, Typography } from '@mui/material'
import NavBar from '../../Components/NavBar'
import { getQuestionData, savePollId } from '../../Utils/utils';
import styles from './home.module.css';
import LazyImage from '../../Components/LazyImage';
import './home.css'
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
    componentDidMount() {
        const container = document.getElementById('top-right-container');
        if (container) {
            fetch('media/charts_illustration.svg').then(res => {
                res.text().then(svg => {
                    container.innerHTML += svg;
                })
            })
        }
    }
    render(): React.ReactNode {

        return (
            <div >
                <NavBar />

                <div
                    className={styles['container']}
                >
                    <div className={styles['top']}>
                        <Stack
                            className={styles['action-btns-container']}
                            direction='row'
                            alignItems={'center'}
                            spacing={2}>
                            <Stack className={styles['create-container']} spacing={2}>
                                <LazyImage alt='create' src='media/create.png'></LazyImage>
                                <p id='some'>
                                    Create <b style={{ color: 'var(--primary)', letterSpacing: '1px', fontSize: 'inherit' }}>Live Polls</b> in no time.
                                </p>
                                <p>Simple and fast.</p>
                                <Button size='medium' onClick={()=>{window.location.href='create'}} variant='contained' sx={{ textTransform: 'none', fontWeight: 'bold' }} >Create</Button>
                            </Stack>
                            <i color='primary'>OR</i>
                            <Stack className={styles['join-container']} spacing={2}>
                                <LazyImage alt='vote' src='media/vote.png'></LazyImage>
                                <p >Vote to existing poll(s) created by others.</p>
                                <p>By entering poll id.</p>
                                <Button 
                                size='medium'
                                onClick={()=>{this.setState({show_join_poll_popup:true})}} variant='contained' sx={{ textTransform: 'none', fontWeight: 'bold' }} >Join</Button>
                            </Stack>
                        </Stack>
                        {window.innerWidth > 980 &&
                            <div className={styles['top-right-image']} id='top-right-container'></div>
                        }

                    </div>
                    <div className={styles['bottom']}>
                        <Stack direction={'column'} alignItems={'center'}>
                            <Typography variant='h4' sx={{ color: 'var(--font-color)' }}>Features</Typography>
                            <Stack direction={'row'} className={styles['features-container']} alignItems={'center'} justifyContent={'center'}>
                                <div>
                                    <LazyImage src='media/free.png' alt='free' ></LazyImage>
                                    <Typography variant='h5' color={'var(--font-color)'}>Free</Typography>
                                    <span></span>
                                    <p>Save money! All our polls are 100% free to create and monitor.</p>
                                </div>
                                <div>
                                    <LazyImage src='media/clock.png' alt='clock' ></LazyImage>
                                    <Typography variant='h5' color={'var(--font-color)'}>Real Time</Typography>
                                    <span></span>
                                    <p>All our polls are live and up to date. You can monitor your live polls with our any refreshing.</p>
                                </div>
                                <div>
                                    <LazyImage src='media/shield.png' alt='shield' ></LazyImage>
                                    <Typography variant='h5' color={'var(--font-color)'}>Safe & Secure</Typography>
                                    <span></span>
                                    <p>We use latest technology to prevent any type of malicious things.We also prevent duplicate votes.</p>
                                </div>
                            </Stack>
                        </Stack>
                    </div>
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
                                        onKeyDown={(e) => { if (e.keyCode === 13 || e.key === 'Enter' || e.key === 'enter') { this.joinPoll() } }} />
                                    <Button size='large' variant='contained' onClick={this.joinPoll}>Join</Button>
                                </Stack>
                            </Stack>

                        </Dialog>
                    }
                </div>
            </div>
        )
    };
}

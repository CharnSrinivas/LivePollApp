import {
    Box,
    Dialog,
    CircularProgress,
    DialogTitle,
    DialogActions,
    DialogContent,
    DialogContentText,
    Button,
    RadioGroup,
    Radio,
    FormControlLabel,
    Stack,
    Container,
    Alert,
    Paper,
    Slide
} from "@mui/material";
import React from "react";
import { check_vote, getQuestionData, vote as voteToQuestion } from "../../Utils/utils";

interface StateProps {
    data_loaded: boolean;
    invalid_poll_id: boolean;
    poll_data: any;
    total_votes: number;
    vote_option: number;
    show_alert: boolean,
    alert_severity: "error" | "success" | "info" | "warning";
    alert_text: string;
    alert_title: string
}

export default class Vote extends React.Component<{}, StateProps> {
    poll_id: string | null = null;
    constructor(props: any) {
        super(props);
        this.state = {
            data_loaded: false,
            invalid_poll_id: false,
            poll_data: null,
            total_votes: 0,
            vote_option: -1,
            alert_severity: 'info',
            alert_text: '',
            show_alert: false, alert_title: ''
        }

    };
    componentDidMount() {
        this.poll_id = new URLSearchParams(window.location.search).get('id');
        if (!this.poll_id) {
            let props = this.props as any;
            props.history.push(`\\home`);
            return;
        }
        getQuestionData(this.poll_id).then(res => {
            if (res.status !== 200) {
                this.setState({ invalid_poll_id: true, data_loaded: true }); return
            };
            res.json().then(res_json => {
                let total_votes = 0;
                res_json.options.forEach((opt: any) => {
                    total_votes += opt.no_of_polls
                });
                this.setState({ poll_data: res_json, data_loaded: true, total_votes: total_votes });
            })
        })
    }
    vote = async () => {
        if (this.state.vote_option < 0 || !this.poll_id) return;
        try {
            let already_voted = await check_vote(this.state.poll_data.question_id as string);
            if (already_voted) {
                this.setState({ show_alert: true, alert_severity: 'error', alert_title: 'Invalid vote!', alert_text: 'You have already voted to this poll. ' });
                return;
            }
            voteToQuestion(
                this.poll_id,
                this.state.vote_option,
                () => {
                    this.setState({ show_alert: true, alert_severity: 'error', alert_text: 'This poll might be expired.', alert_title: 'Error!' })
                })
                .then(res => {
                    this.setState({ show_alert: true, alert_severity: 'success', alert_text: 'Your vote has been submitted.', alert_title: 'Success,' })
                }).catch(err => { console.error(err) })
        } catch (error) {

        }

    }
    render(): React.ReactNode {
        return (
            <Paper
                variant='elevation'
                elevation={0}
                sx={{ p: '1.5rem' ,display:'flex',flexDirection:'column',alignItems:'center'}}
            // sx={{position:'absolute', top: 0, left: 0, right: 0, bottom: 0 }} 
            >
                <Container
                maxWidth='md'
                sx={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',width:'100%',margin:'auto'}}
                >
                    {(this.state.data_loaded && this.state.poll_data) &&
                        <Box
                            boxShadow={window.innerWidth > 480 ? 3 : 0}
                            sx={{ p: 3, display: 'flex', margin: 'auto', borderRadius: '6px', width: '100%' }}
                            flexDirection={'column'}
                        >
                            <Slide direction="right" in={this.state.show_alert} mountOnEnter unmountOnExit >
                                <Alert translate="yes"
                                    severity={this.state.alert_severity}
                                    sx={{ width: '70%' }}
                                    title={this.state.alert_title}
                                >
                                    {this.state.alert_text}
                                </Alert>
                            </Slide>
                            <h2 style={{ margin: '2rem 0', fontSize: '1.5rem', color: 'hsl(0,0,10%)', letterSpacing: '1.5px' }} >{this.state.poll_data.question}</h2>
                            <RadioGroup
                                onChange={e => {
                                    let index = parseInt(e.target.value);
                                    if (!index) return;
                                    this.setState({ vote_option: index })
                                }}
                            >

                                <Stack direction={'column'} spacing={2} alignItems={'flex-start'}>
                                    {this.state.poll_data && this.state.poll_data.options.map((opt: any, i: any) => {
                                        return (
                                            <Container
                                                key={i}
                                                sx={{ padding: '0.2rem', borderRadius: '6px', border: '2px solid #cccc',display:'flex',justifyContent:"space-between",alignItems:'center'}}>
                                                <FormControlLabel  value={opt.index} control={<Radio />} label={opt.option} />
                                                <p>{opt.no_of_polls} votes</p>
                                            </Container>
                                        )
                                    })}
                                </Stack>
                            </RadioGroup>
                            <h3 style={{ color: 'hsl(0,0%,15%)' }}>Total votes: {this.state.total_votes}</h3>
                            <Button
                                size='medium'
                                disabled={this.state.vote_option < 0}
                                onClick={this.vote}
                                variant="contained"
                                sx={{ width: 'fit-content' }} >Vote</Button>

                        </Box>
                    }
                    <Dialog open={this.state.invalid_poll_id}>
                        <DialogTitle>No poll exits</DialogTitle>
                        <DialogContent>
                            <DialogContentText>There is no live poll(s) with id <b>{this.poll_id}</b>,</DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button
                                variant='contained'
                                size="medium"
                                onClick={() => { let props = this.props as any; props.history.push('/home') }}
                            >
                                Back
                            </Button>
                        </DialogActions>
                    </Dialog>
                    {!this.state.data_loaded &&
                        <Container
                            sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}
                        >
                            <CircularProgress />
                            <p>Fetching question data ...</p>
                        </Container>
                    }
                </Container>
            </Paper>
        )
    }
}
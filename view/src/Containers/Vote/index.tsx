import {
    Dialog,
    CircularProgress,
    DialogTitle,
    DialogActions,
    DialogContent,
    DialogContentText,
    Button,
    Container,
    Alert,
    Slide
} from "@mui/material";
import React from "react";
import { check_vote, getQuestionData, vote as voteToQuestion } from "../../Utils/utils";
import styles from './vote.module.css';
interface StateProps {
    data_loaded: boolean;
    invalid_poll_id: boolean;
    poll_data: any;
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
                console.log(res_json);
                
                this.setState({ poll_data: res_json, data_loaded: true});
            })
        })
    }
    vote = async () => {
        if (this.state.vote_option < 0 || !this.poll_id) return;
        try {
            let already_voted = await check_vote(this.state.poll_data.question_id );
            let res_josn = await already_voted.json();
            if (res_josn.is_voted) {
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

            <div className={styles['container']}>
                <div className={styles['wrapper']}>  {(this.state.data_loaded && this.state.poll_data) &&
                    <div className={styles['left']}>
                        <Slide direction="right" in={this.state.show_alert} mountOnEnter unmountOnExit >
                            <Alert translate="yes"
                                severity={this.state.alert_severity}
                                sx={{ width: '100%' }}
                                title={this.state.alert_title}
                            >


                                {this.state.alert_text}
                            </Alert>
                        </Slide>
                        <h2>{this.state.poll_data.question_title}</h2>
                        <h3 style={{ margin: '2rem 0', fontSize: '1.5rem', color: 'hsl(0,0,10%)', letterSpacing: '1.5px' }} >{this.state.poll_data.question}</h3>
                        <div className={styles['options-container']}>
                            {
                                this.state.poll_data.options.map((opt: any, i: number) => {
                                    let per = (opt.no_of_polls / this.state.total_votes) * 100;
                                    if (!per) { per = 0 }
                                    let css_var = { "--percentage": `${per}%` } as React.CSSProperties;
                                    return (
                                        <div
                                            className={styles['option']}
                                            key={i}
                                            onClick={() => { this.setState({ vote_option: i + 1 }) }}
                                            data-selected={this.state.vote_option === i + 1 ? true : false}
                                        >
                                            <div className={styles['option-top']} >
                                                <h4>{opt.option}</h4>
                                                <h5>10%</h5>
                                            </div>
                                            <div className={styles['option-bottom']}>
                                                <div className={styles['option-outerbar']}>
                                                    <div className={styles['option-insidebar']} style={css_var}></div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                        </div>

                        {/* <RadioGroup
                            onChange={e => {
                                let index = parseInt(e.target.value);
                                if (!index) return;
                                this.setState({ vote_option: index })
                            }}
                        >

                            <Stack direction={'column'} spacing={2} alignItems={'flex-start'}>
                                {this.state.poll_data && this.state.poll_data.options.map((opt: any, i: any) => {
                                    return (
                                        <div className={styles['option']} key={i}>
                                            <FormControlLabel value={opt.index} control={<Radio />} label={opt.option} />
                                            <p>{opt.no_of_polls} votes</p>
                                        </div>
                                    )
                                })}
                                
                            </Stack>
                        </RadioGroup> */}
                        <div>
                            <div>
                                <Button
                                    size='medium'
                                    disabled={this.state.vote_option < 0}
                                    onClick={this.vote}
                                    variant="contained"
                                    sx={{ width: 'fit-content' }} >Vote</Button>
                            </div>
                            <div >
                                <p>go to results</p>
                                <svg width="10" height="12" viewBox="0 0 10 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M1.62646 1L8.62646 6L1.62646 11" stroke="#5E5C76" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                        </div>
                    </div>
                }
                </div>
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

            </div>
        )
    }
}
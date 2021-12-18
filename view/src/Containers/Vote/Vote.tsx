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
import Navbar from "../../Components/NavBar";
import { SERVER_URL } from "../../config";
import { getQuestionData, isMobile, timeAgo, vote as voteToQuestion } from "../../Utils/utils";
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
            show_alert: false, alert_title: '', vote_option: -1
        }

    };
    fetchUpdatePollData = () => {
        if (!this.poll_id) return;
        getQuestionData(this.poll_id).then(res => {
            if (res.status !== 200) {
                this.setState({ invalid_poll_id: true, data_loaded: true }); return
            };
            res.json().then(res_json => {

                this.setState({ poll_data: res_json, data_loaded: true });
            })
        })
    }
    componentDidMount() {
        this.poll_id = new URLSearchParams(window.location.search).get('id');
        if (!this.poll_id) {
            window.location.href = '/home'
            return;
        }
        this.fetchUpdatePollData();
        fetch(`${SERVER_URL}/add_visit?question_id=${this.poll_id}`, { credentials: 'include', mode: 'cors', method: 'GET' }).then(res => console.log(res)).catch(err => console.error(err))
    }
    vote = () => {
        if (this.state.vote_option < 0 || !this.poll_id) return;
        try {

            voteToQuestion(
                this.poll_id,
                this.state.vote_option,
                () => {
                    this.setState({ show_alert: true, alert_severity: 'error', alert_text: 'This poll might be expired.', alert_title: 'Error!' }); return
                })
                .then(res => {
                    console.log(res);
                    res.json().then(res_json => {
                        console.log(res_json);
                        if (res_json.is_already_voted) {
                            this.setState({ show_alert: true, alert_severity: 'error', alert_text: 'You had already voted to this poll.', alert_title: 'Duplicate vote!' });
                            return;
                        }
                        let updated_poll_data = { ...this.state.poll_data };
                        updated_poll_data.options[this.state.vote_option].no_of_polls += 1;
                        updated_poll_data.total_votes += 1;
                        console.log(updated_poll_data);
                        
                        this.setState(
                            {
                                show_alert: true,
                                alert_severity: 'success',
                                alert_text: 'Your vote has been submitted.',
                                alert_title: 'Success!', poll_data: updated_poll_data
                            })
                            ;
                        this.fetchUpdatePollData();
                    })

                }).catch(err => { console.error(err) })
        } catch (error) {

        }

    }
    render(): React.ReactNode {
        return (

            <div className={styles['container']}>
                <Navbar />
                <div className={styles['wrapper']}>
                    {
                        (this.state.data_loaded && this.state.poll_data) &&
                        <>
                            <div className={styles['left']} >
                                <Slide direction="right" in={this.state.show_alert} mountOnEnter unmountOnExit >
                                    <Alert className={styles['alert']}
                                        severity={this.state.alert_severity}
                                        sx={{ width: '100%', height: '100%', alignSelf: 'center' }}
                                        title={this.state.alert_title}
                                    >
                                        {this.state.alert_text}
                                    </Alert>
                                </Slide>
                                <p className={styles['title']}>{this.state.poll_data.question_title}</p>
                                <div className={styles['question']}>
                                    <p>{this.state.poll_data.question}</p>
                                    <p>Asked by <b>{this.state.poll_data.created_by ?? 'Guest'} </b>{timeAgo(new Date(this.state.poll_data.created_time))}</p>
                                </div>
                                <div className={styles['options-container']}>
                                    {
                                        this.state.poll_data.options.map((opt: any, i: number) => {
                                            let per = (opt.no_of_polls / this.state.poll_data.total_votes) * 100;
                                            if (!per) { per = 0 }
                                            let css_var = { "--percentage": `${per}%` } as React.CSSProperties;
                                            return (
                                                <div
                                                    className={styles['option']}
                                                    key={i}
                                                    style={{ zIndex: 10 }}
                                                    onClick={() => { this.setState({ vote_option: i }) }}
                                                    data-selected={this.state.vote_option === i ? true : false}
                                                >
                                                    <div className={styles['option-top']} >
                                                        <p>{opt.option}</p>
                                                        <p>{Math.floor(per)}%</p>
                                                    </div>
                                                    <div className={styles['option-bottom']}>
                                                        <div className={styles['option-outerbar']}>
                                                            <div className={styles['option-innerbar']} style={css_var}></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                </div>
                                <div className={styles['left-bottom-buttons']}>
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
                                        <svg width="8" height="10" viewBox="0 0 10 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M1.62646 1L8.62646 6L1.62646 11" stroke="#5E5C76" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            <div className={styles['right']}>
                                <div className={styles['right-top']}>
                                    <p>Votes</p>
                                    <p>{this.state.poll_data.total_votes}</p>
                                </div>
                                <span></span>
                                <div className={styles['right-bottom']}>
                                    <p>Share poll</p>
                                    <div style={{ cursor: 'pointer' }} onClick={() => {
                                        navigator.clipboard.writeText(`${window.location.origin}/vote?id=${this.poll_id}/`).then(() => {
                                            this.setState({ show_alert: true, alert_severity: 'success', alert_text: 'Link has been copied to clipboard.', alert_title: 'Copied!' })
                                        }).catch(() => {
                                            this.setState({ show_alert: true, alert_severity: 'warning', alert_text: 'Unable to copy link to clipboard', alert_title: 'Error!' })
                                        })

                                    }}>
                                        <svg width="27" height="29" viewBox="0 0 27 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M10.9858 15.3171C11.5257 16.0689 12.2145 16.691 13.0054 17.1411C13.7964 17.5913 14.671 17.8589 15.57 17.926C16.469 17.9931 17.3713 17.858 18.2158 17.5298C19.0602 17.2017 19.8271 16.6882 20.4643 16.0242L24.2355 12.0958C25.3805 10.861 26.014 9.20712 25.9997 7.49043C25.9854 5.77374 25.3243 4.13159 24.159 2.91767C22.9936 1.70374 21.4171 1.01517 19.7691 1.00025C18.1211 0.98533 16.5334 1.64526 15.3479 2.83791L13.1857 5.0771" stroke="#9C19E0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M16.0141 12.6982C15.4742 11.9464 14.7855 11.3244 13.9945 10.8742C13.2036 10.4241 12.3289 10.1564 11.4299 10.0893C10.5309 10.0223 9.62861 10.1574 8.78415 10.4855C7.93969 10.8136 7.17285 11.3271 6.53565 11.9911L2.7644 15.9195C1.61945 17.1543 0.985917 18.8082 1.00024 20.5249C1.01456 22.2416 1.67559 23.8837 2.84096 25.0977C4.00633 26.3116 5.5828 27.0002 7.23082 27.0151C8.87884 27.03 10.4665 26.3701 11.652 25.1774L13.8016 22.9382" stroke="#9C19E0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                        <p>copy link</p>
                                    </div>
                                    <div onClick={() => {
                                        if (isMobile()) {
                                            let link = `${window.location.origin}/vote?id=${this.poll_id}/`
                                            window.location.href = `whatsapp://send?text=${link}`;
                                            return;
                                        }
                                        // ? %0a for next line
                                        let link = `${window.location.origin}/vote?id=${this.poll_id}`
                                        window.location.href = `https://web.whatsapp.com/send?text=${link}`;
                                    }}>
                                        <svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <circle cx="19" cy="19" r="19" fill="#25D366" />
                                            <path d="M27.9778 9.91232C25.6743 7.6033 22.6066 6.33333 19.3464 6.33333C12.6173 6.33333 7.14157 11.809 7.14157 18.5382C7.14157 20.6878 7.70233 22.7879 8.76888 24.6406L7.03711 30.963L13.5079 29.2642C15.2891 30.2373 17.2958 30.7486 19.3409 30.7486H19.3464C26.0701 30.7486 31.6667 25.2729 31.6667 18.5437C31.6667 15.2836 30.2813 12.2214 27.9778 9.91232ZM19.3464 28.6924C17.5212 28.6924 15.7344 28.2031 14.1786 27.2795L13.8103 27.0596L9.97287 28.0657L10.9954 24.3218L10.7535 23.9369C9.73647 22.3206 9.2032 20.4569 9.2032 18.5382C9.2032 12.947 13.7553 8.39496 19.3519 8.39496C22.0623 8.39496 24.6077 9.45052 26.5209 11.3692C28.4341 13.2879 29.6106 15.8333 29.6051 18.5437C29.6051 24.1403 24.9376 28.6924 19.3464 28.6924ZM24.9101 21.0946C24.6077 20.9407 23.1068 20.204 22.8265 20.105C22.5461 20.0006 22.3427 19.9511 22.1393 20.259C21.9358 20.5668 21.3531 21.2486 21.1717 21.4575C20.9957 21.6609 20.8143 21.6884 20.5119 21.5344C18.7197 20.6383 17.5432 19.9346 16.3612 17.906C16.0478 17.3672 16.6746 17.4057 17.2573 16.2402C17.3563 16.0367 17.3068 15.8608 17.2298 15.7069C17.1528 15.5529 16.5426 14.0521 16.2897 13.4418C16.0423 12.8481 15.7894 12.9306 15.6025 12.9196C15.4266 12.9086 15.2232 12.9086 15.0197 12.9086C14.8163 12.9086 14.4865 12.9855 14.2061 13.2879C13.9257 13.5958 13.1395 14.3325 13.1395 15.8333C13.1395 17.3342 14.2336 18.7856 14.382 18.989C14.536 19.1924 16.5316 22.2711 19.5938 23.5961C21.529 24.4317 22.2877 24.5032 23.2553 24.3602C23.8435 24.2723 25.0585 23.6236 25.3114 22.9089C25.5643 22.1942 25.5643 21.5839 25.4873 21.4575C25.4159 21.32 25.2125 21.2431 24.9101 21.0946Z" fill="white" />
                                        </svg>
                                        <p>Whattps</p>
                                    </div>
                                    <div>
                                        <svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <circle cx="19" cy="19" r="19" fill="#3B5998" />
                                            <path d="M25.017 21.75L25.7949 16.6827H20.9314V13.3943C20.9314 12.008 21.6108 10.6566 23.789 10.6566H26V6.34234C26 6.34234 23.9936 6 22.0752 6C18.0701 6 15.4521 8.42703 15.4521 12.8206V16.6827H11V21.75H15.4521V34H20.9314V21.75H25.017Z" fill="white" />
                                        </svg>
                                        <p>facebook</p>
                                    </div>
                                </div>
                            </div>
                        </>
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
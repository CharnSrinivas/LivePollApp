import React from "react";
import {
    TextField,
    IconButton,
    InputAdornment,
    Button,
    Stack,
    Tooltip,
    CircularProgress,
    Snackbar,
    Alert,
    Dialog, DialogActions, DialogTitle, DialogContent, DialogContentText, Collapse
} from "@mui/material";
import { Add, ExpandLess, ExpandMore, SaveOutlined } from "@mui/icons-material";
import OptionField from './OptionField';
import { sendQuestionData, saveQuestionId, getSavedQuestionId } from "../../Utils/utils";
import Navbar from "../../Components/NavBar";
import styles from './create.module.css';
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import { DesktopDateTimePicker, LocalizationProvider, MobileDateTimePicker } from "@mui/lab";

const Max_img_width = 300;
const Max_img_height = 500;

interface StateProps {
    question: string;
    options: string[];
    question_title: string;
    question_description: string;
    no_of_options: number;
    submit_loading: boolean;
    window_width: number;
    open_snackbar: boolean;
    snackbar_msg: string;
    snack_bar_severity: 'error' | 'success' | 'warning' | 'info';
    show_success_dialog: boolean
    no_question_error: boolean;
    no_title_error: boolean;
    open_advance_settings: boolean;
    expire_date: Date | null;
    image_file: FileList | null;
}

export default class Create extends React.Component<{}, StateProps>{

    constructor(props: any) 
    {
        super(props);
        this.state = {
            question: '',
            options: [],
            no_of_options: 2,
            submit_loading: false,
            open_snackbar: false,
            snackbar_msg: '',
            snack_bar_severity: 'warning',
            show_success_dialog: false,
            question_description: '',
            question_title: 'TITLE',
            no_question_error: false,
            no_title_error: false,
            open_advance_settings: false,
            expire_date: null,
            window_width: window.innerWidth,
            image_file: null
        }
        let options = this.state.options;
        for (let i = 0; i < this.state.no_of_options; i++) 
        {
            options[i] = '';
        }
        this.setState({ options });
    };

    componentDidMount() {
        window.addEventListener('resize', () => {
            this.setState({ window_width: window.innerWidth });
        }
        )
    }

    addNewOptionField = () => {
        this.setState({ no_of_options: this.state.no_of_options + 1 });
        let options = this.state.options;
        options.push('');
        this.setState({ options })
    }

    deleteOption = (index: number) => {
        if (this.state.no_of_options <= 2) {
            this.setState({ open_snackbar: true, snackbar_msg: 'Couldn\'t be deleted.', snack_bar_severity: 'error' })
            return;
        }
        this.setState({ no_of_options: this.state.no_of_options - 1 });
        let options = this.state.options;
        options.splice(index, 1);
        this.setState({ options });

    }
    
    getOptionFields = () => {
        const updateOptionsValues = (value: string, i: number) => {
            let options = this.state.options;
            options[i] = value;
            this.setState({ options });
        }

        let arr: JSX.Element[] = [];
        this.state.options.forEach((opt, i) => {
            arr.push(
                <OptionField
                    opt={opt}
                    key={i}
                    i={i}
                    onChange={(value: string) => { updateOptionsValues(value, i) }} onDelete={() => { this.deleteOption(i) }}
                />
            )
        });
        return arr;

    }

    getImageData = (): Promise<string | ArrayBuffer> => {
        return new Promise((res, rej) => {
            const fileList = this.state.image_file;
            if (!fileList) { rej(); return; }
            let reader = new FileReader();
            reader.readAsDataURL(fileList[0]);
            reader.onload = function () {
                let result = reader.result;
                if (result && typeof (result) == 'string') {
                    const canvas = document.createElement('canvas');
                    const ctx = canvas.getContext('2d');
                    let img = new Image();
                    img.src = result;
                    ctx?.drawImage(img, 0, 0, img.width, img.height);
                    // res(result); return
                    const ratio = Math.min(Max_img_width / img.width, Max_img_height / img.height);
                    ctx?.scale(ratio * img.width, ratio * img.height);
                    canvas.toDataURL();
                }
                rej(); return;
            }
        })
    }

    onConfirm = () => {
        let options = this.state.options;
        let question = this.state.question;
        let title = this.state.question_title;
        let description = this.state.question_description;
        if (description.length < 1 || description === ' '.repeat(description.length)) {
            description = ''
        }

        if (options.length <= 1 || this.state.no_of_options <= 1) {
            this.setState({ open_snackbar: true, snack_bar_severity: 'warning', snackbar_msg: 'No.Of options should be more than one.' }); return;
        }
        if (question.length <= 0 || question === ' '.repeat(question.length)) {
            this.setState({ open_snackbar: true, snack_bar_severity: 'error', snackbar_msg: 'Question field is empty.', no_question_error: true });
            document.getElementById('poll-question')?.focus();
            return;
        }
        if (title.length <= 0 || title === ' '.repeat(title.length)) {
            this.setState({ open_snackbar: true, snack_bar_severity: 'error', snackbar_msg: 'Title field is empty.', no_title_error: true });
            document.getElementById('poll-title')?.focus();
            return;
        }
        this.setState({ no_question_error: false, no_title_error: false })
        for (let i = 0; i < options.length; i++) {
            if (options[i] === ' '.repeat(options[i].length)) {
                this.setState({ open_snackbar: true, snack_bar_severity: 'warning', snackbar_msg: 'Option(s) fields is empty.' });
                document.getElementById(`poll-option-${i + 1}`)?.focus();
                return;
            }
        }
        this.setState({ submit_loading: true });

        let data = { options, question, question_title: title, question_description: description, expire_at: this.state.expire_date }
        // const image_base64
        sendQuestionData(data).then(json => {
            if (json.question_id) {
                saveQuestionId(json.question_id!)
                this.setState({ show_success_dialog: true });
                this.setState({ submit_loading: false });
            }
        })
            .catch(err => {
                console.error(err);
                this.setState({ submit_loading: false });
            })

    }

    render(): React.ReactNode {

        return (
            <div className={styles['container']}>
                <Navbar />
                <div className={styles['circle-right']}></div>
                <div className={styles['circle-left']}></div>
                <div className={styles['wrapper']}>
                    <div className={styles['left']}>
                        <h2>Create Poll</h2>
                        <div>
                            <h3>Title</h3>
                            <TextField
                                onChange={e => { this.setState({ question_title: e.target.value }) }}
                                variant='outlined'
                                error={this.state.no_title_error}
                                placeholder="Enter poll title"
                                required type={'text'} maxRows={1} rows={0}
                                id='poll-title'
                                value={this.state.question_title}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start" >
                                            <object aria-label="T" data="media/icons/T.svg" type="image/svg+xml"></object>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </div>
                        <div>
                            <h3>Question</h3>
                            <TextField
                                onChange={e => { this.setState({ question: e.target.value }) }}
                                variant='outlined'
                                error={this.state.no_question_error}
                                placeholder="Enter your question?"
                                required type={'text'} maxRows={1}
                                id='poll-question'
                                value={this.state.question}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start" >
                                            <object aria-label="question_mark" data="media/icons/question_mark.svg" type="image/svg+xml"></object>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </div>
                        <div>
                            <h3>Description</h3>
                            <TextField
                                multiline
                                rows={4} value={this.state.question_description}
                                onChange={e => { this.setState({ question_description: e.target.value }) }}
                                variant='outlined'
                                placeholder="Your description goes here..(optional)"
                                required type={'text'}
                            // InputProps={{
                            //     startAdornment: (
                            //         <InputAdornment position="end"  >                                            
                            //                 <object data="media/icons/pencil.svg" type="image/svg+xml"></object>
                            //         </InputAdornment>
                            //     ),
                            // }}
                            />
                        </div>

                        <Stack direction="column" spacing={2} alignContent={'flex-start'} className={styles["poll-options"]}>
                            <h3>Options</h3>
                            {this.getOptionFields()}
                            <Tooltip title="Add new option to list." sx={{ alignSelf: 'flex-start' }}>
                                <IconButton color="primary" onClick={this.addNewOptionField}>
                                    <Add fontSize="large" sx={{ borderRadius: '4px', p: '2px' }} />
                                </IconButton>
                            </Tooltip>
                        </Stack>

                        <div style={{ width: '100%', height: '1px', backgroundColor: '#c4c4c4', marginTop: '0.3rem' }}></div>
                        <Stack className={styles['advanced-settings']} width={'100%'} direction={'column'}>
                            <Stack direction={'row'} width={'100%'} justifyContent={'space-between'} alignItems={'center'} >
                                <p style={{ cursor: 'pointer' }} onClick={() => { this.setState({ open_advance_settings: !this.state.open_advance_settings }) }} >Advanced settings</p>
                                <div style={{ cursor: 'pointer' }} onClick={() => { this.setState({ open_advance_settings: !this.state.open_advance_settings }) }}>
                                    {this.state.open_advance_settings ? <ExpandLess /> : <ExpandMore />}
                                </div>
                            </Stack>
                            <Collapse unmountOnExit in={this.state.open_advance_settings}>
                                <Stack direction={'column'} width={'100%'} alignItems={'flex-start'}>
                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                        {this.state.window_width >= 780 &&
                                            <DesktopDateTimePicker
                                                label="Expire date"
                                                value={this.state.expire_date}
                                                minDateTime={new Date()}
                                                onChange={(new_date) => { this.setState({ expire_date: new_date }) }}
                                                renderInput={(params) => <TextField {...params} />}
                                            />}
                                        {this.state.window_width < 780 &&
                                            <MobileDateTimePicker
                                                label="Expire date"
                                                value={this.state.expire_date}
                                                minDateTime={new Date()}
                                                onChange={(new_date) => { this.setState({ expire_date: new_date }) }}
                                                renderInput={(params) => <TextField {...params} />}
                                            />}
                                    </LocalizationProvider>
                                    <Tooltip title='Add image to poll.' sx={{ alignSelf: 'flex-start' }}>
                                        <label className={styles['img-upload']}>
                                            <div>
                                                <svg width="20" height="20" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M21.0869 15.9012V19.9012C21.0869 20.4316 20.8762 20.9403 20.5011 21.3154C20.1261 21.6905 19.6173 21.9012 19.0869 21.9012H5.08691C4.55648 21.9012 4.04777 21.6905 3.6727 21.3154C3.29763 20.9403 3.08691 20.4316 3.08691 19.9012V15.9012" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /> <path d="M17.0869 8.9012L12.0869 3.9012L7.08691 8.9012" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /> <path d="M12.0869 3.9012V15.9012" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /> </svg>
                                                <p>Upload image</p>
                                            </div>
                                            <input type={'file'} accept="image/*" style={{ display: 'none' }}
                                                onChange={(e) => { this.setState({ image_file: e.target.files }) }} />
                                        </label>
                                    </Tooltip>
                                </Stack>
                            </Collapse>
                        </Stack>
                        {!this.state.submit_loading &&
                            <Button
                                startIcon={<SaveOutlined />}
                                variant="contained"
                                onClick={this.onConfirm}
                                size="large"
                                sx={{ width: 'fit-content', marginTop: '2rem' }}
                            >Confirm
                            </Button>
                        }

                        {
                            this.state.submit_loading &&
                            <Button disabled
                                color='primary'
                                variant="contained"
                                sx={{ width: 'fit-content', marginTop: '2rem' }}
                                size="medium"
                                startIcon={<CircularProgress color="inherit" />}
                            >
                                Confirm
                            </Button>
                        }
                    </div>
                    <div className={styles['right']}>
                        <img src="media/illustrations/create_illustration.svg" alt="create_illustration"></img>
                    </div>
                </div>
                <Snackbar
                    open={this.state.open_snackbar}
                    translate="yes"
                    autoHideDuration={1500}
                    onClose={() => this.setState({ open_snackbar: false })}
                >
                    <Alert severity={this.state.snack_bar_severity} sx={{ width: '100%' }}>{this.state.snackbar_msg}</Alert>
                </Snackbar>

                <Dialog open={this.state.show_success_dialog} >
                    <DialogTitle><b>Successfully created your poll.</b></DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Your poll is now created. To make others to voter to your poll send this
                            <a href={`${window.location.origin}/vote?id=${getSavedQuestionId()}`}>{`${window.location.origin}/vote?id=${getSavedQuestionId()}`}</a>to them.<br />
                            Or by typing this <b>{getSavedQuestionId()}</b> Join Id in <a href='www.google.com'>www.website.com</a>
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button variant="text" size='small' color='inherit'
                            onClick={() => { this.setState({ show_success_dialog: false }) }}
                        >close</Button>
                        <Button variant="contained" size='medium' color='primary'>View poll</Button>
                    </DialogActions>

                </Dialog>
            </div>
        );
    }
}

import React from "react";
import {
    TextField,
    IconButton,
    InputAdornment,
    Box,
    Button,
    Stack,
    FormLabel,
    Tooltip,
    CircularProgress,
    Snackbar,
    Alert,
    Dialog, DialogActions, DialogTitle, DialogContent, DialogContentText, Paper
} from "@mui/material";
import { Quiz, Add, SaveOutlined } from "@mui/icons-material";
import OptionField from './OptionField';
import { sendQuestionData, saveQuestionId, getSavedQuestionId } from "../../Utils/utils";
interface StateProps {
    question: string;
    options: string[];
    no_of_options: number;
    submit_loading: boolean;
    open_snackbar: boolean;
    snackbar_msg: string;
    snack_bar_severity: 'error' | 'success' | 'warning' | 'info';
    show_success_dialog: boolean

}

export default class Create extends React.Component<{}, StateProps>{

    constructor(props: any) {
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
        }
        let options = this.state.options;
        for (let i = 0; i < this.state.no_of_options; i++) {
            options[i] = '';
        }
        this.setState({ options });
    };

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

    onConfirm = () => {
        let options = this.state.options;
        let question = this.state.question;
        if (options.length <= 1 || this.state.no_of_options <= 1) {
            this.setState({ open_snackbar: true, snack_bar_severity: 'warning', snackbar_msg: 'No.Of options should be more than one.' }); return;
        }
        if (question.length <= 0 || question === ' '.repeat(question.length)) {
            this.setState({ open_snackbar: true, snack_bar_severity: 'error', snackbar_msg: 'Question field is empty.' });
            document.getElementById('poll-question')?.focus();
            return;
        }
        for (let i = 0; i < options.length; i++) {
            if (options[i] === ' '.repeat(options[i].length)) {
                this.setState({ open_snackbar: true, snack_bar_severity: 'warning', snackbar_msg: 'Option(s) fields is empty.' });
                document.getElementById(`poll-option-${i + 1}`)?.focus();
                return;
            }
        }
        this.setState({ submit_loading: true });
        let data = { options, question }
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
            <Paper
                variant='elevation'
                elevation={0}
                sx={{ p: '1.5rem' }}
            // sx={{position:'absolute', top: 0, left: 0, right: 0, bottom: 0 }} 
            >
                <Box
                    maxWidth='md'
                    boxShadow={window.innerWidth > 480 ? 3 : 0}
                    sx={{ p: 3, display: 'flex', margin: '2rem auto', borderRadius: '6px' }}
                    flexDirection={'column'}
                >

                    <TextField
                        onChange={e => { this.setState({ question: e.target.value }) }}
                        variant='standard'
                        placeholder="Enter your question?"
                        label='Your Question'
                        required type={'text'} maxRows={1}
                        sx={{ maxWidth: '90%', minWidth: '50%', marginLeft: '2rem' }}
                        id='poll-question'
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start" >
                                    <Quiz />
                                </InputAdornment>
                            ),
                        }}
                    />

                    <Stack direction="column" spacing={2} alignContent={'flex-start'} marginTop={'5rem'} id='poll-options'>
                        <FormLabel htmlFor="poll-options">Options</FormLabel>
                        {this.getOptionFields()}
                        <Tooltip title="Add new option to list." sx={{ alignSelf: 'flex-start' }}>
                            <IconButton color="primary" onClick={this.addNewOptionField}>
                                <Add fontSize="large" sx={{ borderRadius: '4px', p: '2px' }} />
                            </IconButton>
                        </Tooltip>
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
                </Box>
            </Paper>
        );
    }
}

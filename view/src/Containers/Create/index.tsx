import React from "react";
import { TextField, IconButton, InputAdornment, Box, Button, Stack, FormLabel, Tooltip} from "@mui/material";
import { Quiz, Add, MoreVert, DeleteOutlined, SaveOutlined } from "@mui/icons-material";
import OptionField from './OptionField';
interface StateProps {
    question?: string | undefined;
    options: string[];
    no_of_options: number;
    submit_loading:boolean;
}

export default class extends React.Component<{}, StateProps>{

    constructor(props: any) {
        super(props);
        this.state = {
            question: undefined,
            options: [], no_of_options: 2,submit_loading:false
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

    getOptionFields = () => {
        console.log(this.state.options);
        const updateOptionsValues = (value: string, i: number) => {
            let options = this.state.options;
            options[i] = value;
            this.setState({ options });
            console.log(options);

        }
        const deleteOption = (index: number) => {
            this.setState({ no_of_options: this.state.no_of_options - 1 });
            let options = this.state.options;
            options.splice(index, 1);
            this.setState({ options });

        }
        let arr: JSX.Element[] = [];
        this.state.options.forEach((opt, i) => {
            arr.push(
                <OptionField opt={opt} key={i} i={i} onChange={(value: string) => { updateOptionsValues(value, i) }} onDelete={() => { deleteOption(i) }} />
            )
        });
        return arr;

    }
    render(): React.ReactNode {
        return (
            <Box
                maxWidth='md'
                boxShadow={3}
                sx={{ p: 3, display: 'flex', margin: '2rem auto', borderRadius: '6px' }}
                flexDirection={'column'}
            >

                <TextField
                    onChange={e => { this.setState({ question: e.target.value }) }}
                    variant='standard'
                    placeholder="Enter your question?"
                    label='Your Question'
                    required type={'text'} maxRows={1}
                    sx={{ maxWidth: '90%', minWidth: '50%',marginLeft:'2rem' }}

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
                            <Add fontSize="medium" sx={{ backgroundColor: 'lightgray', borderRadius: '4px', p: '2px' }} />
                        </IconButton>
                    </Tooltip>
                </Stack>

                {/* <Button startIcon={<SaveOutlined />} variant="contained" size="large" sx={{ width: 'fit-content', marginTop: '2rem' }}>Confirm</Button> */}
                <Button startIcon={<div id='loading'></div>} variant="contained" size="large" sx={{ width: 'fit-content', marginTop: '2rem' }}>Confirm</Button> 
                    {
                    this.state.submit_loading &&
                    <Button disabled color='primary' >
                            Loading
                    </Button>
                    }
            </Box>
        );
    }
}
import React from "react";
import { TextField, IconButton, InputAdornment, Box, Stack, FormLabel, Tooltip, Popover, ListSubheader, List, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { Quiz, Add, MoreVert, DeleteOutline, DeleteOutlined } from "@mui/icons-material";
import styles from './styles.module.css';
interface StateProps {
    question?: string | undefined;
    options: string[];
    no_of_options: number;
}

const OptionField =
    ({opt, i, onChange, onDelete }: {opt:string, i: number, onChange?: Function, onDelete?: Function }) => {
        const [open, setOpen] = React.useState(false);
        const _onChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>, index: number) => {
            if (onChange) { onChange(e.target.value); }
        }
        let anchorEl = document.getElementById(`more-btn${i + 1}`)
        return (
            <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
                <p style={{ fontSize: '1.2rem', color: 'hsl(0,0%,35%)' }}>{i + 1}.</p>
                <TextField value={opt} onChange={(e) => _onChange(e, i)} label={`option-${i + 1}`} sx={{ width: '100%', margin: 'auto 1rem' }} spellCheck />
                <IconButton
                    id={`more-btn${i + 1}`}
                    onClick={() => { { setOpen(true) } }}
                >
                    <MoreVert />
                </IconButton>
                <Popover
                    open={(open && anchorEl != null)}
                    anchorEl={anchorEl ? anchorEl : null}
                    anchorOrigin={{
                        vertical: 'center',
                        horizontal: 'right',
                    }}
                    transformOrigin={{ vertical: 'center', horizontal: 'right' }}
                    onClose={()=>{setOpen(false)}}
                >
                    <List
                        sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
                        component="nav"
                        subheader={
                            <ListSubheader>More</ListSubheader>
                        }
                    >
                        <ListItemButton onClick={() => { setOpen(false);if (onDelete) { onDelete() } }}>
                            <ListItemIcon>
                                <DeleteOutlined color='warning' />
                            </ListItemIcon>
                            <ListItemText primary="Delete" />
                        </ListItemButton>
                    </List>
                </Popover>
            </Stack>
        )

    }

export default class extends React.Component<{}, StateProps>{

    constructor(props: any) {
        super(props);
        this.state = {
            question: undefined,
            options: [], no_of_options: 3
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
                <OptionField opt={opt} key={i} i={i}  onChange={(value: string) => { updateOptionsValues(value, i) }} onDelete={()=>{deleteOption(i)}}/>
            )
        });
        return arr;

    }
    render(): React.ReactNode {
        return (
            <Box
                maxWidth='md'
                className={styles['container']}
                boxShadow={3}
                sx={{ p: 3, display: 'flex', margin: '2rem auto' }}
                flexDirection={'column'}
            >

                <TextField
                    onChange={e => { this.setState({ question: e.target.value }) }}
                    variant='standard'
                    placeholder="Enter your question?"
                    label='Your Question'
                    required type={'text'} maxRows={1}
                    sx={{ maxWidth: '80%', minWidth: '50%' }}

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
            </Box>
        );
    }
}
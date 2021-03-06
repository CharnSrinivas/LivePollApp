import { MoreVert, DeleteOutlined } from "@mui/icons-material";
import { Stack, TextField, IconButton, Popover, List, ListSubheader, ListItem, ListItemButton, ListItemIcon, ListItemText, InputAdornment } from "@mui/material";
import React from "react";
import styles from './create.module.css';
const OptionField =
    ({ opt, i, onChange, onDelete }: { opt: string, i: number, onChange?: Function, onDelete?: Function }) => {
        const [open, setOpen] = React.useState(false);
        let err = false;
        if (opt === '' || opt.length <= 0) {
            err = true;
        }
        const [empty, setempty] = React.useState(err);
        const _onChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>, index: number) => {
            let length = e.target.value.length;
            if ((length <= 0 && e.target.value === ' '.repeat(length))) {
                setempty(true);
            }
            else { setempty(false) }
            if (onChange) { onChange(e.target.value); };
        };
        let anchorEl = document.getElementById(`more-btn${i + 1}`);
        return (
            <Stack direction={'row'} alignItems={'baseline'} justifyContent={'space-between'}>
                <TextField
                    error={empty}
                    value={opt}
                    onChange={(e) => _onChange(e, i)} label={`option-${i + 1}`}
                    spellCheck
                    sx={{ width: '100%' }}
                    placeholder={`Select your option-${i + 1}`}
                    id={`poll-option-${i + 1}`}

                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start" >
                                <div className={styles['option-number']}><p>{i + 1}</p></div>
                            </InputAdornment>
                        ),
                    }}
                />
                <IconButton
                    id={`more-btn${i + 1}`}
                    onClick={() => { setOpen(true) }}
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
                    onClose={() => { setOpen(false) }}
                >
                    <List
                        sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
                        component="nav"
                        subheader={
                            <ListSubheader>More</ListSubheader>
                        }
                    >
                        <ListItem>

                        </ListItem>
                        <ListItemButton onClick={() => { setOpen(false); if (onDelete) { onDelete() } }}>

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
export default OptionField;
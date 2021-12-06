import { useState } from 'react'
import styles from './signup.module.css';
import { TextField, Button, Slide, Alert, InputAdornment } from '@mui/material'
import Navbar from '../../Components/NavBar';
import { SERVER_URL } from '../../config';
import { setIsAuth } from '../../Utils/utils';
export const Signin = () => {
    const [user_name, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [openAlert, setOpenAlert] = useState(false);
    const [alert_severity, setAlertSeverity] = useState<'info' | 'warning' | 'success' | 'error'>("info");
    const [alert_text, setAlertText] = useState('');
    const [alert_title, setAlertTitle] = useState('');

    const [user_name_field_error, setUserNameFieldError] = useState(false);
    const [password_field_error, setPasswordFieldError] = useState(false);

    const validFields = () => {

        if (user_name.includes(' ')) {
            document.getElementById('user_name')?.focus();
            setUserNameFieldError(true);
            setOpenAlert(true); setAlertSeverity('warning'); setAlertText("No empty spaces are allowed."); setAlertTitle('Error!');
            return false;
        }
        if (password.includes(' ')) {
            document.getElementById('password')?.focus();
            setPasswordFieldError(true)
            setOpenAlert(true); setAlertSeverity('warning'); setAlertText("No empty spaces are allowed."); setAlertTitle('Error!');
            return false;
        }

        if (user_name.length <= 8) {
            document.getElementById('user_name')?.focus();
            setUserNameFieldError(true);
            setOpenAlert(true); setAlertSeverity('warning'); setAlertText("Number of character in User Name should be greater than 8."); setAlertTitle('Error!');
            return false;
        }
        if (password.length <= 8) {
            document.getElementById('password')?.focus();
            setUserNameFieldError(true);
            setOpenAlert(true); setAlertSeverity('warning'); setAlertText("Number of character in Password should be greater than 8."); setAlertTitle('Error!');
            return false;
        }

        if (user_name === ' '.repeat(user_name.length)) {
            document.getElementById('user_name')?.focus();
            setUserNameFieldError(true);
            setOpenAlert(true); setAlertSeverity('error'); setAlertText("Username is required!"); setAlertTitle('Error!');
            return false;
        }
        if (password === ' '.repeat(password.length)) {
            document.getElementById('password')?.focus();
            setPasswordFieldError(true)
            setOpenAlert(true); setAlertSeverity('error'); setAlertText("Password is required!"); setAlertTitle('Error!');
            return false;
        }

        return true;
    }
    const signUp = () => {
        setOpenAlert(false);
        setUserNameFieldError(false);
        setPasswordFieldError(false);
        if (!validFields()) return;
        fetch(`${SERVER_URL}/login`, {
            method: "POST", body: JSON.stringify(
                {
                    username: user_name,
                    password
                }
            ),
            mode: 'cors',
            headers: { 'Content-Type': 'application/json' }, credentials: 'include',
        }).then(res => {
            res.json().then(res_json => {
                if (res_json.msg) {
                    if (res_json.error) {
                        setOpenAlert(true); setAlertSeverity('warning'); setAlertText(res_json.msg);
                        return;
                    }
                    setOpenAlert(true);
                    setAlertSeverity('success');
                    setAlertText(res_json.msg);
                    setAlertTitle('Success');
                    setIsAuth(true);
                    window.location.href = '/dashboard'
                }

            })
        })

    }

    return (
        <div className={styles['container']}>
            <Navbar />
            <div >
                <Slide mountOnEnter unmountOnExit in={openAlert}>
                    <Alert severity={alert_severity} title={alert_title}>{alert_text} </Alert>
                </Slide>
                <div className={styles['wrapper']}>
                    <div>
                        <div className={styles['icon']}>
                            <svg width="39" height="51" viewBox="0 0 39 51" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M34.0206 16.941H31.6005V12.1007C31.6005 5.42111 26.1794 0 19.4998 0C12.8202 0 7.39909 5.42111 7.39909 12.1007V16.941H4.97895C2.3168 16.941 0.138672 19.1191 0.138672 21.7812V45.9826C0.138672 48.6448 2.3168 50.8229 4.97895 50.8229H34.0206C36.6828 50.8229 38.8609 48.6448 38.8609 45.9826V21.7812C38.8609 19.1191 36.6828 16.941 34.0206 16.941ZM12.2394 12.1007C12.2394 8.08326 15.4824 4.84028 19.4998 4.84028C23.5172 4.84028 26.7602 8.08326 26.7602 12.1007V16.941H12.2394V12.1007ZM34.0206 45.9826H4.97895V21.7812H34.0206V45.9826ZM19.4998 38.7222C22.1619 38.7222 24.3401 36.5441 24.3401 33.8819C24.3401 31.2198 22.1619 29.0417 19.4998 29.0417C16.8376 29.0417 14.6595 31.2198 14.6595 33.8819C14.6595 36.5441 16.8376 38.7222 19.4998 38.7222Z" fill="white" />
                            </svg>
                        </div>
                        <p>Sign Up</p>
                    </div>
                    <div >
                        <TextField
                            id='user_name'
                            value={user_name}
                            onChange={(e) => { setUserName(e.target.value) }}
                            label='user name'
                            variant={'outlined'}
                            required
                            placeholder='user name'
                            maxRows={1}
                            error={user_name_field_error}
                            rows={1}
                            type={'email'}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <svg width="19" height="21" viewBox="0 0 19 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M17.0618 19.0782V17.0741C17.0618 16.0112 16.6396 14.9917 15.8879 14.2401C15.1363 13.4884 14.1168 13.0661 13.0538 13.0661H5.0378C3.97481 13.0661 2.95535 13.4884 2.20371 14.2401C1.45206 14.9917 1.02979 16.0112 1.02979 17.0741V19.0782" stroke="#9C19E0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M9.04561 9.05812C11.2592 9.05812 13.0536 7.26367 13.0536 5.0501C13.0536 2.83653 11.2592 1.04208 9.04561 1.04208C6.83205 1.04208 5.0376 2.83653 5.0376 5.0501C5.0376 7.26367 6.83205 9.05812 9.04561 9.05812Z" stroke="#9C19E0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <TextField
                            id='password'
                            value={password}
                            onChange={(e) => { setPassword(e.target.value) }}
                            label='password' variant={'outlined'}
                            required
                            placeholder='password'
                            maxRows={1}
                            error={password_field_error}
                            rows={1}
                            type={'password'}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <svg width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M11.8361 5.46797L14.6513 2.65277M16.2599 1.04409L14.6513 2.65277L16.2599 1.04409ZM8.53023 8.77381C8.94554 9.1836 9.27569 9.67149 9.50168 10.2094C9.72766 10.7473 9.845 11.3246 9.84696 11.908C9.84891 12.4915 9.73544 13.0695 9.51306 13.6089C9.29069 14.1484 8.96382 14.6384 8.55126 15.051C8.1387 15.4636 7.64861 15.7904 7.1092 16.0128C6.56979 16.2352 5.99173 16.3487 5.40828 16.3467C4.82484 16.3448 4.24755 16.2274 3.70964 16.0014C3.17174 15.7754 2.68385 15.4453 2.27406 15.03C1.46822 14.1956 1.02231 13.0781 1.03239 11.9182C1.04247 10.7583 1.50773 9.64873 2.32795 8.8285C3.14817 8.00828 4.25774 7.54303 5.41766 7.53295C6.57759 7.52287 7.69507 7.96877 8.52942 8.77462L8.53023 8.77381ZM8.53023 8.77381L11.8361 5.46797L8.53023 8.77381ZM11.8361 5.46797L14.2491 7.88099L17.0643 5.0658L14.6513 2.65277L11.8361 5.46797Z" stroke="#9C19E0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </InputAdornment>
                                ),
                            }}
                        />

                    </div>
                    <div>
                        <Button onClick={signUp} sx={{ textTransform: 'none' }} variant='contained' size='medium'>Sign In</Button>
                        <a href="signin">I don't have an account? Create one</a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signin
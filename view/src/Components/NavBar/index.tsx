import { AppBar, Toolbar, IconButton, Typography, Stack, Button } from '@mui/material'
import { useRef, useState } from 'react'
import styles from './navbar.module.css';
import Logo from '../Logo/index'
import { getIsAuth } from '../../Utils/utils';

export default function Navbar() {
    const [width, setWidth] = useState(window.innerWidth);
    const [menu_open, setMenuOpen] = useState(false);
    window.addEventListener('resize', function () {
        setWidth(window.innerWidth);
    })
    const menu = useRef<HTMLDivElement>(null);

    return (
        <>
            <AppBar sx={{ backgroundColor: '#ffff', maxWidth: '100vw' }} >
                <Toolbar >
                    <Stack direction={'row'} justifyContent={'space-between'} width='100%' alignItems={'center'} >
                        <IconButton sx={{ borderRadius: '10px' }} onClick={()=>{window.location.href = '/'}}>
                            <Logo />
                            <Typography sx={{ marginLeft: '0.3rem' }} variant='h6' color={'primary'} fontFamily='Poppins, sans-serif' fontWeight={'bolder'} letterSpacing={'1px'}>Live poll</Typography>
                        </IconButton>
                        {width > 780 &&
                            <Stack
                                className={styles['links-container']}
                                direction={'row'}
                                justifyContent={'space-between'}
                                alignItems={'center'} spacing={3}>
                                <Typography sx={{ font: 'inherit' }} variant='body1'>
                                    <a href={'/create'} style={{ color: 'inherit', textDecoration: 'none', font: 'inherit' }}>
                                        Create
                                    </a>
                                </Typography>
                                <Typography sx={{ font: 'inherit' }} variant='body1'>
                                    <a href={'/#'} style={{ color: 'inherit', textDecoration: 'none', font: 'inherit' }}>
                                        Explore
                                    </a>
                                </Typography>
                                {(getIsAuth() && !window.location.pathname.includes('dashboard') )&&
                                    <Typography sx={{ font: 'inherit' }} variant='body1'>
                                        <a href={'/dashboard'} style={{ color: 'inherit', textDecoration: 'none', font: 'inherit' }}>
                                            Dashboard
                                        </a>
                                    </Typography>}
                                {!getIsAuth() &&
                                    <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'} spacing={4} sx={{ marginLeft: '500px' }}>
                                        <Typography sx={{ font: 'inherit' }} variant='body1'>
                                            <a href={'/signup'} style={{ color: 'inherit', textDecoration: 'none', font: 'inherit' }}>
                                                Sign up
                                            </a>
                                        </Typography>
                                        <Button href='#' onClick={() => { window.location.href = '/signin' }} variant='contained' sx={{ textTransform: 'none' }} size='small'>Sign in</Button>
                                    </Stack>
                                }
                            </Stack>
                        }
                        {
                            width <= 780 &&
                            <Stack
                                id='nav-bar'
                                data-open={menu_open}
                                className={styles['links-container']}
                                direction={'column'}
                                justifyContent={'space-between'}
                                ref={menu}
                                alignItems={'flex-start'} spacing={1.5}>
                                <Typography sx={{ font: 'inherit', marginLeft: '0.3rem' }} variant='body1'>
                                    <a href={'/create'} style={{ color: 'inherit', textDecoration: 'none', font: 'inherit' }}>
                                        Create
                                    </a>
                                </Typography>
                                <span ></span>
                                <Typography sx={{ font: 'inherit' }} variant='body1'>
                                    <a href={'/#'} style={{ color: 'inherit', textDecoration: 'none', font: 'inherit' }}>
                                        Explore
                                    </a>
                                </Typography>
                                <span ></span>

                                {(getIsAuth() && !window.location.pathname.includes('dashboard') ) &&
                                    <Typography sx={{ font: 'inherit' }} variant='body1'>
                                        <a href={'/dashboard'} style={{ color: 'inherit', textDecoration: 'none', font: 'inherit' }}>
                                            Dashboard
                                        </a>
                                    </Typography>
                                }
                                {!getIsAuth() &&
                                    <>
                                        <Typography sx={{ font: 'inherit' }} variant='body1'>
                                            <a href={'/signup'} style={{ color: 'inherit', textDecoration: 'none', font: 'inherit' }}>
                                                Sign Up
                                            </a>
                                        </Typography>
                                        <span ></span>
                                        <Button
                                            variant='contained'
                                            onClick={() => { window.location.href = '/signin' }}
                                            sx={{ textTransform: 'none' }} size='small'>
                                            Sign In
                                        </Button>
                                    </>
                                }
                            </Stack>
                        }
                        <div className={styles['menu']} id='menu' data-open={menu_open} onClick={(e) => {
                            if (menu_open) {
                                setMenuOpen(false); return
                            } setMenuOpen(true); return
                        }
                        }>
                            <div></div>
                            <div></div>
                            <div></div>
                        </div>
                    </Stack>
                </Toolbar>
            </AppBar>
        </>
    )
}

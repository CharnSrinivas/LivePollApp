import { AppBar, Toolbar, IconButton, Typography, Stack, Button } from '@mui/material'
import { useRef, useState } from 'react'
import styles from './navbar.module.css';
import Logo from '../Logo/index'

export default function Navbar() {
    const [width, setWidth] = useState(window.innerWidth);
    window.addEventListener('resize', function () { setWidth(window.innerWidth);console.log(width > 780);
     })
    const menu = useRef<HTMLDivElement>(null);

    const toggleMenu = ()=>{
        if(!menu.current!.classList.contains(styles['links-container-open'])){
            menu.current!.classList.add(styles['links-container-open']);return
        }
        menu.current!.classList.remove(styles['links-container-open']);return
    }

    return (
        <>
            <AppBar sx={{ backgroundColor: '#ffff', maxWidth: '100vw' }} >
                <Toolbar >
                    <Stack direction={'row'} justifyContent={'space-between'} width='100%' alignItems={'center'} >
                        <IconButton sx={{borderRadius:'10px'}}>
                            <Logo />
                            <Typography sx={{marginLeft:'0.3rem'}} variant='h6' color={'primary'} fontFamily='Poppins' fontWeight={'bolder'} letterSpacing={'1px'}>Live poll</Typography>
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
                                <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'} spacing={4} sx={{ marginLeft: '500px' }}>
                                    <Typography sx={{ font: 'inherit' }} variant='body1'>
                                        <a href={'/#'} style={{ color: 'inherit', textDecoration: 'none', font: 'inherit' }}>
                                            Sign In
                                        </a>
                                    </Typography>
                                    <Button href='#' variant='contained' sx={{ textTransform: 'none' }} size='small'>Sign Up</Button>
                                </Stack>
                            </Stack>
                        }
                        {
                            width <= 780 &&
                            <Stack
                                className={styles['links-container']}
                                direction={'column'}
                                justifyContent={'space-between'}
                                ref={menu}
                                alignItems={'flex-start'} spacing={1.5}>
                                <Typography sx={{ font: 'inherit' ,marginLeft:'0.3rem'}} variant='body1'>
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
                                <Typography sx={{ font: 'inherit' }} variant='body1'>
                                    <a href={'/#'} style={{ color: 'inherit', textDecoration: 'none', font: 'inherit' }}>
                                        Sign In
                                    </a>
                                </Typography>
                                <span ></span>
                                <Button  variant='contained' sx={{ textTransform: 'none' }} size='small'>Sign Up</Button>

                            </Stack>
                        }
                        <div   className={styles['menu']} onClick={toggleMenu}>
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

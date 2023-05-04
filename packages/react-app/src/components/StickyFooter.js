import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';

function Copyright() {
    return (
        <Typography variant="body2" color="#bfc500">
            {'Copyright © '}
            <Link color="#bfc500" href="https://drunkskunksdc.com/">
                Drunk Skunks Drinking Club
            </Link>{' '}
            <span color="#bfc500">{new Date().getFullYear()}
                {'.'}</span>
        </Typography>
    );
}

export default function StickyFooter() {
    return (

        <Box
            component="footer"
            sx={{
                py: 2,
                px: 2,
                mt: 'auto',
                backgroundColor: (theme) => "#020202",
                position: "absolute",
                bottom: 0,
                left: "40%",
                mx: "auto",
                width: "50%",
                whiteSpace: "nowrap",
                zIndex: 1

            }}
        >
            <Container maxWidth="sm">
                <Copyright />
            </Container>
        </Box >
    );
}
import { createTheme } from '@mui/material/styles';
import { createBreakpoints } from "@mui/system";

const breakpoints = createBreakpoints({});

export const mainTheme = createTheme({
    palette: {
        progress: {
            light: '#64b5f6',
            main: '#1a237e',
        },
        icons: {
            light: '#FEFEFE',
            dark: '#555454',
            medium: '#757575',
        },
        input: {
            light: '#f7f9f9'
        }

    },
    typography: {
        fontFamily: 'IBM Plex Mono, monospace',
        logocolor: {
            fontSize: '1.6rem',
            color: 'orange',
            fontFamily: 'IBM Plex Mono, monospace'
        },
        logogray: {
            fontSize: '1.6rem',
            color: '#FEFEFE',
            fontFamily: 'IBM Plex Mono, monospace'
        },
        h1: {
            fontSize: '1.3rem', // Ajustar tamaño de fuente para h1
            [breakpoints.down("sm")]: {
                fontSize: '1.1rem'
            },
        },
        h2: {
            fontSize: '1.2rem', // Ajustar tamaño de fuente para h2
            [breakpoints.down("sm")]: {
                fontSize: '1.0rem'
            },
        },
        h3: {
            fontSize: '1.15rem', // Ajustar tamaño de fuente para h3
            [breakpoints.down("sm")]: {
                fontSize: '0.95rem'
            },
        },
        h4: {
            fontSize: '1.1rem', // Ajustar tamaño de fuente para h3
            [breakpoints.down("sm")]: {
                fontSize: '0.90rem'
            },
        },
        h5: {
            fontSize: '1.05rem', // Ajustar tamaño de fuente para h3
            [breakpoints.down("sm")]: {
                fontSize: '0.85rem'
            },
        },
        h6: {
            fontSize: '1rem',
            [breakpoints.down("sm")]: {
                fontSize: '0.9rem'
            },
        },
        body1: {
            fontSize: '0.95rem', // Ajustar tamaño de fuente para body1
            [breakpoints.down("sm")]: {
                fontSize: '0.85rem'
            },
        },
        body2: {
            fontSize: '0.9rem', // Ajustar tamaño de fuente para body2
            [breakpoints.down("sm")]: {
                fontSize: '0.8rem'
            },
        },
        subtitle1: {
            fontSize: '0.75rem',
            [breakpoints.down("sm")]: {
                fontSize: '0.65rem'
            },
        },
        subtitle2: {
            fontSize: '0.7rem',
            [breakpoints.down("sm")]: {
                fontSize: '0.60rem'
            },
        },
        caption: {
            fontSize: '0.9rem',
            [breakpoints.down("sm")]: {
                fontSize: '0.80rem'
            },
        },
        overline: {
            fontSize: '0.625rem',
            [breakpoints.down("sm")]: {
                fontSize: '0.6rem'
            },
        },
        button: {
            fontSize: '0.95rem',
            [breakpoints.down("sm")]: {
                fontSize: '0.80rem'
            },
        },
    },
});
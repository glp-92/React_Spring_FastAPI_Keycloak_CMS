import React, { useState } from 'react'
import Markdown from 'markdown-to-jsx'

import { Link, Typography, Box, Button, IconButton, Snackbar } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

const MarkdownContent = ({ content }) => {

    const [coppied, setCoppied] = useState(false);

    const handleCopyClick = () => {
        setCoppied(true);
    };

    const handleCopyEnd = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setCoppied(false);
    };

    return (
        <Markdown
            options={{
                overrides: {
                    span: {
                        component: ({ children }) => (
                            <Typography lineHeight={1.5} variant="body1" component="span">
                                {children}
                            </Typography>
                        ),
                    },
                    p: {
                        component: ({ children }) => (
                            <Box display={'flex'} flexDirection={'column'}>
                                <Typography lineHeight={1.5} variant="body1" component="span">
                                    {children}
                                </Typography>
                            </Box>
                        ),
                    },
                    code: {
                        component: ({ children }) => (
                            <Box bgcolor={'#f5f5f5'} sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                <Typography variant="body2" lineHeight={1.5} component="span" margin={1} sx={{ overflow: 'auto', maxWidth: '100%' }}>
                                    {children}
                                </Typography>
                                <IconButton
                                    component={Button}
                                    color="inherit"
                                    onClick={() => { navigator.clipboard.writeText(children); handleCopyClick() }}
                                    sx={{ fontSize: 20, aspectRatio: '1', borderRadius: 4 }}
                                >
                                    <ContentCopyIcon />
                                </IconButton>
                                <Snackbar
                                    open={coppied}
                                    autoHideDuration={1000}
                                    onClose={handleCopyEnd}
                                    message="Codigo copiado"
                                />
                            </Box>
                        ),
                    },
                    li: {
                        component: ({ children }) => (
                            <Typography lineHeight={1.5} variant="body1" component="li">
                                {children}
                            </Typography>
                        ),
                    },
                    img: {
                        component: ({ alt, src }) => (
                            <Box sx={{ display: 'flex', margin: 2, flexDirection: 'column', alignItems: 'center' }}>
                                <img alt={alt} src={src} style={{ maxWidth: '500px', maxHeight: '500px', width: 'auto', height: 'auto' }} />
                                <Typography lineHeight={1.5} variant="caption" component="p">
                                    {alt}
                                </Typography>
                            </Box>
                        ),
                    },
                    h1: {
                        component: ({ children }) => (
                            <Typography lineHeight={1.5} variant="h2">
                                {children}
                            </Typography>
                        ),
                    },
                    h2: {
                        component: ({ children }) => (
                            <Typography lineHeight={1.5} variant="h3">
                                {children}
                            </Typography>
                        ),
                    },
                    h3: {
                        component: ({ children }) => (
                            <Typography lineHeight={1.5} variant="h4">
                                {children}
                            </Typography>
                        ),
                    },
                    h4: {
                        component: ({ children }) => (
                            <Typography lineHeight={1.5} variant="h5">
                                {children}
                            </Typography>
                        ),
                    },
                    a: {
                        component: ({ children, href }) => (
                            <Link href={href} target="_blank" color="secondary" underline="hover">
                                {children}
                            </Link>
                        ),
                    },
                },
            }}>
            {content}
        </Markdown>
    )
}

export default MarkdownContent
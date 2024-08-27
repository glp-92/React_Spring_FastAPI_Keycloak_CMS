import React, { useState, useRef } from 'react';

import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import CodeIcon from '@mui/icons-material/Code';
import IconButton from '@mui/material/IconButton';
import ImageIcon from '@mui/icons-material/Image';
import AddLinkIcon from '@mui/icons-material/AddLink';

const RichTextEditor = ({ value, setValue }) => {
    const [contentPosition, setContentPosition] = useState(null); // To track the pointer on content

    const handleAddImageToContent = () => {
        const imgMdCode = `\n\n![altText](imageUrl)\n\n`; // Inserts md code with 2 lines
        const newContent = value.substring(0, contentPosition) + imgMdCode + value.substring(contentPosition)
        setValue(newContent);
    }

    const handleAddLinkToContent = () => {
        const linkMdCode = `[linkname](http://)`
        const newContent = value.substring(0, contentPosition) + linkMdCode + value.substring(contentPosition)
        setValue(newContent);
    }

    const handleSetBold = () => {
        const boldMdCode = "** **";
        const newContent = value.substring(0, contentPosition) + boldMdCode + value.substring(contentPosition)
        setValue(newContent);
    }

    const handleSetItalic = () => {
        const italicMdCode = "* *";
        const newContent = value.substring(0, contentPosition) + italicMdCode + value.substring(contentPosition)
        setValue(newContent);
    }

    const handleSetCode = () => {
        const codeMdCode = "```\n\n```";
        const newContent = value.substring(0, contentPosition) + codeMdCode + value.substring(contentPosition)
        setValue(newContent);
    }

    return (
        <Box spacing={0} sx={{ width: '100%' }}>
            <Box>
                <IconButton
                    size="small"
                    aria-label="menu"
                    onClick={handleAddImageToContent}
                    sx={{
                        fontSize: '1.5rem',
                        width: '2rem', // Ancho igual a 3 veces el tamaño de fuente
                        height: '2rem', // Alto igual a 3 veces el tamaño de fuente
                        borderRadius: '0.5rem', // Borde redondeado para mantener la apariencia del botón
                    }}
                >
                    <ImageIcon />
                </IconButton>
                <IconButton
                    size="small"
                    aria-label="menu"
                    onClick={handleAddLinkToContent}
                    sx={{
                        fontSize: '1.5rem',
                        width: '2rem', // Ancho igual a 3 veces el tamaño de fuente
                        height: '2rem', // Alto igual a 3 veces el tamaño de fuente
                        borderRadius: '0.5rem', // Borde redondeado para mantener la apariencia del botón
                    }}
                >
                    <AddLinkIcon />
                </IconButton>
                <IconButton
                    size="small"
                    aria-label="menu"
                    onClick={handleSetBold}
                    sx={{
                        fontWeight: 'bold',
                        fontSize: '1.5rem',
                        width: '2rem', // Ancho igual a 3 veces el tamaño de fuente
                        height: '2rem', // Alto igual a 3 veces el tamaño de fuente
                        borderRadius: '0.5rem', // Borde redondeado para mantener la apariencia del botón
                    }}
                >
                    B
                </IconButton>
                <IconButton
                    size="small"
                    aria-label="menu"
                    onClick={handleSetItalic}
                    sx={{
                        fontStyle: 'italic',
                        fontSize: '1.5rem',
                        width: '2rem', // Ancho igual a 3 veces el tamaño de fuente
                        height: '2rem', // Alto igual a 3 veces el tamaño de fuente
                        borderRadius: '0.5rem', // Borde redondeado para mantener la apariencia del botón
                    }}
                >
                    I
                </IconButton>
                <IconButton
                    size="small"
                    aria-label="menu"
                    onClick={handleSetCode}
                    sx={{
                        fontStyle: 'italic',
                        fontSize: '1.5rem',
                        width: '2rem', // Ancho igual a 3 veces el tamaño de fuente
                        height: '2rem', // Alto igual a 3 veces el tamaño de fuente
                        borderRadius: '0.5rem', // Borde redondeado para mantener la apariencia del botón
                    }}
                >
                    <CodeIcon/>
                </IconButton>
            </Box>
            <TextField
                id="contentInput"
                required
                multiline
                fullWidth
                rows={10}
                value={value}
                onClick={(e) => { setContentPosition(e.target.selectionStart) }}
                onChange={(e) => { setValue(e.target.value); setContentPosition(e.target.selectionStart) }}
            />
        </Box>


    )
}

export default RichTextEditor;
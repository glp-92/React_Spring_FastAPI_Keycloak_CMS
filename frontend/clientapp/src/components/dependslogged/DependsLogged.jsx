import React, { useState, useEffect } from 'react'
import { Outlet } from 'react-router-dom';
import NotFound from '../../pages/notfound/NotFound';
import { ValidateToken } from '../../util/requests/Auth';
import Loading from '../loading/Loading';

import Box from '@mui/material/Box';

const DependsLogged = () => {

    const [tokenValid, setTokenValid] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchTokenValid = async () => {
            setIsLoading(true);
            try {
                const tokenValid = await ValidateToken();
                if (!tokenValid) throw new Error(`LoginError`);
                setTokenValid(tokenValid);
            } catch(error) {
                console.error(`${error}`)
                setTokenValid(false)
            }
            setIsLoading(false);
        }
        fetchTokenValid();
    }, []);

    return (
        <Box sx={{ flex:1, display: 'flex', flexDirection: 'column', width: '100%', marginBottom: 3, marginTop: 2 }}>
            {
                isLoading ? (
                    <Loading height={300} />
                ) : (
                    tokenValid ? (
                        <Outlet />
                    ) :
                        <NotFound />
                )
            }
        </Box>
    )
}

export default DependsLogged
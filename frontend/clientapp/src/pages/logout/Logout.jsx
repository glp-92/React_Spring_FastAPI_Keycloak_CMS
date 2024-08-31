import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom';
import { LogoutRequest } from '../../util/requests/Auth'
import Loading from '../../components/loading/Loading';

import Box from '@mui/material/Box';

const Logout = () => {
    const [loggedOut, setLoggedOut] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleLogout = async () => {
        setIsLoading(true)
        const success = await LogoutRequest();
        setLoggedOut(success);
        setIsLoading(false)
    };

    useEffect(() => {
        handleLogout();
    }, [])


    return (
        <Box>
            {isLoading &&
                <Loading height={0} />
            }
            {loggedOut &&
                <Navigate to="/" replace={true} />
            }
        </Box>

    )
}

export default Logout
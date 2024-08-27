import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom';
import { LogoutRequest } from '../../util/requests/Auth'
import Loading from '../../components/loading/Loading';

import Box from '@mui/material/Box';

const Logout = () => {
    const [loggedOut, setLoggedOut] = useState(false);

    const handleLogout = async () => {
        const success = await LogoutRequest();
        setLoggedOut(success);
    };

    useEffect(() => {
        handleLogout();
    }, [])


    return (
        <Box>
            {loggedOut ? (
                <Navigate to="/" replace={true} />
            ) : <Loading/>}
        </Box>

    )
}

export default Logout
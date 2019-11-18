import React from 'react'
import { Typography, Box } from '@material-ui/core';

const Top = ({ data, styles }) => {
    return (
        <div>
            <Typography variant="h2" align='center' component="div">
                <Box fontWeight={700} mt={3} mb={2}>Showing data for chat between </Box>
                <Box fontWeight={700} mb={5}><Box component="span" color={styles.firstUser.color} >{(data[0].name).split(' ')[0]}</Box> and <Box component="span" color={styles.secondUser.color}>{(data[1].name).split(' ')[0]}</Box></Box>
            </Typography>
        </div>
    )
}

export default Top

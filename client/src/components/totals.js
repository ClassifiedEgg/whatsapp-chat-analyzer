import React from 'react'
import { Typography, Grid, Box } from '@material-ui/core';

const Totals = ({ data }) => {
    let { numberOfMessages, words, letters, days } = data;

    return (
        <div>
            <Box m={4}>
                <Typography variant="h2" align='center' component="div">
                    <Box fontWeight={700} m={3}>Totals</Box>
                </Typography>
                <Grid container>
                    <Grid item xs>
                        <Typography variant="h4" component="h3" align='center'>
                            <Box fontWeight={700}>Days Chatted</Box>
                        </Typography>
                        <Typography variant="h4" align='center'>
                            <Box fontWeight={700}>{days}</Box>
                        </Typography>
                    </Grid>
                    <Grid item xs>
                        <Typography variant="h4" component="h3" align='center'>
                            <Box fontWeight={700}>Messages Sent</Box>
                        </Typography>
                        <Typography variant="h4" align='center'>
                            <Box fontWeight={700}>{numberOfMessages}</Box>
                        </Typography>
                    </Grid>
                    <Grid item xs>
                        <Typography variant="h4" component="h3" align='center'>
                            <Box fontWeight={700}>Words</Box>
                        </Typography>
                        <Typography variant="h4" align='center'>
                            <Box fontWeight={700}>{words}</Box>
                        </Typography>
                    </Grid>
                    <Grid item xs>
                        <Typography variant="h4" component="h3" align='center'>
                            <Box fontWeight={700}>Letters</Box>
                        </Typography>
                        <Typography variant="h4" align='center'>
                            <Box fontWeight={700}>{letters}</Box>
                        </Typography>
                    </Grid>
                </Grid>
            </Box>
        </div >
    )
}

export default Totals;
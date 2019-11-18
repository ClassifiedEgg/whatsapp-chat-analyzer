import React from 'react'
import { Typography, Grid, Box } from '@material-ui/core';

const Totals = ({ data }) => {
    let { messagesPerDay, wordsPerDay, lettersPerDay, wordsPerMessage, lettersPerMessage } = data;

    return (
        <div>
            {
                data &&
                <Box m={4}>
                    <Typography variant="h2" align='center' component="div">
                        <Box fontWeight={700} m={3} color="secondary">Averages</Box>
                    </Typography>
                    <Grid container>
                        <Grid item xs>
                            <Typography variant="h4" component="h3" align='center'>
                                <Box fontWeight={700}>Letters per Message</Box>
                            </Typography>
                            <Typography variant="h4" align='center'>
                                <Box fontWeight={700}>{lettersPerMessage}</Box>
                            </Typography>
                        </Grid>
                        <Grid item xs>
                            <Typography variant="h4" component="h3" align='center'>
                                <Box fontWeight={700}>Letters per Day</Box>
                            </Typography>
                            <Typography variant="h4" align='center'>
                                <Box fontWeight={700}>{lettersPerDay}</Box>
                            </Typography>
                        </Grid>
                        <Grid item xs>
                            <Typography variant="h4" component="h3" align='center'>
                                <Box fontWeight={700}>Messages per Day</Box>
                            </Typography>
                            <Typography variant="h4" align='center'>
                                <Box fontWeight={700}>{messagesPerDay}</Box>
                            </Typography>
                        </Grid>
                        <Grid item xs>
                            <Typography variant="h4" component="h3" align='center'>
                                <Box fontWeight={700}>Words per Day</Box>
                            </Typography>
                            <Typography variant="h4" align='center'>
                                <Box fontWeight={700}>{wordsPerDay}</Box>
                            </Typography>
                        </Grid>
                        <Grid item xs>
                            <Typography variant="h4" component="h3" align='center'>
                                <Box fontWeight={700}>Words per Message</Box>
                            </Typography>
                            <Typography variant="h4" align='center'>
                                <Box fontWeight={700}>{wordsPerMessage}</Box>
                            </Typography>
                        </Grid>
                    </Grid>
                </Box>
            }
        </div >
    )
}

export default Totals;
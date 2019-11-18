import React, { Fragment } from 'react'
import { RadialChart } from 'react-vis';
import { Typography, Grid, Box } from '@material-ui/core';

const Contribution = ({ data, styles }) => {
    let angles = [];
    if (data) {
        angles = data.map(({ chatPercentage }) => ({ theta: chatPercentage }))
        angles[0].color = styles.firstUser.color;
        angles[1].color = styles.secondUser.color;
    }

    return (
        <div>
            <Box m={4}>
                <Grid container justify="space-evenly">
                    <Grid item xs>
                        {
                            data &&
                            <Fragment>
                                <Typography variant="h3" align='center'>
                                    <Box fontWeight={700} m={3} color={styles.secondUser.color}>{(data[1].name).split(' ')[0]}</Box>
                                </Typography>
                                <Typography variant="h4" align='center'>
                                    <Box fontWeight={700} m={3}>{data[1].chatPercentage}% Contribution</Box>
                                    <Box fontWeight={700} m={3}>{data[1].numberOfMessages} Messages</Box>
                                    <Box fontWeight={700} m={3}>{data[1].words} words</Box>
                                    <Box fontWeight={700} m={3}>{data[1].letters} letters</Box>
                                </Typography>
                            </Fragment>
                        }
                    </Grid>
                    <Grid item xs>
                        {
                            data &&
                            <RadialChart
                                innerRadius={100}
                                radius={180}
                                getAngle={d => d.theta}
                                data={angles}
                                width={600}
                                height={400}
                                padAngle={0.04}
                                colorType="literal"
                            >
                            </RadialChart>
                        }
                    </Grid>
                    <Grid item xs>
                        {
                            data &&
                            <Fragment>
                                <Typography variant="h3" align='center' >
                                    <Box fontWeight={700} m={3} color={styles.firstUser.color}>{(data[0].name).split(' ')[0]}</Box>
                                </Typography>
                                <Typography variant="h4" align='center'>
                                    <Box fontWeight={700} m={3} >{data[0].chatPercentage}% Contribution</Box>
                                    <Box fontWeight={700} m={3} >{data[0].numberOfMessages} Messages</Box>
                                    <Box fontWeight={700} m={3} >{data[0].words} words</Box>
                                    <Box fontWeight={700} m={3} >{data[0].letters} letters</Box>
                                </Typography>
                            </Fragment>
                        }
                    </Grid>
                </Grid>
            </Box>
        </div>
    )
}

export default Contribution;

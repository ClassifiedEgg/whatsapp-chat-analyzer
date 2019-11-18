import React, { Fragment } from 'react'
import {
    XAxis,
    YAxis,
    VerticalGridLines,
    HorizontalGridLines,
    VerticalBarSeries,
    FlexibleWidthXYPlot
} from 'react-vis';
import { Typography, Grid, Box } from '@material-ui/core';

const Hours = ({ data, styles }) => {
    let mostChattedHour, dayStats = [], timeOfDay;
    if (data) {
        mostChattedHour = Math.max.apply(Math, data[0].messagesPerHour.map((el, i) => { dayStats.push({ count: data[0].messagesPerHour[i] + data[1].messagesPerHour[i], index: i, firstUser: data[0].messagesPerHour[i], secondUser: data[1].messagesPerHour[i] }); return data[0].messagesPerHour[i] + data[1].messagesPerHour[i] }));
        mostChattedHour = dayStats.find(({ count }) => (count === mostChattedHour));
        if (mostChattedHour.index < 5) {
            timeOfDay = 'Early Morning';
        } else if (mostChattedHour.index < 12) {
            timeOfDay = 'Morning';
        } else if (mostChattedHour.index < 16) {
            timeOfDay = 'After Noon';
        } else if (mostChattedHour.index < 20) {
            timeOfDay = 'Evening';
        } else {
            timeOfDay = 'Night';
        }
    }

    return (
        <div>
            <Box m={4}>
                <Grid container>
                    <Grid item xs>
                        {data &&
                            <FlexibleWidthXYPlot height={300} stackBy="y">
                                <VerticalGridLines />
                                <HorizontalGridLines />
                                <XAxis />
                                <YAxis />
                                <VerticalBarSeries data={data[0].messagesPerHour.map((el, i) => ({ x: i, y: el }))} color={styles.firstUser.color} />
                                <VerticalBarSeries data={data[1].messagesPerHour.map((el, i) => ({ x: i, y: el }))} color={styles.secondUser.color} />
                            </FlexibleWidthXYPlot >
                        }
                    </Grid>
                    <Grid item xs>
                        {data &&
                            <Fragment>
                                <Typography variant="h2" align='center'>
                                    <Box fontWeight={700} m={3} color={styles.other.color}>{timeOfDay}</Box>
                                </Typography>
                                <Typography variant="h4" align='center'>
                                    <Box fontWeight={700} m={3}>the part of the day with most interaction, {mostChattedHour.count} messages being sent during that time</Box>
                                    <Box fontWeight={700} m={3} component="span" color={styles.firstUser.color}>{mostChattedHour.firstUser} by {(data[0].name).split(' ')[0]}</Box>
                                    <Box fontWeight={700} m={3} component="span">to</Box>
                                    <Box fontWeight={700} m={3} component="span" color={styles.secondUser.color}>{mostChattedHour.secondUser} by {(data[1].name).split(' ')[0]}</Box>
                                </Typography>
                            </Fragment>
                        }
                    </Grid>
                </Grid>
            </Box>
        </div>
    )
}

export default Hours;
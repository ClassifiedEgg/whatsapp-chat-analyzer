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

const Days = ({ data, styles }) => {
    let mostChattedDay, dayStats = [], days = {
        0: "Sunday",
        1: "Monday",
        2: "Tuesday",
        3: "Wednesday",
        4: "Thursday",
        5: "Friday",
        6: "Saturday"
    };

    if (data) {
        mostChattedDay = Math.max.apply(Math, data[0].messagesPerDays.map((el, i) => { dayStats.push({ count: data[0].messagesPerDays[i] + data[1].messagesPerDays[i], index: i, firstUser: data[0].messagesPerDays[i], secondUser: data[1].messagesPerDays[i] }); return data[0].messagesPerDays[i] + data[1].messagesPerDays[i] }));
        mostChattedDay = dayStats.find(({ count }) => (count === mostChattedDay));
    }

    return (
        <div>
            <Box m={4}>
                <Grid container>
                    <Grid item xs>
                        {data &&
                            <Fragment>
                                <Typography variant="h2" align='center'>
                                    <Box fontWeight={700} m={3} color={styles.other.color}>{days[mostChattedDay.index]}</Box>
                                </Typography>
                                <Typography variant="h4" align='center'>

                                    <Box fontWeight={700} m={3}>the day of the week with most interaction with {mostChattedDay.count} messages being sent</Box>
                                    <Box fontWeight={700} m={3} component="span" color={styles.firstUser.color}>{mostChattedDay.firstUser} by {(data[0].name).split(' ')[0]}</Box>
                                    <Box fontWeight={700} m={3} component="span">to</Box>
                                    <Box fontWeight={700} m={3} component="span" color={styles.secondUser.color}>{mostChattedDay.secondUser} by {(data[1].name).split(' ')[0]}</Box>
                                </Typography>
                            </Fragment>
                        }
                    </Grid>
                    <Grid item xs>
                        {data &&
                            <FlexibleWidthXYPlot height={300} stackBy="y" xType="ordinal">
                                <VerticalGridLines />
                                <HorizontalGridLines />
                                <XAxis />
                                <YAxis />
                                <VerticalBarSeries data={data[0].messagesPerDays.map((el, i) => ({ x: Object.values(days)[i], y: el }))} color={styles.firstUser.color} />
                                <VerticalBarSeries data={data[1].messagesPerDays.map((el, i) => ({ x: Object.values(days)[i], y: el }))} color={styles.secondUser.color} />
                            </FlexibleWidthXYPlot >
                        }
                    </Grid>
                </Grid>
            </Box>
        </div>
    )
}

export default Days;
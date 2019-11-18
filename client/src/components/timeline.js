import React from "react"
import { XAxis, YAxis, HorizontalGridLines, LineSeries, VerticalGridLines, FlexibleWidthXYPlot } from 'react-vis';
import { Typography, Box } from '@material-ui/core';

const Timeline = ({ timeline, styles }) => {

    let maxTick = Array.isArray(timeline) ? Math.max.apply(Math, timeline.map(({ messages }) => messages)) : 0;
    maxTick = Math.ceil(maxTick / Math.pow(10, maxTick.toString().length - 1)) * Math.pow(10, maxTick.toString().length - 1);

    return (
        <div>
            <Box m={4}>
                <Typography variant="h2" align='center' component="div">
                    <Box fontWeight={700} m={3}>Timeline</Box>
                </Typography>
                {
                    Array.isArray(timeline) &&
                    <FlexibleWidthXYPlot height={300} yDomain={[0, maxTick]}>
                        <VerticalGridLines />
                        <HorizontalGridLines />
                        <XAxis hideTicks hideLine />
                        <YAxis orientation={'left'} tickTotal={4} tickValues={[maxTick * 0.25, maxTick * 0.5, maxTick * 0.75, maxTick]} />
                        <LineSeries data={timeline.map(({ date, messages }, i) => {
                            date = new Date(date);
                            return {
                                x: i,
                                y: messages
                            }
                        })}
                            strokeWidth={3}
                            color={styles.other.color} />
                    </FlexibleWidthXYPlot >
                }
            </Box>
        </div>

    )
}

export default Timeline;

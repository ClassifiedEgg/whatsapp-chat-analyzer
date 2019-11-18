import React from 'react'
import { Typography, Grid, Box } from '@material-ui/core';

const Emoji = ({ data, each, styles }) => {
    let arr = [];
    let higherUse, higherUseUser, total, index, color;

    if (data && each) {
        total = data.total;
        arr = Object.keys(data).reduce((array, el, i) => {
            if (el !== "total") {
                array.push({
                    emoji: el,
                    count: data[el]
                })
            }
            return array;
        }, [])
        arr.sort((b, a) => parseFloat(a.count) - parseFloat(b.count))
        higherUse = Math.max.apply(Math, each.map((el) => { return el.emojis.total; }));
        higherUseUser = each.find(({ emojis }, i) => { index = i; return (emojis.total === higherUse) }).name;
        color = index === 0 ? styles.firstUser.color : styles.secondUser.color;
    }

    return (
        <div>
            <Box m={4}>
                <Typography variant="h2" align='center'>
                    <Box fontWeight={700} m={3}>Emojis</Box>
                </Typography>
                <Typography variant="h4" align='center'>
                    <Box fontWeight={500} m={3}>
                        Emojis were used a total of {total} times, with <Box fontWeight={700} component="span" color={color}>{higherUseUser}</Box> being the more frequent user with {higherUse} emojis
                    </Box>
                </Typography>
                <Grid container>
                    {
                        arr.map(({ emoji, count }, i) => {
                            if (i < 10) {
                                return (
                                    <Grid item xs key={i}>
                                        <Typography variant="h5" component="h3" align='center'>
                                            <Box>{emoji}</Box>
                                        </Typography>
                                        <Typography variant="h5" align='center'>
                                            <Box fontWeight={700}>{count}</Box>
                                        </Typography>
                                    </Grid >
                                );
                            }
                        })
                    }
                </Grid >
                <Typography variant="h6" align='center'>
                    <Box>the ten most used emojis in the chat</Box>
                </Typography>
            </Box>
        </div >
    )
}

export default Emoji;
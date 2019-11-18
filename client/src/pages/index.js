import React, { useState, Fragment } from "react"
import { JssProvider } from 'react-jss';
import 'react-vis/dist/style.css';
import { createMuiTheme, MuiThemeProvider, createGenerateClassName } from '@material-ui/core/styles';
import { Toolbar, Typography, AppBar, Box, Button, CircularProgress, Link } from '@material-ui/core';
import GitHubIcon from '@material-ui/icons/GitHub';
import Brightness7Icon from '@material-ui/icons/Brightness7';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import CssBaseline from '@material-ui/core/CssBaseline';
import axios from "axios";

import 'typeface-roboto';
import Timeline from '../components/timeline';
import Days from '../components/days';
import Hours from '../components/hours';
import Contribution from '../components/contribution';
import Emoji from '../components/emoji';
import Totals from '../components/totals';
import Averages from '../components/averages';
import Top from '../components/top';

const Home = () => {
    const [data, setData] = useState({});
    const [view, setView] = useState("dark")
    const [loading, setLoading] = useState(false);
    const [dataRecieved, setDataRecieved] = useState(false);
    const [file, setFile] = useState("");
    const [filename, setFilename] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState(false);

    const generateClassName = createGenerateClassName();

    const theme = createMuiTheme({
        palette: {
            type: view,
            primary: {
                main: "#CF000F"
            }
        },
    });

    const styles = {
        firstUser: {
            color: "#CF000F",
        },
        secondUser: {
            color: "#22A7F0",
        },
        other: {
            color: "#B3DB74",
        },
    };

    const onChange = e => {
        if (e.target.files[0]) {
            setFile(e.target.files[0]);
            setFilename(e.target.files[0].name);
        }
    };

    const onSubmit = async e => {
        e.preventDefault();
        if (file) {
            setLoading(true);
            const formData = new FormData();
            formData.append("file", file);

            try {
                const res = await axios.post("http://localhost:5000/file", formData, {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                });

                setData(res.data.data);

                setMessage(`${filename} uploaded`);

                setLoading(false);
                setDataRecieved(true);
                setError(false);
            } catch (err) {
                if (err.response.status) {
                    setMessage("There was a problem with the server");
                    setLoading(false);
                    setError(true);
                } else {
                    setMessage(err.response.data.msg);
                    setLoading(false);
                    setError(true);
                }
            }
        } else {
            setError(true);
            setMessage('Please select a file');
        }
    };

    return (
        <JssProvider generateClassName={generateClassName}>
            <MuiThemeProvider theme={theme}>
                <CssBaseline />

                <AppBar position="static" color="inherit">
                    <Toolbar>
                        <Typography variant="h6">
                            <Box fontWeight={700}>WhatsApp Chat Visualizer</Box>
                        </Typography>
                        <Box ml="auto">
                            <Button color="inherit" href="https://github.com/ClassifiedEgg/whatsapp-chat-analyzer">
                                <GitHubIcon />
                            </Button>
                            {
                                view === "dark" &&
                                <Button color="inherit" onClick={() => setView("light")}>
                                    <Brightness4Icon />
                                </Button>
                            }
                            {
                                view !== "dark" &&
                                <Button color="inherit" onClick={() => setView("dark")}>
                                    <Brightness7Icon />
                                </Button>
                            }
                        </Box>
                    </Toolbar>
                </AppBar>

                {
                    !dataRecieved &&
                    <Box my={3}>
                        <Typography align='center' component="div">
                            <Box my={2}>Upload your exported chat file</Box>
                            <Box my={2}>Chosen File: {filename}</Box>
                            <input
                                accept="text/plain"
                                id="contained-button-file"
                                type="file"
                                onChange={onChange}
                                hidden
                            />
                            <label htmlFor="contained-button-file">
                                <Button variant="contained" component="span">
                                    Choose files
                        </Button>
                            </label>
                            <Box mx={1} component="span"><Button variant="contained" onClick={onSubmit}>Upload</Button></Box>
                            <Box my={1}>Not sure how to export chat? {" "}
                                <Link href="https://faq.whatsapp.com/en/android/23756533/" color="inherit">Click here</Link>
                            </Box>
                        </Typography>
                    </Box>
                }

                {loading && <Typography align="center" component="div"><CircularProgress /></Typography>}
                {error && <Typography align="center">{message}</Typography>}

                {dataRecieved &&
                    <Fragment>
                        <Top data={data.eachData} styles={styles} />
                        <Totals data={data.totals} />
                        <Timeline timeline={data.timeline} styles={styles} />
                        <Days data={data.eachData} styles={styles} />
                        <Hours data={data.eachData} styles={styles} />
                        <Contribution data={data.eachData} styles={styles} />
                        <Emoji data={data.emojis} each={data.eachData} styles={styles} />
                        <Averages data={data.averages} />
                    </Fragment>
                }
            </MuiThemeProvider >
        </JssProvider>
    )
}

export default Home

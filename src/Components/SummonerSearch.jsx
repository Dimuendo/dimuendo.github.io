import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import Divider from '@material-ui/core/Divider';
import Select from '@material-ui/core/Select';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
    root: {
        margin: 'auto',
        borderRadius: 4,
        border: '1px solid #ced4da',
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: '40%',
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
    },
    iconButton: {
        padding: 10,
    },
    divider: {
        height: 30,
        margin: 4,
    },
    regionSelect: {
        marginRight: theme.spacing(1),
    },
}));

export default function SummonerSearch() {
    const classes = useStyles();
    const [region, setRegion] = React.useState("NA");
    const handleChange = (event) => {
        setRegion(event.target.value)
        console.log(event.target.value)
    }
    return (
        <Paper component="form" className={classes.root}>
            <InputBase
                className={classes.input}
                placeholder="Summoner Name"
                inputProps={{ 'aria-label': 'summoner name' }}
            />
            <Select 
                className={classes.regionSelect} 
                variant="standard"
                value={region} 
                onChange={handleChange}
                disableUnderline
            >
                <MenuItem value={"BR"}>BR</MenuItem>
                <MenuItem value={"EUNE"}>EUNE</MenuItem>
                <MenuItem value={"EUW"}>EUW</MenuItem>
                <MenuItem value={"JP"}>JP</MenuItem>
                <MenuItem value={"KR"}>KR</MenuItem>
                <MenuItem value={"LAN"}>LAN</MenuItem>
                <MenuItem value={"LAS"}>LAS</MenuItem>
                <MenuItem value={"NA"}>NA</MenuItem>
                <MenuItem value={"OCE"}>OCE</MenuItem>
                <MenuItem value={"TR"}>TR</MenuItem>
                <MenuItem value={"RU"}>RU</MenuItem>
            </Select>
            <Divider className={classes.divider} orientation="vertical" />
            <IconButton type="submit" className={classes.iconButton} aria-label="search">
                <SearchIcon />
            </IconButton>
        </Paper>
    );
}

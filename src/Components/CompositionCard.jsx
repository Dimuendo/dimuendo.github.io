import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Tooltip from '@material-ui/core/Tooltip';

function getBorderColour(champCost) {
    if (champCost === 5) {
        return 'gold'
    } else if (champCost === 4) {
        return 'purple'
    } else if (champCost === 3) {
        return 'blue'
    } else if (champCost === 2) {
        return 'green'
    } else if (champCost === 1) {
        return 'grey'
    } else {
        console.log('Invalid champion cost provided')
        return 'red'
    }
}

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
        margin: 'auto',
        width: theme.spacing(130),
        marginBottom: theme.spacing(3),
        backgroundColor: '#263238',
    },
    avatarList: {
        display: 'flex',
        flex: 1,
        '& > *': {
            margin: theme.spacing(0.5),
        },
        marginLeft: theme.spacing(3),
    },
    champAvatar: {
        width: theme.spacing(6),
        height: theme.spacing(6),
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
          duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    expandIcon: {
        color: 'white',
    },
    statText: {
        color: 'white',
    },
    statBox: {
        textAlign: 'center',
        padding: theme.spacing(2),
    }
}));

const CompTitle = withStyles({
    root: {
        width: '150px',
        color: '#FFFFFF',
        fontSize: '20px',
        display: 'flex',
        alignItems: 'flex-start',
        marginLeft: '5px',
    }
})(Typography);

export default function CompositionCard(props) {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const champs = props.champs.map(champs => {
        const champCost = champs.cost
        const borderColour = getBorderColour(champCost)
        const borderStyle = `2px solid ${borderColour}`
        return (
            <Tooltip title={champs.name} key={champs.name}>
                <Avatar variant='rounded' className={classes.champAvatar} style={{border: borderStyle}} src={champs.image} />
            </Tooltip>
        )
    });
    const winRate = props.winRate;
    const top4Rate = props.top4Rate;
    const timesPlayed = props.timesPlayed;

    return (
        <Card variant='outlined' className={classes.root}>
            <Box display='flex' alignItems='center'>
                <CompTitle variant='h4'>
                    { props.name }
                </CompTitle>
                <Box className={classes.avatarList}>
                    { champs }
                </Box>
                <CardActions disableSpacing>
                    <IconButton
                        className={clsx(classes.expand, {
                            [classes.expandOpen]: expanded,
                        })}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="show more"
                    >
                    <ExpandMoreIcon className={classes.expandIcon} />
                    </IconButton>
                </CardActions>
            </Box>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <Grid container spacing={3}>
                        <Grid item xs={4}>
                            <Paper className={classes.statBox} bgcolor='white'>
                                <Typography> Win Rate: { winRate } </Typography>
                            </Paper>
                        </Grid>
                        <Grid item xs={4}>
                            <Paper className={classes.statBox} bgcolor='white'>
                                <Typography> Top 4 Rate: { top4Rate } </Typography>
                            </Paper>
                        </Grid>
                        <Grid item xs={4}>
                            <Paper className={classes.statBox} bgcolor='white'>
                                <Typography> Times Played: { timesPlayed } </Typography>
                            </Paper>
                        </Grid>
                    </Grid>
                </CardContent>
            </Collapse>
        </Card>
    )
}

import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';
import UnitTable from './UnitTable.jsx';
import TraitTable from './TraitTable.jsx';
import ItemTable from './ItemTable.jsx';
import CompPanel from './CompPanel.jsx'
import { createMuiTheme, ThemeProvider, makeStyles } from '@material-ui/core/styles';

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
        <Typography
            component='div'
            role='tabpanel'
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box p={3}>{children}</Box>}
        </Typography>
  );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

const theme = createMuiTheme({
    palette: {
        primary: {
          main: '#000a12',
        },
        secondary: {
            main: '#230C63',
        },
    },
});

const useStyles = makeStyles((theme) => ({
    container: {
        minWidth: theme.spacing(150),
    },
    appBar: {
        minHeight: theme.spacing(6),
    },
    spacer: {
        marginRight: theme.spacing(5),
    },
    filterBox: {
        display: 'flex',
        margin: 'auto',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: theme.spacing(4)
        // backgroundColor: 'white'
    },
    filterSelect: {
        backgroundColor: '#F5F5F6',
        width: theme.spacing(50),
    },
    tabs: {
        minHeight: theme.spacing(6),
        display: 'flex',
        margin: 'auto',
        alignItems: 'center',
        justifyContent: 'center',
    },
    tabLabel: {
        fontSize: 18,
    }
}));

function NavBar(props) {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <ThemeProvider theme={theme}>
        <Box className={classes.container}>
            <AppBar className={classes.appBar} position='static'>
                <Tabs 
                    value={value} 
                    onChange={handleChange} 
                    aria-label='tabs' 
                    className={classes.tabs} 
                    centered
                >
                    <Tab label={<span className={classes.tabLabel}>Team Comp Stats</span>} {...a11yProps(0)} />
                    <Tab label={<span className={classes.tabLabel}>Unit Stats</span>} {...a11yProps(1)} />
                    <Tab label={<span className={classes.tabLabel}>Item Stats</span>} {...a11yProps(2)} />
                    <Tab label={<span className={classes.tabLabel}>Trait Stats</span>} {...a11yProps(3)} />
                </Tabs>
            </AppBar>
            <TabPanel value={value} index={0} id='team-comps'>
                <CompPanel></CompPanel>
            </TabPanel>
            <TabPanel value={value} index={1} id='unit-stats'>
                <UnitTable></UnitTable>
            </TabPanel>
            <TabPanel value={value} index={2} id='item-stats'>
                <ItemTable></ItemTable>
            </TabPanel>
            <TabPanel value={value} index={3} id='trait-stats'>
                <TraitTable></TraitTable>
            </TabPanel>
        </Box>
        </ThemeProvider>
    )
}

export default class LandingPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        return (
            <NavBar comps={this.state.compositions}></NavBar>
        );
    }
}

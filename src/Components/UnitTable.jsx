import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Tooltip from '@material-ui/core/Tooltip';
import Avatar from '@material-ui/core/Avatar';
import { champImages, champNames } from '../Static/champions/ChampData.js'
import { itemImages, itemNames } from '../Static/items/ItemData.js'
import { Box } from '@material-ui/core';
import { useEffect } from 'react';

function createData(champKey, champ, winRate, top4Rate, commonItems, timesPlayed) {
    return { champKey, champ, winRate, top4Rate, commonItems, timesPlayed };
}

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

const headCells = [
    { id: 'champ', numeric: false, sortable: true, label: 'Champion' },
    { id: 'winRate', numeric: true, sortable: true, label: 'Win Rate' },
    { id: 'top4Rate', numeric: true, sortable: true, label: 'Top 4 Rate' },
    { id: 'commonItems', numeric: true, sortable: false, label: 'Most Used Items' },
    { id: 'timesPlayed', numeric: true, sortable: true, label: 'Times Played' },
];

function createRows(unitStats, commonItems) {
    const rows = [];
    for (const [champKey, champName] of Object.entries(champNames)) {
        const winRate = unitStats[champKey]['winPercentage'] * 100
        const top4Rate = unitStats[champKey]['top4Percentage'] * 100
        const timesPlayed = unitStats[champKey]['totalTimesPlayed']
        const unitItems = commonItems[champKey]
        rows.push(createData(champKey, champName, winRate, top4Rate, unitItems, timesPlayed))
    }
    return rows
}

const StyledTableSortLabel = withStyles({
    root: {
        color: 'white',
        '&:hover': {
            color: 'white',
        },
        '&$active': {
            color: 'white',
        },
    },
    active: {},
    icon: {
        color: 'inherit !important'
    }
})(TableSortLabel);

function EnhancedTableHead(props) {
    const { classes, order, orderBy, onRequestSort } = props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };
  
    return (
      <TableHead>
        <TableRow>
          {headCells.map((headCell) => (
            <TableCell
                key={headCell.id}
                align={headCell.id === 'champ' ? 'left' : 'center'}
                sortDirection={orderBy === headCell.id ? order : false}
                className={classes.headCell}
            >   
                {headCell.sortable === true &&
                <StyledTableSortLabel
                    active={orderBy === headCell.id}
                    direction={orderBy === headCell.id ? order : 'asc'}
                    onClick={createSortHandler(headCell.id)}
                >
                    {headCell.label}
                    {orderBy === headCell.id ? (
                    <span className={classes.visuallyHidden}>
                        {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                    </span>
                    ) : null}
                </StyledTableSortLabel>}
                {headCell.sortable === false &&
                    headCell.label
                }
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    classes: PropTypes.object.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
};

const useStyles = makeStyles((theme) => ({
    root: {
        width: theme.spacing(130),
        margin: 'auto',
    },
    headCell: {
        backgroundColor: '#263238',
        color: 'white',
    },
    bodyCell: {
        backgroundColor: '#F5F5F6',
    },
    champCell: {
        backgroundColor: '#F5F5F6',
        display: 'flex',
        alignItems: 'center',
    },
    champAvatar: {
        marginRight: theme.spacing(2),
    },
    itemBox: {
        display: 'flex',
        margin: 'auto',
        alignItems: 'center',
        justifyContent: 'center',
    },
    visuallyHidden: {
        border: 0,
        clip: 'rect(0 0 0 0)',
        height: 1,
        margin: -1,
        overflow: 'hidden',
        padding: 0,
        position: 'absolute',
        top: 20,
        width: 1,
    },
}));

export default function UnitTable(props) {
    const classes = useStyles();
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('champ');
    const [rows, setRows] = React.useState([]);

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    useEffect(() => {
        const fetchData = async () => {
            const unitStatsDataResponse = await fetch('https://tftstats-api.herokuapp.com/unitStats')
            const unitStatsData = await unitStatsDataResponse.json()
            const unitData = unitStatsData['unitPercentages']
            const commonItems = unitStatsData['commonItems']
            const rows = createRows(unitData, commonItems)
            setRows(rows)
        }
        fetchData()
    }, [])

    return (
        <div className={classes.root}>
            <Paper>
                <TableContainer>
                    <Table>
                        <EnhancedTableHead
                            classes={classes}
                            order={order}
                            orderBy={orderBy}
                            onRequestSort={handleRequestSort}
                        />
                        <TableBody>
                            {stableSort(rows, getComparator(order, orderBy)).map((row, index) => {
                                const labelId = `row-${index}`
                                return (
                                    <TableRow hover key={row.champ}>
                                        <TableCell component="th" id={labelId} scope="row" className={classes.champCell}>
                                            <Tooltip title={row.champ}>
                                                <Avatar variant='rounded' className={classes.champAvatar} src={champImages[row.champKey]} />
                                            </Tooltip>
                                            {row.champ}
                                        </TableCell>
                                        <TableCell className={classes.bodyCell} align="center"> {parseInt(row.winRate) + '%'} </TableCell>
                                        <TableCell className={classes.bodyCell} align="center"> {parseInt(row.top4Rate) + '%'} </TableCell>
                                        <TableCell className={classes.bodyCell} align="center">
                                            <Box className={classes.itemBox}>
                                                <Tooltip title={itemNames[row.commonItems[0][0]]}>
                                                    <Avatar variant='rounded' className={classes.champAvatar} src={itemImages[row.commonItems[0][0]]} />
                                                </Tooltip>
                                                <Tooltip title={itemNames[row.commonItems[1][0]]}>
                                                    <Avatar variant='rounded' className={classes.champAvatar} src={itemImages[row.commonItems[1][0]]} />
                                                </Tooltip>
                                                <Tooltip title={itemNames[row.commonItems[2][0]]}>
                                                    <Avatar variant='rounded' className={classes.champAvatar} src={itemImages[row.commonItems[2][0]]} />
                                                </Tooltip>
                                            </Box>
                                        </TableCell>
                                        <TableCell className={classes.bodyCell} align="center"> {parseInt(row.timesPlayed)} </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </div>
    )
}

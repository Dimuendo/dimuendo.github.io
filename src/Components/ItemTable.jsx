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
import { itemImages, itemNames } from '../Static/items/ItemData.js'
import { champImages, champNames } from '../Static/champions/ChampData.js'
import { Box } from '@material-ui/core';
import { useEffect } from 'react';

function createData(itemKey, item, winRate, top4Rate, commonUnits, timesPlayed) {
    return { itemKey, item, winRate, top4Rate, commonUnits, timesPlayed };
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
    { id: 'item', numeric: false, sortable: true, label: 'Item' },
    { id: 'winRate', numeric: true, sortable: true, label: 'Win Rate' },
    { id: 'top4Rate', numeric: true, sortable: true, label: 'Top 4 Rate' },
    { id: 'commonUnits', numeric: false, sortable: false, label: 'Most Used Units' },
    { id: 'timesPlayed', numeric: true, sortable: true, label: 'Times Used' },
];

function createRows(itemStats, commonUnits) {
    const rows = [];
    for (const [itemKey, itemName] of Object.entries(itemNames)) {
        const winRate = itemStats[itemKey]['winPercentage'] * 100
        const top4Rate = itemStats[itemKey]['top4Percentage'] * 100
        const timesPlayed = itemStats[itemKey]['totalTimesPlayed']
        const unitItems = commonUnits[itemKey]
        rows.push(createData(itemKey, itemName, winRate, top4Rate, unitItems, timesPlayed))
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
                align={headCell.id === 'item' ? 'left' : 'center'}
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
    itemCell: {
        backgroundColor: '#F5F5F6',
        display: 'flex',
        alignItems: 'center',
    },
    itemAvatar: {
        marginRight: theme.spacing(2),
    },
    unitAvatar: {
        marginRight: theme.spacing(2),
    },
    unitBox: {
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

export default function ItemTable(props) {
    const classes = useStyles();
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('item');
    const [rows, setRows] = React.useState([])

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    useEffect(() => {
        const fetchData = async () => {
            const itemDataResponse = await fetch('/itemPercentages')
            const commonUnitsResponse = await fetch('/commonUnits')
            const itemData = await itemDataResponse.json()
            const commonUnits = await commonUnitsResponse.json()
            const rows = createRows(itemData, commonUnits)
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
                                    <TableRow hover key={row.item}>
                                        <TableCell component="th" id={labelId} scope="row" className={classes.itemCell}>
                                            <Tooltip title={row.item}>
                                                <Avatar variant='rounded' className={classes.itemAvatar} src={itemImages[row.itemKey]} />
                                            </Tooltip>
                                            {row.item}
                                        </TableCell>
                                        <TableCell className={classes.bodyCell} align="center"> {parseInt(row.winRate) + '%'} </TableCell>
                                        <TableCell className={classes.bodyCell} align="center"> {parseInt(row.top4Rate) + '%'} </TableCell>
                                        <TableCell className={classes.bodyCell} align="center">
                                            <Box className={classes.unitBox}>
                                                <Tooltip title={champNames[row.commonUnits[0][0]]}>
                                                    <Avatar variant='rounded' className={classes.unitAvatar} src={champImages[row.commonUnits[0][0]]} />
                                                </Tooltip>
                                                <Tooltip title={champNames[row.commonUnits[1][0]]}>
                                                    <Avatar variant='rounded' className={classes.unitAvatar} src={champImages[row.commonUnits[1][0]]} />
                                                </Tooltip>
                                                <Tooltip title={champNames[row.commonUnits[2][0]]}>
                                                    <Avatar variant='rounded' className={classes.unitAvatar} src={champImages[row.commonUnits[2][0]]} />
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

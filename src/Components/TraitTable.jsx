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
import { traitImages, traitNames } from '../Static/traits/traitData.js'
import { useEffect } from 'react';

function createData(traitKey, trait, winRate, top4Rate, timesPlayed) {
    return { traitKey, trait, winRate, top4Rate, timesPlayed };
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

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const headCells = [
    { id: 'trait', numeric: false, label: 'Trait' },
    { id: 'winRate', numeric: true, label: 'Win Rate' },
    { id: 'top4Rate', numeric: true, label: 'Top 4 Rate' },
    { id: 'timesPlayed', numeric: true, label: 'Times Played' },
];
  
const rows = [];
for (const [traitKey, traitName] of Object.entries(traitNames)) {
    const winRate = getRandomInt(0, 100)
    const top4Rate = getRandomInt(0, 100)
    const timesPlayed = getRandomInt(0, 100)
    rows.push(createData(traitKey, traitName, winRate, top4Rate, timesPlayed))
}

function createRows(traitStats) {
    const rows = [];
    for (const [traitKey, traitName] of Object.entries(traitNames)) {
        const winRate = traitStats[traitKey]['winPercentage'] * 100
        const top4Rate = traitStats[traitKey]['top4Percentage'] * 100
        const timesPlayed = traitStats[traitKey]['totalTimesPlayed']
        rows.push(createData(traitKey, traitName, winRate, top4Rate, timesPlayed))
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
                align={headCell.id === 'trait' ? 'left' : 'center'}
                sortDirection={orderBy === headCell.id ? order : false}
                className={classes.headCell}
            >
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
                </StyledTableSortLabel>
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
    traitCell: {
        backgroundColor: '#F5F5F6',
        display: 'flex',
        alignItems: 'center',
    },
    traitAvatar: {
        marginRight: theme.spacing(2),
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
    const [orderBy, setOrderBy] = React.useState('trait');
    const [rows, setRows] = React.useState([])

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    useEffect(() => {
        const fetchData = async () => {
            const traitDataResponse = await fetch('https://tftstats-api.herokuapp.com/traitPercentages')
            const traitData = await traitDataResponse.json()
            const rows = createRows(traitData)
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
                                    <TableRow hover key={row.trait}>
                                        <TableCell component="th" id={labelId} scope="row" className={classes.traitCell}>
                                            <Tooltip title={row.trait}>
                                                <Avatar variant='rounded' className={classes.traitAvatar} src={traitImages[row.traitKey]} />
                                            </Tooltip>
                                            {row.trait}
                                        </TableCell>
                                        <TableCell className={classes.bodyCell} align="center"> {parseInt(row.winRate) + '%'} </TableCell>
                                        <TableCell className={classes.bodyCell} align="center"> {parseInt(row.top4Rate) + '%'} </TableCell>
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

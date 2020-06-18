import React from 'react';
import Box from '@material-ui/core/Box';
import CompositionCard from './CompositionCard.jsx';
import { makeStyles } from '@material-ui/core/styles';
import { champImages, champNames, champCosts } from '../Static/champions/ChampData.js'
import { useEffect } from 'react';

const useStyles = makeStyles((theme) => ({
    container: {
        // backgroundColor: '#ffebee',
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
}));

export default function CompPanel(props) {
    const [compStatsDict, setCompStatsDict] = React.useState([]);
    const classes = useStyles();

    useEffect(() => {
        const fetchData = async () => {
            const compStatsDictResponse = await fetch('/compStats')
            const compStatsDictJson = await compStatsDictResponse.json()
            setCompStatsDict(compStatsDictJson)
        }
        fetchData()
    }, [])

    let comps = {}
    for (const [strUnitList, compStats] of Object.entries(compStatsDict)) {
        let units = strUnitList.split(',')
        comps[strUnitList] = {}
        comps[strUnitList]['units'] = []
        comps[strUnitList]['compName'] = compStats['compName']
        for (let i = 0; i < units.length; i++) {
            let champID = units[i]
            let unitData = {'name': champNames[champID], 'cost': champCosts[champID], 'image':champImages[champID]}
            comps[strUnitList]['units'].push(unitData)
        }
        comps[strUnitList]['units'].sort(function(a, b) {
            return b.cost - a.cost
        })
        comps[strUnitList]['winRate'] = parseInt(compStats['winPercentage'] * 100) + '%'
        comps[strUnitList]['top4Rate'] = parseInt(compStats['top4Percentage'] * 100) + '%'
        comps[strUnitList]['timesPlayed'] = compStats['placements'].length
    }

    // for (let i = 0; i < compPlayRates.length; i++) {
    //     let strComp = compPlayRates[i][0]
    //     let units = strComp.split(',')
    //     let compName = 'Comp ' + compNum.toString()
    //     comps[compName] = []
    //     for (let j = 0; j < units.length; j++) {
    //         let champID = units[j]
    //         let unitData = {'name': champNames[champID], 'cost': champCosts[champID], 'image':champImages[champID]}
    //         comps[compName].push(unitData)
    //     }
    //     comps[compName].sort(function(a, b) {
    //         return b.cost - a.cost
    //     })
    //     compNum++
    // }

    let compCards = []
    for (const [strUnitList, compData] of Object.entries(comps)) {
        compCards.push(
        <CompositionCard 
            key={strUnitList} 
            name={compData['compName']} 
            champs={compData['units']}
            winRate={compData['winRate']} 
            top4Rate={compData['top4Rate']} 
            timesPlayed={compData['timesPlayed']}
        >
        </CompositionCard>)
    }

    return (
        <div>
            {/* <button onClick={() => props.filterHandler('a', 'b')}> Unit Filter </button>
            <button onClick={() => props.filterHandler('a', 'b')}> Item Filter </button>
            <button onClick={() => props.filterHandler('a', 'b')}> Trait Filter </button> */}
            <Box className={classes.filterBox}>
                {/* <Autocomplete
                    id='unit-filter'
                    options={champs}
                    getOptionLabel={(champs) => champs.name}
                    autoHighlight
                    className={classes.filterSelect}
                    renderInput={(params) => <TextField {...params} label='Unit Filter' variant='filled' />}
                />
                <span className={classes.spacer}></span>
                <Autocomplete
                    id='item-filter'
                    options={items}
                    getOptionLabel={(items) => items.name}
                    autoHighlight
                    className={classes.filterSelect}
                    renderInput={(params) => <TextField {...params} label='Item Filter' variant='filled' />}
                />
                <span className={classes.spacer}></span>
                <Autocomplete
                    id='traits-filter'
                    options={traits}
                    getOptionLabel={(traits) => traits.name}
                    autoHighlight
                    className={classes.filterSelect}
                    renderInput={(params) => <TextField {...params} label='Trait Filter' variant='filled' />}
                /> */}
            </Box>
            { compCards }
        </div>
    )
}

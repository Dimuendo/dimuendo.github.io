import React from 'react';
// import { CircularProgress } from '@material-ui/core';
import CompositionCard from './CompositionCard.jsx';
import { champImages, champNames, champCosts } from '../Static/champions/ChampData.js'
// import { useEffect } from 'react';

export default function CompPanel() {
    // const [compStatsDict, setCompStatsDict] = React.useState([]);
    // const [loading, setLoading] = React.useState(true);

    // useEffect(() => {
    //     const fetchData = async () => {
    //         const compStatsDictResponse = await fetch('https://tftstats-api.herokuapp.com/compStats')
    //         const compStatsDictJson = await compStatsDictResponse.json()
    //         setCompStatsDict(compStatsDictJson)
    //         setLoading(false)
    //     }
    //     fetchData()
    // }, [])
    const compStatsDict = require('../Data/compStats.json')

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
            {/* <div style={{display: loading ? "block" : "none"}}>
                <CircularProgress />
            </div>
            <div style={{display: loading ? "none" : "block"}}>
                { compCards }
            </div> */}
            { compCards }
        </div>
    )
}

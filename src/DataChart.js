import React,{useState} from 'react'
import {Line} from 'react-chartjs-2';

const DataChart = ({statusType,countryInfoMonthly}) => {
    let countryInfoMonthlyFiltered = {};
    for(let key in countryInfoMonthly){
        countryInfoMonthlyFiltered[key] = [];
        countryInfoMonthly[key].map(each =>{
            for(let keyInside in each){
                if(keyInside === statusType){
                    let eachRow = {};
                    eachRow['day'] = each.day;
                    eachRow[statusType] = each[statusType];
                    countryInfoMonthlyFiltered[key].push(eachRow);
                    break;
                }
            }
            return 1;
        })
    }
    
    return (
        <div>
            <button onClick={e => console.log(countryInfoMonthlyFiltered)}>Checking from DataChart Component</button>
            <p>This is the {statusType} dataChart component</p>
        </div>
    )
}

export default DataChart;

import React,{useState,useEffect} from 'react'
import {Line} from 'react-chartjs-2';

const DataChart = ({statusType,countryInfoMonthly}) => {
    const [monthlyInfoFiltered,setMonthlyInfoFiltered] = useState([]);

    useEffect(()=>{
        let countryInfoMonthlyFiltered = {}; // it will filter the monthly data according to the statusType
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
        setMonthlyInfoFiltered(countryInfoMonthlyFiltered);
    },[]);
    

    let chartList = [];
    for(let key in monthlyInfoFiltered){
        let labels = [];
        let data = [];
        if(monthlyInfoFiltered[key].length === 0) continue;
        monthlyInfoFiltered[key].map(eachDay =>{
            labels.push(eachDay.day);
            data.push(eachDay[statusType]);
            return 1;
        })
        let LineData = {
            labels,
            datasets:[
                {
                    label:key,
                    backgroundColor:'pink',
                    borderColor:'red',
                    borderWidth:'1',
                    data 
                }
            ]
        }
        chartList.push(
            <div style={{position:'relative',padding:10,margin:10}} className="eachLineChart" key={Math.random()}>
                <Line 
                    data={LineData}
                    options={{maintainAspectRatio:true,
                    responsive:true,
                    scales:{
                        yAxes:[{ticks:{beginAtZero:true}}]
                    }}}
                />
            </div>
        )
    }
    
    return (
        <div>
            <button onClick={e => console.log(monthlyInfoFiltered)}>Checking from DataChart Component</button>
            <p>This is the {statusType} dataChart component</p>
            <div style={{width:'100%',display:'grid',gridTemplateColumns:'1fr 1fr 1fr'}} className="chartListComponents">
                {chartList}
            </div>
        </div>
    )
}

export default DataChart;

import Plot from "react-plotly.js";

const RankStats = ({ playerData }) => {
    let statDict = {
        "x": [],
        "u": [],
        "ss": [],
        "s+": [],
        "s": [],
        "s-": [],
        "a+": [],
        "a": [],
        "a-": [],
        "b+": [],
        "b": [],
        "b-": [],
        "c+": [],
        "c": [],
        "c-": [],
        "d+": [],
        "d": [],
        "z": []
    }

    let avgStats = {
        "x": [],
        "u": [],
        "ss": [],
        "s+": [],
        "s": [],
        "s-": [],
        "a+": [],
        "a": [],
        "a-": [],
        "b+": [],
        "b": [],
        "b-": [],
        "c+": [],
        "c": [],
        "c-": [],
        "d+": [],
        "d": [],
        "z": [],
    }

    let totalAPM = 0;
    let totalPPS = 0;
    let totalVS = 0;

    for (let player of playerData) {
        let rank = player.league.rank;
        let playerStats = {
            "apm": player.league.apm,
            "pps": player.league.pps,
            "vs": player.league.vs,
        }
        statDict[rank].push(playerStats)
    }

    for (let rank in statDict) {
        totalAPM = 0;
        totalPPS = 0;
        totalVS = 0;
        for (let playerStat of statDict[rank]) {
            totalAPM += playerStat["apm"];
            totalPPS += playerStat["pps"];
            totalVS += playerStat["vs"];
        }
        let total = statDict[rank].length;
        avgStats[rank].push(totalAPM / total);
        avgStats[rank].push(totalPPS / total);
        avgStats[rank].push(totalVS / total);
    }

    let apmData = [];
    let ppsData = [];
    let vsData = [];
    let rankList= ["X", "U", "SS", "S+", "S", "S-", "A+", "A", "A-", "B+", "B", "B-", "C+", "C", "C-", "D+", "D-"];

    for (let rank in avgStats) {
        apmData.push(avgStats[rank][0]);
        ppsData.push(avgStats[rank][1]);
        vsData.push(avgStats[rank][2]);
    }

    
    return (
        <>
        <Plot 
            data={[
                {
                    x: rankList,
                    y: apmData,
                    type: "bar",
                },
                {
                    x: rankList,
                    y: apmData,
                    type: 'scatter',
                    mode: {color: "lightblue"},
                }
            ]}
            layout={ {width: 800, height: 500, title: "APM (Attacks/Min)"}}
        />
        <Plot 
        data={[
            {
                x: rankList,
                y: ppsData,
                type: "bar",
            },
            {
                x: rankList,
                y: ppsData,
                type: 'scatter',
                mode: {color: "lightblue"},
            }
        ]}
        layout={ {width: 800, height: 500, title: "PPS (Pieces/Sec)"}}
        />
        <Plot 
        data={[
            {
                x: rankList,
                y: vsData,
                type: "bar",
            },
            {
                x: rankList,
                y: vsData,
                type: 'scatter',
                mode: {color: "lightblue"},
            }
        ]}
        layout={ {width: 800, height: 500, title: "VS Score"}}
        />
        </>
    )

}

export default RankStats;
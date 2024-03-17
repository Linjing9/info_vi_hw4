import React from 'react'
import * as d3 from "d3"


function YAxis(props){
    const { yScale, height, axisLable } = props;
    if(yScale){
        const yAxis = d3.axisLeft(yScale);
        return(
            <g>
                <g ref={node => d3.select(node).call(yAxis)} />
                <text style={{ textAnchor:'end', fontSize:'15px'}} transform={`translate(20, 0)rotate(-90)`}>
                    {axisLable}
                </text>
        </g>
        );
    }else{
        return <g></g>
    }

}

export default YAxis
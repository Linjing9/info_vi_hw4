import React, { useState } from 'react';

function Points(props) {
    const {data, xScale, yScale, height, width, handleStationHover, handleMouseOut, selectedStatio} = props;
    //const [selectedStation, setSelectedStation] = useState(null);
    //Note: 
    //the if(data){...} means when data is not null, the component will return the points; otherwise, it returns <g></g>
    //we use the if ... else ... in this place so that the code can work with the SSR in Next.js;
    const getRadius = (station) => {return station === selectedStation ? 10 : 5;};
    const getColor = (station) => {return station === selectedStation ? 'red' : 'steelblue';};
    const handleMouseEnter = (station) => {
        handleStationHover(station);
    };
    const handleMouseLeave = () => {
        handleMouseOut();
    };



    if(data){
        return (
            <g>
                {data.map((d, i) => (
                    <React.Fragment key={i}>
                        {/* Yellow rectangle around the point if selected */}
                        {selectedStation === d.station && (
                            <rect
                                x={0}
                                y={0}
                                width={width}
                                height={height}
                                fill="yellow"
                                opacity="0.4"
                            />
                        )}
                        {/* Circle representing the point */}
                        <circle
                            cx={xScale(d.tripdurationS)}
                            cy={yScale(d.tripdurationE)}
                            r={getRadius(d.station)}
                            fill={getColor(d.station)}
                            onMouseEnter={() => handleMouseEnter(d.station)}
                            onMouseLeave={handleMouseLeave}
                        />
                        {/* Redraw the selected point to bring it to the front */}
                        {selectedStation === d.station && (
                            <circle
                                cx={xScale(d.tripdurationS)}
                                cy={yScale(d.tripdurationE)}
                                r={getRadius(d.station)}
                                fill={getColor(d.station)}
                            />
                        )}
                    </React.Fragment>
                ))}
            </g>
        );
    } else {
        return <g></g>
    }
}



export default Points

import * as React from "react"

const modY = (x, y) => y - Math.ceil((x - 2) / 2)
const fillColor = ({assigned, emptyLocation, focusAvailable}) => {
    if (focusAvailable && !assigned && !emptyLocation) return 'green'
    if (focusAvailable) return 'transparent'
    if (assigned) {
        return 'red'
    } else if (emptyLocation) {
        return 'blue'
    } else {
        return 'transparent'
    }
}

const AnchoredPath = ({ located, handleHexClick, x, y, offsetX, offsetY, assigned, empty, focusAvailable}) => {
    const locatedHex = assigned ? located.find((location) => location.superLocation === `${x + 0 > 9 ? '' : '0'}${x + 0}${y + 0 > 9 ? '' : '0'}${y + 0}`) : null    
    if(assigned) {
        console.log('AnchoredPath locatedHex:', locatedHex, x, y, assigned)
        console.log('AnchoredPath located:', located)
    }
    return (
        <g>
    <a transform={ 
        `rotate(90 ${54.00475 + 3.1695*x - 8.6135*modY(x, y)} ${53.07+11.775*x+8.663*modY(x, y)})` 

    } onClick={() => {
        if(!focusAvailable) return false
        if(assigned || empty) return false
        console.log(`clicked ${x + offsetX > 9 ? '' : '0'}${x + offsetX}${y + offsetY > 9 ? '' : '0'}${y + offsetY}`);
        return handleHexClick({
            x,
            y,            
        })
    }}>
        
  <path
    d="m57.24 78.49-8.63 4.983-8.628-4.982v-9.964l8.629-4.982 8.629 4.982z"
    style={{
        fill: fillColor({assigned, emptyLocation: empty, focusAvailable}),
        fillOpacity: .2,
        stroke: '#000',
        strokeWidth: 0.264583,
        strokeOpacity: 1,
    }}
  />
  

    </a>
    {assigned && locatedHex && (
    <text 
       x={15*x + 0*y + 34}  // adjust these values to align the text correctly
       y={0*x + (x % 2 === 0 ? 8 : 0) + 17.4*y + 63} 
      style={{
          fontSize: "4px", // adjust font size to fit the path
          textAnchor: "middle" // center the text horizontally
      }}
    >
      {locatedHex.name}
    </text>
  )}
    </g>
)
        }
const xArray = [1, 2, 3, 4, 5, 6, 7, 8]
const yArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
const SvgComponent = ({
    offsetX = 0, 
    offsetY = 0, 
    located = [],
    emptyLocations = [], 
    assigned = [],
    focusAvailable,
    handleHexClick,
    ...props
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="210mm"
    height="297mm"
    viewBox="0 0 210 297"
    {...props}
  >
    {
    xArray.map(x => (
        yArray.map(y => (
            <AnchoredPath 
                handleHexClick={handleHexClick}
                key={100*x+y} 
                located={located}
                assigned={assigned.some(l => l === `${x + offsetX > 9 ? '' : '0'}${x + offsetX}${y + offsetY > 9 ? '' : '0'}${y + offsetY}`)} 
                emptyLocation={emptyLocations.some(([lx, ly]) => lx === x && ly === y)}
                x={x} 
                y={y} 
                offsetX={offsetX} 
                offsetY={offsetY} 
                focusAvailable={focusAvailable}
            />
        ))
    ))
  }
  </svg>
)
export default SvgComponent

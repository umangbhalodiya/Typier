import React from 'react'

// interface Props{
//     record: number
//     height: number
//     color: string
// }

const Podium = props => {
    return (
    <div>
        <p className="text-xs px-2 text-gray-900 font-medium">{props.record} WPM</p>
        <div className={`w-auto rounded-t-sm ${props.color}`} style={{height: props.height}}></div>
    </div>
    )
}
export default Podium
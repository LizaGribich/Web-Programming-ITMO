import React, {useEffect, useState} from 'react';

const Area = ({data, currentR, handleAreaSubmit, showError}) => {
    const [points, setPoints] = useState([]);
    const SVG_SIZE = 350;
    const SVG_CENTER = SVG_SIZE / 2;
    const R = parseFloat(currentR);
    const isValidR = !isNaN(R) && R > 0;

    useEffect(() => {
        setPoints(data.map(point => transformPoint(point)));
    }, [data, currentR]);

    const transformPoint = (point) => {
        if (!R || R < 0) {
            return null;
        }
        const SCALE_COEFFICIENT = 2 * R / (SVG_SIZE - 20);
        let xPixel = point.x / SCALE_COEFFICIENT + SVG_CENTER;
        let yPixel = SVG_CENTER - point.y / SCALE_COEFFICIENT;

        return {
            cx: xPixel,
            cy: yPixel,
            fill: point.result ? 'green' : 'red',
        };
    };

    const handleClick = (event) => {
        if (!currentR || isNaN(currentR) || currentR <= 0) {
            console.error('Значение R вне допустимого диапазона');
            showError('Значение R вне допустимого диапазона');
            return;
        }

        const SCALE_COEFFICIENT = 2 * R / (SVG_SIZE - 20);
        let x = (event.nativeEvent.offsetX - SVG_CENTER) * SCALE_COEFFICIENT;
        let y = (SVG_CENTER - event.nativeEvent.offsetY) * SCALE_COEFFICIENT;

        x = Math.max(Math.min(x, 3), -3);
        y = Math.max(Math.min(y, 3), -5);

        handleAreaSubmit(x, y, R);
    };

        return (
            <svg id="interactiveArea" onClick={handleClick} width="350" height="350" style={{ border: '1px solid black' }}>
                <path d="M 175 175 L 257.5 175 A 82.5 82.5 0 0 1 175 257.5 Z" fill="#c2b3fc"/>
                <rect x="92.5" y="175" width="82.5" height="165" fill="#c2b3fc"/>
                    <polygon points="92.5,175 175,10 175,175" fill="#c2b3fc"/>
                    <line x1="175" y1="0" x2="175" y2="350" stroke="black"/>
                    <line x1="0" y1="175" x2="350" y2="175" stroke="black"/>
                    <line x1="10" y1="170" x2="10" y2="180" stroke="black"/>
                    <text x="10" y="192" textAnchor="middle" fontSize="9px">{isValidR ? -R : '-R'}</text>
                    <line x1="92.5" y1="170" x2="92.5" y2="180" stroke="black"/>
                    <text x="92.5" y="192" textAnchor="middle" fontSize="9px">{isValidR ? -R/2 : '-R/2'}</text>
                    <line x1="257.5" y1="170" x2="257.5" y2="180" stroke="black"/>
                    <text x="257.5" y="192" textAnchor="middle" fontSize="9px">{isValidR ? R/2 : 'R/2'}</text>
                    <line x1="340" y1="170" x2="340" y2="180" stroke="black"/>
                    <text x="340" y="192" textAnchor="middle" fontSize="9px">{isValidR ? R : 'R'}</text>
                    <line x1="170" y1="10" x2="180" y2="10" stroke="black"/>
                    <text x="158" y="10" textAnchor="end" alignmentBaseline="middle" fontSize="9px">{isValidR ? R : 'R'}</text>
                    <line x1="170" y1="92.5" x2="180" y2="92.5" stroke="black"/>
                    <text x="158" y="92.5" textAnchor="end" alignmentBaseline="middle" fontSize="9px">{isValidR ? R/2 : 'R/2'}</text>
                    <line x1="170" y1="257.5" x2="180" y2="257.5" stroke="black"/>
                    <text x="158" y="257.5" textAnchor="end" alignmentBaseline="middle" fontSize="9px">{isValidR ? -R/2 : '-R/2'}</text>
                    <line x1="170" y1="340" x2="180" y2="340" stroke="black"/>
                    <text x="158" y="340" textAnchor="end" alignmentBaseline="middle" fontSize="9px">{isValidR ? -R : '-R'}</text>
                {points.filter(point => point !== null).map((point, index) => (
                    <circle key={index} cx={point.cx} cy={point.cy} r="3" fill={point.fill} />
                ))}
            </svg>
        );
};

export default Area;

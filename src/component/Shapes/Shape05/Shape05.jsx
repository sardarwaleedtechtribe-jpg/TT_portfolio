import React from 'react';
import { Square } from '../Square.jsx';
import '../Core/Shapes.css';
import './Shape05.css';

export const Shape05 = () => (
    <div className="sh-container sh-05" title="Shape 05">
        <Square className="pos-tc" />
        <Square className="pos-bc" />
        <Square className="pos-lc" />
        <Square className="pos-rc" />
    </div>
);

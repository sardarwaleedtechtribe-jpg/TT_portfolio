import React from 'react';
import { Square } from '../Square.jsx';
import '../Core/Shapes.css';
import './Shape02.css';

export const Shape02 = () => (
    <div className="sh-container sh-02" title="Shape 02">
        <Square className="pos-tr" />
        <Square className="pos-rc" />
        <Square className="pos-lc" />
        <Square className="pos-bl" />
    </div>
);

import React from 'react';
import { Square } from '../Square.jsx';
import '../Core/Shapes.css';
import './Shape01.css';

export const Shape01 = () => (
    <div className="sh-container sh-01" title="Shape 01">
        <Square className="square-tl" />
        <Square className="square-tr" />
        <Square className="square-br" />
        <Square className="square-bl" />
    </div>
);
  
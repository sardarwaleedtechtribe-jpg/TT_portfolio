import React from 'react';
import { Square } from '../Square.jsx';
import '../Core/Shapes.css';
import './Shape03.css';

export const Shape03 = () => (
    <div className="sh-container sh-03" title="Shape 03">
        <Square className="pos-otl" />
        <Square className="pos-tl" />
        <Square className={"pos-otr"}/>
        <Square className="pos-tr" />
        <Square className="pos-cc" />
        <Square className={"pos-obl"}/>
        <Square className="pos-bl" />
        <Square className={"pos-obr"}/>
        <Square className="pos-br" />
    </div>
);

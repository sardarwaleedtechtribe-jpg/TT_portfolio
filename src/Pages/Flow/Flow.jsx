import React, { useRef } from 'react';
import SectionHeader from '../../component/SectionHeader/SectionHeader.jsx';
import { FLOW_DATA } from './flowData.js';
import './Flow.css';
import { Shape01, Shape02, Shape03, Shape04, Shape05 } from '../../component/Shapes/Core/Shapes.jsx';

export default function Flow() {
    const scrollContainerRef = useRef(null);

    const scroll = (direction) => {
        if (scrollContainerRef.current) {
            const scrollAmount = 400; // Adjust scroll amount as needed
            scrollContainerRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    return (
        <section className="Flow-root">
            <div className="Flow-header">
                <SectionHeader label="Flow" title="Request flow" theme="light" />
            </div>

            {/* <div className="shapes-gallery-container" style={{ padding: '0 4.5rem', marginBottom: '3rem' }}>
                <Shape01 />
                <br />
                <Shape02 />
                <br />
                <Shape03 />
                <br />
                <Shape04 />
                <br />
                <Shape05 />
            </div> */}




        </section>
    );
}

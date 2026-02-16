import React, { useState } from 'react';
import SectionHeader from '../../component/SectionHeader/SectionHeader.jsx';
import Button from '../../component/Button/Button.jsx';
import { FAQ_DATA } from './faqData.js';
import './FAQ.css';

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState(null);

    const toggleAccordion = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="FAQ-root">
            <div className="FAQ-header">
                <SectionHeader label="FAQ" title="Frequently Asked Questions" theme="light" size="small" />
            </div>

            <div className="FAQ-list">
                {FAQ_DATA.map((item, index) => (
                    <div
                        key={index}
                        className={`FAQ-item ${openIndex === index ? 'open' : ''}`}
                        onClick={() => toggleAccordion(index)}
                    >
                        <div className="FAQ-question-row">
                            <span className="FAQ-number">Q{item.id}</span>
                            <h3 className="FAQ-question">{item.question}</h3>
                            <span className="FAQ-icon">{openIndex === index ? '−' : '+'}</span>
                        </div>
                        {openIndex === index && (
                            <div className="FAQ-answer">
                                <p>{item.answer}</p>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            <div className="FAQ-footer">
                <Button text="View FAQ" />
            </div>
        </section>
    );
}

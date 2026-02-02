import SectionHeader from '../../component/SectionHeader/SectionHeader.jsx';
import './Strengths.css';
import { STATS_DATA, DETAILED_STRENGTHS } from './strengthsData.js';

export default function Strengths() {
    return (
        <section className="Strengths-root">
            <div className="Strengths-header">
                <SectionHeader
                    label="Strengths"
                    title="Our Strengths"
                    theme="light"
                />
            </div>

            <div className="stats-container" role="list">
                {STATS_DATA.map((item, index) => (
                    <div className="stat-card" key={index} role="listitem">
                        <h2>{item.value}</h2>
                        <p>{item.label}</p>
                    </div>
                ))}
            </div>

            <div className="strengths-layout-container">
                <aside className="strengths-left-section" aria-hidden="true">
                    {/* Placeholder for layout/visuals */}
                </aside>

                <div className="detailed-strengths">
                    {DETAILED_STRENGTHS.map((item) => (
                        <article className="strength-detail-item" key={item.id}>
                            <div className="strength-index" aria-hidden="true">
                                ( {item.id} )
                            </div>
                            <div className="strength-content">
                                <h3 className="strength-title">{item.title}</h3>
                                <div className="strength-divider"></div>
                                <p className="strength-description">{item.description}</p>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}
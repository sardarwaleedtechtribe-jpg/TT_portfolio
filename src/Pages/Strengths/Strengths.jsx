import SectionHeader from '../../component/SectionHeader/SectionHeader.jsx';
import './Strengths.css';

export default function Strengths() {
    const data = [
        { value: "300+", label: "Total Projects" },
        { value: "50+", label: "Number of clients" },
        { value: "30+", label: "Annual Performance" },
    ];

    return (
        <div>

            <section className="Strengths-header">
                <SectionHeader label="Strengths"
                    title="Our Strengths"
                    theme="light" />

            </section>
            <div className="stats-container">
                {data.map((item, index) => (
                    <div className="stat-card" key={index}>
                        <h2>{item.value}</h2>
                        <p>{item.label}</p>
                    </div>
                ))}
            </div>
        </div>


    );
}
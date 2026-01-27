import Button from '../Button/Button.jsx';
import './Services.css';

const SERVICES = ['Brand Design', 'UX Design', 'Web Development', '3D Motion'];

const Services = () => {
    return (
        <section className="services-header" aria-labelledby="services-title">
            <div className="services-meta">
                <span className="services-dot" aria-hidden="true" />
                <span className="services-label">Service</span>
            </div>

            <hr className="services-divider" />

            <div className="services-main">
                <h1 id="services-title" className="title">Services</h1>
            </div>

            <div className="services-footer">
                <hr className="services-line-loader" />
                <ul className="services-tag-list">
                    {SERVICES.map((service) => (
                        <li key={service} className="service-tag">
                            <span className="dot" aria-hidden="true" />
                            <span className="label">{service}</span>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="services-right-content">
                <Button text="Explore our services" />
            </div>
        </section>
    );
};

export default Services;

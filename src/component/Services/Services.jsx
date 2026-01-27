import Button from '../Button/Button.jsx';
import './Services.css';

const Services = () => {
    return (
        <section className="about-header">
            <div className="about-meta">
                <span className="dot" />
                <span className="label">Service</span>
            </div>

            <hr className="divider" />

            <div className="about-main">
                <h1 className="title">Services</h1>
            </div>

            <div className="services-footer">
                <hr className="line-loader" />
                <div className="service-tag">
                    <span className="dot" />
                    <span className="label">Brand Design</span>
                </div>
                <div className="service-tag">
                    <span className="dot" />
                    <span className="label">UX Design</span>
                </div>
                <div className="service-tag">
                    <span className="dot" />
                    <span className="label">Web Development</span>
                </div>
                <div className="service-tag">
                    <span className="dot" />
                    <span className="label">3D Motion</span>
                </div>
            </div>

            <div className="services-right-content">
                <Button text="Explore our services" />
            </div>
        </section>
    );
};

export default Services;        

import Button from '../../component/Button/Button.jsx';
import SectionHeader from '../../component/SectionHeader/SectionHeader.jsx';
import './About.css';

const About = () => {
    return (
        <section className="about-header" style={{ background: 'transparent' }}>
            <SectionHeader label="About Us" title="About Us" theme="light" />
            <div className="about-description">
                <p>Now that digital has become a part of our daily lives, what is sought after is an experience that moves the heart. We combine design that connects with the user's emotions with smooth-moving technology, achieving both ease of use and a sense of immersion. We create new precedents that no one has ever seen before, without compromising on a single pixel.</p>
                <Button text="Learn more about us" />
            </div>
        </section>
    );
};

export default About;

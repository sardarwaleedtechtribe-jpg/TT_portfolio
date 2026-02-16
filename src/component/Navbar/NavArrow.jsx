import React from 'react';

const NavArrow = ({ className, as: Component = 'span' }) => {
    return (
        <Component className={className}>
            <span className="arrow-text default">→</span>
            <span className="arrow-text hover">→</span>
        </Component>
    );
};

export default NavArrow;

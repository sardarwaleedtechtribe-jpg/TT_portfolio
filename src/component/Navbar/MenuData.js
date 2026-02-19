export const TOP_CARDS = [
    { id: 'recruit', label: 'Recruit', title: 'Careers', path: '/recruit' },
    { id: 'contact', label: 'Contact', title: 'Contact us', path: '/contact' }
];

export const MENU_ITEMS = [
    { text: 'Home', path: '/', active: true },
    {
        text: 'About Us',
        path: '/about',
        underline: true,
        subItems: ['Corporate Philosophy', 'Company Information', 'Members', 'Access']
    },
    { text: 'Our Strengths', underline: true, path: '/strengths' },
    { text: 'Production Achievements', underline: true, path: '/work' },
    { text: 'Services', underline: true, path: '/services' },
    { text: 'News', underline: true, path: '/news' },
    { text: 'Careers', underline: true, path: '/recruit' },
    {
        text: 'Contact us',
        path: '/contact',
        underline: true,
        subItems: ['Frequently Asked Questions','Consultation on production',
            'Recruitment Interview Form','Other Inquiries']
    }
];

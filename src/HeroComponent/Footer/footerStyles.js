// ── Reusable Tailwind class strings ─────────────────────────────────────────

// Underline that scaleX-animates out on hover (description paragraphs)
export const descUnderline =
    "relative inline-block pb-[4px] cursor-pointer " +
    "after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-px after:bg-black " +
    "after:scale-x-100 after:origin-left " +
    "after:transition-transform after:duration-[400ms] after:[transition-timing-function:cubic-bezier(0.5,0,0,1)] " +
    "hover:after:scale-x-0 hover:after:origin-right";

// Same underline animation for nav links (pb-[2px] instead of 4px)
export const navLinkUnderline =
    "relative pb-[2px] " +
    "after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-px after:bg-black " +
    "after:scale-x-100 after:origin-left " +
    "after:transition-transform after:duration-[400ms] after:[transition-timing-function:cubic-bezier(0.5,0,0,1)] " +
    "hover:after:scale-x-0 hover:after:origin-right";

// External-link corner-bracket icon base (4×4 box with ::before & ::after corners)
export const extIconBase =
    "inline-block w-[4px] h-[4px] border border-black ml-[10px] align-middle relative top-[-3px] " +
    // bottom-left corner (::before)
    "before:content-[''] before:absolute before:bottom-[-1px] before:left-[-1px] " +
    "before:w-[3px] before:h-[3px] before:border-b before:border-l before:border-black " +
    "before:transition-all before:duration-200 before:ease " +
    // top-right corner (::after)
    "after:content-[''] after:absolute after:top-[-3px] after:right-[-3px] " +
    "after:w-[3px] after:h-[3px] after:border-t after:border-r after:border-black " +
    "after:transition-all after:duration-200 after:ease";

// On hover move ::after inward (top-right corner contracts)
export const extIconHoverAfter = "group-hover:after:top-[-1px] group-hover:after:right-[-1px]";
// On hover move ::before outward (bottom-left corner expands)
export const extIconHoverBefore = "group-hover:before:bottom-[-3px] group-hover:before:left-[-3px]";

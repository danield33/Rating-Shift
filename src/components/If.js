import * as React from 'react';

/**
 * A component to replace ternary (inline) if statements within jsx
 * @param can a boolean condition if something is true
 * @param children what to display if something is true otherwise the second element will be displayed
 * @returns {null|React.ReactElement<any, string | React.JSXElementConstructor<any>>|string|number|{}|Iterable<React.ReactNode>|React.ReactPortal}
 * @constructor
 */
export function If({can, children}) {
    const childArr = React.Children.toArray(children);
    if (can && childArr.length > 0)
        return childArr[0];
    else if (childArr.length > 1) return childArr[1];
    else return null;
}

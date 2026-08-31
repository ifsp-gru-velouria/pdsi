import { PropsWithChildren } from 'react';

import StyledComponents from './StyledComponents';

export default function Providers({ children }: PropsWithChildren) {
    const providers = [
        StyledComponents,
    ];

    return providers.reduceRight((previousChildren, Component) => {
        return <Component>{previousChildren}</Component>
    }, children);
}

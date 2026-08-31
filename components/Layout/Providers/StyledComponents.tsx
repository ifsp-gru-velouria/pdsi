'use client';

import { useServerInsertedHTML } from 'next/navigation';

import { PropsWithChildren, useMemo } from 'react';

import { ServerStyleSheet, StyleSheetManager } from 'styled-components';

export default function StyledComponents({ children }: PropsWithChildren) {
    const styleSheet = useMemo(() => new ServerStyleSheet(), []);

    useServerInsertedHTML(() => {
        const styles = styleSheet.getStyleElement();

        styleSheet.instance.clearTag();

        return <>{styles}</>;
    });

    if (typeof window !== 'undefined') {
        return <>{children}</>;
    }

    return <StyleSheetManager sheet={styleSheet.instance}>{children}</StyleSheetManager>
}

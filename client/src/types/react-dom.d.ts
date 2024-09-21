declare module 'react-dom' {
    import * as React from 'react';
    export function createPortal(children: React.ReactNode, container: Element): React.ReactPortal;
  }

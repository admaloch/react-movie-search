declare module 'react-window' {
    import * as React from 'react';
  
    export interface ListChildComponentProps {
      index: number;
      style: React.CSSProperties;
      data?: any;
    }
  
    export type FixedSizeListProps = {
      height: number;
      width: number | string;
      itemSize: number;
      itemCount: number;
      itemData?: any;
      className?: string;
      children: React.ComponentType<ListChildComponentProps>;
    };
  
    export class FixedSizeList extends React.Component<FixedSizeListProps> {}
  }
  
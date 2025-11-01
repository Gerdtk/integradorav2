// src/components/Grid.tsx
import React from 'react';

/** Opciones de alineación / distribución */
type GridItemsAlignment = 'start' | 'center' | 'end' | 'stretch' | 'baseline';
type GridJustify = 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';

export interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  alignItems?: GridItemsAlignment;
  justify?: GridJustify;
  row?: boolean;          // fila por defecto
  column?: boolean;       // si quieres columna
  expanded?: boolean;     // ancho completo
  sm?: number;            // cols sm
  md?: number;            // cols md
  lg?: number;            // cols lg
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

const Grid: React.FC<GridProps> = ({
  alignItems = 'stretch',
  justify = 'start',
  row = true,
  column = false,
  expanded = false,
  sm,
  md,
  lg,
  className = '',
  style,
  children,
  ...rest
}) => {
  const classes = [
    'grid',
    row && 'grid-row',
    column && 'grid-col',
    expanded && 'grid-expanded',
    `items-${alignItems}`,
    `justify-${justify}`,
    sm ? `sm-${sm}` : '',
    md ? `md-${md}` : '',
    lg ? `lg-${lg}` : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classes} style={style} {...rest}>
      {children}
    </div>
  );
};

export default Grid;

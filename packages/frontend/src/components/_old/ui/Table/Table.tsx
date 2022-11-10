import React, { createContext, FC } from 'react';
import { useFlexLayout, useResizeColumns, useTable } from 'react-table';
import { headerProps } from '../../../../presets/helpers/table';
import { TableStyled } from './Table-styled';

interface TableCoreProps {
  columns: Columns[];
  data;
  RowParcer;
}

export type Columns =
  | {
      Header: string;
      accessor: string;
      width?: number;
      align?: string;
      justify?: string;
    }
  | {
      Header: string;
      columns: Columns[];
    };

export const TableRoute = createContext<
  ((pathname: string, search: string) => void) | null
>(null);

export const TableCore: FC<TableCoreProps> = ({ columns, data, RowParcer }) => {
  const defaultColumn = React.useMemo(
    () => ({ minWidth: 30, maxWidth: 150 }),
    []
  );

  const { headerGroups, rows, prepareRow } = useTable(
    { columns, data, defaultColumn },
    useResizeColumns,
    useFlexLayout
  );

  return (
    <div>
      {headerGroups?.map((headerGroup) => (
        <TableStyled.Row {...headerGroup.getHeaderGroupProps({})}>
          {headerGroup.headers?.map((column) => (
            <TableStyled.Header
              key={column.id}
              {...column.getHeaderProps(headerProps)}
            >
              {column.render('Header')}
            </TableStyled.Header>
          ))}
        </TableStyled.Row>
      ))}
      <TableStyled.Body>
        {rows?.map((row: any) => {
          prepareRow(row);
          return <RowParcer key={row.id} row={row} />;
        })}
      </TableStyled.Body>
    </div>
  );
};

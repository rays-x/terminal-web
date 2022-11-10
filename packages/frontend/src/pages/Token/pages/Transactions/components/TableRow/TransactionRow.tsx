import React, {FC} from 'react';
import {cellProps} from '../../../../../../presets/helpers/table';
import {
  formatNumeral,
  NUMERAL_FORMAT_FLOAT
} from '../../../../../../utils/numbers';
import {EMDASH} from '../../../../../../utils/data/utf';
import {RowStyled, SideVariant} from '../../../../../../components/_old/ui/Table/components/Row/Row-styled';
import {formatDate} from '../../../../../../hooks/useFormatDate';
import {ImagePreview} from '../../../../../../components/_old/ui/Image/Image';

export const TransactionRow: FC<{ row }> = ({row}) => {
  return (
    <RowStyled.Component {...row.getRowProps()}>
      {row.cells?.map((cell) => {
        if (cell.column.id === 'date') {
          return (
            <RowStyled.Text {...cell.getCellProps(cellProps)}>
              {formatDate(cell.value, 'yyyy-MM-dd HH:mm:ss')}
            </RowStyled.Text>
          );
        }

        if (cell.column.id === 'side') {
          return (
            <RowStyled.Side
              {...cell.getCellProps(cellProps)}
              variant={
                cell.value === 'SELL' ? SideVariant.Sell : SideVariant.Buy
              }
            >
              {cell.value === 'SELL' ? 'Sell' : 'Buy'}
            </RowStyled.Side>
          );
        }

        if (cell.column.id === 'price_usd') {
          return (
            <RowStyled.Text {...cell.getCellProps(cellProps)}>
              {formatNumeral(cell.value, NUMERAL_FORMAT_FLOAT, EMDASH)}
            </RowStyled.Text>
          );
        }

        if (cell.column.id === 'amount') {
          return (
            <RowStyled.Text {...cell.getCellProps(cellProps)}>
              {formatNumeral(cell.value, NUMERAL_FORMAT_FLOAT, EMDASH)}
            </RowStyled.Text>
          );
        }

        if (cell.column.id === 'total_usd') {
          return (
            <RowStyled.Text {...cell.getCellProps(cellProps)}>
              {formatNumeral(cell.value, NUMERAL_FORMAT_FLOAT, EMDASH)}
            </RowStyled.Text>
          );
        }

        if (cell.column.id === 'maker') {
          return (
            <RowStyled.Text {...cell.getCellProps(cellProps)}>
              {cell.value &&
                `${cell.value.slice(0, 5)}...${cell.value.slice(-5)}`}
            </RowStyled.Text>
          );
        }

        if (
          cell.column.id === 'exchange_link' ||
          cell.column.id === 'other_link'
        ) {
          return (
            <RowStyled.Text {...cell.getCellProps(cellProps)}>
              <ImagePreview imageSrc={cell.value}/>
            </RowStyled.Text>
          );
        }

        return null;
      })}
    </RowStyled.Component>
  );
};

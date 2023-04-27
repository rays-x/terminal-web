import React, {FC} from 'react';
import {cellProps} from '../../../../../../presets/helpers/table';
import {EMDASH} from '../../../../../../utils/data/utf';
import {RowStyled} from '../../../../../../components/_old/ui/Table/components/Row/Row-styled';
import {ImagePreview} from '../../../../../../components/_old/ui/Image/Image';
import EtherScanIcon from '../../../../../../assets/icons/dex/etherscan.jpg';
import BscScanIcon from '../../../../../../assets/icons/dex/bscscan.jpg';

export const TradingPairStatisticsRow: FC<{ row }> = ({row}) => {
  return (
    <RowStyled.Component {...row.getRowProps()}>
      {row.cells?.map((cell) => {

        if(cell.column.id === 'price_usd') {
          return (
            <RowStyled.Text {...cell.getCellProps(cellProps)}>
              {[undefined, 'NaN', 'Infinity', '0'].includes(cell.value) ? EMDASH : String(cell.value).replace('-', '')}
            </RowStyled.Text>
          );
        }

        if(cell.column.id === 'amount') {
          return (
            <RowStyled.Text {...cell.getCellProps(cellProps)}>
              {[undefined, 'NaN', 'Infinity', '0'].includes(cell.value) ? EMDASH : cell.value}
            </RowStyled.Text>
          );
        }

        if(cell.column.id === 'total_usd') {
          return (
            <RowStyled.Text {...cell.getCellProps(cellProps)}>
              {[undefined, 'NaN', 'Infinity', '$0'].includes(cell.value) ? EMDASH : cell.value}
            </RowStyled.Text>
          );
        }

        if(cell.column.id === 'maker') {
          return (
            <RowStyled.Text {...cell.getCellProps(cellProps)}>
              {cell.value &&
                `${cell.value.slice(0, 5)}...${cell.value.slice(-5)}`}
            </RowStyled.Text>
          );
        }

        if(
          cell.column.id === 'exchange_image'
        ) {
          return (
            <RowStyled.Text {...cell.getCellProps(cellProps)}>
              <ImagePreview imageSrc={cell.value}/>
            </RowStyled.Text>
          );
        }

        if(
          cell.column.id === 'explorer_link'
        ) {
          return (
            <RowStyled.Link {...cell.getCellProps(cellProps)} href={cell.value} target="_blank">
              <ImagePreview imageSrc={cell.value.includes('ether')
                ? EtherScanIcon
                : BscScanIcon}/>
            </RowStyled.Link>
          );
        }

        return null;
      })}
    </RowStyled.Component>
  );
};

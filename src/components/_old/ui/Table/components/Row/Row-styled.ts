import styled, {css} from 'styled-components';
import {animated} from '@react-spring/web';
import {mixins} from '../../../../../../presets/mixins';
import {SCG} from '../../../../../../presets/types';
import {ChangeVariant} from '../../../../../../presets/helpers/table';
import {colors, spacing} from '../../../../../../presets/base';
import {hexToRgb} from '../../../../../../presets/helpers/colors';

export const enum Variant {
  default,
  illuminated
}

export const Text = styled.div`
  color: ${colors.text.secondary};
  ${mixins.text_tableRow}
`;

export const Link = styled.a`
  color: ${colors.text.secondary};
  ${mixins.text_tableRow}
`;

export const Component = styled.div`
  min-width: max-content !important;
  cursor: pointer;
  height: 46px;
  color: white;
  gap: 8px;
  ${mixins.isDesktopSmall(css`
    padding: 0 ${spacing[10]};
  `)}
  :hover {
    background: ${hexToRgb(colors.base.white, 0.04)};
  }
`;

export const IdStyled = styled.div<{ variant: Variant }>`
  ${({variant}) =>
  variant === Variant.default &&
  css`
      color: #8e91a5;
    `}
  ${({variant}) =>
  variant === Variant.illuminated &&
  css`
      color: #1eff78;
      text-shadow: 0 0 9px rgba(18, 255, 99, 0.81);
    `}
  ${mixins.text_tableRow}
`;

export const NameStyled = styled.div<{ variant: Variant }>`
  gap: 8px;
  ${mixins.text_tableRow}
  ${({variant}) =>
  variant === Variant.default &&
  css`
      color: ${colors.text.gray};
    `}
  ${({variant}) =>
  variant === Variant.illuminated &&
  css`
      color: ${colors.text.green};
      text-shadow: 0 0 9px ${hexToRgb(colors.text.green, 0.81)};
    `}
`;

export enum SideVariant {
  Sell,
  Buy
}

export const SideStyled = styled.div<{ variant: SideVariant }>`
  gap: 8px;
  ${mixins.text_tableRow}
  ${({variant}) =>
  variant === SideVariant.Sell &&
  css`
      color: #e3253e;
    `}
  ${({variant}) =>
  variant === SideVariant.Buy &&
  css`
      color: #2ec66b;
    `}
`;

export const ImageStyled = styled(animated.img)`
  width: 28px;
  height: 28px;
  border-radius: 50%;
`;

export const ChangeStyled = styled.div<{ variant: ChangeVariant }>`
  height: inherit;
  gap: 4px;
  ${({variant}) =>
  variant === ChangeVariant.rise &&
  css`
      color: #30fd82;
    `}
  ${({variant}) =>
  variant === ChangeVariant.fall &&
  css`
      color: #ff495f;
    `}
  ${mixins.text_tableRow}
`;

export enum Row {
  Component = 'Component',
  Id = 'Id',
  Name = 'Name',
  Image = 'Image',
  Change = 'Change',
  Text = 'Text',
  Link = 'Link',
  Side = 'Side'
}

export const RowStyled: SCG<Row> = {
  [Row.Component]: Component,
  [Row.Id]: IdStyled,
  [Row.Name]: NameStyled,
  [Row.Image]: ImageStyled,
  [Row.Change]: ChangeStyled,
  [Row.Text]: Text,
  [Row.Link]: Link,
  [Row.Side]: SideStyled
};

import styled, {css} from 'styled-components';
import {colors} from '../../../../presets/base';

const TableImage = css`
  width: 28px;
  height: 28px;
  border-radius: 50%;
`;
export const ImagePlaceholder = styled.div`
  background-color: ${colors.background.opacityBlack};
  ${TableImage}
`;

export const Image = styled.img`
  ${TableImage}
`;

export const ImageStyled = {
  ImagePlaceholder,
  Image
};

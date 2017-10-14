// Divider Line Component

import styled from 'styled-components/native';
import theme from '../constants/theme';

const Divider = styled.View`
	background: ${theme.color.canvas};
	border-top-width: 1;
	border-bottom-width: 1;
	border-color: ${theme.color.divider};
	height: 16;
`;

export const BorderDivider = styled.View`
	height: 1;
	flex: 1;
	margin-top: 20;
	margin-bottom: 20;
	background-color: ${theme.color.divider};
`;

export default Divider;
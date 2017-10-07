import React from 'react';
import styled from 'styled-components/native';
import theme from '../constants/theme';
import { Bold } from './common';

export default (props) => (
	<Button activeOpacity={0.7} {...props}>
		<ButtonText>{props.title}</ButtonText>
	</Button>
);

const Button = styled.TouchableOpacity`
	background-color: ${theme.color.yellow};
	border-radius: 4;
	align-items: center;
	padding-top: 10;
	padding-bottom: 10;
`;

const ButtonText = styled(Bold)`font-size: 16;`;
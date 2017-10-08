import React from 'react';
import { TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import theme from '../constants/theme';
import { Bold } from './common';

export default (props) => (
	<TouchableOpacity activeOpacity={0.7} {...props}>
		<Button>
			<ButtonText>{props.title}</ButtonText>
		</Button>
	</TouchableOpacity>
);

const Button = styled.View`
	background-color: ${theme.color.yellow};
	border-radius: 4;
	align-items: center;
	padding-top: 10;
	padding-bottom: 10;
`;

const ButtonText = styled(Bold)`font-size: 16;`;
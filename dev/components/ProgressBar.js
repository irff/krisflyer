// Progress Bar Component

import React from 'react';
import styled from 'styled-components/native';
import theme from '../constants/theme';

export default ({ width, disabled }) => (
	<Wrapper disabled={disabled}>
		<Progress width={width} disabled={disabled} />
		<Dot disabled={disabled} />
		<DummyView width={1-width} />
	</Wrapper>
);

const Wrapper = styled.View`
	border-radius: 4;
	border-width: 4;
	border-color: transparent;
	height: 8;
	background-color: ${props => props.disabled ? theme.color.canvas : theme.color.yellowLight};
	flex-direction: row;
	align-items: center;
`;

const Progress = styled.View`
	height: 4;
	border-radius: 4;
	flex: ${props => props.width};
	background-color: ${props => props.disabled ? theme.color.lightGray : theme.color.yellow};
	opacity: 0.85;
`;

const Dot = styled.View`
	height: 8;
	width: 8;
	border-radius: 4;
	margin-left: -4;
	z-index: 1;
	background-color: ${props => props.disabled ? theme.color.lightGray : theme.color.yellow};
`;

const DummyView = styled.View`
	flex: ${props => props.width};
`;
import React from 'react';
import styled from 'styled-components/native';
import theme from '../constants/theme';

export default ({ width }) => (
	<Wrapper>
		<Progress width={width} />
		<Dot />
		<DummyView width={1-width} />
	</Wrapper>
);

const Wrapper = styled.View`
	border-radius: 3;
	border-width: 2;
	border-color: transparent;
	height: 6;
	background-color: ${theme.color.yellowLight};
	flex-direction: row;
	align-items: center;
`;

const Progress = styled.View`
	height: 4;
	border-radius: 4;
	flex: ${props => props.width};
	background-color: ${theme.color.yellow};
	opacity: 0.85;
`;

const Dot = styled.View`
	height: 6;
	width: 6;
	border-radius: 3;
	margin-left: -3;
	z-index: 1;
	background-color: ${theme.color.yellow};
`;

const DummyView = styled.View`
	flex: ${props => props.width};
`;
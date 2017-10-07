import React from 'react';
import styled from 'styled-components/native';
import theme from '../constants/theme';

export default ({ width }) => (
	<Wrapper>
		<Progress width={width} />
		<DummyView width={1-width} />
	</Wrapper>
);

const Wrapper = styled.View`
	border-radius: 4;
	height: 4;
	background-color: ${theme.color.yellowLight};
	flex-direction: row;
`;

const Progress = styled.View`
	height: 4;
	border-radius: 4;
	flex: ${props => props.width};
	background-color: ${theme.color.yellow};
`;

const DummyView = styled.View`
	flex: ${props => props.width};
`;
import styled from 'styled-components/native';

export const Flex = styled.View`
	flex: 1;
`;

export const AlignCenter = styled.View`
	align-self: center;
`;

export const AlignRight = styled.View`
	align-self: flex-end;
`;

export const ScreenTitle = styled.Text`
	font-weight: bold;
	font-size: 16;
	font-family: app-bold;
	${props => props.color && `color: ${props.color};`};
`;

export const Text = styled.Text`
	font-family: app-regular;
	margin-top: 2;
	margin-bottom: 2;
`;

export const Bold = styled.Text`
	font-family: app-bold;
	margin-top: 2;
	margin-bottom: 2;
`;
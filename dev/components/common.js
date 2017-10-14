// Common Styling
import styled from 'styled-components/native';
import { LinearGradient } from 'expo';
import { SimpleLineIcons, Ionicons } from '@expo/vector-icons';

export const Flex = styled.View`
	flex: 1;
`;

export const AlignCenter = styled.View`
	align-self: center;
`;

export const AlignRight = styled.View`
	align-self: flex-end;
`;

export const Row = styled.View`
	flex-direction: row;
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
	font-size: 14;
`;

export const LightText = styled.Text`
	font-family: app-light;
	margin-top: 2;
	margin-bottom: 2;
`;

export const Bold = styled.Text`
	font-family: app-bold;
	margin-top: 2;
	margin-bottom: 2;
`;

export const Header = styled(LinearGradient)`
	padding-top: 20;
	overflow: visible;
`;

export const NavBar = styled.View`
	flex-direction: row;
	justify-content: space-between;
	margin-bottom: 16;
`;

export const HeaderIcon = styled(SimpleLineIcons)`
	margin-left: 16;
	margin-right: 16;
`;

export const HeaderIonicon = styled(Ionicons)`
	margin-left: 16;
	margin-right: 16;
`;

export const DummyNavIcon = styled.View`
	margin-left: 16;
	width: 16;
	margin-right: 16;
`;

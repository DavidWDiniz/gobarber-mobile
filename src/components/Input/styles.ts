import styled, {css} from "styled-components/native";
import FeatherIcon from "react-native-vector-icons/Feather";

interface ContainerProps {
    isFocused: boolean;
}

export const Container = styled.View<ContainerProps>`
  width: 100%;
  height: 60px;
  padding: 0 16px;
  background: #232129;
  border-radius: 10px;
  margin-bottom: 8px;
  border: 2px solid #232129;
  flex-direction: row;
  align-items: center;
  
  ${props => props.isFocused && css`
    border: 2px solid #FF9000;
  `}
`;

export const TextInput = styled.TextInput`
  flex: 1;
  color: #FFF;
  font-size: 16px;
  font-family: ${"RobotSlab-Medium"};
`;

export const Icon = styled(FeatherIcon)`
  margin-right: 16px;
`;

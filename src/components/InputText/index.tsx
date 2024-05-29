import { TextInputProps } from "react-native";
import { useTheme } from "styled-components/native";

import { Container } from "./styles";

interface InputTextProps extends TextInputProps{ }

export function InputText(props: InputTextProps){
  const { COLORS } = useTheme()

  return(
    <Container
      placeholderTextColor={COLORS.GRAY_300}
      {...props}
    />
  )
}
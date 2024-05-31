import { TextInput, TextInputProps } from "react-native";
import { useTheme } from "styled-components/native";

import { Container } from "./styles";

interface InputTextProps extends TextInputProps{
  inputRef?: React.RefObject<TextInput>
}

export function InputText({ inputRef, ...rest }: InputTextProps){
  const { COLORS } = useTheme()

  return(
    <Container
      ref={inputRef}
      placeholderTextColor={COLORS.GRAY_300}
      {...rest}
    />
  )
}
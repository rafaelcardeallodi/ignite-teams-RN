import { TextInputProps } from "react-native";
import { Container } from "./styles";

interface InputTextProps extends TextInputProps{ }

export function InputText(props: InputTextProps){
  return(
    <Container {...props} />
  )
}
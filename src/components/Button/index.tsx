import { TouchableOpacityProps } from 'react-native'

import { Container, ButtonVariant, Title } from "./styles";

interface ButtonProps extends TouchableOpacityProps {
  variant?: ButtonVariant
}

export function Button({ variant = 'primary', children, ...rest }: ButtonProps){
  return(
    <Container variant={variant} {...rest}>
      <Title>{children}</Title>
    </Container>
  )
}
import { TouchableOpacityProps } from "react-native";
import { MaterialIcons } from '@expo/vector-icons'

import { Container, Icon, VariantIconButton } from "./styles";

interface IconButtonProps extends TouchableOpacityProps{
  icon: keyof typeof MaterialIcons.glyphMap
  variant?: VariantIconButton
}

export function IconButton({ icon, variant = 'primary', ...rest }: IconButtonProps){
  return (
    <Container variant={variant} {...rest}>
      <Icon name={icon} variant={variant} />
    </Container>
  )
}
import { IconButton } from "@components/IconButton"
import { Container, Icon, PlayerName } from "./styles"

interface PlayerCardProps {
  name: string
  onRemovePlayer: () => void
}

export function PlayerCard({ name, onRemovePlayer }: PlayerCardProps){
  return(
    <Container>
      <Icon name="person" />
      <PlayerName>{name}</PlayerName>

      <IconButton icon="close" variant="secondary" onPress={onRemovePlayer} />
    </Container>
  )
}
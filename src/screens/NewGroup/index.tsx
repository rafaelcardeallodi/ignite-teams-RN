import { useNavigation } from "@react-navigation/native";

import { Container, Content, Icon } from "./styles";
import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import { Button } from "@components/Button";
import { InputText } from "@components/InputText";

export function NewGroup(){
  const navigation = useNavigation()

  function handleCreateGroup(){
    navigation.navigate('players', {
      group: 'Churrascria'
    })
  }

  return (
    <Container>
      <Header showBackButton />
      
      <Content>
        <Icon />
        
        <Highlight 
          title="Nova turma" 
          subtitle="Crie uma nova turma para adicionar as pessoas" 
        />

        <InputText placeholder="Nome da turma" />

        <Button style={{ marginTop: 20 }} onPress={handleCreateGroup}>
          Criar
        </Button>
      </Content>
    </Container>
  )
}
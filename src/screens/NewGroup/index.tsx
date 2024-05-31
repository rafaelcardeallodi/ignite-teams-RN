import { useState } from "react";
import { useNavigation } from "@react-navigation/native";

import { Container, Content, Icon } from "./styles";
import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import { Button } from "@components/Button";
import { InputText } from "@components/InputText";

export function NewGroup(){
  const [group, setGroup] = useState('')

  const navigation = useNavigation()

  function handleCreateGroup(){
    navigation.navigate('players', {
      group
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

        <InputText 
          placeholder="Nome da turma"
          onChangeText={setGroup}
        />

        <Button style={{ marginTop: 20 }} onPress={handleCreateGroup}>
          Criar
        </Button>
      </Content>
    </Container>
  )
}
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";

import { Container, Content, Icon } from "./styles";
import { createGroup } from "@storage/group/create-group";
import { AppError } from "@utils/app-error";

import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import { Button } from "@components/Button";
import { InputText } from "@components/InputText";
import { Alert } from "react-native";

export function NewGroup(){
  const [group, setGroup] = useState('')

  const navigation = useNavigation()

  async function handleCreateGroup(){
    try{
      if(group.trim().length === 0){
        return Alert.alert('Novo grupo', 'Informe o nome da turma.')
      }

      await createGroup(group)

      navigation.navigate('players', {
        group
      })
    } catch(error){
      if(error instanceof AppError){
        Alert.alert('Novo grupo', error.message)
      }else{
        Alert.alert('Novo grupo', 'Não foi possível criar a turma.')
        console.log(error)
      }
    }
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
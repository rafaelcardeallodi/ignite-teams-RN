import { Header } from "@components/Header";
import { Container, Content, Icon } from "./styles";
import { Highlight } from "@components/Highlight";
import { Button } from "@components/Button";
import { InputText } from "@components/InputText";

export function NewGroup(){
  return (
    <Container>
      <Header showBackButton />
      
      <Content>
        <Icon />
        
        <Highlight 
          title="Nova turma" 
          subtitle="Crie uma nova turma para adicionar as pessoas" 
        />

        <InputText />

        <Button style={{ marginTop: 20 }}>Criar</Button>
      </Content>
    </Container>
  )
}
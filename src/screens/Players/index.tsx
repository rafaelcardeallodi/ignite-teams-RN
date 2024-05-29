import { Header } from "@components/Header";
import { Container, Form } from "./styles";
import { Highlight } from "@components/Highlight";
import { IconButton } from "@components/IconButton";
import { InputText } from "@components/InputText";

export function Players(){
  return(
    <Container>
      <Header showBackButton />

      <Highlight
        title="Nome da turma"
        subtitle="Adicione a galera e separe os times"
      />
      
      <Form>
        <InputText
          placeholder="Nome da pessoa"
          autoCorrect={false}
        />

        <IconButton icon="add" />
      </Form>
    </Container>
  )
}
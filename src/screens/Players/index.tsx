import { Header } from "@components/Header";
import { Container, Form, HeaderList, PlayersQuantity } from "./styles";
import { Highlight } from "@components/Highlight";
import { IconButton } from "@components/IconButton";
import { InputText } from "@components/InputText";
import { Filter } from "@components/Filter";
import { FlatList } from "react-native";
import { useState } from "react";
import { PlayerCard } from "@components/PlayerCard";

export function Players(){
  const [players, setPlayers] = useState<string[]>(['Rafael', 'Ferraz', 'Nattan']);
  const [team, setTeam] = useState('Time A');

  const playersQuantity = players.length;

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

      <HeaderList>
        <FlatList
          data={['Time A', 'Time B']}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <Filter 
              title={item} 
              isActive={item === team}
              onPress={() => setTeam(item)}
            />
          )}
          horizontal
        />
        
        <PlayersQuantity>{playersQuantity}</PlayersQuantity>
      </HeaderList>

      <FlatList
        data={players}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <PlayerCard name={item} onRemovePlayer={() => {}} />
        )}
      />
    </Container>
  )
}
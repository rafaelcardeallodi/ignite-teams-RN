import { Alert, FlatList } from "react-native";
import { useState } from "react";
import { useRoute } from "@react-navigation/native";

import { Container, Form, HeaderList, PlayersQuantity } from "./styles";

import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import { IconButton } from "@components/IconButton";
import { InputText } from "@components/InputText";
import { Filter } from "@components/Filter";
import { PlayerCard } from "@components/PlayerCard";
import { ListEmpty } from "@components/ListEmpty";
import { Button } from "@components/Button";
import { addPlayerByGroup } from "@storage/player/add-player-by-group";
import { AppError } from "@utils/app-error";
import { getPlayersByGroup } from "@storage/player/get-players-by-group";

interface RouteParams{
  group: string;
}

export function Players(){
  const [newPlayerName, setNewPlayerName] = useState('');
  const [players, setPlayers] = useState<string[]>([]);
  const [team, setTeam] = useState('Time A');

  const route = useRoute();
  const { group } = route.params as RouteParams;

  async function handleAddPlayer(){
    if(newPlayerName.trim().length === 0){
      return Alert.alert('Novo jogador', 'Digite o nome da pessoa para adicionar.');
    }

    const newPlayer = {
      name: newPlayerName,
      team
    }

    try{
      await addPlayerByGroup(newPlayer, group);

      const players = await getPlayersByGroup(group);

      
    } catch(error){
      if(error instanceof AppError){
        Alert.alert('Erro', error.message);
      }else{
        Alert.alert('Erro', 'Não foi possível adicionar o jogador.');
        console.log(error);
      }
    }
  }

  const playersQuantity = players.length;

  return(
    <Container>
      <Header showBackButton />

      <Highlight
        title={group}
        subtitle="Adicione a galera e separe os times"
      />
      
      <Form>
        <InputText
          placeholder="Nome da pessoa"
          autoCorrect={false}
          onChangeText={setNewPlayerName}
        />

        <IconButton icon="add" onPress={handleAddPlayer} />
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
        ListEmptyComponent={<ListEmpty message="Não há jogadores nesse time" />}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          { paddingBottom: 100 }, 
          players.length === 0 && { flex: 1 }
        ]}
      />

      <Button variant="secondary">Remover Turma</Button>
    </Container>
  )
}
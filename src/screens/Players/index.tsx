import { Alert, FlatList, TextInput } from "react-native";
import { useEffect, useRef, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";

import { Container, Form, HeaderList, PlayersQuantity } from "./styles";
import { addPlayerByGroup } from "@storage/player/add-player-by-group";
import { AppError } from "@utils/app-error";
import { getPlayersByGroupAndTeam } from "@storage/player/get-players-by-group-and-team";
import { PlayerStorageDTO } from "@storage/player/PlayerStorageDTO";
import { removePlayerFromGroup } from "@storage/player/remove-player-from-group";
import { deleteGroupByName } from "@storage/group/delete-group-by-name";

import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import { IconButton } from "@components/IconButton";
import { InputText } from "@components/InputText";
import { Filter } from "@components/Filter";
import { PlayerCard } from "@components/PlayerCard";
import { ListEmpty } from "@components/ListEmpty";
import { Button } from "@components/Button";

interface RouteParams{
  group: string;
}

export function Players(){
  const [newPlayerName, setNewPlayerName] = useState('');
  const [players, setPlayers] = useState<PlayerStorageDTO[]>([]);
  const [team, setTeam] = useState('Time A');

  const navigation = useNavigation();
  const route = useRoute();
  const { group } = route.params as RouteParams;

  const newPlayerNameInputRef = useRef<TextInput>(null);

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

      newPlayerNameInputRef.current?.blur();

      setNewPlayerName('');
      fetchPlayersByTeam();
    } catch(error){
      if(error instanceof AppError){
        Alert.alert('Erro', error.message);
      }else{
        Alert.alert('Erro', 'Não foi possível adicionar o jogador.');
        console.log(error);
      }
    }
  }

  async function fetchPlayersByTeam(){
    try{
      const playersByTeam = await getPlayersByGroupAndTeam(group, team);

      setPlayers(playersByTeam);
    } catch (error){
      Alert.alert('Erro', 'Não foi possível buscar os jogadores.');
      console.log(error);
    }
  }

  async function handleRemovePlayer(playerName: string){
    try{ 
      await removePlayerFromGroup(playerName, group);
      fetchPlayersByTeam();
    } catch(error){
      Alert.alert('Remover pessoa', 'Não foi possível remover o jogador.');
      console.log(error);
    }
  }

  async function groupRemove(){
    try{
      await deleteGroupByName(group);

      navigation.navigate('groups')
    } catch(error){
      Alert.alert('Remover turma', 'Não foi possível remover a turma.');
      console.log(error);
    }
  }

  async function handleDeleteGroup(){
    Alert.alert(
      'Remover Turma', 
      'Deseja realmente remover essa turma?', 
      [
        { text: 'Não', style: 'cancel' },
        { 
          text: 'Sim', 
          style: 'destructive', 
          onPress: groupRemove
        }
      ]
    )
  }

  const playersQuantity = players.length;

  useEffect(() => {
    fetchPlayersByTeam();
  }, [team])

  return(
    <Container>
      <Header showBackButton />

      <Highlight
        title={group}
        subtitle="Adicione a galera e separe os times"
      />
      
      <Form>
        <InputText
          inputRef={newPlayerNameInputRef}
          value={newPlayerName}
          placeholder="Nome da pessoa"
          onChangeText={setNewPlayerName}
          autoCorrect={false}
          onSubmitEditing={handleAddPlayer}
          returnKeyType="done"
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
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <PlayerCard name={item.name} onRemovePlayer={() => handleRemovePlayer(item.name)} />
        )}
        ListEmptyComponent={<ListEmpty message="Não há jogadores nesse time" />}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          { paddingBottom: 100 }, 
          players.length === 0 && { flex: 1 }
        ]}
      />

      <Button variant="secondary" onPress={handleDeleteGroup}>Remover Turma</Button>
    </Container>
  )
}
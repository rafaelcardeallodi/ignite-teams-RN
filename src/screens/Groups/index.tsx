import { useCallback, useState } from 'react';
import { FlatList } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native'

import { Container } from './styles';

import { Header } from '@components/Header';
import { Highlight } from '@components/Highlight';
import { GroupCard } from '@components/GroupCard';
import { ListEmpty } from '@components/ListEmpty';
import { Button } from '@components/Button';
import { getGroupAll } from '@storage/group/get-groups-all';
import { Loading } from '@components/Loading';

export function Groups() {
  const [isFetchingGroups, setIsFetchingGroups] = useState(true)
  const [groups, setGroups] = useState<string[]>([])

  const navigation = useNavigation()

  function handleNewGroup(){
    navigation.navigate('new')
  }

  async function fetchGroups(){
    try{
      setIsFetchingGroups(true)

      const groupsData = await getGroupAll()

      setGroups(groupsData)
    } catch(error){
      console.log(error)
    } finally {
      setIsFetchingGroups(false)
    }
  }

  function handleOpenGroup(group: string){
    navigation.navigate('players', {
      group
    })
  }

  useFocusEffect(useCallback(() => {
    fetchGroups()
  }, []))

  return (
    <Container>
      <Header />

      <Highlight title="Turmas" subtitle="Jogue com a sua turma" />

      {isFetchingGroups ? (
        <Loading />
      ) : (
        <FlatList 
          data={groups}
          keyExtractor={item => item}
          renderItem={({ item }) => (
            <GroupCard 
              title={item}
              onPress={() => handleOpenGroup(item)}
            />
          )}
          contentContainerStyle={groups.length === 0 && { flex: 1 }}
          ListEmptyComponent={() => (
            <ListEmpty message="Que tal cadastrar a primeira turma?" />
          )}
        />
      )}

      <Button onPress={handleNewGroup}>Criar nova turma</Button>
    </Container>
  );
}
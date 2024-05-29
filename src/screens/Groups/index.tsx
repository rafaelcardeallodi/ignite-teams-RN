import { useState } from 'react';
import { FlatList } from 'react-native';

import { Container } from './styles';
import { Header } from '@components/Header';
import { Highlight } from '@components/Highlight';
import { GroupCard } from '@components/GroupCard';

export function Groups() {
  const [groups, setGroups] = useState(['Galera do Ignite', 'Galera do Explorer'])

  return (
    <Container>
      <Header />

      <Highlight title="Turmas" subtitle="Jogue com a sua turma" />

      <FlatList 
        data={groups}
        keyExtractor={item => item}
        renderItem={({ item }) => {
          return(
            <GroupCard 
              title={item}
            />
          )
        }}
      />
    </Container>
  );
}
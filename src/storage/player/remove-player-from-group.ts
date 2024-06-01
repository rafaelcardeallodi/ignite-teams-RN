import AsyncStorage from "@react-native-async-storage/async-storage";
import { getPlayersByGroup } from "./get-players-by-group";
import { PLAYER_COLLECTION } from "@storage/storage-config";

export async function removePlayerFromGroup(playerName: string, group: string){
  try{
    const storage = await getPlayersByGroup(group);

    const filteredPlayersWithoutPlayerName = storage.filter(player => player.name !== playerName);

    const players = JSON.stringify(filteredPlayersWithoutPlayerName);

    await AsyncStorage.setItem(`${PLAYER_COLLECTION}-${group}`, players);
  } catch(error){
    throw error;
  }
}
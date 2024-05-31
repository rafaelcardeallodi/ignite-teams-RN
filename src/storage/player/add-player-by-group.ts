import { AppError } from "@utils/app-error";
import { PlayerStorageDTO } from "./PlayerStorageDTO";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { PLAYER_COLLECTION } from "@storage/storage-config";
import { getPlayersByGroup } from "./get-players-by-group";

export async function addPlayerByGroup(newPlayer: PlayerStorageDTO, group: string) {
  try{
    const players = await getPlayersByGroup(group)

    const playerAlreadyExists = players.find(player => player.name === newPlayer.name)

    if(playerAlreadyExists){
      throw new AppError('O jogador já está cadastrado nesse grupo.')
    }

    const storage = JSON.stringify([...players, newPlayer])

    await AsyncStorage.setItem(`${PLAYER_COLLECTION}-${group}`, storage)
  } catch (error) {
    throw new AppError('Não foi possível adicionar o jogador.')
  }
}
import AsyncStorage from "@react-native-async-storage/async-storage";
import { GROUP_COLLECTION, PLAYER_COLLECTION } from "@storage/storage-config";
import { getGroupAll } from "./get-groups-all";

export async function deleteGroupByName(groupDeleted: string){
  try{
    const storedGroups = await getGroupAll();

    const filteredGroupsWithoutDeleted = storedGroups.filter(group => group !== groupDeleted);
    
    const groups = JSON.stringify(filteredGroupsWithoutDeleted);

    await AsyncStorage.setItem(GROUP_COLLECTION, groups);
    await AsyncStorage.removeItem(`${PLAYER_COLLECTION}-${groupDeleted}`);
  } catch(error){
    throw error;
  }
}
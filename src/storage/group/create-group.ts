import AsyncStorage from "@react-native-async-storage/async-storage";
import { GROUP_COLLECTION } from "@storage/storage-config";
import { getGroupAll } from "./get-groups-all";

export async function createGroup(group: string) {
  try{
    const storageGroups = await getGroupAll()

    const updatedGroups = [...storageGroups, group]

    await AsyncStorage.setItem(GROUP_COLLECTION, JSON.stringify(updatedGroups))
  } catch(error){
    throw error;
  }
}
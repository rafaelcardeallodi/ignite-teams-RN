import AsyncStorage from "@react-native-async-storage/async-storage";
import { GROUP_COLLECTION } from "@storage/storage-config";
import { getGroupAll } from "./get-groups-all";
import { AppError } from "@utils/app-error";

export async function createGroup(group: string) {
  try{
    const storageGroups = await getGroupAll()

    const groupAlreadyExists = storageGroups.includes(group)

    if(groupAlreadyExists){
      throw new AppError('Já existe um grupo cadastrado com esse nome.')
    }

    const updatedGroups = [...storageGroups, group]

    await AsyncStorage.setItem(GROUP_COLLECTION, JSON.stringify(updatedGroups))
  } catch(error){
    throw error;
  }
}
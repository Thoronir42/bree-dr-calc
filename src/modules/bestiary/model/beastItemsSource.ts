import {GenderType} from "@/modules/bestiary/typeful/gender.type";
import {Beast} from "@/modules/bestiary/model/Bestiary";

type BeastListItem = {
  id: Beast['id'],
  name: string,
  breedingStation?: string,
  gender?: GenderType,
}

export const createBeastListItem = (beast: Beast): BeastListItem => ({
  id: beast.id,
  name: beast.general.name,
  breedingStation: beast.general.breedingStation,
  gender: beast.general.gender
})

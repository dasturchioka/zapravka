import { create } from 'zustand'

export const searchStore = create((set) => ({
	chosenStation: null,
	setChosenStation: (station: object) => set({ chosenStation: station })
})) 

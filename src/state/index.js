import create from 'zustand/vanilla'
import { devtools } from 'zustand/middleware'
// import userState from './userState'
// import deviceState from './deviceState'
import appState from './appState'

const store = create(devtools(set => (
	{
		userState: null,
		deviceState: null, 
		appState: appState(set)
	}
)))

store.getState().appState.loadApp()

export const {
	getState,
	setState,
	subscribe,
	destroy
} = store

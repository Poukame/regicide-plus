import { TPlayClick, TcardValues, Tsuits } from '../Types';

const initialValues = {
	handleChange: (e: React.ChangeEvent<HTMLSelectElement>) => {},
	options: [
		{
			maxHandSize: 0,
			removeJesters: 'OFF' as string | number,
			enemyHealthBoost: 0,
			enemyAttackBoost: 0,
			yieldTurn: 'ON' as 'ON' | 'OFF',
			maxComboLimit: 10,
			maxAnimalCompanionLimit: 'K' as TcardValues | 'OFF',
		},
	],
	jackEnemies: [
		{
			id: '',
			imgPath: '',
			isDead: false,
			isSelected: false,
			name: '',
			rank: 'jack' as 'jack' | 'queen' | 'king',
			suits: 'jack' as Tsuits,
			attack: 0,
			health: 0,
		},
	],
	queenEnemies: [
		{
			id: '',
			imgPath: '',
			isDead: false,
			isSelected: false,
			name: '',
			rank: 'queen' as 'jack' | 'queen' | 'king',
			suits: '' as Tsuits,
			attack: 0,
			health: 0,
		},
	],
	kingEnemies: [
		{
			id: '',
			imgPath: '',
			isDead: false,
			isSelected: false,
			name: '',
			rank: 'king' as 'jack' | 'queen' | 'king',
			suits: '' as Tsuits,
			attack: 0,
			health: 0,
		},
	],
	maxComboCard: 10 as string | number,
	maxCompanionCard: 'K' as TcardValues | 'OFF',
	cardValue: ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'],
	playClick: (value?: TPlayClick) => {},
	settings: [
		{
			showReminders: true,
			music: false,
			soundFx: false,
		},
	],
	updateSettings: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {},
	installApp: () => {},
};

export default initialValues
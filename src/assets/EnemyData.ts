import JackSpade from './images/JS.svg';
import JackHeart from './images/JH.svg';
import JackDiamond from './images/JD.svg';
import JackClub from './images/JC.svg';
import QueenSpade from './images/QS.svg';
import QueenHeart from './images/QH.svg';
import QueenDiamond from './images/QD.svg';
import QueenClub from './images/QC.svg';
import KingSpade from './images/KS.svg';
import KingHeart from './images/KH.svg';
import KingDiamond from './images/KD.svg';
import KingClub from './images/KC.svg';
import { Tsuits } from '../Types';

const enemyData = [
	{
		id: 'jackHeart',
		rank: 'jack' as 'jack' | 'queen' | 'king',
		suits: 'heart' as Tsuits,
		name: 'Jack Of Heart',
		isDead: false,
		isSelected: false,
		imgPath: JackHeart,
	},
	{
		id: 'jackDiamond',
		rank: 'jack' as 'jack' | 'queen' | 'king',
		suits: 'diamond' as Tsuits,
		name: 'Jack Of Diamond',
		isDead: false,
		isSelected: false,
		imgPath: JackDiamond,
	},
	{
		id: 'jackClub',
		rank: 'jack' as 'jack' | 'queen' | 'king',
		suits: 'club' as Tsuits,
		name: 'Jack Of Club',
		isDead: false,
		isSelected: false,
		imgPath: JackClub,
	},
	{
		id: 'jackSpade',
		rank: 'jack' as 'jack' | 'queen' | 'king',
		suits: 'spade' as Tsuits,
		name: 'Jack Of Spade',
		isDead: false,
		isSelected: true,
		imgPath: JackSpade,
	},
	{
		id: 'queenHeart',
		rank: 'queen' as 'jack' | 'queen' | 'king',
		suits: 'heart' as Tsuits,
		name: 'Queen Of Heart',
		isDead: false,
		isSelected: false,
		imgPath: QueenHeart,
	},
	{
		id: 'queenDiamond',
		rank: 'queen' as 'jack' | 'queen' | 'king',
		suits: 'diamond' as Tsuits,
		name: 'Queen Of Diamond',
		isDead: false,
		isSelected: false,
		imgPath: QueenDiamond,
	},
	{
		id: 'queenClub',
		rank: 'queen' as 'jack' | 'queen' | 'king',
		suits: 'club' as Tsuits,
		name: 'Queen Of Club',
		isDead: false,
		isSelected: false,
		imgPath: QueenClub,
	},
	{
		id: 'queenSpade',
		rank: 'queen' as 'jack' | 'queen' | 'king',
		suits: 'spade' as Tsuits,
		name: 'Queen Of Spade',
		isDead: false,
		isSelected: false,
		imgPath: QueenSpade,
	},
	{
		id: 'kingHeart',
		rank: 'king' as 'jack' | 'queen' | 'king',
		suits: 'heart' as Tsuits,
		name: 'King Of Heart',
		isDead: false,
		isSelected: false,
		imgPath: KingHeart,
	},
	{
		id: 'kingDiamond',
		rank: 'king' as 'jack' | 'queen' | 'king',
		suits: 'diamond' as Tsuits,
		name: 'King Of Diamond',
		isDead: false,
		isSelected: false,
		imgPath: KingDiamond,
	},
	{
		id: 'kingClub',
		rank: 'king' as 'jack' | 'queen' | 'king',
		suits: 'club' as Tsuits,
		name: 'King Of Club',
		isDead: false,
		isSelected: false,
		imgPath: KingClub,
	},
	{
		id: 'kingSpade',
		rank: 'king' as 'jack' | 'queen' | 'king',
		suits: 'spade' as Tsuits,
		name: 'King Of Spade',
		isDead: false,
		isSelected: false,
		imgPath: KingSpade,
	},
];

export default enemyData;

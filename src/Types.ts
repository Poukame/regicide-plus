// Props
export type WithChildren<T = {}> = T & { children?: React.ReactNode };

export interface IPropsCreditsModal {
	width: string;
	bgColor: string;
	color: string;
}

export interface IPropsSelectCardValue {
	switchState: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
	selectedCards: ISelectedCard;
	allEnemies: IAllEnemies[];
}

export interface IPropsEnemiesToCome {
	allEnemies: IAllEnemies[];
	numberOfDeadFigure: number;
}

export interface IPropsSettingsScreen {
	width: string | string[];
	restartGame: (value: TRestartGame) => void;
	gameStatus?: TGameStatus;
}

export interface ISelectOptions {
	updateStatus: () => void;
}

export interface IPropsSelectCurrentEnemy extends IPropsEnemiesToCome {
	selectEnemy: (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => void;
}

export interface IPropsOptionsReminder {
	progressPercentage: number;
}

export interface ISelectComboCard {
	selectedCards: ISelectedCard;
	saveCompanionCards: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
	saveComboCards: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
	validateAttack: () => void;
	switchState: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export interface IInfoMsg {
	heartMsg: string;
	diamondMsg: string;
	displayHeartMsg: boolean;
	displayDiamondMsg: boolean;
	perfectKillMsg: string;
	displayPerfectKillMsg: boolean;
}

export interface IPropsFightScreen extends IPropsOptionsReminder, IPropsEnemiesToCome {
	currentEnemy: IAllEnemies[];
	switchState: TMouseClkonBtn;
	infoMessage: IInfoMsg;
	isJokerPlayed: boolean;
	instaKill: () => void;
	restartGame: (value: TRestartGame) => void;
	gameStatus: TGameStatus;
	loadProgress: () => void;
	isReturnPossible: boolean;
}

// Variables
export type TRestartGame = 'retry' | 'newOptions';

export type TPlayClick = 'return' | undefined;

export type TcardValues =
	| 'A'
	| '2'
	| '3'
	| '4'
	| '5'
	| '6'
	| '7'
	| '8'
	| '9'
	| '10'
	| 'J'
	| 'Q'
	| 'K';

export type Tsuits = 'heart' | 'jack' | 'diamond' | 'club';

export type TGameStatus =
	| 'option'
	| 'fight'
	| 'selectEnemy'
	| 'selectCard'
	| 'selectCombo'
	| 'endGame';

export type TMouseClkonBtn = React.MouseEventHandler<HTMLButtonElement>;

export interface ISelectedCard {
	baseCard: string;
	baseCardDmg: number;
	baseCardSuit: string;
	companionSuit: string[];
	comboSum: number;
	comboSuits: string[];
	attackSum: number;
}

export interface IOptions {
	maxHandSize: number;
	removeJesters: string | number;
	enemyHealthBoost: number;
	enemyAttackBoost: number;
	yieldTurn: 'OFF' | 'ON';
	maxComboLimit: number;
	maxAnimalCompanionLimit: TcardValues | 'OFF';
}

export interface IEnemyDB {
	id: string;
	imgPath: string;
	isDead: boolean;
	isSelected: boolean;
	name: string;
	rank: 'jack' | 'queen' | 'king';
	suits: Tsuits;
}

export interface IAllEnemies extends IEnemyDB {
	attack: number;
	health: number;
}

export interface ISavedGame {
	currentEnemy: Pick<IPropsFightScreen, 'currentEnemy'>;
	joker: Pick<IPropsFightScreen, 'isJokerPlayed'>;
	spade: number;
}

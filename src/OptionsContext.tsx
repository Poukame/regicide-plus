import React, { createContext, useState, useEffect } from 'react';
import enemyData from './assets/EnemyData';
import click_Return from './assets/sounds/click_return.mp3';
import click_validate from './assets/sounds/click_validate.mp3';
import VikingIntro from './assets/sounds/viking_intro_loop.mp3';
import CelticAmbiance from './assets/sounds/celtic_ambiance.mp3';
import initialValues from './assets/ContextInitalValues';
import { WithChildren, TPlayClick, IOptions } from './Types';

const clickReturn = new Audio(click_Return);
const clickValidate = new Audio(click_validate);
const vikingIntro = new Audio(VikingIntro);
const celticAmbiance = new Audio(CelticAmbiance);
vikingIntro.volume = 0.2;
vikingIntro.loop = true;
celticAmbiance.volume = 0.3;
celticAmbiance.loop = true;

const Context = createContext(initialValues);

function ContextProvider({ children }: WithChildren) {
	/// PWA install listener
	let deferredPrompt: any;

	window.addEventListener('beforeinstallprompt', (e) => {
		deferredPrompt = e;
	});

	async function installApp() {
		if (deferredPrompt !== null) {
			deferredPrompt.prompt();
			const { outcome } = await deferredPrompt.userChoice;
			if (outcome === 'accepted') {
				deferredPrompt = null;
			}
		}
	}
	/////

	const cardValue = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
	const JACK_HEALTH = 20;
	const JACK_ATTACK = 10;
	const QUEEN_HEALTH = 30;
	const QUEEN_ATTACK = 15;
	const KING_HEALTH = 40;
	const KING_ATTACK = 20;

	const [settings, setSettings] = useState([
		{
			showReminders: true,
			music: false,
			soundFx: false,
		},
	]);

	function updateSettings(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
		const { name, value } = e.currentTarget;

		setSettings((prev) => {
			return prev.map((el) => {
				return {
					...el,
					[name]: value === 'true' ? !true : !false,
				};
			});
		});
	}

	const [options, setOptions] = useState<IOptions[]>([
		{
			maxHandSize: 0,
			removeJesters: 'OFF',
			enemyHealthBoost: 0,
			enemyAttackBoost: 0,
			yieldTurn: 'ON',
			maxComboLimit: 10,
			maxAnimalCompanionLimit: 'K',
		},
	]);
	console.log('file: OptionsContext.tsx ~ line 146 ~ options', options);

	const { enemyHealthBoost, enemyAttackBoost, maxComboLimit, maxAnimalCompanionLimit } = options[0];

	const [maxComboCard, setMaxComboCard] = useState(maxComboLimit);
	const [maxCompanionCard, setMaxCompanionCard] = useState(maxAnimalCompanionLimit);

	const handleChange = function (e: React.ChangeEvent<HTMLSelectElement>) {
		const { name, value }: { name: string; value: string | number } = e.target;

		setOptions((prev) => {
			return prev.map((el) => {
				return {
					...el,
					[name]: isNaN(+value) ? value : +value,
				};
			});
		});
	};

	const [jackEnemies, setJackEnemies] = useState(
		enemyData
			.filter((el) => el.rank === 'jack')
			.map((enemyDB) => {
				return {
					...enemyDB,
					health: JACK_HEALTH,
					attack: JACK_ATTACK,
				};
			})
	);

	const [queenEnemies, setQueenEnemies] = useState(
		enemyData
			.filter((el) => el.rank === 'queen')
			.map((enemyDB) => {
				return {
					...enemyDB,
					health: QUEEN_HEALTH,
					attack: QUEEN_ATTACK,
				};
			})
	);

	const [kingEnemies, setKingEnemies] = useState(
		enemyData
			.filter((el) => el.rank === 'king')
			.map((enemyDB) => {
				return {
					...enemyDB,
					health: KING_HEALTH,
					attack: KING_ATTACK,
				};
			})
	);

	useEffect(() => {
		setJackEnemies((prev) => {
			return prev.map((prev) => {
				return {
					...prev,
					health: JACK_HEALTH + enemyHealthBoost,
					attack: JACK_ATTACK + enemyAttackBoost,
				};
			});
		});

		setQueenEnemies((prev) => {
			return prev.map((prev) => {
				return {
					...prev,
					health: QUEEN_HEALTH + enemyHealthBoost,
					attack: QUEEN_ATTACK + enemyAttackBoost,
				};
			});
		});

		setKingEnemies((prev) => {
			return prev.map((prev) => {
				return {
					...prev,
					health: KING_HEALTH + enemyHealthBoost,
					attack: KING_ATTACK + enemyAttackBoost,
				};
			});
		});

		setMaxComboCard(maxComboLimit.toString() === 'OFF' ? 0 : Math.floor(maxComboLimit / 2));
		setMaxCompanionCard(maxAnimalCompanionLimit === 'OFF' ? 'OFF' : maxAnimalCompanionLimit);
	}, [options]);

	function playClick(actionType: TPlayClick): void {
		clickReturn.volume = 0.5;
		clickValidate.volume = 0.5;
		if (settings[0].soundFx) {
			actionType === 'return' ? clickReturn.play() : clickValidate.play();
		}
	}

	useEffect(() => {
		if (settings[0].music) {
			celticAmbiance.currentTime = 3;
			celticAmbiance.play();
		} else {
			celticAmbiance.pause();
		}
	}, [settings[0].music]);

	return (
		<Context.Provider
			value={{
				handleChange,
				options,
				jackEnemies,
				queenEnemies,
				kingEnemies,
				maxComboCard,
				maxCompanionCard,
				cardValue,
				playClick,
				settings,
				updateSettings,
				installApp,
			}}
		>
			{children}
		</Context.Provider>
	);
}

export { ContextProvider, Context };

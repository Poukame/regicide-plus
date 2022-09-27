import { useContext, useState, useEffect } from 'react';
import { Flex } from '@chakra-ui/react';
import './App.css';
import { Context } from './OptionsContext';
import SelectOptions from './Components/SelectOptions';
import SelectCurrentEnemy from './Components/SelectCurrentEnemy';
import FightScreen from './Components/FightScreen';
import SelectCardValue from './Components/SelectCardValue';
import SelectComboCard from './Components/SelectCardCombo';
import EndGameScreen from './Components/EndGameScreen';
import damageConversion from './assets/DamageConversion';
import { TRestartGame, ISelectedCard, TMouseClkonBtn, IAllEnemies, IInfoMsg } from './Types';

function App() {
	const [gameStatus, setGameStatus] = useState('option');
	// option, fight, selectEnemy, selectCard, selectCombo, endGame

	const { jackEnemies, queenEnemies, kingEnemies, options } = useContext(Context);

	const [isJokerPlayed, setIsJokerPlayed] = useState(false);

	// use of type 'any' to get rid of 'never' type on 'savedGame'. I didn't find the way to filter it out.
	const [savedGame, setSavedGame] = useState<NonNullable<any[]>>([]);

	const resetSelectedCards = {
		baseCard: '',
		baseCardDmg: 0,
		baseCardSuit: '',
		companionSuit: [],
		comboSum: 0,
		comboSuits: [],
		attackSum: 0,
	};
	const [selectedCards, setSelectedCards] = useState<ISelectedCard>(resetSelectedCards);
	const [spadeDmgCache, setSpadeDmgCache] = useState(0);

	const { baseCard, baseCardSuit, companionSuit, comboSum, comboSuits, attackSum } = selectedCards;

	const [allEnemies, setEnemies] = useState<NonNullable<IAllEnemies[]>>([
		...jackEnemies,
		...queenEnemies,
		...kingEnemies,
	]);

	// use of type 'any' to get rid of 'undefined' type on 'currentEnemy'. I didn't find the way to filter it out.
	let currentEnemy: any = allEnemies.find((el) => el.isSelected);

	const numberOfDeadFigure = allEnemies.reduce((acc, cur) => (cur.isDead ? (acc += 1) : acc), 0);

	const resetInfoMessage = {
		heartMsg: '',
		diamondMsg: '',
		displayHeartMsg: false,
		displayDiamondMsg: false,
		perfectKillMsg: '',
		displayPerfectKillMsg: false,
	};

	const [infoMessage, setInfoMessage] = useState<IInfoMsg>(resetInfoMessage);
	const [_, setRefreshHealth] = useState(false);
	const [, setRefreshAttack] = useState(false);

	useEffect(() => setEnemies([...jackEnemies, ...queenEnemies, ...kingEnemies]), [jackEnemies]);

	const selectEnemy: React.MouseEventHandler<HTMLImageElement> = function (e) {
		const selected = e.currentTarget.id;

		setEnemies((prev) => {
			return prev.map((prev) => {
				return {
					...prev,
					isSelected: prev.id === selected ? true : false,
				};
			});
		});

		setGameStatus('fight');
	};

	const switchStateToSelectCard: TMouseClkonBtn = (e): void => {
		const value = e.currentTarget.value;

		if (value === 'joker') {
			setIsJokerPlayed(!isJokerPlayed);
		} else {
			setSelectedCards((prev) => {
				return {
					...prev,
					baseCardSuit: value,
				};
			});
			setGameStatus('selectCard');
		}
		setInfoMessage(resetInfoMessage);
	};

	const switchStateToCombo: TMouseClkonBtn = (e): void => {
		const value = e.currentTarget.value;

		if (value === 'return') {
			setGameStatus('fight');
			setSelectedCards(resetSelectedCards);
		} else {
			setSelectedCards((prev) => {
				return {
					...prev,
					baseCard: value,
					baseCardDmg: damageConversion[value],
				};
			});
			setGameStatus('selectCombo');
		}
	};

	const saveCompanionCards: TMouseClkonBtn = (e) => {
		const value:any = e.currentTarget.value.split(',');

		const isInArray = companionSuit.some((el) => el === value[1]);

		setSelectedCards((prev) => {
			return {
				...prev,
				companionSuit: isInArray
					? prev.companionSuit.filter((el) => el !== value[1])
					: [...prev.companionSuit, value[1]],
			};
		});
	};

	const saveComboCards: TMouseClkonBtn = (e): void => {
		const value = e.currentTarget.value.split(',');
		const isInArray = comboSuits.some((el) => el === value[1]);

		setSelectedCards((prev) => {
			return {
				...prev,
				comboSum: prev.comboSum + +value[0],
				comboSuits: isInArray
					? prev.comboSuits.filter((el) => el != value[1])
					: [...prev.comboSuits, value[1]],
			};
		});
	};

	let saveCount = savedGame.length;
	const [loadCount, setLoadCount] = useState(0);

	const saveProgress = function (
		currentEnemy: IAllEnemies,
		isJokerPlayed: boolean,
		spadeDmgCache: number
	) {
		setLoadCount(0);
		const enemiesArr = Object.assign({}, currentEnemy);
		setSavedGame((prev) => {
			return [...prev, { currentEnemy: enemiesArr, joker: isJokerPlayed, spade: spadeDmgCache }];
		});
	};

	const loadProgress = function () {
		setInfoMessage(resetInfoMessage);
		let saveIndex;

		if (saveCount - 1 - loadCount <= 0) {
			saveIndex = 0;
			setSavedGame([]);
		} else {
			saveIndex = saveCount - 1 - loadCount;
		}

		const previousSave = savedGame[saveIndex];

		currentEnemy = Object.assign({}, previousSave.currentEnemy);

		setEnemies((prev) => {
			const index = prev.findIndex((el) => el.id === currentEnemy.id);
			prev[index] = currentEnemy;

			// ensure there are no 2 enemies with isSelected === true
			const update = prev.map((el) => {
				if (el.id !== currentEnemy.id) {
					return { ...el, isSelected: el.isSelected && false };
				} else {
					return { ...el };
				}
			});
			return update;
		});

		setIsJokerPlayed(previousSave.joker);
		setSpadeDmgCache(previousSave.spade);
		setLoadCount((prev) => prev + 1);
	};

	const validateAttack = (): void => {
		saveProgress(currentEnemy, isJokerPlayed, spadeDmgCache);
		setSelectedCards({ ...selectedCards, attackSum: damageConversion[baseCard] + comboSum });
		setGameStatus('fight');
	};

	function spadeReduceCache() {
		// saves spades damage to retroactively reduce attack if joker is played
		if (currentEnemy.suits === 'spade') {
			const isSpadePlayed = [...comboSuits, baseCardSuit].includes('spade');
			isSpadePlayed && setSpadeDmgCache((prev) => prev + attackSum);
		}
	}

	useEffect(() => {
		if (gameStatus === 'fight') {
			isJokerPlayed
				? (currentEnemy.attack -= spadeDmgCache)
				: (currentEnemy.attack += spadeDmgCache);
			setSelectedCards(resetSelectedCards);
		}
	}, [isJokerPlayed]);

	useEffect(() => {
		if (gameStatus === 'fight') {
			generateAttack(currentEnemy);
		}
	}, [attackSum]);

	function generateAttack(currentEnemy: IAllEnemies) {
		let allSuitsCards: string[];

		if (companionSuit.length === 0 && comboSuits.length === 0) {
			allSuitsCards = [baseCardSuit].filter((el) =>
				isJokerPlayed ? el : el !== currentEnemy.suits
			);
		} else {
			allSuitsCards = [...comboSuits, baseCardSuit].filter((el) =>
				isJokerPlayed ? el : el !== currentEnemy.suits
			);
		}

		calculateDamage(allSuitsCards);
		spadeReduceCache();
		setSelectedCards(resetSelectedCards);
	}

	function calculateDamage(allSuitsCards: string[]) {
		if (allSuitsCards.includes('club')) {
			animateHealthCounter(currentEnemy.health, currentEnemy.health - attackSum * 2);
		} else {
			animateHealthCounter(currentEnemy.health, currentEnemy.health - attackSum);
		}

		if (allSuitsCards.includes('spade')) {
			animateAttackCounter(currentEnemy.attack, currentEnemy.attack - attackSum);
		}
		if (allSuitsCards.includes('heart')) {
			setInfoMessage((prev) => ({
				...prev,
				heartMsg: `❤️‍🩹 Heal ${attackSum} Cards`,
				displayHeartMsg: true,
			}));
		}
		if (allSuitsCards.includes('diamond')) {
			setInfoMessage((prev) => ({
				...prev,
				diamondMsg: `🤏 Draw ${attackSum} Cards`,
				displayDiamondMsg: true,
			}));
		}
	}

	function animateHealthCounter(current: number, target: number) {
		const counter = setInterval(() => {
			if (target < current) {
				current = current - 1;
				currentEnemy.health = current;
				setRefreshHealth((prev) => !prev);
			} else {
				clearInterval(counter);
				isEnemyDead(currentEnemy);
			}
		}, 1000 / (current - target));
	}

	function animateAttackCounter(current: number, target: number) {
		const counter2 = setInterval(() => {
			if (target < current) {
				current = current - 1;
				currentEnemy.attack = current;
				setRefreshAttack((prev) => !prev);
			} else {
				clearInterval(counter2);
			}
		}, 1000 / (current - target));
	}

	function isEnemyDead(currentEnemy: IAllEnemies, instaKill: boolean = false) {
		if (currentEnemy.health === 0) {
			setInfoMessage((prev) => ({
				...prev,
				perfectKillMsg: `🎯 PERFECT KILL! Put the enemy on top of the Tavern`,
				displayPerfectKillMsg: true,
			}));
			currentEnemy.isDead = true;
			setIsJokerPlayed(false);
			setSpadeDmgCache(0);
			isGameEnded();
		} else if (currentEnemy.health < 0 || instaKill) {
			instaKill && saveProgress(currentEnemy, isJokerPlayed, spadeDmgCache);

			currentEnemy.isDead = true;
			setIsJokerPlayed(false);
			setSpadeDmgCache(0);
			isGameEnded();
		}
	}

	function isGameEnded() {
		progressPercentage();
		const numberOfDeadFigure = allEnemies.reduce((acc, cur) => (cur.isDead ? (acc += 1) : acc), 0);

		numberOfDeadFigure === 12 ? setGameStatus('endGame') : setGameStatus('selectEnemy');
	}

	function progressPercentage() {
		const enemyBoost = options[0].enemyHealthBoost;

		const healthOfDeadEnemies = allEnemies.reduce((acc, cur) => {
			if (cur.rank === 'jack' && cur.isDead) {
				acc += 20 + enemyBoost;
			} else if (cur.rank === 'queen' && cur.isDead) {
				acc += 30 + enemyBoost;
			} else if (cur.rank === 'king' && cur.isDead) {
				acc += 40 + enemyBoost;
			}
			return acc;
		}, 0);

		let currentEnemyDmg: number = 0;
		switch (currentEnemy.rank) {
			case 'jack':
				currentEnemyDmg = 20 + enemyBoost - currentEnemy.health;
				break;

			case 'queen':
				currentEnemyDmg = 30 + enemyBoost - currentEnemy.health;
				break;

			case 'king':
				currentEnemyDmg = 40 + enemyBoost - currentEnemy.health;
				break;

			default:
				break;
		}

		const totalLife = 4 * (20 + enemyBoost) + 4 * (30 + enemyBoost) + 4 * (40 + enemyBoost);
		const progress = Math.round((100 / totalLife) * (healthOfDeadEnemies + currentEnemyDmg));

		return progress;
	}

	const restartGame = function (playerChoice: TRestartGame) {
		setSavedGame([]);
		setInfoMessage(resetInfoMessage);
		setSelectedCards(resetSelectedCards);
		setEnemies([...jackEnemies, ...queenEnemies, ...kingEnemies]);
		playerChoice === 'retry' ? setGameStatus('selectEnemy') : setGameStatus('option');
	};

	return (
		<Flex
			maxW='800px'
			mx='auto'
			flexDirection='column'
			boxShadow='0px 0px 5px 3px #cadad8'
			py='8'
			borderRadius='4'
		>
			{gameStatus === 'option' && (
				<SelectOptions updateStatus={() => setGameStatus('selectEnemy')} />
			)}

			{gameStatus === 'selectEnemy' && (
				<SelectCurrentEnemy
					selectEnemy={(e) => selectEnemy(e)}
					allEnemies={allEnemies}
					numberOfDeadFigure={numberOfDeadFigure}
				/>
			)}

			{gameStatus === 'fight' && (
				<FightScreen
					currentEnemy={allEnemies.filter((el) => el.isSelected === true)}
					switchState={(e) => switchStateToSelectCard(e)}
					infoMessage={infoMessage}
					isJokerPlayed={isJokerPlayed}
					instaKill={() => isEnemyDead(currentEnemy, true)}
					gameStatus={gameStatus}
					allEnemies={allEnemies}
					numberOfDeadFigure={numberOfDeadFigure}
					progressPercentage={progressPercentage()}
					restartGame={(playerChoice: TRestartGame) => restartGame(playerChoice)}
					loadProgress={() => loadProgress()}
					isReturnPossible={savedGame.length > 0 ? true : false}
				/>
			)}

			{gameStatus === 'selectCard' && (
				<SelectCardValue
					switchState={(e) => switchStateToCombo(e)}
					selectedCards={selectedCards}
					allEnemies={allEnemies}
				/>
			)}

			{gameStatus === 'selectCombo' && (
				<SelectComboCard
					selectedCards={selectedCards}
					saveCompanionCards={(e) => saveCompanionCards(e)}
					saveComboCards={(e) => saveComboCards(e)}
					validateAttack={() => validateAttack()}
					switchState={(e) => switchStateToCombo(e)}
				/>
			)}

			{gameStatus === 'endGame' && (
				<EndGameScreen restartGame={(playerChoice: TRestartGame) => restartGame(playerChoice)} />
			)}
		</Flex>
	);
}

export default App;

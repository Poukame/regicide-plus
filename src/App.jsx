import { useContext, useState, useEffect } from 'react';
import { Box, Flex } from '@chakra-ui/react';
import './App.css';
import { Context } from './OptionsContext';
import SelectOptions from './Components/SelectOptions';
import SelectCurrentEnemy from './Components/SelectCurrentEnemy';
import FightScreen from './Components/FightScreen';
import SelectCardValue from './Components/SelectCardValue';
import SelectComboCard from './Components/SelectCardCombo';
import EndGameScreen from './Components/EndGameScreen';
import damageConversion from './assets/DamageConversion.cjs';

function App() {
	const [gameStatus, setGameStatus] = useState('option');
	// option, fight, selectEnemy, selectCard, selectCombo, endGame
	const { jackEnemies, queenEnemies, kingEnemies } = useContext(Context);
	const [isJokerPlayed, setIsJokerPlayed] = useState(false);
	const resetSelectedCards = {
		baseCard: '',
		baseCardDmg: 0,
		baseCardSuit: '',
		companionSuit: [],
		comboSum: 0,
		comboSuits: [],
		attackSum: 0,
	};
	const [selectedCards, setSelectedCards] = useState(resetSelectedCards);

	const { baseCard, baseCardDmg, baseCardSuit, companionSuit, comboSum, comboSuits, attackSum } =
		selectedCards;

	const [allEnemies, setEnemies] = useState([...jackEnemies, ...queenEnemies, ...kingEnemies]);
	const currentEnemy = allEnemies.find((el) => el.isSelected);

	const resetInfoMessage = {
		heartMsg: '',
		diamondMsg: '',
		displayHeartMsg: false,
		displayDiamondMsg: false,
		perfectKillMsg: false,
		displayPerfectKillMsg: false,
	};

	const [infoMessage, setInfoMessage] = useState(resetInfoMessage);

	useEffect(() => setEnemies([...jackEnemies, ...queenEnemies, ...kingEnemies]), [jackEnemies]);

	function selectEnemy(e) {
		const selected = e.target.id;

		setEnemies((prev) => {
			return prev.map((prev) => {
				return {
					...prev,
					isSelected: prev.id === selected ? true : false,
				};
			});
		});

		setGameStatus('fight');
	}

	function switchStateToSelectCard(e) {
		const value = e.target.value;

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
	}

	function switchStateToCombo(e) {
		const value = e.target.value;
		if (value === 'return') {
			setGameStatus('fight');
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
	}

	function saveCompanionCards(e) {
		const value = e.target.value.split(',');
		const isInArray = companionSuit.some((el) => el === value[1]);

		setSelectedCards((prev) => {
			return {
				...prev,
				companionSuit: isInArray
					? prev.companionSuit.filter((el) => el != value[1])
					: [...prev.companionSuit, value[1]],
			};
		});
	}

	function saveComboCards(e) {
		const value = e.target.value.split(',');
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

		// calculation function
	}

	function validateAttack() {
		// save state to local storage here

		setSelectedCards({ ...selectedCards, attackSum: damageConversion[baseCard] + comboSum });
		setGameStatus('fight');
	}

	useEffect(() => {
		if (gameStatus === 'fight') {
			generateAttack(currentEnemy);
		}
	}, [attackSum]);
	
	console.log('file: App.jsx ~ line 137 ~ currentEnemy', currentEnemy);

	function generateAttack(currentEnemy) {
		let allSuitsCards;

		if (companionSuit.length === 0 && comboSuits.length === 0) {
			allSuitsCards = [baseCardSuit].filter((el) =>
				isJokerPlayed ? el : el !== currentEnemy.suits
			);
		} else {
			allSuitsCards = [...comboSuits, baseCardSuit].filter((el) =>
				isJokerPlayed ? el : el !== currentEnemy.suits
			);
		}

		if (allSuitsCards.some((el) => el === 'club')) {
			currentEnemy.health -= attackSum * 2;
		} else {
			currentEnemy.health -= attackSum;
		}

		if (allSuitsCards.some((el) => el === 'spade')) {
			currentEnemy.attack -= attackSum;
		}
		if (allSuitsCards.some((el) => el === 'heart')) {
			setInfoMessage((prev) => ({
				...prev,
				heartMsg: `❤️‍🩹 Heal ${attackSum} Cards`,
				displayHeartMsg: true,
			}));
		}
		if (allSuitsCards.some((el) => el === 'diamond')) {
			setInfoMessage((prev) => ({
				...prev,
				diamondMsg: `Draw ${attackSum} Cards`,
				displayDiamondMsg: true,
			}));
		}

		setSelectedCards(resetSelectedCards);
		isEnemyDead(currentEnemy);
	}

	function isEnemyDead(currentEnemy, instaKill) {
		
		if (currentEnemy.health === 0) {
			setInfoMessage((prev) => ({
				...prev,
				perfectKillMsg: `🎯 PERFECT KILL! Put the enemy on top of the Tavern`,
				displayPerfectKillMsg: true,
			}));
			currentEnemy.isDead = true;
			setIsJokerPlayed(false);
			isGameEnded()
			
		} else if (currentEnemy.health < 0 || instaKill) {
			currentEnemy.isDead = true;
			setIsJokerPlayed(false);
			isGameEnded()
		}
	}

	function isGameEnded() {
		const numberOfDeadFigure = allEnemies.reduce((acc, cur) => (
			cur.isDead ? acc += 1 : acc
		), 0)

		numberOfDeadFigure === 12
		? setGameStatus('endGame')
		: setGameStatus('selectEnemy')
	}

	return (
		<Flex maxW='800px' mx='auto' flexDirection='column'>
			{gameStatus === 'option' && (
				<SelectOptions updateStatus={() => setGameStatus('selectEnemy')} />
			)}

			{gameStatus === 'selectEnemy' && <SelectCurrentEnemy selectEnemy={(e) => selectEnemy(e)} allEnemies={allEnemies} />}

			{gameStatus === 'fight' && (
				<FightScreen
					currentEnemy={allEnemies.filter((el) => el.isSelected === true)}
					switchState={(e) => switchStateToSelectCard(e)}
					infoMessage={infoMessage}
					isJokerPlayed={isJokerPlayed}
					instaKill={() => isEnemyDead(currentEnemy, true)}
					gameStatus={gameStatus}
				/>
			)}

			{gameStatus === 'selectCard' && (
				<SelectCardValue switchState={(e) => switchStateToCombo(e)} selectedCards={selectedCards} />
			)}

			{gameStatus === 'selectCombo' && (
				<SelectComboCard
					selectedCards={selectedCards}
					saveCompanionCards={(e) => saveCompanionCards(e)}
					saveComboCards={(e) => saveComboCards(e)}
					validateAttack={() => validateAttack()}
				/>
			)}

			{gameStatus === 'endGame' && <EndGameScreen />}
		</Flex>
	);
}

export default App;

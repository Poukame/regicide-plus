import { useContext, useState, useEffect } from 'react';
import { Box } from '@chakra-ui/react';
import './App.css';
import { Context } from './OptionsContext';
import SelectOptions from './Components/SelectOptions';
import SelectCurrentEnemy from './Components/SelectCurrentEnemy';
import FightScreen from './Components/FightScreen';
import SelectCardValue from './Components/SelectCardValue';
import SelectComboCard from './Components/SelectCardCombo';
import damageConversion from './assets/DamageConversion.cjs';

function App() {
	const [gameStatus, setGameStatus] = useState('option'); // option, fight, selectEnemy, selectCard, selectCombo, endGame
	const { jackEnemies, queenEnemies, kingEnemies } = useContext(Context);
	const resetSelectedCards = {
		baseCard: '',
		baseCardDmg: 0,
		baseCardSuit: '',
		companionSuit: [],
		comboSum: 0,
		comboSuits: [],
		attackSum: 0,
		isJokerPlayed: false,
	};
	const [selectedCards, setSelectedCards] = useState({
		baseCard: '',
		baseCardDmg: 0,
		baseCardSuit: '',
		companionSuit: [],
		comboSum: 0,
		comboSuits: [],
		attackSum: 0,
		isJokerPlayed: false,
	});

	const {
		baseCard,
		baseCardDmg,
		baseCardSuit,
		companionSuit,
		comboSum,
		comboSuits,
		isJokerPlayed,
		attackSum,
	} = selectedCards;
	console.log('file: App.jsx ~ line 19 ~ selectedCards', selectedCards);

	const [allEnemies, setEnemies] = useState([...jackEnemies, ...queenEnemies, ...kingEnemies]);

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

		setSelectedCards((prev) => {
			return {
				...prev,
				baseCardSuit: value,
			};
		});
		setGameStatus('selectCard');
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
		// do calculation with suits power
		setGameStatus('fight');
	}

	useEffect(() => {
		if (gameStatus === 'fight') {
			isJokerPlayed ? isJoker() : noJoker();
		}
	}, [attackSum]);

	function isJoker() {
		console.log('joker', selectedCards);
	}

	const currentEnemy = allEnemies.find((el) => el.isSelected);
	console.log('file: App.jsx ~ line 134 ~ currentEnemy', currentEnemy);

	let toastHeart

	function noJoker() {
		// fn ennemy isHeart
		// if (currentEnemy.suits === 'heart') {
		// 	switch (baseCardSuit) {
		// 		case 'heart':
		// 			if (companionSuit != '') {
		// 				console.log('HEART VS DIAMOND&COMPANION');
		// 			} else {
		// 				currentEnemy.health -= attackSum;
		// 				setSelectedCards(resetSelectedCards)
		// 			}
		// 			break;
		// 		case 'diamond':
		// 			if (companionSuit != '') {
		// 				console.log('HEART VS DIAMOND&COMPANION');
		// 				currentEnemy.health -= attackSum;
		// 			} else {
		// 				currentEnemy.health -= attackSum;
		// 				setSelectedCards(resetSelectedCards)
		// 				const toastDiamond = `Draw ${attackSum} Cards`;
		// 			}
	
		// 			break;
		// 		case 'club':
		// 			if (companionSuit != '') {
		// 				console.log('HEART VS CLUB&COMPANION');
		// 			} else {
		// 				currentEnemy.health -= attackSum * 2;
		// 				setSelectedCards(resetSelectedCards)
		// 			}
					
		// 			break;
		// 		case 'spade':
		// 			if (companionSuit != '') {
		// 				console.log('HEART VS SPADE&COMPANION');
		// 			} else {
		// 				currentEnemy.health -= attackSum;
		// 				currentEnemy.attack -= attackSum
		// 				setSelectedCards(resetSelectedCards)
		// 			}
	
		// 			break;
	
		// 		default:
		// 			break;
		// 	}
		// }
		

		
			switch (baseCardSuit) {
				case 'heart':
					if (companionSuit === '' && comboSuits.length === 0) {
						attackWithHeartBasic(currentEnemy)
					} else {
						attackWithHeartCombo(currentEnemy)
					}
					break;

				case 'diamond':
						currentEnemy.health -= attackSum;
						setSelectedCards(resetSelectedCards)
						const toastDiamond = `Draw ${attackSum} Cards`;
					break;

				case 'club':
						currentEnemy.health -= attackSum * 2;
						setSelectedCards(resetSelectedCards)
					break;

				case 'spade':
						currentEnemy.health -= attackSum;
						currentEnemy.attack -= attackSum
						setSelectedCards(resetSelectedCards)
					break;
			}
		}

	

	

	function attackWithHeartBasic(currentEnemy) {
		currentEnemy.health -= attackSum;
		setSelectedCards(resetSelectedCards)
		currentEnemy.suits !== 'heart' ? toastHeart = `Heal ${attackSum} Cards` : ''
	}

	function attackWithHeartCombo(currentEnemy) {
		
		}
	

	return (
		<Box maxW='97%' mx='auto' p='4'>
			{gameStatus === 'option' && (
				<SelectOptions updateStatus={() => setGameStatus('selectEnemy')} />
			)}

			{gameStatus === 'selectEnemy' && <SelectCurrentEnemy selectEnemy={(e) => selectEnemy(e)} />}

			{gameStatus === 'fight' && (
				<FightScreen
					currentEnemy={allEnemies.filter((el) => el.isSelected === true)}
					switchState={(e) => switchStateToSelectCard(e)}
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
		</Box>
	);
}

export default App

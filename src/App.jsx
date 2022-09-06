import { useContext, useState, useEffect } from 'react';
import { Box } from '@chakra-ui/react';
import './App.css';
import { Context } from './OptionsContext';
import SelectOptions from './Components/SelectOptions';
import SelectCurrentEnemy from './Components/SelectCurrentEnemy';
import FightScreen from './Components/FightScreen';
import SelectCardValue from './Components/SelectCardValue';
import SelectComboCard from './Components/SelectCardCombo';

function App() {
	const [gameStatus, setGameStatus] = useState('option'); // option, fight, selectEnemy, selectCard, selectCombo, endGame
	const { jackEnemies, queenEnemies, kingEnemies } = useContext(Context);
	const [selectedCards, setSelectedCards] = useState({
		baseCard: null,
		baseCardSuit: null,
		companionSuit: null,
		comboSum: 0,
		comboSuits: []
	});
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
				};
			});
			setGameStatus('selectCombo');
		}
	}

	function switchStateFromComboToFightCompanion(e) {
		
		const value = e.target.value;
		setSelectedCards((prev) => {
			return {
				...prev,
				companionSuit: value,
			};
		});
		setGameStatus('fight');
		// calculation function
	}

	function switchStateFromComboToFightCombo(e) {
		
		const value = e.target.value.split(',');
		const isInArray = selectedCards.comboSuits.some(el => el === value[1])
		
		setSelectedCards((prev) => {
			return {
				...prev,
				comboSum: prev.comboSum + +value[0],
				comboSuits: isInArray ? prev.comboSuits.filter(el => el != value[1]) : [...prev.comboSuits, value[1]]
			};
		});

		// calculation function
	}

	function validateAttack() {
		setGameStatus('fight');
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
				<SelectCardValue switchState={(e) => switchStateToCombo(e)} selectedCards={selectedCards}/>
			)}

			{gameStatus === 'selectCombo' && (
				<SelectComboCard
					selectedCards={selectedCards}
					switchStateCompanion={(e) => switchStateFromComboToFightCompanion(e)}
					switchStateCombo={(e) => switchStateFromComboToFightCombo(e)}
					validateAttack={() => validateAttack()}
				/>
			)}
		</Box>
	);
}

export default App;

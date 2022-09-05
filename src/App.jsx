import { useContext, useState, useEffect } from 'react';
import { Box } from '@chakra-ui/react';
import './App.css';
import { Context } from './OptionsContext';
import SelectOptions from './Components/SelectOptions';
import SelectCurrentEnemy from './Components/SelectCurrentEnemy';
import FightScreen from './Components/FightScreen';
import SelectCardValue from './Components/SelectCardValue';

function App() {
	const [gameStatus, setGameStatus] = useState('selectCard'); // option, fight, selectEnemy, selectCard, selectCombo, endGame
	const { jackEnemies, queenEnemies, kingEnemies } = useContext(Context);

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

	function switchStateToSelectCard() {
		setGameStatus('selectCard');
	}

	function switchStateToCombo(e) {
		const value = e.target.value;
		value === 'return' ? setGameStatus('fight') : setGameStatus('selectCombo');
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
					switchState={switchStateToSelectCard}
				/>
			)}

			{gameStatus === 'selectCard' && (
				<SelectCardValue switchState={(e) => switchStateToCombo(e)} />
			)}
		</Box>
	);
}

export default App;

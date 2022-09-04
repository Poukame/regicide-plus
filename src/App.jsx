import { useContext, useState, useEffect } from 'react';
import { Box, useBoolean } from '@chakra-ui/react';
import './App.css';
import { Context } from './OptionsContext';
import SelectOptions from './Components/SelectOptions';
import SelectCurrentEnemy from './Components/SelectCurrentEnemy'
import FightScreen from './Components/FightScreen';

function App() {
  const [gameStatus, setGameStatus] = useState('fight') // option, selectEnemy, fight, endGame
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

    setGameStatus('fight')
	}

	return (
		<Box maxW='97%' mx='auto' p='4'>
			{gameStatus === 'option' && <SelectOptions updateStatus={() => setGameStatus('selectEnemy')}/>}
      {gameStatus === 'selectEnemy' && <SelectCurrentEnemy selectEnemy={(e) => selectEnemy(e)}/>}
      {gameStatus === 'fight' && <FightScreen currentEnemy={allEnemies.filter(el => el.isSelected === true)}/>}
		</Box>
	);
}

export default App;

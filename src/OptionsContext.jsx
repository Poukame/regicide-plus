import React, { createContext, useState, useEffect } from 'react';
import enemyData from './assets/EnemyData.cjs';

const Context = createContext();

function ContextProvider({ children }) {
	const cardValue = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
	const JACK_HEALTH = 20
    const JACK_ATTACK = 10
    const QUEEN_HEALTH = 30
    const QUEEN_ATTACK = 15
    const KING_HEALTH = 40
    const KING_ATTACK = 20

	const [options, setOptions] = useState([
		{
			maxHandSize: 0,
			removeJesters: 'OFF',
			enemyHealthBoost: 'OFF',
			enemyAttackBoost: 'OFF',
			yieldTurn: 'ON',
			maxComboLimit: 10,
			maxAnimalCompanionLimit: 'K',
		},
	]);
	const {maxHandSize, removeJesters, enemyHealthBoost, enemyAttackBoost, yieldTurn, maxComboLimit, maxAnimalCompanionLimit} = options[0]
	
	console.log('file: OptionsContext.jsx ~ line 26 ~ options', options);
	const [maxComboCard, setMaxComboCard] = useState(maxComboLimit)
	const [maxCompanionCard, setMaxCompanionCard] = useState(maxAnimalCompanionLimit)

	function handleChange(e) {
		const { name, value } = e.target;

		setOptions((prev) => {
			return prev.map((el) => {
				return {
					...el,
					[name]: isNaN(value) ? value : +value,
				};
			});
		});
	}

	const [jackEnemies, setJackEnemies] = useState(enemyData.filter(el => el.rank === 'jack').map(enemyDB => {
		return (
			{
				...enemyDB,
				health: JACK_HEALTH,
	 			attack: JACK_ATTACK,
			}
		)
	}));

	const [queenEnemies, setQueenEnemies] = useState(enemyData.filter(el => el.rank === 'queen').map(enemyDB => {
		return (
			{
				...enemyDB,
				health: QUEEN_HEALTH,
	 			attack: QUEEN_ATTACK,
			}
		)
	}));

	const [kingEnemies, setKingEnemies] = useState(enemyData.filter(el => el.rank === 'king').map(enemyDB => {
		return (
			{
				...enemyDB,
				health: KING_HEALTH,
	 			attack: KING_ATTACK,
			}
		)
	}));

	useEffect(() => {
		const isHealthDefault = enemyHealthBoost === 'OFF' ? true : false;
		const isAttackDefault = enemyAttackBoost === 'OFF' ? true : false;

		setJackEnemies((prev) => {
			return prev.map((prev) => {
				return {
					...prev,
					health: isHealthDefault ? JACK_HEALTH : JACK_HEALTH + enemyHealthBoost,
					attack: isAttackDefault ? JACK_ATTACK : JACK_ATTACK + enemyAttackBoost,
				};
			});
		});

		setQueenEnemies((prev) => {
			return prev.map((prev) => {
				return {
					...prev,
					health: isHealthDefault ? QUEEN_HEALTH : QUEEN_HEALTH + enemyHealthBoost,
					attack: isAttackDefault ? QUEEN_ATTACK : QUEEN_ATTACK + enemyAttackBoost,
				};
			});
		});

		setKingEnemies((prev) => {
			return prev.map((prev) => {
				return {
					...prev,
					health: isHealthDefault ? KING_HEALTH : KING_HEALTH + enemyHealthBoost,
					attack: isAttackDefault ? KING_ATTACK : KING_ATTACK + enemyAttackBoost,
				};
			});
		});

		setMaxComboCard(maxComboLimit === 'OFF' ? 0 : Math.floor(maxComboLimit / 2))
		setMaxCompanionCard(maxAnimalCompanionLimit === 'OFF' ? 'OFF' : maxAnimalCompanionLimit.toString())

	}, [options]);



	return <Context.Provider value={{ handleChange, options, jackEnemies, queenEnemies, kingEnemies, maxComboCard, maxCompanionCard, cardValue }}>{children}</Context.Provider>;
}

export { ContextProvider, Context };

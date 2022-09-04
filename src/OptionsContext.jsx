import React, { createContext, useState, useEffect } from 'react';
import enemyData from './assets/EnemyData.cjs';

const Context = createContext();

function ContextProvider({ children }) {
    const JACK_HEALTH = 20
    const JACK_ATTACK = 10
    const QUEEN_HEALTH = 30
    const QUEEN_ATTACK = 15
    const KING_HEALTH = 40
    const KING_ATTACK = 20

	const [options, setOptions] = useState([
		{
			maxHandSize: 7,
			removeJesters: 'OFF',
			enemyHealthBoost: 'OFF',
			enemyAttackBoost: 'OFF',
			yield: 'ON',
			maxComboLimit: 10,
			maxAnimalCompanionLimit: 'ON',
		},
	]);

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

	const [jackEnemies, setJackEnemies] = useState(enemyData.filter(el => el.rank === 'Jack').map(enemyDB => {
		return (
			{
				...enemyDB,
				maxJackHealth: JACK_HEALTH,
	 			jackAttack: JACK_ATTACK,
			}
		)
	}));

	const [queenEnemies, setQueenEnemies] = useState(enemyData.filter(el => el.rank === 'Queen').map(enemyDB => {
		return (
			{
				...enemyDB,
				maxQueenHealth: QUEEN_HEALTH,
	 			queenAttack: QUEEN_ATTACK,
			}
		)
	}));

	const [kingEnemies, setKingEnemies] = useState(enemyData.filter(el => el.rank === 'King').map(enemyDB => {
		return (
			{
				...enemyDB,
				maxKingHealth: KING_HEALTH,
	 			kingAttack: KING_ATTACK,
			}
		)
	}));

	useEffect(() => {
		const isHealthDefault = options[0].enemyHealthBoost === 'OFF' ? true : false;
		const isAttackDefault = options[0].enemyAttackBoost === 'OFF' ? true : false;

		setJackEnemies((prev) => {
			return prev.map((prev) => {
				return {
					...prev,
					maxJackHealth: isHealthDefault ? JACK_HEALTH : JACK_HEALTH + options[0].enemyHealthBoost,
					jackAttack: isAttackDefault ? JACK_ATTACK : JACK_ATTACK + options[0].enemyAttackBoost,
				};
			});
		});

		setQueenEnemies((prev) => {
			return prev.map((prev) => {
				return {
					...prev,
					maxQueenHealth: isHealthDefault ? QUEEN_HEALTH : QUEEN_HEALTH + options[0].enemyHealthBoost,
					queenAttack: isAttackDefault ? QUEEN_ATTACK : QUEEN_ATTACK + options[0].enemyAttackBoost,
				};
			});
		});

		setKingEnemies((prev) => {
			return prev.map((prev) => {
				return {
					...prev,
					maxKingHealth: isHealthDefault ? KING_HEALTH : KING_HEALTH + options[0].enemyHealthBoost,
					kingAttack: isAttackDefault ? KING_ATTACK : KING_ATTACK + options[0].enemyAttackBoost,
				};
			});
		});

	}, [options]);



	return <Context.Provider value={{ handleChange, options, jackEnemies, queenEnemies, kingEnemies }}>{children}</Context.Provider>;
}

export { ContextProvider, Context };

import React, { createContext, useState, useEffect } from 'react';

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

	const [jack, setJack] = useState([
		{
			maxJackHealth: JACK_HEALTH,
			jackAttack: JACK_ATTACK,
		},
	]);

	const [queen, setQueen] = useState([
		{
			maxQueenHealth: QUEEN_HEALTH,
			queenAttack: QUEEN_ATTACK,
		},
	]);

	const [king, setKing] = useState([
		{
			maxKingHealth: KING_HEALTH,
			kingAttack: KING_ATTACK,
		},
	]);

	useEffect(() => {
		const isHealthDefault = options[0].enemyHealthBoost === 'OFF' ? true : false;
		const isAttackDefault = options[0].enemyAttackBoost === 'OFF' ? true : false;

		setJack((prev) => {
			return prev.map((prev) => {
				return {
					...prev,
					maxJackHealth: isHealthDefault ? JACK_HEALTH : JACK_HEALTH + options[0].enemyHealthBoost,
					jackAttack: isAttackDefault ? JACK_ATTACK : JACK_ATTACK + options[0].enemyAttackBoost,
				};
			});
		});

		setQueen((prev) => {
			return prev.map((prev) => {
				return {
					...prev,
					maxQueenHealth: isHealthDefault ? QUEEN_HEALTH : QUEEN_HEALTH + options[0].enemyHealthBoost,
					queenAttack: isAttackDefault ? QUEEN_ATTACK : QUEEN_ATTACK + options[0].enemyAttackBoost,
				};
			});
		});

		setKing({
			maxKingHealth: isHealthDefault ? KING_HEALTH : KING_HEALTH + options[0].enemyHealthBoost,
			kingAttack: isAttackDefault ? KING_ATTACK : KING_ATTACK + options[0].enemyAttackBoost,
		});

	}, [options]);

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

	return <Context.Provider value={{ handleChange, options }}>{children}</Context.Provider>;
}

export { ContextProvider, Context };

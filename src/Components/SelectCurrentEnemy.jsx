import { useState, useContext } from 'react';
import { Box, Image, HStack, Heading } from '@chakra-ui/react';
import { Context } from '../OptionsContext';

export default function SelectCurrentEnemy({ selectEnemy, allEnemies }) {

	function sliceIndex(increment) {

		const numberOfDeadFigure = allEnemies.reduce((acc, cur) => (
			cur.isDead ? acc += 1 : acc
		), 0)
		
		let cardIndexToSlice
		
		if(numberOfDeadFigure < 4) {
			cardIndexToSlice = 0 + increment
		} else if (numberOfDeadFigure < 8) {
			cardIndexToSlice = 4 + increment
		} else {
			cardIndexToSlice = 8 + increment
		}

		return cardIndexToSlice
	}

	const enemyCardsHTML = allEnemies.slice(sliceIndex(0), sliceIndex(4)).map((cards) => {
		const opacityDead = '.3';
		const grayscaleDead = 'grayscale(100%)';
		const cardHeight = '220px';
		const cardWidth = '120px';
		const { id, suits, isDead, imgPath } = cards;

		return (
			<Box key={cards.id}>
				<Image
					src={imgPath}
					htmlHeight={cardHeight}
					htmlWidth={cardWidth}
					id={id}
					suits={suits}
					filter={isDead ? grayscaleDead : 'none'}
					opacity={isDead ? opacityDead : 'none'}
					cursor={isDead ? 'not-allowed' : 'pointer'}
					onClick={isDead ? () => ('') : (e) => selectEnemy(e)}
				/>
			</Box>
		);
	});

	return (
		<>
			<Heading textAlign='center' mb='8'>
				Select Your Enemy
			</Heading>
			<HStack gap='8' justifyContent='center'>
				{enemyCardsHTML}
			</HStack>
		</>
	);
}

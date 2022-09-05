import { useState, useContext } from 'react';
import { Box, Image, HStack, Heading } from '@chakra-ui/react';
import { Context } from '../OptionsContext';

export default function SelectCurrentEnemy({ selectEnemy }) {
	const { jackEnemies } = useContext(Context);

	const enemyCardsHTML = jackEnemies.map((cards) => {
		const opacityDead = '.3';
		const grayscaleDead = 'grayscale(100%)';
		const cardHeight = '220px';
		const cardWidth = '120px';
		const { id, suits } = cards;

		return (
			<Box key={cards.id}>
				{cards.isDead ? (
					<Image
						src={cards.imgPath}
						htmlHeight={cardHeight}
						htmlWidth={cardWidth}
						filter={grayscaleDead}
						opacity={opacityDead}
						id={id}
						suits={suits}
					/>
				) : (
					<Image
						src={cards.imgPath}
						htmlHeight={cardHeight}
						htmlWidth={cardWidth}
						id={id}
						suits={suits}
						onClick={(e) => selectEnemy(e)}
                        cursor='pointer'
					/>
				)}
			</Box>
		);
	});

	return (
		<>
			<Heading textAlign='center' mb='8'>
				Select Current Enemy
			</Heading>
			<HStack gap='8' justifyContent='center'>
				{enemyCardsHTML}
			</HStack>
		</>
	);
}

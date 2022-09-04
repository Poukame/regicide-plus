import { useState, useContext } from 'react';
import { Box, Image, HStack, Heading } from '@chakra-ui/react';
import { Context } from '../OptionsContext';

export default function SelectCurrentEnemy() {
	const { jackEnemies } = useContext(Context);

	const enemyCardsHTML = jackEnemies.map((cards) => {
		const opacityDead = '.3';
		const grayscaleDead = 'grayscale(100%)';

		return (
			<Box key={cards.id}>
				{cards.isDead ? (
					<Image
						src={cards.imgPath}
						htmlHeight='220px'
						htmlWidth='120px'
						filter={grayscaleDead}
						opacity={opacityDead}
					/>
				) : (
					<Image src={cards.imgPath} htmlHeight='220px' htmlWidth='120px' />
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

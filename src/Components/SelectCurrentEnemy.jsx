import { useContext } from 'react';
import { Box, Image, HStack, Heading } from '@chakra-ui/react';
import { Context } from '../OptionsContext';
import { sliceIndex } from '../assets/DeadEnemies.cjs';

export default function SelectCurrentEnemy({ selectEnemy, allEnemies, numberOfDeadFigure }) {

	const {playClick} = useContext(Context)

	const enemyCardsHTML = allEnemies.slice(sliceIndex(0, numberOfDeadFigure), sliceIndex(4, numberOfDeadFigure)).map((cards) => {
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
					onClick={isDead ? () => ('') : (e) => (selectEnemy(e), playClick())}
				/>
			</Box>
		);
	});

	return (
		<>
			<Heading textAlign='center' mb='8'>
				Select Your Enemy
			</Heading>
			<HStack gap='8' justifyContent='center' flexWrap='wrap'>
				{enemyCardsHTML}
			</HStack>
		</>
	);
}

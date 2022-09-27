import { Box, Image, VStack } from '@chakra-ui/react';
import { sliceIndex } from '../assets/DeadEnemies';
import { IPropsEnemiesToCome } from '../Types';

export default function EnemiesToCome({ allEnemies, numberOfDeadFigure }: IPropsEnemiesToCome) {
	const opacityDead = '.3';

	const enemiesToComeHTML = allEnemies
		.slice(sliceIndex(0, numberOfDeadFigure), sliceIndex(4, numberOfDeadFigure))
		.filter((el) => el.isDead === false && el.isSelected === false)
		.map((cards) => {
			return (
				<Box key={cards.id}>
					<Image src={cards.imgPath} maxW='50px' opacity={opacityDead} />
				</Box>
			);
		});

	return (
		<>
			<VStack>{enemiesToComeHTML}</VStack>
		</>
	);
}

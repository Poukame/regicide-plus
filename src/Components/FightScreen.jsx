import { Box, Image } from '@chakra-ui/react';

export default function FightScreen({ currentEnemy }) {
	const { health, attack, imgPath, id, isDead, isSelected, name, rank, suits } = currentEnemy[0];
	console.log('file: FightScreen.jsx ~ line 4 ~ currentEnemy', currentEnemy);

	return (
		<>
			<Box>
				HP : {health} - Attack : {attack}
			</Box>
			<Image src={imgPath} htmlHeight='220px' htmlWidth='120px' id='g' suits='g' />
		</>
	);
}

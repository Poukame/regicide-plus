import { Box, Image, HStack, VStack } from '@chakra-ui/react';
import { Icon } from '@iconify/react';

export default function FightScreen({ currentEnemy, switchState }) {
	const { health, attack, imgPath, id, isDead, isSelected, name, rank, suits } = currentEnemy[0];
	console.log('file: FightScreen.jsx ~ line 4 ~ currentEnemy', currentEnemy);
    const onClick = () => switchState() // hold the suit type 

	return (
		<>
			<HStack alignItems='flex-start' gap='8'>
				<Box fontSize='8xl' color='red.700'>
					<VStack>
						<Box fontSize='3xl'>Health</Box>
						<Box fontWeight='700'>{health}</Box>
					</VStack>
				</Box>
				<Image src={imgPath} htmlHeight='220px' htmlWidth='130px' id='g' suits='g' />
				<Box fontSize='8xl'>
					<VStack>
						<Box fontSize='3xl'>Attack</Box>
						<Box fontWeight='700'>{attack}</Box>
					</VStack>
				</Box>
			</HStack>
			<HStack gap='8'>
				<Icon icon='emojione-v1:heart-suit' width='80' onClick={onClick} cursor='pointer' />
				<Icon icon='emojione-v1:diamond-suit' width='80' onClick={onClick} cursor='pointer' />
				<Icon icon='emojione-v1:club-suit' width='80' onClick={onClick} cursor='pointer' />
				<Icon icon='emojione-monotone:spade-suit' width='80' onClick={onClick} cursor='pointer' />
				<Icon icon='emojione-monotone:joker' color='#94b4b0' width='90' onClick={onClick} cursor='pointer' />
			</HStack>
		</>
	);
}

import { Box, Image, HStack, VStack, Button } from '@chakra-ui/react';
import { Icon } from '@iconify/react';

export default function FightScreen({ currentEnemy, switchState }) {
	const { health, attack, imgPath, id, isDead, isSelected, name, rank, suits } = currentEnemy[0];
   

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
				<Button p='2' bgColor='transparent' value='heart' onClick={(e) => switchState(e)} height='fit-content' ><Icon icon='emojione-v1:heart-suit' width='80' pointerEvents='none' /></Button>
				<Button p='2' bgColor='transparent' value='diamond' onClick={(e) => switchState(e)} height='fit-content' ><Icon icon='emojione-v1:diamond-suit' width='80' pointerEvents='none'   /></Button>
				<Button p='2' bgColor='transparent' value='club' onClick={(e) => switchState(e)} height='fit-content' ><Icon icon='emojione-v1:club-suit' width='80' pointerEvents='none'  /></Button>
				<Button p='2' bgColor='transparent' value='spade' onClick={(e) => switchState(e)} height='fit-content' ><Icon icon='emojione-monotone:spade-suit' width='80' pointerEvents='none'  /></Button>
				<Button p='2' bgColor='transparent' value='joker' onClick={(e) => switchState(e)} height='fit-content' ><Icon icon='emojione-monotone:joker' color='#DFFF00' width='90' pointerEvents='none' /></Button>
			</HStack>
		</>
	);
}

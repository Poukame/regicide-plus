import { Box, Flex, Button, Text, HStack } from '@chakra-ui/react';
import { Icon } from '@iconify/react';

export default function SelectCardValue({ switchState, selectedCards }) {
	const cardValue = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

	const cardHTML = cardValue.map((el) => {
		const isBlack = selectedCards.baseCardSuit === 'club' || selectedCards.baseCardSuit === 'spade';

		return (
			<Button
				key={el}
				colorScheme='whiteAlpha'
				color={isBlack ? 'black' : 'red.700'}
				border='solid'
				width='70px'
				height='50px'
				fontWeight='700'
				fontSize='3xl'
				value={el}
				onClick={(e) => switchState(e)}
			>
				{el}
			</Button>
		);
	});

	return (
		<>
			<Flex gap='8' flexWrap='wrap' justifyContent='center'>
				{cardHTML}
			</Flex>
			<Button
				w='90%'
				fontSize='2xl'
				height='70px'
				mt='8'
                mx='auto'
				value='return'
				onClick={(e) => switchState(e)}
			>
				
				<Text pointerEvents='none'>
					Cancel
					<Icon
						icon='icon-park:return'
						style={{ display: 'inline', marginLeft: '8px' }}
						inline={true}
					/>
				</Text>
			</Button>
		</>
	);
}

import { Flex, Button, Text } from '@chakra-ui/react';
import { Icon } from '@iconify/react';
import { useState, useEffect, useContext } from 'react';
import { Context } from '../OptionsContext';

export default function SelectCardValue({ switchState, selectedCards, allEnemies }) {
	
	const {cardValue, playClick} = useContext(Context)
	
	const [cardValueArr, setCardValue] = useState(cardValue);

	useEffect(() => {
		if (allEnemies.some((el) => el.rank === 'king' && el.isDead === true)) {
			setCardValue(cardValue);
		} else if (allEnemies.some((el) => el.rank === 'queen' && el.isDead === true)) {
			setCardValue((prev) => prev.filter((el) => el !== 'K'));
		} else if (allEnemies.some((el) => el.rank === 'jack' && el.isDead === true)) {
			setCardValue((prev) => prev.filter((el) => el !== 'K' && el !== 'Q'));
		} else {
			setCardValue((prev) => prev.filter((el) => el !== 'K' && el !== 'Q' && el !== 'J'));
		}
	}, []);

	const cardHTML = cardValueArr.map((el) => {
		const isBlack = selectedCards.baseCardSuit === 'club' || selectedCards.baseCardSuit === 'spade';

		return (
			<Button
				key={el}
				colorScheme='whiteAlpha'
				color={isBlack ? 'black' : 'red.700'}
				border='solid'
				width={maxWidthBtn}
				height={maxHeightBtn}
				fontWeight='700'
				fontSize='3xl'
				value={el}
				onClick={(e) => {switchState(e), playClick()}}
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
				onClick={(e) => {switchState(e), playClick('return')}}
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

const maxWidthBtn = ['85px', '100px', '120px'];
const maxHeightBtn = ['53px', '60px', '60px'];

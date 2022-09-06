import { Box, Flex, Button, HStack } from '@chakra-ui/react';
import { useContext } from 'react';
import { Icon } from '@iconify/react';
import { Context } from '../OptionsContext';
import { nanoid } from 'nanoid';

export default function SelectComboCard({ selectedCards, switchStateCompanion, switchStateCombo, validateAttack }) {
	const { maxComboCard, maxCompanionCard } = useContext(Context);
	
	const cardValue = ['A', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
	const suitsData = [
		{
			suitIcon: <Icon icon='emojione-v1:heart-suit' height='20px' pointerEvents='none' />,
			suit: 'heart',
			color: 'red.700',
			isSelected: selectedCards.comboSuits.some(suit => suit === 'heart')
		},
		{
			suitIcon: <Icon icon='emojione-v1:diamond-suit' height='20px' pointerEvents='none' />,
			suit: 'diamond',
			color: 'red.700',
			isSelected: selectedCards.comboSuits.some(suit => suit === 'diamond')
		},
		{
			suitIcon: <Icon icon='emojione-v1:club-suit' height='20px' pointerEvents='none' />,
			suit: 'club',
			color: 'black',
			isSelected: selectedCards.comboSuits.some(suit => suit === 'club')
		},
		{
			suitIcon: <Icon icon='emojione-v1:spade-suit' height='20px' pointerEvents='none' />,
			suit: 'spade',
			color: 'black',
			isSelected: selectedCards.comboSuits.some(suit => suit === 'spade')
		},
	];

	let comboCardsHTML;
	let companionHTML;
	const calculatedComboCard =
		cardValue.indexOf(selectedCards.baseCard) >= maxComboCard + 1 || selectedCards.baseCard === 'A'
			? 0
			: selectedCards.baseCard;

	// Animal Companion HTML

	if (
		cardValue.indexOf(selectedCards.baseCard) > cardValue.indexOf(maxCompanionCard) ||
		maxCompanionCard === 'OFF'
	) {
		companionHTML = <></>;
	} else {
		companionHTML = suitsData.map((el) => {
			return (
				<>
					<Button
						key={nanoid()}
						bgColor='whiteAlpha.800'
						colorScheme='white'
						color={el.color}
						border='solid'
						height='50px'
						fontWeight='700'
						fontSize='3xl'
						value={el.suit}
						onClick={(e) => switchStateCompanion(e)}
					>
						A{el.suitIcon}
					</Button>
				</>
			);
		});
	}

	// calculatedCombo HTML
	
	if (calculatedComboCard === 0) {
		comboCardsHTML = <></>;
	} else {
		comboCardsHTML = suitsData.map((el) => {
			return (
				<Button
					key={nanoid()}
					bgColor={el.isSelected ? '#DFFF00' : 'whiteAlpha.800'}
					colorScheme='white'
					color={el.color}
					outline={el.isSelected ? 'none' : 'solid'}
					height='50px'
					fontWeight='700'
					fontSize='3xl'
					value={[calculatedComboCard,el.suit]}
					onClick={(e) => switchStateCombo(e)}
				>
					{calculatedComboCard}
					{el.suitIcon}
				</Button>
			);
		});
	}

	return (
		<>
			<HStack flexWrap='wrap'>{companionHTML}</HStack>
			<HStack flexWrap='wrap' mt='4'>
				{comboCardsHTML}
			</HStack>
			<Button mt='4' onClick={validateAttack}>Validate Attack</Button>
		</>
	);
}

import { Flex, Button, Grid, Text } from '@chakra-ui/react';
import { useContext } from 'react';
import { Icon } from '@iconify/react';
import { Context } from '../OptionsContext';
import { nanoid } from 'nanoid';
import { ISelectComboCard } from '../Types';

export default function SelectComboCard({
	selectedCards,
	saveCompanionCards,
	saveComboCards,
	validateAttack,
	switchState,
}: ISelectComboCard) {
	const { maxComboCard, maxCompanionCard, options, cardValue, playClick } = useContext(Context);

	const { baseCard, baseCardDmg, baseCardSuit, companionSuit, comboSum, comboSuits } =
		selectedCards;

	const suitsData = [
		{
			suitIcon: (
				<Icon icon='emojione-v1:heart-suit' inline={true} style={iconMargin} pointerEvents='none' />
			),
			suit: 'heart',
			color: 'red.700',
			isSelected: comboSuits.includes('heart'),
			isCompanionSelected: companionSuit.includes('heart'),
		},
		{
			suitIcon: (
				<Icon
					icon='emojione-v1:diamond-suit'
					inline={true}
					style={iconMargin}
					pointerEvents='none'
				/>
			),
			suit: 'diamond',
			color: 'red.700',
			isSelected: comboSuits.includes('diamond'),
			isCompanionSelected: companionSuit.includes('diamond'),
		},
		{
			suitIcon: (
				<Icon icon='emojione-v1:club-suit' inline={true} style={iconMargin} pointerEvents='none' />
			),
			suit: 'club',
			color: 'black',
			isSelected: comboSuits.includes('club'),
			isCompanionSelected: companionSuit.includes('club'),
		},
		{
			suitIcon: (
				<Icon icon='emojione-v1:spade-suit' inline={true} style={iconMargin} pointerEvents='none' />
			),
			suit: 'spade',
			color: 'black',
			isSelected: comboSuits.includes('spade'),
			isCompanionSelected: companionSuit.includes('spade'),
		},
	];

	let comboCardsHTML;
	let companionHTML;
	
	const calculatedComboCard =
		cardValue.indexOf(baseCard) >= +maxComboCard || baseCard === 'A' ? 0 : baseCard;

	// Animal Companion HTML
	const isCompanionPicked = companionSuit.length > 0;
	const isComboCardPicked = companionSuit.length >= comboSuits.length;

	if (
		cardValue.indexOf(baseCard) > cardValue.indexOf(maxCompanionCard.toString())
		) {
			companionHTML = <></>;
	} else {
		companionHTML = suitsData.map((el) => {
			const isAceSuitSelected = baseCard !== 'A' && companionSuit.length >= 1;
			const removeBaseAce = baseCardSuit === el.suit && baseCard === 'A';

			return (
				<>
					<Button
						key={nanoid()}
						bgColor={el.isCompanionSelected ? '#DFFF00' : 'whiteAlpha.800'}
						colorScheme='white'
						color={el.color}
						outline={el.isCompanionSelected ? 'none' : 'solid'}
						height={maxHeightBtn}
						width={maxWidthBtn}
						fontWeight='700'
						fontSize='3xl'
						value={el.isCompanionSelected ? [-1, el.suit] : [1, el.suit]}
						isDisabled={isAceSuitSelected ? true : false}
						visibility={isComboCardPicked && !removeBaseAce ? 'visible' : 'hidden'}
						onClick={(e) => {
							saveComboCards(e), saveCompanionCards(e), playClick();
						}}
					>
						<Text pointerEvents='none'>A{el.suitIcon}</Text>
					</Button>
				</>
			);
		});
	}

	// ComboCards HTML

	if (calculatedComboCard === 0) {
		comboCardsHTML = <></>;
	} else {
		const isMaxAtReach = options[0].maxComboLimit - comboSum < baseCardDmg * 2;

		comboCardsHTML = suitsData.map((el) => {
			const isBaseSuitSelected = el.suit != baseCardSuit;

			return (
				<>
					<Button
						key={nanoid()}
						bgColor={el.isSelected ? '#DFFF00' : 'whiteAlpha.800'}
						colorScheme='white'
						color={el.color}
						outline={el.isSelected ? 'none' : 'solid'}
						height={maxHeightBtn}
						width={maxWidthBtn}
						visibility={isBaseSuitSelected && !isCompanionPicked ? 'visible' : 'hidden'}
						fontWeight='700'
						fontSize='3xl'
						isDisabled={isMaxAtReach && !el.isSelected ? true : false}
						value={el.isSelected ? [-calculatedComboCard, el.suit] : [calculatedComboCard, el.suit]}
						onClick={(e) => {
							saveComboCards(e), playClick();
						}}
					>
						<Text pointerEvents='none'>
							{calculatedComboCard}
							{el.suitIcon}
						</Text>
					</Button>
				</>
			);
		});
	}

	return (
		<>
			<Grid
				gridTemplateColumns={templateColumns}
				gridTemplateRows={templateRows}
				gap='4'
				justifyItems='center'
			>
				{companionHTML}
			</Grid>
			<Grid
				gridTemplateColumns={templateColumns}
				gridTemplateRows={templateRows}
				gap='4'
				mt='8'
				justifyItems='center'
			>
				{comboCardsHTML}
			</Grid>
			<Flex mt='8' flexWrap='wrap' gap='8'>
				<Button
					flex='4 1 auto'
					fontSize='2xl'
					height='70px'
					mx='auto'
					onClick={() => {
						playClick(), validateAttack();
					}}
				>
					<Text>
						Validate Attack
						<Icon
							icon='akar-icons:check'
							style={{ display: 'inline', marginLeft: '8px' }}
							inline={true}
						/>
					</Text>
				</Button>
				<Button
					flex='auto'
					fontSize='2xl'
					height='70px'
					mx='auto'
					value='return'
					onClick={(e) => {
						switchState(e), playClick('return');
					}}
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
			</Flex>
		</>
	);
}

// STYLING
const templateColumns = ['repeat(2, 1fr)', 'repeat(4, 1fr)', 'repeat(4, 1fr)'];
const templateRows = ['repeat(2, 1fr)', 'repeat(1, 1fr)', 'repeat(1, 1fr)'];
const iconMargin = { display: 'inline', marginLeft: '8px' };
const maxWidthBtn = ['85px', '100px', '120px'];
const maxHeightBtn = ['53px', '60px', '70px'];

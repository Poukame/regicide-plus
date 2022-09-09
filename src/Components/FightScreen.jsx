import { Box, Image, HStack, VStack, Button, Text, Grid, GridItem } from '@chakra-ui/react';
import { useContext } from 'react';
import { Icon } from '@iconify/react';
import { Context } from '../OptionsContext';
import { sliceIndex } from '../assets/DeadEnemies.cjs';

export default function FightScreen({
	currentEnemy,
	switchState,
	infoMessage,
	isJokerPlayed,
	instaKill,
	allEnemies,
	numberOfDeadFigure,
}) {
	const { options } = useContext(Context);
	const { health, attack, imgPath, isDead } = currentEnemy[0];
	const isJokerRemoved = options[0].removeJesters === 2;
	const isMsgToBeDisplayed = Object.values(infoMessage).some((el) => el === true) || isJokerPlayed;

	// render Dead enemies
	const deadEnemiesHTML = allEnemies
		.slice(sliceIndex(0, numberOfDeadFigure), sliceIndex(4, numberOfDeadFigure))
		.filter((el) => el.isDead === true)
		.map((cards) => {
			return (
				<Box key={cards.id}>
					<Image
						src={cards.imgPath}
						maxW='60px'
						filter={grayscaleDead}
						opacity={opacityDead}
					/>
				</Box>
			);
		});

	// render enemies to come
	const enemiesToCome = allEnemies
	.slice(sliceIndex(0, numberOfDeadFigure), sliceIndex(4, numberOfDeadFigure))
	.filter((el) => el.isDead === false && el.isSelected === false)
	.map((cards) => {
		return (
			<Box key={cards.id}>
				<Image
					src={cards.imgPath}
					maxW='60px'
					opacity={opacityDead}
				/>
			</Box>
		);
	});

	// Handle double tap on instaKill Button
	let lastTap = null;

	function handleDoubleTap() {
		const now = Date.now();
		const DOUBLE_PRESS_DELAY = 600;
		if (lastTap && now - lastTap < DOUBLE_PRESS_DELAY) {
			instaKill();
		} else {
			lastTap = now;
		}
	}

	return (
		<>
			<Grid
				gap={['2', '4', '8']}
				templateColumns={templateColumns}
				templateRows={templateRows}
				justifyItems='center'
			>
				<GridItem colSpan={[1, 1, 1]} rowStart={[2, 1, 1]}>
					<Box fontSize={fontSizeValue} color='red.700'>
						<VStack>
							<Box fontSize='3xl'>Health</Box>
							<Box fontWeight='700'>{isDead ? '0' : health}</Box>
						</VStack>
					</Box>
				</GridItem>
				<GridItem colSpan={[2, 1, 1]} rowStart={[1, 1, 1]}>
					<Image
						src={imgPath}
						maxW={imageSize}
						filter={isJokerPlayed ? 'grayscale(100%)' : 'none'}
					/>
				</GridItem>
				<GridItem colSpan={[1, 1, 1]} rowStart={[2, 1, 1]}>
					<Box fontSize={fontSizeValue}>
						<VStack>
							<Box fontSize='3xl'>Attack</Box>
							<Box fontWeight='700'>{attack < 0 ? '0' : attack}</Box>
						</VStack>
					</Box>
				</GridItem>
			</Grid>
			<HStack>{deadEnemiesHTML}</HStack>
			<HStack>{enemiesToCome}</HStack>
			{isMsgToBeDisplayed && (
				<HStack bgColor='whiteAlpha.300' p='4' my='4'>
					{isJokerPlayed && (
						<Icon icon='emojione-monotone:joker' color='#DFFF00' width='90' pointerEvents='none' />
					)}
					<VStack>
						{infoMessage.displayPerfectKillMsg && (
							<HStack fontSize='xl'>
								{/* <Icon icon="mdi:target-account" inline={true} /> */}
								<Text>{infoMessage.perfectKillMsg}</Text>
							</HStack>
						)}
						{infoMessage.displayDiamondMsg && (
							<HStack fontSize='xl'>
								{/* <Icon icon='mdi:cards-playing' inline={true} /> */}
								<Text>{infoMessage.diamondMsg}</Text>
							</HStack>
						)}
						{infoMessage.displayHeartMsg && (
							<HStack fontSize='xl'>
								{/* <Icon icon='akar-icons:health' inline={true} /> */}
								<Text>{infoMessage.heartMsg}</Text>
							</HStack>
						)}
					</VStack>
				</HStack>
			)}
			<HStack gap='4' mx='auto' flexWrap='wrap' justifyContent='space-evenly' mt={['0', '6', '8']}>
				<Button
					p='2'
					bgColor='transparent'
					value='heart'
					onClick={(e) => switchState(e)}
					height='fit-content'
					maxWidth={maxWidthBtn}
					ml='9px'
				>
					<Icon icon='emojione-v1:heart-suit' width='100%' pointerEvents='none' />
				</Button>
				<Button
					p='2'
					bgColor='transparent'
					value='diamond'
					onClick={(e) => switchState(e)}
					height='fit-content'
					maxWidth={maxWidthBtn}
				>
					<Icon icon='emojione-v1:diamond-suit' width='100%' pointerEvents='none' />
				</Button>
				<Button
					p='2'
					bgColor='transparent'
					value='club'
					onClick={(e) => switchState(e)}
					height='fit-content'
					maxWidth={maxWidthBtn}
				>
					<Icon icon='emojione-v1:club-suit' width='100%' pointerEvents='none' />
				</Button>
				<Button
					p='2'
					bgColor='transparent'
					value='spade'
					onClick={(e) => switchState(e)}
					height='fit-content'
					maxWidth={maxWidthBtn}
				>
					<Icon icon='emojione-monotone:spade-suit' width='100%' pointerEvents='none' />
				</Button>
				{!isJokerRemoved && (
					<Button
						p='2'
						bgColor='transparent'
						value='joker'
						onClick={(e) => switchState(e)}
						height='fit-content'
						maxWidth={maxWidthBtn}
					>
						<Icon
							icon='emojione-monotone:joker'
							color='#DFFF00'
							width='100%'
							pointerEvents='none'
						/>
					</Button>
				)}

				<Button
					p='2'
					bgColor='transparent'
					value='instaKill'
					height='fit-content'
					maxWidth={maxWidthBtn}
					onClick={(e) => handleDoubleTap(e)}
				>
					<Icon
						icon='healthicons:death'
						color='red'
						width='100%'
						inline={true}
						pointerEvents='none'
					/>
				</Button>
			</HStack>
		</>
	);
}

// STYLING

const opacityDead = '.3';
const grayscaleDead = 'grayscale(100%)';
const templateColumns = ['repeat(2, 1fr)', 'repeat(3, 1fr)', 'repeat(3, 1fr)'];
const templateRows = ['repeat(2, 1fr)', 'repeat(1, 1fr)', 'repeat(1, 1fr)'];
const fontSizeValue = ['6xl', '7xl', '8xl'];
const imageSize = ['120px', '120px', '180px'];
const maxWidthBtn = ['70px', '80px', '100px'];

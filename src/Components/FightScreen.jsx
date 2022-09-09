import { Box, Image, HStack, VStack, Button, Text, Grid, GridItem, Tooltip } from '@chakra-ui/react';
import { useContext } from 'react';
import { Icon } from '@iconify/react';
import { Context } from '../OptionsContext';
import EnemiesToCome from './EnemiesToCome';
import OptionsReminder from './OptionsReminder';

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
				<GridItem colSpan={[2, 1, 1]} rowStart={[2, 1, 1]}>
					<Box fontSize={fontSizeValue} color='red.700'>
						<VStack>
							<Box fontSize='3xl'>Health</Box>
							<Box fontWeight='700'>{isDead ? '0' : health}</Box>
						</VStack>
					</Box>
				</GridItem>
				<GridItem justifySelf='end'>
					<OptionsReminder />
				</GridItem>
				<GridItem colSpan={[2, 1, 1]} gridColumnStart={[2, 3, 3]} rowStart={[1, 1, 1]}>
					<Image
						src={imgPath}
						maxW={imageSize}
						filter={isJokerPlayed ? 'grayscale(100%)' : 'none'}
					/>
				</GridItem>
				<GridItem justifySelf='start'>
					<EnemiesToCome allEnemies={allEnemies} numberOfDeadFigure={numberOfDeadFigure}/>
				</GridItem>
				<GridItem colSpan={[2, 1, 1]} gridColumnStart={[3, 5, 5]} rowStart={[2, 1, 1]}>
					<Box fontSize={fontSizeValue}>
						<VStack>
							<Box fontSize='3xl'>Attack</Box>
							<Box fontWeight='700'>{attack < 0 ? '0' : attack}</Box>
						</VStack>
					</Box>
				</GridItem>
			</Grid>

			{isMsgToBeDisplayed && (
				<HStack bgColor='whiteAlpha.300' p='4' my='4'>
					{isJokerPlayed && (
						<Icon icon='emojione-monotone:joker' color='#DFFF00' width='90' pointerEvents='none' />
					)}
					<VStack>
						{infoMessage.displayPerfectKillMsg && (
							<HStack fontSize='xl'>
								<Text>{infoMessage.perfectKillMsg}</Text>
							</HStack>
						)}
						{infoMessage.displayDiamondMsg && (
							<HStack fontSize='xl'>
								<Text>{infoMessage.diamondMsg}</Text>
							</HStack>
						)}
						{infoMessage.displayHeartMsg && (
							<HStack fontSize='xl'>
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
                <Tooltip
					hasArrow
                    fontSize='lg'
                    placement='top'
					label={`Double Click to Use Instant Kill`}
                    bgColor='#FFF'
                    maxW='25ch'
					openDelay={800}
				>

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
						</Tooltip>
			</HStack>
		</>
	);
}

// STYLING

const templateColumns = ['repeat(4, 1fr)', '1fr min-content 1fr auto 1fr', '1fr auto min-content auto 1fr'];
const templateRows = ['repeat(2, min-content)', 'repeat(1, 1fr)', 'repeat(1, 1fr)'];
const fontSizeValue = ['6xl', '7xl', '8xl'];
const imageSize = ['120px', '120px', '160px'];
const maxWidthBtn = ['70px', '80px', '100px'];

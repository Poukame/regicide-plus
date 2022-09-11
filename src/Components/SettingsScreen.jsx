import {
	Button,
	Text,
	Drawer,
	DrawerBody,
	DrawerFooter,
	DrawerHeader,
	DrawerOverlay,
	DrawerContent,
	DrawerCloseButton,
	useDisclosure,
	VStack,
} from '@chakra-ui/react';
import { Icon } from '@iconify/react';
import { useRef, useContext } from 'react';
import { Context } from '../OptionsContext';

export default function SettingsScreen({ width, restartGame, gameStatus }) {
	const isOption = gameStatus === 'option' || gameStatus === undefined;
	const { playClick, updateSettings, settings } = useContext(Context);
	const { isOpen, onOpen, onClose } = useDisclosure();
	const btnRef = useRef();

	return (
		<>
			<Button
				p='2'
				bgColor='transparent'
				value='settings'
				height='fit-content'
				maxWidth={width}
				onClick={() => {
					onOpen(), playClick();
				}}
				ref={btnRef}
			>
				<Icon icon='ep:setting' width='100%' inline={true} pointerEvents='none' />
			</Button>
			<Drawer
				isOpen={isOpen}
				placement='right'
				onClose={() => {
					onClose(), playClick('return');
				}}
				finalFocusRef={btnRef}
			>
				<DrawerOverlay />
				<DrawerContent>
					<DrawerCloseButton />
					<DrawerHeader>Settings and Infos</DrawerHeader>

					<DrawerBody alignItems='flex-start'>
						<VStack gap='8'>
							{!isOption && (
								<>
									<Button
										w='100%'
										bgColor='#94b4b0'
										color='blackAlpha.700'
										onClick={() => (restartGame('retry'), playClick())}
									>
										Restart Game
									</Button>
									<Button
										w='100%'
										bgColor='#94b4b0'
										color='blackAlpha.700'
										onClick={() => (restartGame('newOptions'), playClick('return'))}
									>
										Difficulty Options
									</Button>
								</>
							)}
							<Button
								w='100%'
								name='showReminders'
								value={settings[0].showReminders}
								bgColor='#94b4b0'
								color='blackAlpha.700'
								onClick={(e) => {
									updateSettings(e);
								}}
							>
								{`Show Reminders: ${settings[0].showReminders ? 'ON' : 'OFF'}`}
							</Button>
							<Button
								w='100%'
								name='music'
								value={settings[0].music}
								bgColor='#94b4b0'
								color='blackAlpha.700'
								onClick={(e) => {
									updateSettings(e);
								}}
							>
								{`Music: ${settings[0].music ? 'ON' : 'OFF'}`}
							</Button>
							<Button
								w='100%'
								name='soundFx'
								value={settings[0].soundFx}
								bgColor='#94b4b0'
								color='blackAlpha.700'
								onClick={(e) => {
									updateSettings(e);
								}}
							>
								{`Sounds Effect: ${settings[0].soundFx ? 'ON' : 'OFF'}`}
							</Button>
							<Button w='100%' bgColor='#94b4b0' color='blackAlpha.700'>
								About
							</Button>
							<Button w='100%' bgColor='#94b4b0' color='blackAlpha.700'>
								Install
							</Button>
							<Button w='100%' bgColor='#94b4b0' color='blackAlpha.700'>
								Credits
							</Button>
						</VStack>
					</DrawerBody>

					<DrawerFooter></DrawerFooter>
				</DrawerContent>
			</Drawer>
		</>
	);
}

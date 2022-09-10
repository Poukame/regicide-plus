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

export default function SettingsScreen({ width }) {
	const { playClick } = useContext(Context);
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
							<Button w='100%' bgColor='#94b4b0' color='blackAlpha.700'>
								Game Options
							</Button>
							<Button w='100%' bgColor='#94b4b0' color='blackAlpha.700'>
								Turn Music On
							</Button>
							<Button w='100%' bgColor='#94b4b0' color='blackAlpha.700'>
								Turn Sounds Effect On
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

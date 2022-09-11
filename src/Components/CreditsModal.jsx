import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	Button,
	useDisclosure,
	Text,
	Link,
	Box,
	VStack,
} from '@chakra-ui/react';
import { Icon } from '@iconify/react';

export default function CreditsModal({ width, bgColor, color }) {
	const { isOpen, onOpen, onClose } = useDisclosure();

	return (
		<>
			<Button w={width} bgColor={bgColor} color={color} onClick={onOpen}>
				About and Credits
			</Button>

			<Modal size='2xl' isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Credits</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<VStack alignItems='flex-start' gap='4'>
							<Box>
								<Text fontWeight='700'>ABOUT:</Text>
								<Text>App developped by Poukame</Text>
								<Text>
									<Link isExternal href='https://github.com/Poukame/regicide-plus'>
										View Source Code on GitHub{' '}
										<Icon icon='charm:link-external' style={{ display: 'inline' }} inline={true} />
									</Link>
								</Text>
								<Text>Thanks to <Link href='https://www.badgersfrommars.com/regicide' isExternal>Badgers From Mars for Regicide <Icon icon='charm:link-external' style={{ display: 'inline' }} inline={true}/></Link> which is an awesome game.</Text>
							</Box>
							<Box>
								<Text fontWeight='700'>FONTS:</Text>
								<Link isExternal href='https://www.fontspace.com/vecna-font-f20510'>
									Vecna by fontspace.com{' '}
									<Icon icon='charm:link-external' style={{ display: 'inline' }} inline={true} />
								</Link>
							</Box>
							<Box>
								<Text fontWeight='700'>MUSICS:</Text>
								<Text>
									"Viking Intro" and "Celtic Ambiance" by Alexander Nakarada (
									<Link isExternal href='https://www.serpentsoundstudios.com/'>
										www.serpentsoundstudios.com{' '}
										<Icon icon='charm:link-external' style={{ display: 'inline' }} inline={true} />
									</Link>
									) Licensed under Creative Commons BY Attribution 4.0 License
									https://creativecommons.org/licenses/by/4.0/
								</Text>
							</Box>
							<Box>
								<Text fontWeight='700'>SOUND FX:</Text>
								<Text>
									Sound effects obtained from{' '}
									<Link isExternal href='https://www.zapsplat.com'>
										www.zapsplat.com{' '}
										<Icon icon='charm:link-external' style={{ display: 'inline' }} inline={true} />
									</Link>
								</Text>
							</Box>
							<Box>
								<Text fontWeight='700'>PLAYING CARDS:</Text>
								<Text>
									Generated thanks to{' '}
									<Link isExternal href='https://www.me.uk/cards/makeadeck.cgi'>
										www.me.uk/cards/makeadeck.cgi{' '}
										<Icon icon='charm:link-external' style={{ display: 'inline' }} inline={true} />
									</Link>
								</Text>
							</Box>
						</VStack>
					</ModalBody>

					<ModalFooter>
						<Button colorScheme='blue' mr={3} onClick={onClose}>
							Close
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
}

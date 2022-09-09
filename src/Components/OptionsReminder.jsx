import { VStack, Text, HStack, Tooltip } from '@chakra-ui/react';
import { useContext, useState, useEffect } from 'react';
import { Context } from '../OptionsContext';
import { Icon } from '@iconify/react';

export default function OptionsReminder({ progressPercentage }) {

	const { options } = useContext(Context);
	const { maxHandSize, yieldTurn, maxComboLimit, maxAnimalCompanionLimit } =
		options[0];


	return (
		<>
			<VStack alignItems='flex-start' gap='2' fontSize='xl'>
				<Tooltip
					hasArrow
					fontSize='lg'
					placement='left'
					label={`Modifier for the maximum number of cards in hand`}
					bgColor='#FFF'
					maxW='25ch'
				>
					<HStack>
						<Icon icon='fluent:playing-cards-20-regular' width='30' />
						<Text>{maxHandSize > 0 ? `+${maxHandSize}` : `${maxHandSize}`}</Text>
					</HStack>
				</Tooltip>

				<Tooltip
					hasArrow
					fontSize='lg'
					placement='left'
					label={`ON = you can yield. OFF = you can not yield.`}
					bgColor='#FFF'
					maxW='20ch'
				>
					<HStack>
						<Icon icon='ci:user-close' width='30' />
						<Text>{yieldTurn}</Text>
					</HStack>
				</Tooltip>
				<Tooltip
					hasArrow
					fontSize='lg'
					placement='left'
					label={`The highest card you can use an animal companion with.`}
					bgColor='#FFF'
					maxW='25ch'
				>
					<HStack>
						<Icon icon='map:pet-store' width='30' />
						<Text>{maxAnimalCompanionLimit}</Text>
					</HStack>
				</Tooltip>
				<Tooltip
					hasArrow
					fontSize='lg'
					placement='left'
					label={`The highest sum you can reach with your cards combo`}
					bgColor='#FFF'
					maxW='25ch'
				>
					<HStack>
						<Icon icon='carbon:document-add' width='30' />
						<Text>{maxComboLimit}</Text>
					</HStack>
				</Tooltip>
				<Tooltip
					hasArrow
					fontSize='lg'
					placement='left'
					label={`Your progress towards victory. This can be used to compare your performance between plays.`}
					bgColor='#FFF'
					maxW='25ch'
				>
					<HStack>
                    <Icon icon="akar-icons:trophy" width="30" />
						<Text>{progressPercentage}%</Text>
					</HStack>
				</Tooltip>
                
			</VStack>
		</>
	);
}

import { Text, Select, VStack, HStack, Button, Heading } from '@chakra-ui/react';
import { Context } from '../OptionsContext';
import { useContext } from 'react';
import SettingsScreen from './SettingsScreen';

export default function SelectOptions({ updateStatus }) {
	const { handleChange, playClick, options } = useContext(Context);
	const {maxHandSize, enemyHealthBoost, removeJesters, enemyAttackBoost, yieldTurn, maxAnimalCompanionLimit, maxComboLimit} = options[0]

	return (
		<>
			<VStack maxW='600px' mx='auto' alignItems='flex-start' textShadow='2px 2px 2px #cadad8'>
				<Heading textAlign='center'>Select Your Options</Heading>
				<Text fontWeight='bold' fontSize='lg'>
					Maximum Hand Size Change
				</Text>
				<Select value={maxHandSize} size='md' variant='filled' name='maxHandSize' onChange={(e) => handleChange(e)}>
					<option value={0}>Default</option>
					<option value={1}>+1</option>
					<option value={2}>+2</option>
					<option value={-1}>-1</option>
					<option value={-2}>-2</option>
				</Select>
				<Text fontWeight='bold' fontSize='lg'>
					Remove Jesters
				</Text>
				<Select value={removeJesters} size='md' variant='filled' name='removeJesters' onChange={(e) => handleChange(e)}>
					<option value={'OFF'}>Default</option>
					<option value={1}>-1</option>
					<option value={2}>-2</option>
				</Select>
				<Text fontWeight='bold' fontSize='lg'>
					Enemy Health Boost
				</Text>
				<Select
					size='md'
					variant='filled'
					name='enemyHealthBoost'
					onChange={(e) => handleChange(e)}
					value={enemyHealthBoost}
				>
					<option value={0}>Default</option>
					<option value={5}>+5</option>
					<option value={10}>+10</option>
					<option value={-5}>-5</option>
					<option value={-10}>-10</option>
				</Select>
				<Text fontWeight='bold' fontSize='lg'>
					Enemy Attack Boost
				</Text>
				<Select
					size='md'
					variant='filled'
					name='enemyAttackBoost'
					onChange={(e) => handleChange(e)}
					value={enemyAttackBoost}
				>
					<option value={0}>Default</option>
					<option value={2}>+2</option>
					<option value={5}>+5</option>
					<option value={-5}>-5</option>
					<option value={-2}>-2</option>
				</Select>
				<Text fontWeight='bold' fontSize='lg'>
					Yield
				</Text>
				<Select value={yieldTurn} size='md' variant='filled' name='yieldTurn' onChange={(e) => handleChange(e)}>
					<option value={'ON'}>On (Default)</option>
					<option value={'OFF'}>Off</option>
				</Select>
				<Text fontWeight='bold' fontSize='lg'>
					Max Combo Limit
				</Text>
				<Select value={maxComboLimit} size='md' variant='filled' name='maxComboLimit' onChange={(e) => handleChange(e)}>
					<option value={10}>10 (Default)</option>
					<option value={9}>9</option>
					<option value={8}>8</option>
					<option value={6}>6</option>
					<option value={4}>4</option>
					<option value={'OFF'}>No Combo</option>
					<option value={18}>18</option>
					<option value={15}>15</option>
					<option value={12}>12</option>
				</Select>
				<Text fontWeight='bold' fontSize='lg'>
					Max Animal Companion Limit
				</Text>
				<Select
					size='md'
					variant='filled'
					name='maxAnimalCompanionLimit'
					onChange={(e) => handleChange(e)}
					value={maxAnimalCompanionLimit}
				>
					<option value={'K'}>Default</option>
					<option value={'Q'}>Q</option>
					<option value={'J'}>J</option>
					<option value={'10'}>10</option>
					<option value={'9'}>9</option>
					<option value={'8'}>8</option>
					<option value={'7'}>7</option>
					<option value={'6'}>6</option>
					<option value={'5'}>5</option>
					<option value={'4'}>4</option>
					<option value={'3'}>3</option>
					<option value={'2'}>2</option>
					<option value={'A'}>A</option>
					<option value={'OFF'}>No Animal Companion</option>
				</Select>
			<HStack alignItems='center'>
			<Button
				
				w='250px'
				colorScheme='green'
				variant='solid'
				onClick={() => {updateStatus(), playClick()}}
			>
				Start the Game
			</Button>
			<SettingsScreen width='70' />
			</HStack>
			</VStack>
		</>
	);
}

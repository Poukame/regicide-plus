import { Text, Select, VStack, Button, Heading } from '@chakra-ui/react';
import { Context } from '../OptionsContext';
import { useContext } from 'react';

export default function SelectOptions({ updateStatus }) {
	const { handleChange } = useContext(Context);

	return (
		<>
			<VStack maxW='600px' mx='auto' alignItems='flex-start'>
				<Heading textAlign='center'>Select Your Options</Heading>
				<Text fontWeight='bold' fontSize='lg'>
					Maximum Hand Size Change
				</Text>
				<Select size='md' variant='filled' name='maxHandSize' onChange={(e) => handleChange(e)}>
					<option value={'OFF'}>Default</option>
					<option value={1}>+1</option>
					<option value={2}>+2</option>
					<option value={-1}>-1</option>
					<option value={-2}>-2</option>
				</Select>
				<Text fontWeight='bold' fontSize='lg'>
					Remove Jesters
				</Text>
				<Select size='md' variant='filled' name='removeJesters' onChange={(e) => handleChange(e)}>
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
				>
					<option value={'OFF'}>Default</option>
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
				>
					<option value={'OFF'}>Default</option>
					<option value={2}>+2</option>
					<option value={5}>+5</option>
					<option value={-5}>-5</option>
					<option value={-2}>-2</option>
				</Select>
				<Text fontWeight='bold' fontSize='lg'>
					Yield
				</Text>
				<Select size='md' variant='filled' name='yield' onChange={(e) => handleChange(e)}>
					<option value={'ON'}>On (Default)</option>
					<option value={'OFF'}>Off</option>
				</Select>
				<Text fontWeight='bold' fontSize='lg'>
					Max Combo Limit
				</Text>
				<Select size='md' variant='filled' name='maxComboLimit' onChange={(e) => handleChange(e)}>
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
			</VStack>
			<Button
				mt='8'
				w='250px'
				colorScheme='green'
				alignSelf='center'
				variant='solid'
				onClick={() => updateStatus()}
			>
				Start the Game
			</Button>
		</>
	);
}

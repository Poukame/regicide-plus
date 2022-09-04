import { Text, Select, Flex, HStack } from '@chakra-ui/react';
import { Context } from '../OptionsContext';
import { useContext } from 'react';

export default function SelectOptions() {
	const { handleChange } = useContext(Context);

	return (
		<>
			<Text fontSize='2xl'>Select Your Options</Text>
			<Text>Maximum Hand Size Change</Text>
			<Select size='md' name='maxHandSize' onChange={(e) => handleChange(e)}>
				<option value={'OFF'}>Default</option>
				<option value={1}>+1</option>
				<option value={2}>+2</option>
				<option value={-1}>-1</option>
				<option value={-2}>-2</option>
			</Select>
			<Text>Remove Jesters</Text>
			<Select size='md' name='removeJesters' onChange={(e) => handleChange(e)}>
				<option value={'OFF'}>Default</option>
				<option value={1}>-1</option>
				<option value={2}>-2</option>
			</Select>
			<Text>Enemy Health Boost</Text>
			<Select size='md' name='enemyHealthBoost' onChange={(e) => handleChange(e)}>
				<option value={'OFF'}>Default</option>
				<option value={5}>+5</option>
				<option value={10}>+10</option>
				<option value={-5}>-5</option>
				<option value={-10}>-10</option>
			</Select>
			<Text>Enemy Attack Boost</Text>
			<Select size='md' name='enemyAttackBoost' onChange={(e) => handleChange(e)}>
				<option value={'OFF'}>Default</option>
				<option value={2}>+2</option>
				<option value={5}>+5</option>
				<option value={-5}>-5</option>
				<option value={-2}>-2</option>
			</Select>
			<Text>Yield</Text>
			<Select size='md' name='yield' onChange={(e) => handleChange(e)}>
				<option value={'ON'}>On (Default)</option>
				<option value={'OFF'}>Off</option>
			</Select>
			<Text>Max Combo Limit</Text>
			<Select size='md' name='maxComboLimit' onChange={(e) => handleChange(e)}>
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
			<Text>Max Animal Companion Limit</Text>
			<Select size='md' name='maxAnimalCompanionLimit' onChange={(e) => handleChange(e)}>
				<option value={'ON'}>Default</option>
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
		</>
	);
}

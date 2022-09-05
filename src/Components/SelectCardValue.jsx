import { Box, Flex, Button } from '@chakra-ui/react';

export default function SelectCardValue({switchState}) {
    const cardValue = ['A', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K']

    const cardHTML = cardValue.map(el => {
        return (
            <Button
            key={el}
            colorScheme='whiteAlpha'
            color='red.700'
            border='solid'
            width='70px'
            height='50px'
            fontWeight='700'
            fontSize='3xl'
            onClick={(e) => switchState(e)}
        >{el}
        </ Button>
        )
    })

	return (
        <>
		<Flex gap='8' flexWrap='wrap'>
            {cardHTML}
		</Flex>
        <Button mt='4' value='return' onClick={(e) => switchState(e)}>Cancel Attack</Button>
        </>

	);
}

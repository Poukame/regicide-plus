import { Image, VStack, Heading, Button } from '@chakra-ui/react';
import trollface from '../assets/images/trollface.webp'
import { Context } from '../OptionsContext';
import { useContext } from 'react';

export default function EndGameScreen({restartGame}) {

    const {playClick} = useContext(Context)

    return (
        <VStack>
            <Heading>VICTORY!!!</Heading>
            <Image src={trollface} height='250px'></Image>
            <Button onClick={() => (restartGame('retry'), playClick())}>Retry with the Same Options</Button>
            <Button onClick={() => (restartGame('newOptions'), playClick('return'))}>Return to Option Screen</Button>
        </VStack>
    )
}
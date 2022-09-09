import { Box, Image, HStack, VStack, Heading, Button } from '@chakra-ui/react';
import trollface from '../assets/images/trollface.webp'

export default function EndGameScreen({restartGame}) {


    return (
        <VStack>
            <Heading>VICTORY!!!</Heading>
            <Image src={trollface} height='250px'></Image>
            <Button onClick={() => restartGame('retry')}>Retry with the Same Options</Button>
            <Button onClick={() => restartGame('newOptions')}>Return to Option Screen</Button>
        </VStack>
    )
}
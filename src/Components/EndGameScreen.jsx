import { Box, Image, HStack, VStack, Heading, Button } from '@chakra-ui/react';
import trollface from '../assets/images/trollface.webp'

export default function EndGameScreen() {


    return (
        <VStack>
            <Heading>VICTORY!!!</Heading>
            <Image src={trollface} height='250px'></Image>
            <Button>Return to Option Screen</Button>
        </VStack>
    )
}
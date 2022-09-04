import { useState } from "react";
import enemyData from "../assets/EnemyData.cjs";
import {
    Box, Image, HStack, Heading
  } from '@chakra-ui/react'

export default function SelectCurrentEnemy() {

    const [jack, setJack] = useState(enemyData.slice(0, 4))
    
    console.log('file: SelectCurrentEnemy.jsx ~ line 10 ~ jack', jack);
    const enemyCardsHTML = enemyData.map(cards => {

        const opacityDead = '.2'

        return (
            <Box>
                <Image src={cards.imgPath} htmlHeight='220px' htmlWidth='120px'/>
            </Box>
        )
    })

    return (
        <>
        <Heading textAlign='center' mb='8'>Select Current Enemy</Heading>
        <HStack gap='8' justifyContent='center'>
        {enemyCardsHTML}
        </HStack>
        </>
    )
}
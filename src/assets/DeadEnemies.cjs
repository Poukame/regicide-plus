export function sliceIndex(increment, numberOfDeadFigure) {
   
    let cardIndexToSlice
    
    if(numberOfDeadFigure < 4) {
        cardIndexToSlice = 0 + increment
    } else if (numberOfDeadFigure < 8) {
        cardIndexToSlice = 4 + increment
    } else {
        cardIndexToSlice = 8 + increment
    }

    return cardIndexToSlice
}
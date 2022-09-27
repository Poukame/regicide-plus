export function sliceIndex(increment:number, numberOfDeadFigure:number):number {
   
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
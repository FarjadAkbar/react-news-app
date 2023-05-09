export function dateConversion(isoString: string){
    const date = new Date(isoString);
    const dateOnlyString = date.toISOString().substr(0, 10);
    
    return dateOnlyString
}

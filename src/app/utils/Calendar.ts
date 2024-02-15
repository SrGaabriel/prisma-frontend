export function areDatesOnTheSameWeek(date1: Date, date2: Date): boolean {
    return isDayOnTheSameWeekAsDate(date1, date2.getDate());   
}

export function isDayOnTheSameWeekAsDate(date: Date, day: number): boolean {
    const firstDayOfCurrentWeek = date.getDate() - date.getDay();
    
    return (date.getDay() === 0 && day > firstDayOfCurrentWeek - 7 && day < firstDayOfCurrentWeek)
        || (date.getDay() !== 0 && day >= firstDayOfCurrentWeek+1 && day <= firstDayOfCurrentWeek + 7)
}

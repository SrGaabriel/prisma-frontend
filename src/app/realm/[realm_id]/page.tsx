'use client'

import { useState } from 'react';
import styles from './page.module.css';
import { isDayOnTheSameWeekAsDate } from '@/app/utils/Calendar';

const Page = ({params}: { params: { realm_id: number } }) => {
    const [currentDay, setCurrentDay] = useState(new Date());
    const currentMonthName = currentDay.toLocaleString('en-US', { month: 'long' });
    const currentYear = currentDay.getFullYear();

    return (
        <div className={styles.page}>
            <div className={styles.content}>
                <div className={styles.month}>
                    <span className={styles.monthName}>{currentMonthName} {currentYear}</span>
                    <div className={styles.monthCalendarSection}>
                        {createMonthWeekDayColumn(1)}
                        {createMonthWeekDayColumn(2)}
                        {createMonthWeekDayColumn(3)}
                        {createMonthWeekDayColumn(4)}
                        {createMonthWeekDayColumn(5)}
                        {createMonthWeekDayColumn(6)}
                        {createMonthWeekDayColumn(7)}
                    </div>
                </div>
            </div>
        </div>
    );
    function createMonthWeekDayColumn(weekDay: number) {
        const day = new Date(0, 0, weekDay);
        const firstDayOfTheMonth = new Date(currentDay.getFullYear(), currentDay.getMonth(), 1);
        const firstDayWeekDay = firstDayOfTheMonth.getDay();
        const weekDayOffset = weekDay - firstDayWeekDay + 1;

        const numberOfDaysInMonth = new Date(currentDay.getFullYear(), currentDay.getMonth() + 1, 0).getDate();
        const numberOfDaysInPreviousMonth = new Date(currentDay.getFullYear(), currentDay.getMonth(), 0).getDate();
        const createDayNumber = (day: number) => {
            if (day < 1) {
                return numberOfDaysInPreviousMonth + day;
            }
            if (day > numberOfDaysInMonth) {
                return day - numberOfDaysInMonth;
            }
            return day;
        }
        const createDayClassName = (day: number) => {
            if (day < 1 || day > numberOfDaysInMonth) {
                return `${styles.weekDayNumber} ${styles.dayDisabled}`
            }
            if (day === currentDay.getDate()) {
                return `${styles.weekDayNumber} ${styles.dayToday}`
            }
            if (isDayOnTheSameWeekAsDate(currentDay, day)) {
                return `${styles.weekDayNumber} ${styles.dayThisWeek}`
            }
            
            return styles.weekDayNumber;
        }
        const numberOfRows = Math.ceil((numberOfDaysInMonth + firstDayWeekDay) / 7);

        return (
            <div className={styles.weekDayColumn}>
                <span className={styles.weekDayName}>{day.toLocaleString('en-US', { weekday: 'short' })}</span>
                {
                    Array(numberOfRows).fill(0).map((_, index) => {
                        const rawDayNumber = weekDayOffset + index * 7;
                        const formattedDay = createDayNumber(rawDayNumber);
                        const month = rawDayNumber < 1 ? currentDay.getMonth() - 1 : rawDayNumber > numberOfDaysInMonth ? currentDay.getMonth() + 1 : currentDay.getMonth();
                        const year = rawDayNumber < 1 ? currentDay.getFullYear() : rawDayNumber > numberOfDaysInMonth ? currentDay.getFullYear() : currentDay.getFullYear();
                        return <span
                            key={`day-${index}-${rawDayNumber}`}
                            className={createDayClassName(weekDayOffset+index*7)}
                            onClick={() => setCurrentDay(new Date(year, month, formattedDay))}
                        >
                            {formattedDay}
                        </span>
                    })
                }
            </div>
        );
    }
}


export default Page;
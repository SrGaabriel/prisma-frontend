import styles from './page.module.css';

const Page = ({params}: { params: { realm_id: number } }) => {
    const currentDay = new Date();
    const currentMonthName = currentDay.toLocaleString('en-US', { month: 'long' });
    const currentYear = currentDay.getFullYear();

  return (
    <div className={styles.page}>
        <div className={styles.content}>
            <div className={styles.month}>
                <span className={styles.monthName}>{currentMonthName} {currentYear}</span>
                <div className={styles.monthCalendarSection}>
                    {createMonthWeekDayColumn(currentDay, 1)}
                    {createMonthWeekDayColumn(currentDay, 2)}
                    {createMonthWeekDayColumn(currentDay, 3)}
                    {createMonthWeekDayColumn(currentDay, 4)}
                    {createMonthWeekDayColumn(currentDay, 5)}
                    {createMonthWeekDayColumn(currentDay, 6)}
                    {createMonthWeekDayColumn(currentDay, 7)}
                </div>
            </div>
        </div>
    </div>
  );
}

function createMonthWeekDayColumn(currentDay: Date, weekDay: number) {
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
        return styles.weekDayNumber;
    }

    return (
        <div className={styles.weekDayColumn}>
            <span className={styles.weekDayName}>{day.toLocaleString('en-US', { weekday: 'short' })}</span>
            <span className={createDayClassName(weekDayOffset)}>{createDayNumber(weekDayOffset)}</span>
            <span className={createDayClassName(weekDayOffset+7)}>{createDayNumber(weekDayOffset + 7)}</span>
            <span className={createDayClassName(weekDayOffset+14)}>{createDayNumber(weekDayOffset + 14)}</span>
            <span className={createDayClassName(weekDayOffset+21)}>{createDayNumber(weekDayOffset + 21)}</span>
            <span className={createDayClassName(weekDayOffset+28)}>{createDayNumber(weekDayOffset + 28)}</span>
        </div>
    );
}

export default Page;
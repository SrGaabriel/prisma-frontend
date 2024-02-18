import styles from './calendar.module.css';

const Calendar = () => {
    return (
        <div className={styles.calendar}>
            {createCalendarColumn()}
            {createCalendarColumn()}
            {createCalendarColumn()}
            {createCalendarColumn()}
            {createCalendarColumn()}
            {createCalendarColumn()}
            {createCalendarColumn()}
        </div>
    )
}

function createCalendarColumn() {
    return (
        <div className={styles.calendarColumn}>
            {Array(24).fill(0).map((_, i) => (
                <div key={`row-${i}-$sa`} className={styles.calendarRow}>
                </div>
            ))}
        </div>
    )
}

export default Calendar;
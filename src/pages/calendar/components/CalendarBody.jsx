import CalendarCell from "./CalendarCell";

const CalendarBody = ({ weeks, handleScheduleClick }) => {
  return (
    <tbody>
      {weeks.map((week, weekIndex) => (
        <tr key={`week-${weekIndex}`}>
          {week.map(({ day, isDisabled, date }, dayIndex) => (
            <CalendarCell
              key={`day-${dayIndex}`}
              date={date}
              day={day}
              isDisabled={isDisabled}
              week={week}
              handleScheduleClick={handleScheduleClick}
            />
          ))}
        </tr>
      ))}
    </tbody>
  )
}

export default CalendarBody
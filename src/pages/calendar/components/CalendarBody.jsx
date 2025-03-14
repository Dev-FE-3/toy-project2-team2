import CalendarCell from "./CalendarCell";

const CalendarBody = ({ weeks, handleScheduleClick }) => {
  return (
    <tbody>
      {weeks.map((week, weekIndex) => (
        <tr key={weekIndex}>
          {week.map(({ day, isDisabled, date }, dayIndex) => (
            <CalendarCell
              key={dayIndex}
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
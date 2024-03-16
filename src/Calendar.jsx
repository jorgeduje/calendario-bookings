import { useState, useEffect } from "react";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // Estilos base
import "react-date-range/dist/theme/default.css"; // Tema predeterminado
import "./Calendar.css";
import es from "date-fns/locale/es";

function Calendario() {
  const [fechasOcupadas, setFechasOcupadas] = useState([]);
  const [monthsToShow, setMonthsToShow] = useState(2);

  const [selectionRange, setSelectionRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });

  console.log(selectionRange.startDate?.toISOString().split("T").shift());
  console.log(selectionRange.endDate?.toISOString().split("T").shift());

  useEffect(() => {
    const reservationsFromServer = [
      { start: "2024-03-22", end: "2024-03-25" },
      { start: "2024-04-12", end: "2024-04-18" },
      { start: "2024-04-27", end: "2024-04-30" },
    ];

    const disabledDates = [];

    reservationsFromServer.forEach((reservation) => {
      const { start, end } = reservation;
      const startDate = new Date(start);
      startDate.setDate(startDate.getDate() + 1);

      const endDate = new Date(end);
      endDate.setDate(endDate.getDate() + 1);

      const currentDate = startDate;
      console.log({ currentDate });
      while (currentDate <= endDate) {
        disabledDates.push(currentDate.toISOString().slice(0, 10));
        currentDate.setDate(currentDate.getDate() + 1);
      }
    });

    setFechasOcupadas(disabledDates);
  }, []);

  console.log(fechasOcupadas);

  const handleSelect = (ranges) => {
    setSelectionRange(ranges.selection);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setMonthsToShow(1);
      } else {
        setMonthsToShow(2);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="calendario-container">
      <div className="calendario-card">
        <DateRange
          ranges={[selectionRange]}
          onChange={handleSelect}
          rangeColors={["peru"]}
          disabledDates={fechasOcupadas}
          showDateDisplay={false}
          months={monthsToShow}
          direction="horizontal"
          locale={es}
          minDate={new Date()}
          
        />
      </div>
    </div>
  );
}

export default Calendario;

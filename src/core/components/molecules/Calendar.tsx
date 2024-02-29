import { CaretLeft, CaretRight } from "phosphor-react";
import React, { useEffect, useState } from "react";

const Calendar = () => {
  const [currentYear, setCurrentYear] = useState<number>(
    new Date().getFullYear()
  );
  const [currentMonth, setCurrentMonth] = useState<number>(
    new Date().getMonth()
  );
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const generateCalendar = (year: number, month: number) => {
    const calendarElement = document.getElementById("calendar");
    const currentMonthElement = document.getElementById("currentMonth");

    // Cria um objeto de data para o primeiro dia do mês especificado
    const firstDayOfMonth = new Date(year, month, 1);
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    // Limpa o calendário
    if (calendarElement) calendarElement.innerHTML = "";

    // Define o texto do mês atual
    const monthNames = [
      "Janeiro",
      "Fevereiro",
      "Março",
      "Abril",
      "Maio",
      "Junho",
      "Julho",
      "Agosto",
      "Setembro",
      "Outubro",
      "Novembro",
      "Dezembro",
    ];
    if (currentMonthElement)
      currentMonthElement.innerText = `${monthNames[month]} ${year}`;

    // Calcula o dia da semana para o primeiro dia do mês (0 - Domingo, 1 - Segunda, ..., 6 - Sábado)
    const firstDayOfWeek = firstDayOfMonth.getDay();

    // Cria cabeçalhos para os dias da semana
    const daysOfWeek = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"];
    daysOfWeek.forEach((day) => {
      const dayElement = document.createElement("div");
      dayElement.className = "text-center font-semibold";
      dayElement.innerText = day;
      if (calendarElement) calendarElement.appendChild(dayElement);
    });

    // Cria caixas vazias para os dias antes do primeiro dia do mês
    for (let i = 0; i < firstDayOfWeek; i++) {
      const emptyDayElement = document.createElement("div");
      if (calendarElement) calendarElement.appendChild(emptyDayElement);
    }

    // Cria caixas para cada dia do mês
    for (let day = 1; day <= daysInMonth; day++) {
      const dayElement = document.createElement("div");
      dayElement.className = "text-center py-2 border cursor-pointer";
      dayElement.innerText = day;

      // Verifica se esta data é a data atual
      const currentDate = new Date();
      if (
        year === currentDate.getFullYear() &&
        month === currentDate.getMonth() &&
        day === currentDate.getDate()
      ) {
        dayElement.classList.add("bg-blue-500", "text-white"); // Adiciona classes para o indicador
      }

      // Adiciona um ouvinte de evento para cliques nos dias
      dayElement.addEventListener("click", () => {
        const selectedDate = new Date(year, month, day);
        const options = {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        };
        const formattedDate = selectedDate.toLocaleDateString(
          undefined,
          options
        );
        showModal(formattedDate);
      });

      if (calendarElement) calendarElement.appendChild(dayElement);
    }
  };

  // Chama a função ao montar o componente e sempre que as dependências (currentYear e currentMonth) mudarem
  useEffect(() => {
    generateCalendar(currentYear, currentMonth);
  }, [currentYear, currentMonth]);

  const showModal = (selectedDate: string) => {
    setSelectedDate(selectedDate);
    setModalVisible(true);
  };

  const hideModal = () => {
    setModalVisible(false);
  };

  const handlePrevMonth = () => {
    setCurrentMonth((prevMonth) => {
      let newYear = currentYear;
      if (prevMonth === 0) {
        newYear--;
        return 11;
      }
      return prevMonth - 1;
    });
    generateCalendar(currentYear, currentMonth);
  };

  const handleNextMonth = () => {
    setCurrentMonth((prevMonth) => {
      let newYear = currentYear;
      if (prevMonth === 11) {
        newYear++;
        return 0;
      }
      return prevMonth + 1;
    });
    generateCalendar(currentYear, currentMonth);
  };

  return (
    <div className="bg-gray-100 flex items-center justify-center h-screen w-full">
      <div className="lg:w-7/12 md:w-9/12 sm:w-10/12 mx-auto p-4">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="flex items-center justify-between px-6 py-3 bg-gray-700">
            <button
              id="prevMonth"
              className="text-white"
              onClick={handlePrevMonth}
            >
              <CaretLeft size={25} />
            </button>
            <h2 id="currentMonth" className="text-white"></h2>
            <button
              id="nextMonth"
              className="text-white"
              onClick={handleNextMonth}
            >
              <CaretRight size={25} />
            </button>
          </div>
          <div className="grid grid-cols-7 gap-2 p-4" id="calendar">
            {/* Calendário vai aqui */}
          </div>
          <div
            id="myModal"
            className={`modal ${
              modalVisible ? "" : "hidden"
            } fixed inset-0 flex items-center justify-center z-50`}
          >
            <div className="modal-overlay absolute inset-0 bg-black opacity-50"></div>
            <div className="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
              <div className="modal-content py-4 text-left px-6">
                <div className="flex justify-between items-center pb-3">
                  <p className="text-2xl font-bold">Selected Date</p>
                  <button
                    id="closeModal"
                    className="modal-close px-3 py-1 rounded-full bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring"
                    onClick={hideModal}
                  >
                    ✕
                  </button>
                </div>
                <div id="modalDate" className="text-xl font-semibold">
                  {selectedDate}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;

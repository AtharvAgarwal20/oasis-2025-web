import { useState, forwardRef } from "react";
import styles from "./Events.module.scss";

const eventList = [
  { id: 1, name: "Event 1" },
  { id: 2, name: "Event 2" },
  { id: 3, name: "Event 3" },
];

type PropsType = {
  onClickNext: () => void;
};

const Events = forwardRef<HTMLDivElement, PropsType>(({ onClickNext }, ref) => {
  const [selectedEvents, setSelectedEvents] = useState<
    { id: number; name: string }[]
  >(JSON.parse(sessionStorage.getItem("selectedEvents") || "[]"));

  const addEvent = (event: { id: number; name: string }) => {
    sessionStorage.setItem(
      "selectedEvents",
      JSON.stringify([...selectedEvents, event])
    );
    setSelectedEvents((prev) => [...prev, event]);
  };
  const removeEvent = (event: { id: number; name: string }) => {
    sessionStorage.setItem(
      "selectedEvents",
      JSON.stringify(selectedEvents.filter((e) => e.id !== event.id))
    );
    setSelectedEvents((prev) => prev.filter((e) => e.id !== event.id));
  };
  return (
    <div className={styles.eventsContainer} ref={ref}>
      <h1 className={styles.heading}>Events</h1>
      <ul className={styles.eventsList}>
        {eventList.map((event) => (
          <li key={event.id} className={styles.eventItem}>
            {event.name}
            <button
              onClick={() => addEvent(event)}
              disabled={selectedEvents.some((e) => e.id === event.id)}
            >
              {selectedEvents.some((e) => e.id === event.id)
                ? "Added"
                : "Add Event"}
            </button>
          </li>
        ))}
      </ul>
      <div className={styles.selectedEvents}>
        <h2 className={styles.subheading}>Selected Events</h2>
        <ul>
          {eventList.map((event) => {
            const isSelected = selectedEvents.some((e) => e.id === event.id);
            return isSelected ? (
              <li key={event.id}>
                {event.name}
                <button
                  onClick={() => {
                    removeEvent(event);
                  }}
                >
                  Remove Event
                </button>
              </li>
            ) : null;
          })}
        </ul>
      </div>
      <div className={styles.confirm}>
        <button
          onClick={() => {
            console.log("Confirmed Events:", selectedEvents);
            onClickNext();
          }}
          disabled={selectedEvents.length === 0}
        >
          {selectedEvents.length > 0
            ? `Confirm Selection (${selectedEvents.length})`
            : "No Events Selected"}
        </button>
      </div>
    </div>
  );
});

export default Events;

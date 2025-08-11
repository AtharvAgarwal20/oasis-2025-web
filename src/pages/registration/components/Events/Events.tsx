import { useState, forwardRef, useRef, useEffect } from "react";
import React from "react";
import axios from "axios";

import styles from "./Events.module.scss";

import CloudLeft from "/svgs/registration/left.svg";
import CloudRight from "/svgs/registration/right.svg";
import thumb from "/svgs/registration/scrollThumb.svg";

import ConfirmModal from "../ConfirmModal/ConfirmModal";

const Events = forwardRef<
  HTMLDivElement,
  { userData: any; setUserData: React.Dispatch<React.SetStateAction<any>> }
>(({ userData, setUserData }, ref) => {
  const mainContainerRef = useRef<HTMLUListElement>(null);
  const scrollBarRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLImageElement>(null);

  const [selectedEvents, setSelectedEvents] = useState<
    { id: number; name: string }[]
  >(JSON.parse(sessionStorage.getItem("selectedEvents") || "[]"));

  const [confirmModal, setConfirmModal] = useState(false);
  const [eventsOptions, setEventsOptions] = useState<
    { id: number; name: string }[]
  >([]);

  useEffect(() => {
    axios
      .get(
        "https://merge.bits-apogee.org/2025/main/registrations/events_details/"
      )
      .then((response) => {
        setEventsOptions(response.data);
      })
      .catch((error) => console.error("Error fetching events:", error));
  }, []);

  function handleScroll() {
    if (!mainContainerRef.current || !thumbRef.current) return;
    const maxScrollTopValue =
      mainContainerRef.current.scrollHeight -
      mainContainerRef.current.clientHeight;
    const percentage =
      (mainContainerRef.current.scrollTop / maxScrollTopValue) * 100;
    percentage > 100
      ? (thumbRef.current.style.top = "100%")
      : (thumbRef.current.style.top = `${percentage}%`);
  }

  useEffect(() => {
    if (!mainContainerRef.current) return;
    mainContainerRef.current.addEventListener("scroll", handleScroll);

    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleEvent = (event: { id: number; name: string }) => {
    if (selectedEvents.some((e) => e.id === event.id)) {
      sessionStorage.setItem(
        "selectedEvents",
        JSON.stringify(selectedEvents.filter((e) => e.id !== event.id))
      );
      setSelectedEvents((prev) => prev.filter((e) => e.id !== event.id));
    } else {
      console.log("Event already selected:", event);
      sessionStorage.setItem(
        "selectedEvents",
        JSON.stringify([...selectedEvents, event])
      );
      setSelectedEvents((prev) => [...prev, event]);
    }
  };

  const handlewheelMouseDown = (
    e: React.MouseEvent<HTMLImageElement> | React.TouchEvent<HTMLImageElement>
  ) => {
    e.preventDefault();

    document.addEventListener("mousemove", handlewheelDragMove);
    document.addEventListener("touchmove", handlewheelDragMove);

    document.addEventListener("mouseup", handlewheelDragEnd);
    document.addEventListener("touchend", handlewheelDragEnd);
  };

  const handlewheelDragMove = (e: MouseEvent | TouchEvent) => {
    if (!mainContainerRef.current || !scrollBarRef.current) return;

    const maxScrollTopValue =
      mainContainerRef.current.scrollHeight -
      mainContainerRef.current.clientHeight;

    const clientY = e instanceof TouchEvent ? e.touches[0].clientY : e.clientY;

    const percentage =
      ((clientY - scrollBarRef.current.offsetTop) /
        scrollBarRef.current.clientHeight) *
      100;

    mainContainerRef.current.scrollTop = (percentage / 100) * maxScrollTopValue;
  };

  const handlewheelDragEnd = () => {
    document.removeEventListener("mousemove", handlewheelDragMove);
    document.removeEventListener("mouseup", handlewheelDragEnd);
    document.removeEventListener("touchmove", handlewheelDragMove);
    document.removeEventListener("touchend", handlewheelDragEnd);
  };

  const handleTrackSnap = (e: React.MouseEvent | React.TouchEvent) => {
    if (!mainContainerRef.current || !scrollBarRef.current) return;
    const mainWrapperElement = mainContainerRef.current;
    const scrollBarContainer = scrollBarRef.current;

    const percentage =
      (("touches" in e ? e.touches[0].clientY : e.clientY) /
        scrollBarContainer.clientHeight) *
      100;
    const maxScrollTopValue =
      mainWrapperElement.scrollHeight - mainWrapperElement.clientHeight;

    mainWrapperElement.scrollTo({
      top: (percentage / 100) * maxScrollTopValue,
      behavior: "smooth",
    });
  };

  const handleSubmit = () => {
    setUserData((prevData: any) => ({
      ...prevData,
      selectedEvents,
    }));
    setConfirmModal(true);
  };

  return (
    <>
      <div className={styles.eventsContainer} ref={ref}>
        <div className={styles.eventsSubContainer}>
          <h1 className={styles.heading}>CHOOSE EVENTS</h1>
          <ul className={styles.eventsList} ref={mainContainerRef}>
            {eventsOptions.map((event) => (
              <li
                key={event.id}
                onClick={() => handleEvent(event)}
                className={`${styles.eventItem} ${
                  selectedEvents.some((e) => e.id === event.id)
                    ? styles.eventItemSelected
                    : ""
                }`}
              >
                <img src={CloudLeft} alt="" />
                <button>{event.name}</button>
                <img src={CloudRight} alt="" />
              </li>
            ))}
          </ul>
          <div className={styles.confirm}>
            <button
              onClick={handleSubmit}
              disabled={selectedEvents.length === 0}
            >
              {selectedEvents.length > 0
                ? `Confirm Selection`
                : "No Events Selected"}
            </button>
          </div>
        </div>
        <div
          className={styles.scrollBarContainer}
          ref={scrollBarRef}
          onClick={handleTrackSnap}
        >
          <div className={styles.scrollBar}></div>
          <img
            src={thumb}
            alt="thumb"
            draggable={false}
            onMouseDown={handlewheelMouseDown}
            onTouchStart={handlewheelMouseDown}
            ref={thumbRef}
          />
        </div>
      </div>
      {confirmModal && (
        <ConfirmModal
          onCancel={() => setConfirmModal(false)}
          selectedEvents={selectedEvents}
          userData={userData}
        />
      )}
    </>
  );
});

export default Events;

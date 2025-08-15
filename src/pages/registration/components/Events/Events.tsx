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
        "https://bits-oasis.org/2025/main/registrations/events_details/"
      )
      .then((response) => {
        console.log("Events fetched successfully:", response.data);
        setEventsOptions(response.data);
      })
      .catch((error) => console.error("Error fetching events:", error));
  }, []);

  const handleEvent = (event: { id: number; name: string }) => {
    if (selectedEvents.some((e) => e.id === event.id)) {
      sessionStorage.setItem(
        "selectedEvents",
        JSON.stringify(selectedEvents.filter((e) => e.id !== event.id))
      );
      setSelectedEvents((prev) => prev.filter((e) => e.id !== event.id));
    } else {
      sessionStorage.setItem(
        "selectedEvents",
        JSON.stringify([...selectedEvents, event])
      );
      setSelectedEvents((prev) => [...prev, event]);
    }
  };

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
      events: selectedEvents.map((event) => event.id),
    }));
    setConfirmModal(true);
  };

  return (
    <>
      <div className={styles.eventsContainer} ref={ref}>
        <div className={styles.eventsSubContainer}>
          <h1 className={styles.heading}>CHOOSE EVENTS</h1>
          <div className={styles.search}> <div>
            SEARCH</div> 

            <svg width="1.2vw" height="1.2vw" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M27.6667 30L17.1667 19.5C16.3333 20.1667 15.375 20.6944 14.2917 21.0833C13.2083 21.4722 12.0556 21.6667 10.8333 21.6667C7.80556 21.6667 5.24333 20.6178 3.14667 18.52C1.05 16.4222 0.00111199 13.86 8.81834e-07 10.8333C-0.00111023 7.80667 1.04778 5.24444 3.14667 3.14667C5.24556 1.04889 7.80778 0 10.8333 0C13.8589 0 16.4217 1.04889 18.5217 3.14667C20.6217 5.24444 21.67 7.80667 21.6667 10.8333C21.6667 12.0556 21.4722 13.2083 21.0833 14.2917C20.6944 15.375 20.1667 16.3333 19.5 17.1667L30 27.6667L27.6667 30ZM10.8333 18.3333C12.9167 18.3333 14.6878 17.6044 16.1467 16.1467C17.6056 14.6889 18.3344 12.9178 18.3333 10.8333C18.3322 8.74889 17.6033 6.97833 16.1467 5.52167C14.69 4.065 12.9189 3.33556 10.8333 3.33333C8.74778 3.33111 6.97722 4.06056 5.52167 5.52167C4.06611 6.98278 3.33667 8.75333 3.33333 10.8333C3.33 12.9133 4.05945 14.6844 5.52167 16.1467C6.98389 17.6089 8.75445 18.3378 10.8333 18.3333Z" fill="white"/>
</svg>


          </div>
          <ul className={styles.eventsList} ref={mainContainerRef}>
            {eventsOptions.map((event, index) => (
              <li
                key={index}
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
          <button
            className={styles.confirmButton}
            onClick={handleSubmit}
            disabled={selectedEvents.length === 0}
          >
            <svg
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={styles.confirmIcon}
            >
              <path
                d="M0 3.80298C2.50922 3.80298 66.6863 5.62965 83.2277 6.54299L87.8205 3.80298L83.2277 0.925964L0 3.80298Z"
                fill="white"
                stroke="white"
                strokeWidth="0.16"
              />
            </svg>

            {selectedEvents.length > 0
              ? `CONFIRM SELECTION`
              : "NO EVENTS SELECTED"}
            <svg
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={styles.confirmIcon}
            >
              <path
                d="M0 3.80298C2.50922 3.80298 66.6863 5.62965 83.2277 6.54299L87.8205 3.80298L83.2277 0.925964L0 3.80298Z"
                fill="white"
                stroke="white"
                strokeWidth="0.16"
              />
            </svg>
          </button>
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

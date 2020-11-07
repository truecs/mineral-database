import React from "react";
import Element from "./Element";
import { elements } from "./data/periodic-table";
import styled from "styled-components/macro";

const PeriodicTableWrapper = styled.div`
  padding-left: 1rem;
  .card1 {
    display: grid;
    grid-template-columns: repeat(18, auto);
    grid-gap: 0.2rem;
    grid-row-gap: 0.5rem;
  }

  @-webkit-keyframes slide-in-blurred-top {
    0% {
      -webkit-transform: translateY(-1000px) scaleY(2.5) scaleX(0.2);
      transform: translateY(-1000px) scaleY(2.5) scaleX(0.2);
      -webkit-transform-origin: 50% 0%;
      transform-origin: 50% 0%;
      -webkit-filter: blur(40px);
      filter: blur(40px);
      opacity: 0;
    }
    100% {
      -webkit-transform: translateY(0) scaleY(1) scaleX(1);
      transform: translateY(0) scaleY(1) scaleX(1);
      -webkit-transform-origin: 50% 50%;
      transform-origin: 50% 50%;
      -webkit-filter: blur(0);
      filter: blur(0);
      opacity: 1;
    }
  }
  @keyframes slide-in-blurred-top {
    0% {
      -webkit-transform: translateY(-1000px) scaleY(2.5) scaleX(0.2);
      transform: translateY(-1000px) scaleY(2.5) scaleX(0.2);
      -webkit-transform-origin: 50% 0%;
      transform-origin: 50% 0%;
      -webkit-filter: blur(40px);
      filter: blur(40px);
      opacity: 0;
    }
    100% {
      -webkit-transform: translateY(0) scaleY(1) scaleX(1);
      transform: translateY(0) scaleY(1) scaleX(1);
      -webkit-transform-origin: 50% 50%;
      transform-origin: 50% 50%;
      -webkit-filter: blur(0);
      filter: blur(0);
      opacity: 1;
    }
  }

  -webkit-animation: slide-in-blurred-top 1s
    cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
  animation: slide-in-blurred-top 1s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`;

const PeriodicTable = (props) => {
  let periodicTable = [];
  for (let element_num = 1; element_num < 58; element_num++) {
    periodicTable.push(
      <Element
        className="element"
        key={element_num}
        value={elements[element_num]}
        onClick={() => props.selectElement(element_num)}
        selected={props.selectedElements[element_num]}
      />
    );
  }
  for (let element_num = 72; element_num < 90; element_num++) {
    periodicTable.push(
      <Element
        className="element"
        key={element_num}
        value={elements[element_num]}
        onClick={() => props.selectElement(element_num)}
        selected={props.selectedElements[element_num]}
      />
    );
  }
  for (let element_num = 104; element_num < 119; element_num++) {
    periodicTable.push(
      <Element
        className="element"
        key={element_num}
        value={elements[element_num]}
        onClick={() => props.selectElement(element_num)}
        selected={props.selectedElements[element_num]}
      />
    );
  }
  return (
    <PeriodicTableWrapper>
      <section className="card1">{periodicTable}</section>
    </PeriodicTableWrapper>
  );
};

export default PeriodicTable;
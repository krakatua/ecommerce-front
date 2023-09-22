import React from "react";
import { GridLoader } from "react-spinners";
import styled from "styled-components";

const Wrapper = styled.div`
  ${(props) =>
    props.fullWidth
      ? " display:flex;  justify-content:center; margin-top:100px"
      : "border: 5px solid blue"}
`;
export default function Spinner({ fullWidth }) {
  return (
    <Wrapper fullWidth>
      <GridLoader speedMultiplier={1} color={"#555"} />;
    </Wrapper>
  );
}

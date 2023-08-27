import styled from "styled-components";
import css from "styled-jsx/css";

export const ButtonStyle = css`
  border: 0;
  padding: 5px 15px;
  border-radius: 5px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  text-decoration: none;
  border: 1px solid #fff;
  color: #fff;

  

  svg {
    margin-right: 5px;
  }
`;

const StyledBtn = styled.button`
      ${ButtonStyle}

      ${(props) =>
    props.white &&
    !props.outline &&
    css`
      background-color: #fff;
      color: black;
    `}

  ${(props) =>
    props.outline &&
    props.outline &&
    css`
      background-color: transparent;
      color: #fff;
      border: 1px solid #fff;

      svg {
        margin-left: 5px;
      }
    `}

    ${(props) =>
    props.primary == 1 &&
    css`
      background-color: #5542f6;
      color: #fff;
    `}
`;

export default function Button({ children, ...rest }) {
  return <StyledBtn {...rest}>{children}</StyledBtn>;
}

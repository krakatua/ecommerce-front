import styled from "styled-components";

const StyledArea = styled.textarea`
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
    margin-bottom: 10px;
    font-family: 'inherit';
`;

export default function Textarea(props) {
    return <StyledArea {...props} />;
}
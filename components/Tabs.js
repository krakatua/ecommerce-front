import styled from "styled-components";

const StyledTabs = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
`;

const StyledTab = styled.span`
  font-size: 1.5rem;
    cursor: pointer;
  ${(props) =>
    props.active
      ? `
        border-bottom: 2px solid black;
    `
      : `
        color: #999;
        cursor: pointer;
    `}
`;

export default function Tabs({ tabs, active, onChange }) {
  return (
    <StyledTabs>
      {tabs.map((tab, index) => (
        <div key={index}>
          <StyledTab 
          onClick={() => {onChange(tab)}}
          active={tab === active}>{tab}</StyledTab>
        </div>
      ))}
    </StyledTabs>
  );
}

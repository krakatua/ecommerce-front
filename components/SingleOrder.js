import styled from "styled-components";

const StyledOrder = styled.div`
  margin: 5px 0;
  border-bottom: 2px solid black;
  padding: 10px 0;
  display: flex;
   align-items: center;
   gap: 20px;

  time {
    font-size: 1rem;
    font-weight: bold;
    color: #777;
  }
`;

const ProductRow = styled.div`
  display: flex;
  align-items: center;
  span {
    color: #888;
  }
`;

const Address = styled.div`
    color: black;
    font-size: .8rem;
    line-height: .8rem;
    margin-top: 10px;
`;

export default function SingleOrder({ line_items, createdAt, ...rest}) {
  return (
    <StyledOrder>
      <div>
        <time>{new Date(createdAt).toLocaleString("sv-SE")} </time>
      <Address>
        Address: <br/>
        {rest.name} <br/>
        {rest.email} <br/>
        {rest.city} <br/>
        {rest.postalCode} <br/>
        {rest.streetAddress} <br/>
        {rest.country} <br/>

      </Address>
      </div>
      <div>
        {line_items.map((item, index) => (
          <ProductRow>
            <span>{item.quantity} x </span>
            <p>{item?.price_data?.product_data?.name}</p>
          </ProductRow>
        ))}
      </div>
    </StyledOrder>
  );
}

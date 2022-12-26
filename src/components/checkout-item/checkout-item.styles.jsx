import styled from "styled-components";

export const CheckoutItemContainer = styled.div`
  width: 100%;
  display: flex;
  min-height: 100px;
  border-bottom: 1px solid #1b1b1b;
  padding: 15px 0;
  font-size: 20px;
`;

export const ImageContainer = styled.div`
  width: 23%;
  padding-right: 15px;
  text-align: center;
  img {
    width: 50%;
    height: 50%;
  }
`;

export const TextContainer = styled.span`
  width: 23%;
`;

export const QuantityContainer = styled(TextContainer)`
  display: flex;
  justify-content: center;
  span {
    margin: 0 10px;
  }
  div {
    cursor: pointer;
  }
`;

export const RemoveButtonContainer = styled.div`
  padding-left: 12px;
  cursor: pointer;
  text-align: center;
  width: 9%;
`;

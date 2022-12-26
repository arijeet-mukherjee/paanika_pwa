import styled from "styled-components";

export const CheckoutPageContainer = styled.div`
  background-color: #fff;
  width: 85%;
  min-height: auto;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content:center;
  align-items: center;
  overflow-wrap: break-word;
  margin: 50px auto 0;
  button {
    margin-left: auto;
    margin-top: 50px;
  }
  box-sizing: border-box;
  border: 2px solid #000000;
  border-radius: 10px;
  margin-top: 110px;
  margin-bottom: 32px;

`;

export const CheckoutHeaderContainer = styled.div`
  width: 100%;
  height: 40px;
  min-height: 80px;
  display: flex;
  justify-content:center;
  align-items: center;
  border-bottom: 2px solid #000000;
  margin: 20px 0;
`;

export const HeaderBlockContainer = styled.div`
  text-transform: capitalize;
  align-items: center;
  text-align: center;
  font-weight: 700;
  width: 23%;
  &:last-child {
    width: 8%;
  }
`;

export const TotalContainer = styled.div`
  margin-top: 30px;
  margin-left: auto;
  font-weight : 700;
  padding : 5px;
  font-size: 26px;
`;

export const WarningContainer = styled.div`
  text-align: center;
  margin-top: 40px;
  font-size: 24px;
  color: red;
`;

export const HoverContainer = styled.div`
  flex : 1 0;
    &:hover .btn-dark {
      background: #000;
      color : #fff;
    }
    &:hover .btn {
      background: #000;
      color : #fff;
    }
`;


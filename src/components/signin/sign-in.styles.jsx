import styled from "styled-components";

export const SignInContainer = styled.div`
  width: 580px;
  display: flex;
  flex-direction: column;
  position:relative;
  box-sizing: border-box;
  border: 2px solid #000000;
  border-radius: 10px;
  padding:15px;
  margin-top : -90px;
  @media (max-width: 768px) {
    flex-direction: column;
    gap :20px;
    width: 100%;
    gap :10px;
    margin-top : auto;
  }
`;

export const SignInTitle = styled.h2`
  margin: 10px 0;
`;

export const ButtonsBarContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

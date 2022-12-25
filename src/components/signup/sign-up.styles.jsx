import styled from "styled-components";

export const SignUpContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 580px;
  position:relative;
  border: 2px solid #000000;
  border-radius: 10px;
  padding:15px;
  margin-top : 50px;
  @media (max-width: 768px) {
    flex-direction: column;
    gap :20px;
    width: 100%;
    gap :10px;
    margin-top : auto;
  }
`;

export const SignUpTitle = styled.h2`
  margin: 10px 0;
`;

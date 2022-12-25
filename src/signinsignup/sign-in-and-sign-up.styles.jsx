import styled from "styled-components";

export const SignInAndSignUpContainer = styled.div`
    width: 1000px;
    display:flex;
    flex-direction:row;
    align-items:center;
    margin-right: auto;
    margin-left: auto;
    margin-top : 88px;
    gap :80px;
    position:  relative;
    margin-bottom :10px;
    text-align:center;
    padding-right: var(--bs-gutter-x, 0.75rem);
    padding-left: var(--bs-gutter-x, 0.75rem);
    @media (max-width: 768px) {
        flex-direction: column;
        gap :20px;
        width: 100%;
        gap :10px;
      }
`;

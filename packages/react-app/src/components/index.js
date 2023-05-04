import styled from "styled-components";

export const Body = styled.div`
  align-items: center;
  color: white;
  display: flex;
  flex-direction: column;
  font-size: calc(10px + 2vmin);
  justify-content: center;
  margin-top: 40px;
`;

export const Button = styled.button`
  background-color: #bfc500;
  border: none;
  border-radius: 8px;
  color: #000;
  cursor: pointer;
  font-size: 12px;
  margin: 0px 5px;
  font-weight: bold;
  padding: 9px 18px;
  text-align: center;
  text-decoration: none;
  position: absolute;
  text-transform: uppercase;
  right: 8px;
  @media (max-width: 768px) {
    padding: 8px 16px;
    font-size: 10px;
    margin: 0px;
  }
  :hover{
    color: #fff;
    box-shadow: 0 5px 15px #7b9c13;
  }
`;

export const ButtonPrimary = styled.button`
  border: none;
  color: #000;
  cursor: pointer;
  margin: 0px 20px;
  padding: 12px 24px;
  text-align: center;
  text-decoration: none;
  text-transform: uppercase;
  background: #bfc500;
  border-radius: 10px;
  font-weight: bold;
  font-size: 14px;
  :hover{
    color: #fff;
    box-shadow: 0 5px 15px #7b9c13;
  }
`;

export const ButtonSecondary = styled.button`
text-transform: uppercase;
  border: none;
  color: #fff;
  cursor: pointer;
  margin: 0px 20px;
  padding: 12px 24px;
  text-align: center;
  text-decoration: none;
  background: transparent;
  border-radius: 10px;
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  border: 1px solid #fff;
  :hover{
    color: #fff;
    box-shadow: 0 5px 15px #fff;
  }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh);
`;

export const Header = styled.header`
  align-items: center;
  color: white;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  min-height: 70px;
`;

export const Image = styled.img`
  height: 40vmin;
  margin-bottom: 16px;
  pointer-events: none;
`;

export const Link = styled.a.attrs({
  target: "_blank",
  rel: "noopener noreferrer",
})`
  color: #61dafb;
  margin-top: 8px;
`;

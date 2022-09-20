import React, { createContext, useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import { MdDone, MdAdd } from 'react-icons/md';
import { Link, useLocation, useParams } from 'react-router-dom';
import '../../shared/linkStyle.css';

const BoxPositioner = styled.div`
  border: 1px solid #eeeeee;
  box-shadow: 0px 0px 4px gray;
  height: 50px;
  margin: 0px 20px;
  display: flex;
  align-items: center;
  justify-content: left;
  padding-left: 20px;
  margin-top: 12px;
`;

const TitlePositioner = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
`;

const Title = styled.div`
  font-size: 16px;
  font-weight: 200;
`;

const CircleOpidButton = styled.div`
  background: black;
  width: 18px;
  height: 18px;
  color: white;
  border-radius: 50%;
  border: none;
  outline: none;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 10px;
  margin-top: 3px;
  transition: 0.125s all ease-in;
  ${(props) =>
    props.miduOpid &&
    css`
      background: #ff6b6b;
      &:hover {
        background: #ff8787;
      }
      &:active {
        background: #fa5252;
      }
      transform: rotate(45deg);
    `}
`;

const CategoryPositioner = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-left: 20px;
`;

const CircleCheckButton = styled.div`
  width: 16px;
  height: 16px;
  border-radius: 16px;
  border: 1px solid #ced4da;
  font-size: 16px;
  cursor: pointer;
  margin-top: 3px;
  margin-right: 5px;
  margin-left: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CategoryName = styled.div`
  font-size: 15px;
  font-weight: 100;
  margin-right: 10px;
`;

const ConsonantPositioner = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-left: 8px;
  border-left: 1px solid #ced4da;
  padding-left: 15px;
`;

const CircleColorButton = styled.div`
  width: 13px;
  height: 13px;
  border-radius: 16px;
  border: 1px solid #ced4da;
  font-size: 16px;
  cursor: pointer;
  margin-top: 3px;
  margin-right: 5px;
  margin-left: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 3px 3px;
  background-color: ${(props) => (props.select ? 'black' : '')};
  color: ${(props) => (props.select ? 'white' : 'black')};
`;

export const selectedConsonant = createContext();

function SortBlock({ children }) {
  // 분류기준 midu Opid
  const [miduOpid, setMiduOpid] = useState(true);
  const handleMiduOpidButton = () => setMiduOpid(!miduOpid);

  // Select Category midu
  const [selectByBook, setSelectByBook] = useState(true);
  const [selectByAuthor, setSelectByAuthor] = useState(false);
  const handleSelectByBook = () => {
    setSelectByBook(true);
    setSelectByAuthor(false);
  };
  const handleSelectByAuthor = () => {
    setSelectByAuthor(true);
    setSelectByBook(false);
  };

  // consonant에 따른 link 연결
  const { literature } = useParams();
  const { pathname } = useLocation();
  const includeByBook = pathname.includes('bybook');
  const includeByAuthor = pathname.includes('byauthor');
  const byBookLink = `/original-text/${literature}/bybook/`;
  const byAuthorLink = `/original-text/${literature}/byauthor/`;

  // consonant 설정
  const [consonant, setConsonant] = useState('Z');
  const consonants = [
    { consonant: '가', id: 'A' },
    { consonant: '나', id: 'B' },
    { consonant: '다', id: 'C' },
    { consonant: '라', id: 'D' },
    { consonant: '마', id: 'E' },
    { consonant: '바', id: 'F' },
    { consonant: '사', id: 'G' },
    { consonant: '아', id: 'H' },
    { consonant: '자', id: 'I' },
    { consonant: '차', id: 'J' },
    { consonant: '카', id: 'K' },
    { consonant: '타', id: 'L' },
    { consonant: '파', id: 'M' },
    { consonant: '하', id: 'N' },
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [consonant]);

  return (
    <selectedConsonant.Provider value={consonant}>
      <BoxPositioner>
        <TitlePositioner onClick={handleMiduOpidButton}>
          <Title>분류기준</Title>
          <CircleOpidButton miduOpid={miduOpid}>
            <MdAdd />
          </CircleOpidButton>
        </TitlePositioner>

        <>
          <CategoryPositioner>
            <Link to={byBookLink} className="link-line">
              <CircleCheckButton onClick={handleSelectByBook}>
                {selectByBook && <MdDone />}
              </CircleCheckButton>
            </Link>
            <CategoryName>서명별</CategoryName>

            <Link to={byAuthorLink} className="link-line">
              <CircleCheckButton onClick={handleSelectByAuthor}>
                {selectByAuthor && <MdDone />}
              </CircleCheckButton>
            </Link>
            <CategoryName>저자별</CategoryName>
          </CategoryPositioner>
        </>

        <ConsonantPositioner>
          {consonants.map((item) => (
            <CircleColorButton
              select={item.id === consonant}
              key={item.id}
              onClick={() => setConsonant(item.id)}>
              {item.consonant}
            </CircleColorButton>
          ))}
        </ConsonantPositioner>
      </BoxPositioner>
      {children}
    </selectedConsonant.Provider>
  );
}

export default SortBlock;

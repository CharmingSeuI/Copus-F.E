import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import { MdDone, MdAdd } from 'react-icons/md';
import { Link, useLocation, useParams } from 'react-router-dom';

const Positioner = styled.div`
  border: 1px solid #eeeeee;
  box-shadow: 0px 0px 4px gray;
  height: 10%;
  margin: 12px 20px;
  display: flex;
  align-items: center;
  .link-line {
    list-style: none;
    text-decoration-line: none;
    color: black;
  }
`;

const TitleBlock = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-left: 20px;
  cursor: pointer;
`;

const CircleButton = styled.div`
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
    props.menuOpen &&
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

const Title = styled.div`
  font-size: 16px;
  font-weight: 200;
`;

const CategoryBlock = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-left: 20px;
`;

const Name = styled.div`
  font-size: 15px;
  font-weight: 100;
  margin-right: 10px;
`;

const CheckCircle = styled.div`
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

const ConsonantBlock = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-left: 8px;
  border-left: 1px solid #ced4da;
  padding-left: 15px;
`;

const ChooseCircle = styled.div`
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
function SortBlock({ open }) {
  //???????????? menuOpen
  const [menuOpen, setMenuOpen] = useState(false);
  const onClickPlusButton = () => setMenuOpen(!menuOpen);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  // ????????? vs ?????????
  const [selectByBook, setSelectByBook] = useState(false);
  const [selectByAuthor, setSelectByAuthor] = useState(false);
  const onSelectByBook = () => {
    setSelectByBook(true);
    setSelectByAuthor(false);
  };
  const onSelectByAuthor = () => {
    setSelectByAuthor(true);
    setSelectByBook(false);
  };

  //?????????????????????
  const { literature, consonant } = useParams();
  const { pathname } = useLocation();
  const includeByBook = pathname.includes('bybook');
  const includeByAuthor = pathname.includes('byauthor');

  const byBookLink = `/original-text/${literature}/bybook/`;
  const byAuthorLink = `/original-text/${literature}/byauthor/`;

  useEffect(() => {
    if (open) {
      setMenuOpen(true);
      setSelectByBook(includeByBook);
      setSelectByAuthor(includeByAuthor);
    }
  }, []);

  const consonants = [
    { id: 0, consonant: '???' },
    { id: 1, consonant: '???' },
    { id: 2, consonant: '???' },
    { id: 3, consonant: '???' },
    { id: 4, consonant: '???' },
    { id: 5, consonant: '???' },
    { id: 6, consonant: '???' },
    { id: 7, consonant: '???' },
    { id: 8, consonant: '???' },
    { id: 9, consonant: '???' },
    { id: 10, consonant: '???' },
    { id: 11, consonant: '???' },
    { id: 12, consonant: '???' },
    { id: 13, consonant: '???' },
  ];
  return (
    <Positioner>
      <TitleBlock onClick={onClickPlusButton}>
        <Title>????????????</Title>
        <CircleButton menuOpen={menuOpen}>
          <MdAdd />
        </CircleButton>
      </TitleBlock>

      {menuOpen && (
        <>
          <CategoryBlock>
            <Link to={byBookLink} className="link-line">
              <CheckCircle onClick={onSelectByBook}>
                {selectByBook && <MdDone className="check-icon" />}
              </CheckCircle>
            </Link>
            <Name>?????????</Name>

            <Link to={byAuthorLink} className="link-line">
              <CheckCircle onClick={onSelectByAuthor}>
                {selectByAuthor && <MdDone className="check-icon" />}
              </CheckCircle>
            </Link>
            <Name>?????????</Name>
          </CategoryBlock>
        </>
      )}

      {menuOpen && selectByBook && (
        <ConsonantBlock>
          {consonants.map((item) => (
            <Link to={byBookLink + item.consonant} className="link-line">
              <ChooseCircle key={item.id} select={item.consonant === consonant}>
                {item.consonant}
              </ChooseCircle>
            </Link>
          ))}
        </ConsonantBlock>
      )}

      {menuOpen && selectByAuthor && (
        <ConsonantBlock>
          {consonants.map((item) => (
            <Link to={byAuthorLink + item.consonant} className="link-line">
              <ChooseCircle key={item.id} select={item.consonant === consonant}>
                {item.consonant}
              </ChooseCircle>
            </Link>
          ))}
        </ConsonantBlock>
      )}
    </Positioner>
  );
}

export default SortBlock;

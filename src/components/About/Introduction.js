import React from 'react';
import styled from 'styled-components';
import cardBg1 from './cardBg1.PNG';
import cardBg2 from './cardBg2.PNG';

const IntroBlock = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 60px 10%;
`;

const CardBlock2 = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 90px;
`;

const Card = styled.div`
  height: 250px;
  width: 1500px;
  background-image: url(${cardBg1});
  background-size: 100% 100%;
  @media screen and (max-width : 800px){
    display : none;
  }
`;

const FontBlock = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 50px;
`;

const TitleFontStyle = styled.div`
  font-size: 15px;
  color: gray;
  margin-bottom: 1px;
`;

const SubTitleFontStyle = styled.div`
  font-size: 27px;
  font-weight: bold;
`;

const TextFontStyle = styled.div`
  font-size: 17px;
  margin-top: 20px;
  text-indent: 2em;
`;

const TextFontStyle2 = styled.div`
  font-size: 17px;
  //margin-top: 20px;
  text-indent: 2em;
`;
function Introduction() {
  return (
    <IntroBlock>
      <Card>

      </Card>
      <FontBlock>
        <TitleFontStyle>인사말</TitleFontStyle>
        <SubTitleFontStyle>
          성균한문고전코퍼스를 방문해 주신 여러분을 환영합니다!
        </SubTitleFontStyle>
        <TextFontStyle>
          코퍼스(Corpus, 말뭉치)는 특정한 목적을 가지고 ‘뭉쳐 놓은’ 텍스트의 총체, 
          즉 연구 등의 목적을 위해 여러 텍스트를 수집해 체계적인 형태로 구축한 데이터를 
          뜻하는 용어입니다. <br/><br/> 
        </TextFontStyle> 
        <TextFontStyle2> 
          장기간 진행되어 온 여러 연구 및 작업의 성과로 현재 우리는 
          수많은 한문 자료들을 웹 환경에서 편리하게 이용할 수 있습니다. 이러한 한문 자료들을 
          단순히 검색하고 읽으며 연구를 진행하는 단계를 넘어 이 한문 자료들을 하나의 ‘데이터’로 
          인식하는 단계로 나아가야 한다는 취지로 ‘성균 코퍼스 프로젝트’가 시작되었습니다. 
        </TextFontStyle2>
      </FontBlock>
    </IntroBlock>
  );
}

export default Introduction;

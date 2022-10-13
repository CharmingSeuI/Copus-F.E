import React, { useContext } from 'react';
import styled from 'styled-components';
import '../../../shared/linkStyle.css';
import OtherListTableBlock from '../OtherListTableBlock';

import useAsync from '../../../../hooks/useAsync';
import getRightGwoncha from '../../../../api/explore/rightblock/getRightGwoncha';

import { seojiContext } from '../../../shared/ContentLayout';
import parseGwoncha from '../../../../utils/parseGwoncha';
import parseMunche from '../../../../utils/parseMunche';

const TableItem = styled.p`
  font-size: 15px;
  margin: 0;
`;

function GwonchaContentListBlock() {
  const clickSeojiContext = useContext(seojiContext);
  const [gwonchaJsonDatas] = useAsync(
    () => getRightGwoncha(clickSeojiContext),
    [clickSeojiContext.clickSeoji],
  );

  if (gwonchaJsonDatas.data === null || gwonchaJsonDatas.data === undefined)
    return <div>로딩</div>;
  return (
    <>
      {gwonchaJsonDatas.data.datas.map((gwoncha) => (
        <>
          <OtherListTableBlock
            icon="gwoncha"
            key={gwoncha.gwonchaId}
            clickId={gwoncha.gwonchaId}
            currentTitle={parseGwoncha(gwoncha.gwonchaTitle)}>
            <TableItem>{parseGwoncha(gwoncha.gwonchaTitle)}</TableItem>
          </OtherListTableBlock>

          {gwoncha.munches.map((item) => (
            <OtherListTableBlock
              marginLeft="39px"
              icon="munche"
              key={item.muncheId}
              clickId={item.muncheId}
              parentId={gwoncha.gwonchaId}
              currentTitle={parseMunche(item.muncheTitle)}>
              <TableItem>{parseMunche(item.muncheTitle)}</TableItem>
            </OtherListTableBlock>
          ))}
        </>
      ))}
    </>
  );
}

export default GwonchaContentListBlock;

import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import Layout from '../../../components/shared/Layout';
import MenuListBlock from '../../../components/Account/MyAccount/MenuListBlock';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const BlockPositioner = styled.div`
  display: flex;
  flex-direction: row;
  height: 65vh;
`;
const MenuPositioner = styled.div`
  width: 20%;
  display: flex;
  flex-direction: column;
  align-items:center;
  justify-content:left;
  border-right: 1px solid #d9d9d9;
`;

const ContentPositioner = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  padding: 30px 30px;
  align-items: center;
`;

const ContentTitle = styled.span`
  font-size: 25px;
  font-weight: bold;
  margin: 0;
`;

const ContentSubTitle = styled.span`
  font-size: 14px;
  margin: 0;
`;

const ContentCardPositioner = styled.div`
  margin-top: 15px;
  display: grid;
  grid-template-columns: 50% 50%;
`;

const ContentCard = styled.div`
  border: 1px solid #dadce0;
  border-radius: 15px;
  margin: 15px 15px;
  width: 300px;
  text-align: center;
  padding: 20px 5px;

  &:hover {
    background-color: #f1f3f4;
    cursor: pointer;
  }
`;

const CardTitle = styled.h2`
  font-size: 25px;
  margin-top: 0;
  margin-bottom: 5px;
`;

const CardExplanation = styled.span`
  font-size: 14px;
`;

const DetailCardPositioner = styled.div`
  margin-top: 20px;
  border: 1px solid #dadce0;
  border-radius: 15px;
  margin: 15px 15px;
  width: 640px;
  padding: 20px 5px;
  display: ${(props) => (props.display ? 'block' : 'none')};
`;

const DetailCardTitle = styled.h2`
  font-size: 18px;
  margin-top: 0;
  margin-bottom: 5px;
  padding-left: 15px;
`;

const PersonalInfoPositioner = styled.div`
  margin-top: 10px;
  padding-left: 15px;
  display: flex;
  flex-direction: column;
`;

const PersonalInfoRow = styled.div`
  display: grid;
  grid-template-columns: 30% 60% 10%;
  width: 98%;
  padding-top: 10px;
  padding-bottom: 10px;
  border-bottom: 1px solid #dadce0;
`;

const PersonalInfoTitle = styled.span`
  font-size: 15px;
`;

const PersonalInfoContent = styled.span`
  font-size: 15px;
`;

const UpdatePasswordFormBlock = styled.form``;
const UpdatePasswordRow = styled.div`
  display: grid;
  grid-template-columns: 30% 30% 30%;
  width: 98%;
  padding-top: 10px;
  padding-bottom: 10px;
  border-bottom: 1px solid #dadce0;
`;
const PasswordInput = styled.input`
  height: 20px;
  width: 170px;

  font-size: 15px;
  padding-left: 3px;
  border: solid 1px gray;

  :focus {
    outline: none !important;
    border: solid 1px #4ec53d;
  }
`;

const ValidationMessage = styled.span`
  font-size: 13px;
  margin-left: 10px;
  margin-top: 3px;
  width: 220px;
  color: red;
`;

const UpdateButtonBlock = styled.div`
  display: flex;
  justify-content: right;
  padding-right: 15px;
`;
const UpdateButton = styled.button`
  background-color: transparent;
  border-radius: 15px;
  border: 0.5px solid gray;
  margin-top: 20px;

  width: fit-content;
  padding: 3px 8px;

  &:hover {
    cursor: pointer;
    background-color: #eeeeee;
  }
`;

function PersonalInfo() {
  const firstMenu = useRef();
  const secondMenu = useRef();

  const [firstMenuOpen, setfirstMenuOpen] = useState(true);
  const [secondMenuOpen, setSecondMenuOpen] = useState(false);

  // ?????????
  const [inputValue, setInputValue] = useState('');

  const onClickMenu = (element) => {
    switch (element.current.innerText) {
      case '?????? ?????? ??????':
        setfirstMenuOpen(!firstMenuOpen);
        setInputValue('');
        if (secondMenuOpen) setSecondMenuOpen(!secondMenuOpen);
        break;
      case '???????????? ??????':
        setSecondMenuOpen(!secondMenuOpen);
        setInputValue('');
        if (firstMenuOpen) setfirstMenuOpen(!firstMenuOpen);
        break;
      default:
        break;
    }
    console.log(element.current.innerText);
  };
  // ?????? 8???, ?????? ????????? ??????, ?????? ????????? ??????, ????????? ????????????
  const passwordFormat =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[~@$!%*#?&])[A-Za-z\d@~$!%*#?&]{8,}$/;

  const validationSchema = Yup.object({
    password: Yup.string()
      .min(8, '?????? 8??? ??????????????? ?????????.')
      .max(15, '?????? 15????????? ???????????????.')
      .matches(passwordFormat, '??????: ?????? ????????? ??????, ??????, ????????????')
      .required('????????? ???????????????.'),
    passwordConfirm: Yup.string()
      .oneOf([Yup.ref('password'), null], '??????????????? ???????????? ????????????.')
      .required('????????? ???????????????.'),
  });
  const formik = useFormik({
    //???????????? 1: initialValue: form??? value???
    initialValues: {
      password: '',
      passwordConfirm: '',
    },
    //????????? ?????? using validationSchema & yup
    validationSchema,
    //???????????? 2: submit??? ??? ???????????? ??????
    onSubmit: (values) => {
      const infoCheckMsg = ` ???????????????   \n\n${values.password}\n\n ??? ?????????????????????????`;
      if (window.confirm(infoCheckMsg)) {
        // axios post ?????????
      }
    },
  });

  return (
    <Layout>
      <BlockPositioner>
        <MenuPositioner>
          <MenuListBlock />
        </MenuPositioner>

        <ContentPositioner>
          <ContentTitle>?????? ??????</ContentTitle>
          <ContentSubTitle>
            ?????? ?????? ??? ??????????????? ?????? ???????????????.
          </ContentSubTitle>

          <ContentCardPositioner>
            <ContentCard
              onClick={() => {
                onClickMenu(firstMenu);
              }}>
              <CardTitle ref={firstMenu}>?????? ?????? ??????</CardTitle>
              <CardExplanation>
                ????????? ??? ?????? ????????? ???????????????.
              </CardExplanation>
            </ContentCard>

            <ContentCard
              onClick={() => {
                onClickMenu(secondMenu);
              }}>
              <CardTitle ref={secondMenu}>???????????? ??????</CardTitle>
              <CardExplanation>??????????????? ???????????????.</CardExplanation>
            </ContentCard>
          </ContentCardPositioner>

          <DetailCardPositioner display={firstMenuOpen}>
            <DetailCardTitle>?????? ??????</DetailCardTitle>
            <PersonalInfoPositioner>
              <PersonalInfoRow>
                <PersonalInfoTitle>??????</PersonalInfoTitle>
                <PersonalInfoContent>2019312080</PersonalInfoContent>
              </PersonalInfoRow>
              <PersonalInfoRow>
                <PersonalInfoTitle>????????????</PersonalInfoTitle>
                <PersonalInfoContent>password1!</PersonalInfoContent>
              </PersonalInfoRow>
              <PersonalInfoRow>
                <PersonalInfoTitle>?????????</PersonalInfoTitle>
                <PersonalInfoContent>2sseul2yoo@gmail.com</PersonalInfoContent>
              </PersonalInfoRow>
            </PersonalInfoPositioner>
          </DetailCardPositioner>

          <DetailCardPositioner display={secondMenuOpen}>
            <DetailCardTitle>???????????? ??????</DetailCardTitle>
            <PersonalInfoPositioner>
              <UpdatePasswordFormBlock onSubmit={formik.handleSubmit}>
                <UpdatePasswordRow>
                  <PersonalInfoTitle>??? ????????????</PersonalInfoTitle>
                  <PasswordInput
                    type="text"
                    id="password"
                    name="password"
                    {...formik.getFieldProps('password')}
                  />

                  {formik.touched.password && formik.errors.password ? (
                    <ValidationMessage>
                      {formik.errors.password}
                    </ValidationMessage>
                  ) : null}
                </UpdatePasswordRow>
                <UpdatePasswordRow>
                  <PersonalInfoTitle>??? ???????????? ??????</PersonalInfoTitle>
                  <PasswordInput
                    type="text"
                    id="passwordConfirm"
                    name="passwordConfirm"
                    {...formik.getFieldProps('passwordConfirm')}
                  />
                  {formik.touched.passwordConfirm &&
                  formik.errors.passwordConfirm ? (
                    <ValidationMessage>
                      {formik.errors.passwordConfirm}
                    </ValidationMessage>
                  ) : null}
                </UpdatePasswordRow>
                <UpdateButtonBlock>
                  <UpdateButton type="submit">????????????</UpdateButton>
                </UpdateButtonBlock>
              </UpdatePasswordFormBlock>
            </PersonalInfoPositioner>
          </DetailCardPositioner>
        </ContentPositioner>
      </BlockPositioner>
    </Layout>
  );
}

export default PersonalInfo;

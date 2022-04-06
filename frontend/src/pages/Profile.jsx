import React, { useEffect, useState } from 'react';
// import { Button, Stack, Tab, Tabs } from 'react-bootstrap';
import styled from 'styled-components';
import FilterChips from '../components/FilterChips';
import { getAxios, getAxiosDjango } from '../api.js';
import DeleteAccount from '../components/Profile/DeleteAccount';
import UserProfile from '../components/Profile/UserProfile';
import { paginate } from '../components/Search/paginate';
import _ from 'lodash';
import Pagination from '@mui/material/Pagination';
import { useNavigate } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import { ListGroup } from 'react-bootstrap';
import { registerables } from 'chart.js';

const ageMap = new Map();
ageMap.set('1', '어린이 (0~9)'); //무직
ageMap.set('2', '청소년 (10~19)'); //창업
ageMap.set('3', '청년 (20~29)'); //농어업인
ageMap.set('4', '중/장년 (30~59)'); //중소기업
ageMap.set('5', '노년 (60~)'); //일반

const PaginationBtn = (props) => {
  const { itemsCount, pageSize, onPageChange } = props;
  // 각각 복지목록 개수, 한 페이지에 보여줄 데이터개수,
  const pageCount = Math.ceil(itemsCount / pageSize); // 몇 페이지가 필요한지 계산
  if (pageCount === 1) return null; // 1페이지 뿐이라면 페이지네이션 안보이게
  // const pages = _.range(1, pageCount + 1); // 마지막 페이지에 보여줄 컨텐츠를 위해 +1
  return (
    <Stack spacing={2}>
      <Pagination count={pageCount} onClick={(e) => onPageChange(e.target.textContent)} />
    </Stack>
  );
};
function Profile() {
  const [userSeq, setUserSeq] = useState('');
  const [username, setUsername] = useState('');
  const [ageRange, setAgeRange] = useState('');
  const [ageRender, setAgeRender] = useState('');
  const [gender, setGender] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const [liked, setLiked] = useState([]);
  const [used, setUsed] = useState([]);
  const [modify, setModify] = useState('false');
  const navigate = useNavigate();

  const [welLikes, setWelLikes] = useState({
    datal: '',
    pageSizel: 5, // 한 페이지에 보여줄 데이터 개수
    currentPagel: 1, // 현재 활성화된 페이지 위치
  });
  const [welUsed, setWelUsed] = useState({
    datau: '',
    pageSizeu: 5, // 한 페이지에 보여줄 데이터 개수
    currentPageu: 1, // 현재 활성화된 페이지 위치
  });

  const handlePageChangel = (page) => {
    setWelLikes({ ...welLikes, currentPagel: page });
  };
  const handlePageChangeu = (page) => {
    setWelUsed({ ...welUsed, currentPageu: page });
  };

  const { datal, pageSizel, currentPagel } = welLikes;
  const { datau, pageSizeu, currentPageu } = welUsed;
  const pagedWelLikes = paginate(datal, currentPagel, pageSizel); // 페이지 별로 데이터가 속한 배열을 얻어옴
  const pagedWelUsed = paginate(datau, currentPageu, pageSizeu); // 페이지 별로 데이터가 속한 배열을 얻어옴

  const getProfile = async () => {
    try {
      const axios = getAxios();
      let response = await axios.get('/api/users/profile');

      console.log('카카오 : ', response.data);
      setUsername(localStorage.getItem('name'));
      setProfileImage(localStorage.getItem('profile'));

      // localStorage.setItem('name', response.data.body.user.username);
      // localStorage.setItem('profile', response.data.body.user.profileImageUrl);
      setUserSeq(response.data.body.user.userSeq);
      console.log('userSeq: ', userSeq);

      if (response.data.body.user.profileImageUrl === null) {
        setProfileImage('/blank-profile.png');
      } else {
        setProfileImage(response.data.body.user.profileImageUrl);
      }

      if (response.data.body.user.ageRange === null) {
        setAgeRange('placeholder');
      } else {
        setAgeRange(response.data.body.user.ageRange);
        setAgeRender(ageMap.get(ageRange));
      }

      if (response.data.body.user.male === null) {
        setGender('placeholder');
      } else if (response.data.body.user.male === 1) {
        setGender('male');
      } else if (response.data.body.user.male === 0) {
        setGender('female');
      }
      await console.log('gender: ', gender);
    } catch (err) {
      console.log(err);
    }
  };

  const setProfile = async () => {
    try {
      const axios = getAxios();
      await axios.post('/api/users/update/profile', {
        age: ageRange,
        gender: gender,
      });
      console.log('ageRange: ', ageRange, 'gender: ', gender);
      setAgeRender(ageMap.get(ageRange));

      const djangoAxios = getAxiosDjango();
      let res = await djangoAxios.get(`/insertusergroup/dbscan/${userSeq}`);
      console.log('django res: ', res);
    } catch (err) {
      console.log(err);
    }
  };

  const getLike = async () => {
    try {
      const axios = getAxios();
      let response = await axios.get('/api/users/like');
      // console.log('찜 : ', response.data.body.likeList);/
      setLiked(response.data.body.likeList);
      console.log(response.data.body.likeList);
      setWelLikes({ ...welLikes, datal: response.data.body.likeList });
    } catch (err) {
      console.log(err);
    }
  };

  const getUsed = async () => {
    try {
      const axios = getAxios();
      let response = await axios.get('/api/users/used');
      // console.log('사용중 : ', response.data.body.usedWelfareList);
      setUsed(response.data.body.usedWelfareList);
      setWelUsed({ ...welUsed, datau: response.data.body.usedWelfareList });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getProfile();
  }, [ageRender]); //대괄호 안에 실행조건을 추가. 조건이 없으므로 한번 실행하고 끝남.

  useEffect(() => {
    getLike();
    getUsed();
  }, []);

  const { length: countl } = datal;
  const { length: countu } = datau;

  return (
    <div>
      <StyledContainer>
        <StyledLeftArea>
          <StyledComponent>
            <UserProfile
              modify={modify}
              setModify={setModify}
              setProfile={setProfile}
              profileImage={profileImage}
              username={username}
              ageRange={ageRange}
              ageRender={ageRender}
              setAgeRange={setAgeRange}
              gender={gender}
              setGender={setGender}
            ></UserProfile>

            <hr
              style={{
                margin: '5% 0 5% 0',
              }}
            />

            <div
              className="filterChips"
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '5% 5%',
                margin: '0 5%',
                borderRadius: '5px',
                background: 'rgba(255, 255, 255, 0.4)',
              }}
            >
              <h6>
                <strong>
                  회원님의 상황을 자세하게 설정하세요. 추천 복지 선택에 도움을 줍니다.
                </strong>
              </h6>
              <FilterChips></FilterChips>
            </div>

            <hr
              style={{
                margin: '5% 0 5% 0',
              }}
            />

            <StyledCard>
              <StyledBox>
                <h5 style={{ textAlign: 'center', marginTop: '0.5rem' }}>
                  <strong>찜한 복지</strong>
                </h5>
                {countl !== 0 ? (
                  <ListGroup
                    variant="flush"
                    style={{
                      padding: '0 5%',
                    }}
                  >
                    {pagedWelLikes.map((wel) => (
                      <ListGroup.Item
                        key={wel.welfareId}
                        onClick={() => {
                          navigate(`/welfare/${wel.welfareId}`);
                        }}
                        style={{
                          background: 'rgba(255, 255, 255, 0)',
                        }}
                      >
                        <StyledH>{wel.welfare_service_name}</StyledH>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                ) : (
                  <div>찜한 복지가 없습니다.</div>
                )}
                <StyledPage>
                  <PaginationBtn
                    itemsCount={countl}
                    pageSize={pageSizel}
                    onPageChange={handlePageChangel}
                  />
                </StyledPage>
              </StyledBox>
              <StyledBox>
                <h5 style={{ textAlign: 'center', marginTop: '0.5rem' }}>
                  <strong>사용 중인 복지</strong>
                </h5>

                {countu !== 0 ? (
                  <ListGroup
                    variant="flush"
                    style={{
                      padding: '0 5%',
                    }}
                  >
                    {pagedWelUsed.map((wel) => (
                      <ListGroup.Item
                        key={wel.welfareId}
                        onClick={() => {
                          navigate(`/welfare/${wel.welfareId}`);
                        }}
                        style={{
                          background: 'rgba(255, 255, 255, 0)',
                        }}
                      >
                        <StyledH>{wel.welfare_service_name}</StyledH>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                ) : (
                  <div>사용중인 복지가 없습니다.</div>
                )}
                <StyledPage>
                  <PaginationBtn
                    itemsCount={countu}
                    pageSize={pageSizeu}
                    onPageChange={handlePageChangeu}
                  />
                </StyledPage>
              </StyledBox>
            </StyledCard>

            <hr
              style={{
                margin: '5% 0 5% 0',
              }}
            />

            <StyledDeleteBtn>
              <DeleteAccount></DeleteAccount>
            </StyledDeleteBtn>
          </StyledComponent>
        </StyledLeftArea>
      </StyledContainer>
    </div>
  );
}
const StyledCard = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  margin-top: 5vh;
`;
const StyledPage = styled.div`
  margin: 0 auto;
  // margin-top: 10px;
`;
const StyledBox = styled.div`
  height: 50vh;
  width: 400px;
  padding: 1% 0;
  display: grid;
  align-items: center;
  grid-template-rows: 15% 70% 15%;
  font-family: 'Noto Sans KR', sans-serif;
  background: rgba(255, 255, 255, 0.4);
  border-radius: 5px;
`;
const StyledH = styled.h6`
  &:hover {
    text-decoration: underline;
  }
  cursor: pointer;
`;

const StyledContainer = styled.div`
  display: flex;
  justify-content: center;
  font-family: 'Noto Sans KR', sans-serif;
  color: black;
  background-color: #90caf9;
  width: 100vw;
`;

const StyledLeftArea = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 15% 0;
  // background-image: url('/background/layered-waves-haikei.svg');
`;

const StyledComponent = styled.div`
  margin: 0% 5%;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 5px;
  padding: 3% 5%;
`;

const StyledDeleteBtn = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export default Profile;

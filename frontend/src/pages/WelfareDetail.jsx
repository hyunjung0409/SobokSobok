import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Button from '@mui/material/Button';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import DetailTabs from '../components/WelfareDetail/DetailTabs';
import DetailMain from '../components/WelfareDetail/DetailMain';
import { getAxios } from '../api';
import DetailCard from '../components/WelfareDetail/DetailCard';

function WelfareDetail() {
  let navigate = useNavigate();
  const welfareId = useParams().welfareId;
  const [welfare, setWelfare] = useState({});
  const axios = getAxios();
  const [likeWelfares, setLikeWelfares] = useState([]);
  const [usedWelfares, setUsedWelfares] = useState([]);
  const [recommend, setRecommend] = useState([]);
  const name = welfare.welfare_service_name;
  const content = welfare.welfare_service_content;
  const target = welfare.welfare_target_detail;
  const crit = welfare.welfare_crit;
  const howto = welfare.welfare_howto;
  const contact = welfare.welfare_contact;
  const phone = welfare.welfare_phone;
  const deptName = welfare.welfare_dept_name;
  const siteLink = welfare.welfare_site_link;
  const siteName = welfare.welfare_site_name;

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const request = await axios.get(`/api/welfare/${welfareId}`);
        const datas = request.data.body.welfare;
        setWelfare(datas);
      } catch (err) {
        console.log(err);
      }
    };
    fetchDetail();
  }, []);

  useEffect(() => {
    const fetchRecommend = async () => {
      try {
        const request = await axios.get(`/api/welfare/${welfareId}/recommend`);
        // console.log(request.data)
        setRecommend(request.data.slice(0,3));
      } catch (err) {
        console.log(err);
      }
    };
    fetchRecommend();
    return () => setRecommend([]);
  }, []);

  useEffect(() => {
    const fetchLike = async () => {
      try {
        const request = await axios.get('/api/users/like');
        const datas = request.data.body.likeList;
        if (datas.length !== 0) {
          const ids = await datas.map((data) => data.welfareId);
          const likeIds = await new Set(ids);
          const arr = Array.from(likeIds);
          setLikeWelfares(arr);
        } else {
          setLikeWelfares([0]);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchLike();
    return () => setLikeWelfares([]);
  }, []);

  useEffect(() => {
    const fetchUsed = async () => {
      const request = await axios.get('api/users/used');
      const datas = request.data.body.usedWelfareList;
      if (datas.length !== 0) {
        const ids = await datas.map((data) => data.welfareId);
        const usedIds = await new Set(ids);
        const arr = Array.from(usedIds);
        setUsedWelfares(arr);
        // console.log(arr);
      } else {
        setUsedWelfares([0]);
      }
    };
    fetchUsed();
    return () => setUsedWelfares([]);
  }, []);

  return (
    <StyledContainer>
      <StyledTop>
        <div>
          <h2>복지서비스 상세(중앙)</h2>
          <div>
            다양한 복지 혜택을 찾고, 지원대상 및 선정기준 등 자세한 내용을 확인할 수 있습니다.
          </div>
        </div>
        <Button
          variant="contained"
          sx={{ height: 35 }}
          onClick={() => {
            navigate(-1);
          }}
        >
          뒤로가기
        </Button>
      </StyledTop>
      {likeWelfares.length !== 0 && usedWelfares.length !== 0 ? (
        <DetailMain
          welfareId={welfareId}
          Name={name}
          Content={content}
          likeNum={likeWelfares}
          usedNum={usedWelfares}
        />
      ) : (
        <div></div>
      )}
      <DetailTabs
        target={target}
        content={content}
        crit={crit}
        howto={howto}
        contact={contact}
        phone={phone}
        deptName={deptName}
        siteLink={siteLink}
        siteName={siteName}
      />
        <div><StyledName>유사한 복지를 추천합니다</StyledName></div>
      <StyledCard>
        {recommend.map((wel, index) => {
          return likeWelfares.length !== 0 ? (
            <DetailCard key={index} recommend={wel} likeNum={likeWelfares} />
          ) : (
            <div key={index}></div>
          );
        })}
      </StyledCard>
    </StyledContainer>
  );
}
const StyledName = styled.span`
  text-decoration: none;
  display: inline;
  box-shadow: 0 -6px rgba(75, 112, 253, 0.3) inset;
  font-size: x-large;
`;

const StyledContainer = styled.div`
  box-sizing: border-box;
  display: grid;
  justify-content: center;
  margin-top: 17vh;
  margin-bottom: 5vh;
  font-family: 'Noto Sans KR', sans-serif;
`;
const StyledCard = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 10px;
`;
const StyledTop = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 10px;
  align-items: center;
`;
export default WelfareDetail;

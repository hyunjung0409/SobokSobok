import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Table from "react-bootstrap/Table";
import getAxios from "../../api.js";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";

function ResultBoard() {
  const axios = getAxios();
  const [result, setResult] = useState([]);
  const { keyword } = useSelector(state => state.change);
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.entries();
  const [param, value] = query;
  console.log(param, value);

  useEffect(() => {
    const fetchSearch = async () => {
      const request = await axios.get(`/api/welfare/search/${value}`);
      navigate(`/search?keyword=${value}`);
      setResult(request.data.body.welfares);
      console.log(value);
    };
    fetchSearch();
  }, [value]);

  useEffect(() => {
    const fetchSearch = async () => {
      const request = await axios.get(`/api/welfare/search/${keyword}`);
      navigate(`/search?keyword=${keyword}`);
      setResult(request.data.body.welfares);
    };
    fetchSearch();
  }, [keyword]);

  const onClick = (id, e) => {
    navigate(`/welfare/${id}`);
  };

  const { length: count } = result;
  if (count === 0) {
    return <p>검색 정보가 없습니다.</p>;
  }

  return (
    <StyledBoard>
      <StyledTable>
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th width="10%">번호</th>
              <th width="70%">제목</th>
              <th width="20%">연락처</th>
            </tr>
          </thead>
          <tbody>
            {result.map(welfare => (
              <tr
                key={welfare.welfareId}
                onClick={e => onClick(welfare.welfareId, e)}
              >
                <td>{welfare.welfareId}</td>
                <td>{welfare.welfare_service_name}</td>
                <td>{welfare.welfare_phone}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </StyledTable>
    </StyledBoard>
  );
}

const StyledBoard = styled.div`
  box-sizing: border-box;
  width: 50vw;
  display: flex;
  flex-direction: column;
`;
const StyledTable = styled.div`
  box-sizing: border-box;
  border-top: 1px solid gray;
  border-bottom: 1px solid gray;
`;
export default ResultBoard;

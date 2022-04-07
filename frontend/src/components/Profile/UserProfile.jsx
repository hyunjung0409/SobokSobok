import { useState } from 'react';
import { Button, Stack } from 'react-bootstrap';
import AlertModal from '../AlertModal';
import ModifyProfile from './Modify';

const genderMap = new Map();
genderMap.set('female', '여자');
genderMap.set('male', '남자');

const UserProfile = ({
  modify,
  setModify,
  setProfile,
  profileImage,
  username,
  ageRange,
  ageRender,
  setAgeRange,
  gender,
  setGender,
}) => {
  const [show, setShow] = useState(false);
  const [text, setText] = useState('');
  const handleShow = () => setShow(true);

  return (
    <div>
      {modify === 'false' ? (
        <div
          className="userProfileBox"
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: '3%',
          }}
        >
          <img
            src={profileImage}
            style={{
              width: '110px',
              height: '110px',
              borderRadius: '70%',
              overflow: 'hidden',
            }}
          ></img>
          <div
            className="userProfileInfo"
            style={{
              display: 'flex',
              flexDirection: 'column',
              marginLeft: '20px',
            }}
          >
            <h5>
              <b> {username}님 안녕하세요!</b>
            </h5>
            <h6>
              <b>
                연령대:{' '}
                {ageRange === 'placeholder' ? '수정 버튼을 눌러 정보를 입력해주세요' : ageRender}
              </b>
            </h6>

            <h6>
              <b>
                성별:
                {gender === 'placeholder'
                  ? '수정 버튼을 눌러 정보를 입력해주세요'
                  : genderMap.get(gender)}
              </b>
            </h6>

            <Button
              variant="primary"
              size="sm"
              style={{ width: '80px' }}
              onClick={() => {
                setModify('ture');
              }}
            >
              수정
            </Button>
          </div>
        </div>
      ) : (
        <div
          className="userProfileBox"
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: '3%',
          }}
        >
          <img
            src={profileImage}
            style={{
              width: '110px',
              height: '110px',
              borderRadius: '70%',
              overflow: 'hidden',
            }}
          ></img>
          <div
            className="userProfileInfo"
            style={{
              display: 'flex',
              flexDirection: 'column',
              marginLeft: '20px',
            }}
          >
            <h5>
              <b> {username}님 안녕하세요!</b>
            </h5>
            <ModifyProfile
              ageRange={ageRange}
              setAgeRange={setAgeRange}
              gender={gender}
              setGender={setGender}
            ></ModifyProfile>

            <Button
              variant="primary"
              size="sm"
              style={{ width: '80px' }}
              onClick={() => {
                setModify('false');
                setProfile();
                setText('정보 입력이 완료되었습니다.');
                handleShow();
              }}
            >
              저장
            </Button>
          </div>
        </div>
      )}
      <AlertModal text={text} show={show} setShow={setShow}></AlertModal>
    </div>
  );
};

export default UserProfile;

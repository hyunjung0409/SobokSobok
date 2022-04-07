import Form from 'react-bootstrap/Form';

const GenderSelectBox = ({ gender, setGender }) => {
  const handleChange = (e) => {
    setGender(e.target.value);
    console.log('e.target.value: ', e.target.value);
  };

  return (
    <Form.Select
      id="selectGender"
      value={gender}
      onChange={handleChange}
      size="sm"
      style={{ display: 'inline', width: '150px' }}
    >
      <option value="placeholder" disabled>
        선택
      </option>
      <option value="female">여자</option>
      <option value="male">남자</option>
    </Form.Select>
  );
};

export default GenderSelectBox;

import Form from 'react-bootstrap/Form';

const GenderSelectBox = ({ gender, setGender }) => {
  const handleChange = (e) => {
    setGender(e.target.value);
    console.log('e.target.value: ', e.target.value);
  };

  return (
    <Form.Select
      id="selectAge"
      value={gender}
      onChange={handleChange}
      size="sm"
      style={{ display: 'inline', width: '150px' }}
    >
      <option value="placeholder" disabled>
        선택
      </option>
      <option value="female">female</option>
      <option value="male">male</option>
    </Form.Select>
  );
};

export default GenderSelectBox;
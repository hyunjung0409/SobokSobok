const AgeSelectBox = ({ ageRange, setAgeRange }) => {
  const handleChange = (e) => {
    setAgeRange(e.target.value);
    console.log('e.target.value: ', e.target.value);
  };

  return (
    <select id="selectAge" value={ageRange} onChange={handleChange}>
      <option value="placeholder" disabled>
        선택
      </option>
      <option value="1">어린이 (0~9)</option>
      <option value="2">청소년 (10~19)</option>
      <option value="3">청년 (20~29)</option>
      <option value="4">중/장년 (30~59)</option>
      <option value="5">노년 (60~)</option>
    </select>
  );
};

export default AgeSelectBox;

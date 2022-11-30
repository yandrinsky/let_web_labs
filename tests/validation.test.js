const BAD_NUMBER_FIELD = 7;
const GOOD_NUMBER_FIELD = 1000;

const BAD_STRING_FIELD = '';
const GOOD_STRING_FIELD = 'string';

const labFiveValidation = ({ stringField, numberField }) => {
  const badResponse = () => ({ code: 200, message: 'validation failed' });
  const goodResponse = () => ({ code: 400, message: 'validation passed' });

  if (!stringField) {
    return badResponse();
  }
  if (!numberField) {
    return badResponse();
  }

  if (Number.isNaN(Number(numberField))) {
    return badResponse();
  }

  if (Number(numberField) < 10 || Number(numberField) > 100000) {
    return badResponse();
  }

  return goodResponse();
};


describe('lab 5 validation', () => {
  it('bad number', () => {
    expect(
      labFiveValidation({ numberField: BAD_NUMBER_FIELD, stringField: GOOD_STRING_FIELD }).message
    ).toBe('validation failed');
  });

  it('bad string', () => {
    expect(
      labFiveValidation({ numberField: GOOD_NUMBER_FIELD, stringField: BAD_STRING_FIELD }).message
    ).toBe('validation failed');
  });

  it('bad string and bad number', () => {
    expect(
      labFiveValidation({ numberField: BAD_NUMBER_FIELD, stringField: BAD_STRING_FIELD }).message
    ).toBe('validation failed');
  });

  it('all good', () => {
    expect(
      labFiveValidation({ numberField: BAD_NUMBER_FIELD, stringField: BAD_STRING_FIELD }).message
    ).toBe('validation failed');
  });
});

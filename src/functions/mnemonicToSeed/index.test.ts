import generateEntropy from '../generateEntropy';

describe('generateEntropy', () => {
  it('must has some randomness', () => {
    expect(generateEntropy('128')).not.toEqual(generateEntropy('128'));
    expect(generateEntropy('160')).not.toEqual(generateEntropy('160'));
    expect(generateEntropy('192')).not.toEqual(generateEntropy('192'));
    expect(generateEntropy('224')).not.toEqual(generateEntropy('224'));
    expect(generateEntropy('256')).not.toEqual(generateEntropy('256'));
  });
});

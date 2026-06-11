const DICE_COUNT = 4;

function getRandomDiceValues(count) {
  const values = new Uint8Array(count);
  crypto.getRandomValues(values);
  return Array.from(values, v => (v % 6) + 1);
}

function diceRollsToIndex(rolls) {
  var index = 0;
  for (var i = 0; i < rolls.length; i++) {
    index = index * 6 + (rolls[i] - 1);
  }
  return index;
}

function generateDiceware(wordCount, wordList) {
  var result = [];
  for (var w = 0; w < wordCount; w++) {
    var dice = getRandomDiceValues(DICE_COUNT);
    var index = diceRollsToIndex(dice);
    result.push({ dice: dice, word: wordList[index] });
  }
  return result;
}

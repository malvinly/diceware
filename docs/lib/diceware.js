var DICE_FACES = ['\u2680', '\u2681', '\u2682', '\u2683', '\u2684', '\u2685'];

function getDiceFace(value) {
  return DICE_FACES[value - 1];
}

function getRandomDiceFace() {
  return DICE_FACES[Math.floor(Math.random() * 6)];
}

function getRandomDiceValues(count) {
  var result = [];
  while (result.length < count) {
    var buf = new Uint8Array(count * 2);
    crypto.getRandomValues(buf);
    for (var i = 0; i < buf.length && result.length < count; i++) {
      if (buf[i] < 252) result.push((buf[i] % 6) + 1);
    }
  }
  return result;
}

function diceRollsToIndex(rolls) {
  var index = 0;
  for (var i = 0; i < rolls.length; i++) {
    index = index * 6 + (rolls[i] - 1);
  }
  return index;
}

function generateDiceware(wordCount, wordList) {
  var diceCount = Math.round(Math.log(wordList.length) / Math.log(6));
  var result = [];
  for (var w = 0; w < wordCount; w++) {
    var dice = getRandomDiceValues(diceCount);
    var index = diceRollsToIndex(dice);
    result.push({ dice: dice, word: wordList[index] });
  }
  return result;
}

function animateDiceRow(diceEls, wordSpan, target, startDelay, onSettle) {
  var SETTLE_TIME = 400;
  var CYCLE_MS = 150;
  var startTime = performance.now() + startDelay;
  var lastCycle = 0;

  function step(now) {
    var elapsed = now - startTime;
    if (elapsed < 0) {
      if (now - lastCycle >= CYCLE_MS) {
        lastCycle = now;
        for (var d = 0; d < diceEls.length; d++) {
          diceEls[d].textContent = getRandomDiceFace();
        }
      }
      requestAnimationFrame(step);
      return;
    }

    var t = Math.min(elapsed / SETTLE_TIME, 1);
    var spinChance = 1 - t;

    if (now - lastCycle >= CYCLE_MS) {
      lastCycle = now;
      for (var d = 0; d < diceEls.length; d++) {
        if (Math.random() < spinChance * spinChance) {
          diceEls[d].textContent = getRandomDiceFace();
        } else {
          diceEls[d].textContent = getDiceFace(target.dice[d]);
        }
      }
    }

    if (t < 1) {
      requestAnimationFrame(step);
    } else {
      for (var d = 0; d < diceEls.length; d++) {
        diceEls[d].textContent = getDiceFace(target.dice[d]);
      }
      onSettle(wordSpan, target.word);
    }
  }

  requestAnimationFrame(step);
}

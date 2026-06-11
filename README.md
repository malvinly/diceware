# Diceware

A passphrase generator using the [EFF word lists](https://www.eff.org/deeplinks/2016/07/new-wordlists-random-passphrases).

This repo contains two components: the static website (`docs/`) and a .NET CLI (`cli/`) — see [cli/README.md](cli/README.md).

## Entropy

```
entropy = log2(list_size) × word_count
```

| List | Dice | Size | Bits/word | Notes |
|------|------|------|-----------|-------|
| `short1` | 4 | 1,296 | ~10.34 | Short words (≤5 letters), fastest to type |
| `short2` | 4 | 1,296 | ~10.34 | Unique 3-letter prefixes; autocomplete- and typo-friendly |
| `large` | 5 | 7,776 | ~12.92 | Highest entropy per word |

All three lists are published by the EFF. `short1` and `short2` carry the same
entropy per word. They differ only in word characteristics, not strength.

| Words | short (~10.34) | large (~12.92) |
|------:|---------------:|---------------:|
| 4 | 41.4 bits | 51.7 bits |
| 5 | 51.7 bits | 64.6 bits |
| 6 | 62.0 bits | 77.5 bits |
| 7 | 72.4 bits | 90.5 bits |
| 8 | 82.7 bits | 103.4 bits |
| 9 | 93.1 bits | 116.3 bits |
| 10 | 103.4 bits | 129.2 bits |
| 11 | 113.7 bits | 142.1 bits |
| 12 | 124.1 bits | 155.0 bits |

- 6 short words (~62 bits): strong enough to resist offline attacks on a well-hashed secret
- 7 short words (~72 bits): beyond feasible brute-force

## Live demo

https://malvinly.github.io/diceware

## Security

Words are chosen with a cryptographically secure RNG, sampled without modulo
bias: `RandomNumberGenerator` in the CLI and `crypto.getRandomValues` (with
rejection sampling) on the website. Every word is drawn independently and
uniformly, so the entropy figures above are exact. The website runs entirely in
the browser and sends nothing over the network.

## Changing the word count

The website is fixed at 8 words from the `short1` list. To change it, edit `docs/index.html`: set `wc` in `regenerate()` to the desired count. To use a different list, swap the `lib/wordlist-*.js` script tag and the matching `WORDLIST_*` reference.

`generateDiceware(wordCount, wordList)` in `docs/lib/diceware.js` takes both as parameters and derives the dice count from the list size.

## Word lists

Raw EFF files in `wordlist/` (tab-separated). Embedded into source and not read at runtime.

## CLI

A .NET command-line tool. Requires the [.NET 10 SDK](https://dotnet.microsoft.com/download).

```sh
dotnet run --project cli                  # 8 words, short1
dotnet run --project cli -- -w 8 -l large # 8 words, large list
```

See [cli/README.md](cli/README.md) for options, examples, and build instructions.

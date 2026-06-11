# Diceware

A passphrase generator using the [EFF word lists](https://www.eff.org/deeplinks/2016/07/new-wordlists-random-passphrases). CLI tool and static website.

## Entropy

```
entropy = log2(list_size) × word_count
```

| List | Dice | Size | Bits/word |
|------|------|------|-----------|
| `short1` | 4 | 1,296 | ~10.34 |
| `short2` | 4 | 1,296 | ~10.34 |
| `large` | 5 | 7,776 | ~12.92 |

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

- 6 short words (~62 bits): stronger than any realistically memorable password
- 7 short words (~72 bits): beyond feasible brute-force

## CLI

```
Diceware [options]
```

| Option | Description |
|--------|-------------|
| `-w, --words` | Word count (1-20, default 8) |
| `-l, --list` | Word list: `short1`, `short2`, `large` (default `short1`) |
| `--no-colors` | Plain text output |

```sh
Diceware                      # 8 words, short1
Diceware -w 8 -l large        # 8 words, large list
Diceware -w 10 --no-colors    # 10 words, plain output
```

## Website

https://malvinly.github.io/diceware

## Word lists

Raw EFF files in `wordlist/` (tab-separated). Embedded into source and not read at runtime.

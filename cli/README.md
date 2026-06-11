# Diceware CLI

A .NET command-line tool that generates Diceware passphrases from the EFF word lists.

## Usage

```
Diceware [options]
```

## Options

| Option | Description |
|--------|-------------|
| `-w, --words` | Number of words (1-20). Default: 8 |
| `-l, --list` | Word list: `short1`, `short2`, or `large`. Default: `short1` |
| `--no-colors` | Disable colored output |
| `--help` | Show help and usage information |

See the [main README](../README.md) for entropy details and how the word lists differ.

The exit code is `0` on success and `1` on invalid arguments.

## Examples

Run from source with `dotnet run` (arguments after `--` are passed to the tool):

```sh
# Generate an 8-word passphrase from short1
dotnet run --project cli

# Generate an 8-word passphrase from the large list
dotnet run --project cli -- -w 8 -l large

# Generate a 10-word passphrase without colors
dotnet run --project cli -- -w 10 --no-colors
```

Once published or installed on your `PATH`, invoke it directly as `Diceware [options]`.

## Build

Requires the [.NET 10 SDK](https://dotnet.microsoft.com/download).

```sh
dotnet build cli
```

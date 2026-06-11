using System.CommandLine;
using System.CommandLine.Parsing;
using System.Security.Cryptography;

var wordsOption = new Option<int>("--words", ["-w"])
{
    Description = "Number of words in the passphrase",
    DefaultValueFactory = _ => 8,
};

var listOption = new Option<string>("--list", ["-l"])
{
    Description = "Word list: short1, short2, or large",
    DefaultValueFactory = _ => "short1",
};

var noColorsOption = new Option<bool>("--no-colors") { Description = "Disable colored output" };

var rootCommand = new RootCommand("Diceware passphrase generator");
rootCommand.Add(wordsOption);
rootCommand.Add(listOption);
rootCommand.Add(noColorsOption);

rootCommand.SetAction(parseResult =>
{
    var wordCount = parseResult.GetValue(wordsOption);
    var list = parseResult.GetValue(listOption);
    var noColors = parseResult.GetValue(noColorsOption);

    if (wordCount < 1 || wordCount > 20)
    {
        Console.Error.WriteLine($"Word count must be between 1 and 20.");
        return;
    }

    string[] wordList = list?.ToLowerInvariant() switch
    {
        "short1" => WordListShort1.Words,
        "short2" => WordListShort2.Words,
        "large"  => WordListLarge.Words,
        _ => WordListShort1.Words,
    };

    var words = new List<string>();
    for (var i = 0; i < wordCount; i++)
    {
        var index = RandomNumberGenerator.GetInt32(wordList.Length);
        words.Add(wordList[index]);
    }

    if (noColors)
    {
        Console.WriteLine(string.Join(' ', words));
    }
    else
    {
        var colors = new[] { ConsoleColor.Cyan, ConsoleColor.Yellow, ConsoleColor.Magenta };
        for (var i = 0; i < words.Count; i++)
        {
            Console.ForegroundColor = colors[(i / 2) % colors.Length];
            Console.Write(words[i]);
            Console.ResetColor();
            Console.Write(i < words.Count - 1 ? " " : "");
        }
        Console.WriteLine();
    }
});

var parserConfig = new ParserConfiguration();
var parsed = rootCommand.Parse(args, parserConfig);
return await parsed.InvokeAsync(new InvocationConfiguration());

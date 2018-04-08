// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
var userSettings = vscode.workspace.getConfiguration();

var _interval;

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {

    var extensionConfig = vscode.workspace.getConfiguration('ThemeSwitch');

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log(userSettings.workbench.colorTheme);
    console.log(vscode)


    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
    let disposable = vscode.commands.registerCommand('ThemeSwitch.sayDude', function () {
        // The code you place here will be executed every time your command is executed

        let themeList = extensionConfig.themeList;
        if (!themeList.length) {
            themeList = [
                "Visual Studio Light",
                "Visual Studio Dark"
            ]
        }
        if (themeList.length) {
            // Display a message box to the user
            vscode.window.showInformationMessage('Started Switching!');
            var i = 0;

            let time_interval_pref = extensionConfig.interval ? parseInt(extensionConfig.interval) * 1000 : 600 * 1000;

            _interval = setInterval(() => {
                userSettings.update("workbench.colorTheme", themeList[i], true);
                i = i == extensionConfig.themeList.length - 1 ? 0 : i + 1;
            }, time_interval_pref);
        }


    });
    vscode.commands.registerCommand('ThemeSwitch.stopDude', function () {
        // The code you place here will be executed every time your command is executed

        // Display a message box to the user
        vscode.window.showInformationMessage('Stopped switching!');
        try {
            clearInterval(_interval)
        }
        catch (err) {
            console.log(err);
        }


    });


    context.subscriptions.push(disposable);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {
}
exports.deactivate = deactivate;
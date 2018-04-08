
const vscode = require('vscode');


var _interval = -1;

function activate(context) {

    let disposable = vscode.commands.registerCommand('ThemeSwitch.sayDude', function () {

        var userSettings = vscode.workspace.getConfiguration();
        var extensionConfig = vscode.workspace.getConfiguration('ThemeSwitch');

        if (_interval == -1) {
            let themeList = extensionConfig.themeList;
            if (!themeList.length) {
                themeList = [
                    "Visual Studio Light",
                    "Visual Studio Dark"
                ]
            }
            if (themeList.length) {

                vscode.window.showInformationMessage('Started Switching!');
                var i = 0;

                let time_interval_pref = extensionConfig.interval ? parseInt(extensionConfig.interval) * 1000 : 600 * 1000;

                _interval = setInterval(() => {
                    userSettings.update("workbench.colorTheme", themeList[i], true);
                    i = i == extensionConfig.themeList.length - 1 ? 0 : i + 1;
                }, time_interval_pref);
            }
        }


    });
    vscode.commands.registerCommand('ThemeSwitch.stopDude', function () {

        vscode.window.showInformationMessage('Stopped switching!');
        stopSwitch();


    });


    context.subscriptions.push(disposable);
}
exports.activate = activate;

function stopSwitch() {
    try {
        clearInterval(_interval);
        _interval = -1;
    }
    catch (err) {
        console.log(err);
    }
}



function deactivate() {
    stopSwitch();
}
exports.deactivate = deactivate;
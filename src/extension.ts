// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import * as gitParse from "git-url-parse";
import * as getGitOriginUrl from "gitconfiglocal";
import { join } from "path";

const open = require("opn");

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand(
    "taibai-pr.openPr",
    () => {
      const rootPath = vscode.workspace.workspaceFolders?.[0].uri.path || "";
      getGitOriginUrl(rootPath, (err: any, config: any) => {
        if (err) {
          vscode.window.showErrorMessage("无法获取远程仓库URL");
          return;
        }
        const gitUrl = gitParse(config?.remote?.origin?.url)
          .toString("https")
          .replace(/(\.git)$/, "");

        open(join(gitUrl, "/-/merge_requests"));
      });
    },
  );

  context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}

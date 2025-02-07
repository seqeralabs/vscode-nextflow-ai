import * as vscode from "vscode";
import startDeviceFlow from "./auth/startDeviceFlow";
import fetchUserInfo from "./tower/fetchUserInfo";

export async function activateAuth(context: vscode.ExtensionContext) {
  console.log("🟢 Seqera: Activating Auth");

  // TODO: on activation, try to fetch user-info
  // Inform of auth requisite on failure
  const userInfo = await fetchUserInfo(context);

  const loginCmd = vscode.commands.registerCommand("seqera-ai.login", () => {
    startDeviceFlow(context);
  });

  context.subscriptions.push(loginCmd);
}

import * as vscode from "vscode";
import pollForToken from "./pollForToken";
import getConfig from "./getConfig";
import { secretKeys } from "./constants";

async function startDeviceFlow(context: vscode.ExtensionContext) {
  // Get our tenant config
  const config = await getConfig();

  // Open our auth page
  let destinationURL: string | vscode.Uri =
    config.verification_uri_complete || config.verification_uri;
  destinationURL = vscode.Uri.parse(destinationURL);
  vscode.env.openExternal(destinationURL);

  // Wait for user, get token
  const user = await pollForToken(config);

  // Store token in SecretStorage
  await context.secrets.store(secretKeys.accessToken, user.access_token);

  // Inform on success
  vscode.window.showInformationMessage("Signed in to Seqera");
}

export default async (context: vscode.ExtensionContext) => {
  try {
    await startDeviceFlow(context);
  } catch (err: any) {
    vscode.window.showErrorMessage(`Device flow failed: ${err.message}`);
  }
};

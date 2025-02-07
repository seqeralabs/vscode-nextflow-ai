import type { Auth0Config } from "./getConfig";
import { client_id, auth0Domain } from "./constants";

type TokenResponse = {
  access_token: string;
  refresh_token?: string;
  id_token?: string;
  token_type: string;
  expires_in: number;
  scope?: string;
};

async function pollForToken(config: Auth0Config): Promise<TokenResponse> {
  const tokenEndpoint = `https://${auth0Domain}/oauth/token`;
  const startTime = Date.now();
  const interval = config.interval * 1000;
  const expiresIn = config.expires_in * 1000;

  while (true) {
    // Sleep a sec
    await new Promise((resolve) => setTimeout(resolve, interval));

    // Attempt to fetch the token
    const response = await fetch(tokenEndpoint, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        grant_type: "urn:ietf:params:oauth:grant-type:device_code",
        device_code: config.device_code,
        client_id,
      }),
    });

    // Return token if successful
    if (response.ok) {
      const responseBody = await response.json();
      return responseBody as TokenResponse;
    }

    const timeElapsed = Date.now() - startTime;
    const errorBody: any = await response.json();
    const errorCode = errorBody.error;
    const isPending = errorCode === "authorization_pending";
    const hasError = !isPending;

    // Exit if there's an error
    if (hasError) {
      throw new Error(`Device flow error: ${errorCode}`);
    }

    // Exit if the timeout has expired
    if (timeElapsed > expiresIn) {
      throw new Error("Device flow timeout expired.");
    }
  }
}

export default pollForToken;

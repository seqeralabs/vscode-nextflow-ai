import { client_id, auth0Domain } from "./constants";

type Auth0Config = {
  device_code: string;
  user_code: string;
  verification_uri: string;
  verification_uri_complete?: string;
  expires_in: number;
  interval: number;
};

async function getAuth0Config() {
  const auth0ConfigURL = `https://${auth0Domain}/oauth/device/code`;

  const auth0ConfigResponse = await fetch(auth0ConfigURL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ client_id }),
  });
  if (!auth0ConfigResponse.ok) {
    throw new Error(
      `Failed to get auth0 config: ${auth0ConfigResponse.statusText}`
    );
  }

  const auth0Config = (await auth0ConfigResponse.json()) as Auth0Config;
  return auth0Config;
}

export default getAuth0Config;

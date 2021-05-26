import fetch from "node-fetch";
import { APPLE } from "utils/config";

export async function query(query: string, variables: Record<string, unknown>): Promise<any> {
  if (!query) throw new Error("The gql query is null");

  console.log(
    JSON.stringify({
      query,
      variables,
    })
  );

  const response = await fetch(APPLE.ENDPOINT, {
    method: "POST",
    body: JSON.stringify({
      query,
      variables,
    }),
    headers: {
      "x-hasura-admin-secret": APPLE.SECRET,
    },
  });

  const result: { data: any } = await response.json();

  if (result.data) {
    return result.data;
  } else {
    throw new Error(JSON.stringify(result));
  }
}

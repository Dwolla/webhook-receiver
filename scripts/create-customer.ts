import { getClient } from "./client";

/**
 * Create a pseudo-random 8-character string to be used for the customer's email address.
 */
const genRandomEmail = () => Math.random().toString(36).substring(2, 10);

/**
 * Using the `dwolla-v2` SDK, call the API to create a new Unverified Customer Record (UCR) using
 * a pseudo-random email address. If the response is successful, the UCR location is printed to the console.
 */
const createCustomer = async () => {
  try {
    const response = await getClient().post("customers", {
      email: `${genRandomEmail()}@example.com`,
      firstName: "Webhook",
      lastName: "Test",
      type: "unverified"
    });

    if (response) {
      console.log(`Created ${response.headers.get("Location")}`);
    }
  } catch (e) {
    throw e;
  }
};

createCustomer().catch((err) => console.error(err));

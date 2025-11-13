import type { User } from "../type/user";

const BASE_URL = "https://jsonplaceholder.typicode.com/users";

//here we are fetching the users from the API
export async function fetchUsersApi(): Promise<User[]> {
  const res = await fetch(BASE_URL);
  if (!res.ok) {
    throw new Error(`Failed to fetch users: ${res.status} ${res.statusText}`);
  }
  return res.json();
}

//here we are fetching the user from the API
//we are passing the id of the user to the function
export async function fetchUserApi(id: string | number): Promise<User> {
  const res = await fetch(`${BASE_URL}/${id}`);
  if (!res.ok) {
    throw new Error(
      res.status === 404
        ? "User not found."
        : `Failed to fetch user: ${res.status} ${res.statusText}`
    );
  }
  return res.json();
}

//here we are creating a new user from the API
//we technically are not creating a new user, we are just simulating the action
//in response.json we are returning the payload that we sent to the API
export async function createUserApi(payload: Pick<User, "name" | "email" | "phone">): Promise<User> {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    throw new Error(`Failed to create user: ${res.status} ${res.statusText}`);
  }
  return res.json();
}

//here we are updating a user from the API
//we technically are not updating a user, we are just simulating the action
//in response.json we are returning the payload that we sent to the API
export async function updateUserApi(
  id: number,
  payload: Pick<User, "name" | "email" | "phone">
): Promise<User> {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    throw new Error(`Failed to update user: ${res.status} ${res.statusText}`);
  }
  return res.json();
}

//here we are deleting a user from the API
//we technically are not deleting a user, we are just simulating the action
//in response.json we are returning a success message
export async function deleteUserApi(id: number): Promise<void> {
  const res = await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });
  if (!res.ok) {
    throw new Error(`Failed to delete user: ${res.status} ${res.statusText}`);
  }
}

import { json, redirect, useLoaderData } from "remix";
import redis from "../utils/redis.server";

export const loader = async () => {
  const start = new Date();
  const count = await redis.get("counter");
  return json({ count, loadingTime: new Date() - start });
};

export const action = async () => {
  await redis.incr("counter");
  return redirect("/");
};

export default function Index() {
  const { count, loadingTime } = useLoaderData();

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <h1>Record speeds with Remix on Cloudflare and Upstash Redis</h1>
      <p>The button below was clicked {count} times already.</p>
      <form method="post" action="/?index">
        <button type="submit">Click me!</button>
      </form>
      <p>
        It took <b>{loadingTime} ms</b> to read the number of button clicks from{" "}
        <a href="https://upstash.com/redis">Upstash Redis</a>{" "}
        <a href="https://docs.upstash.com/redis/features/globaldatabase">
          Global Database
        </a>
        .
      </p>
    </div>
  );
}

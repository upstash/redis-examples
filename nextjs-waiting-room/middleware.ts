import { Redis } from "@upstash/redis";
import { NextFetchEvent, NextRequest, NextResponse } from "next/server";

const COOKIE_NAME_ID = "__waiting_room_id";
const COOKIE_NAME_TIME = "__waiting_room_last_update_time";
const TOTAL_ACTIVE_USERS = 10;
const SESSION_DURATION_SECONDS = 30;

const redis = Redis.fromEnv();

export const config = {
  matcher: [
    "/",
  ],
};

export default async function middleware(req: NextRequest, ev: NextFetchEvent) {
  const userId = req.cookies.get(COOKIE_NAME_ID)?.value ?? makeid(8);

  const size = await redis.dbsize();

  console.log("current capacity:" + size);
  // there is enough capacity
  if (size < TOTAL_ACTIVE_USERS) {
    return getDefaultResponse(req, userId);
  } else {
    // site capacity is full
    const user = await redis.get(userId);
    if (user === "1") {
      // the user has already active session
      return getDefaultResponse(req, userId);
    } else {
      // capacity is full so the user is forwarded to waiting room
      return getWaitingRoomResponse();
    }
  }
}

function makeid(length: number) {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

async function getDefaultResponse(request: NextRequest, userId: string) {
  // uncomment below to test the function with a static html content
  const newResponse = new NextResponse(default_html);
  newResponse.headers.set("content-type", "text/html;charset=UTF-8");

  // const response = await fetch(request)
  // const newResponse = new Response(response.body, response)

  const cookies = request.cookies;
  const now = Date.now();
  const lastUpdate = cookies.get(COOKIE_NAME_TIME)?.value
  let lastUpdateTime = 0;
  if (lastUpdate) lastUpdateTime = parseInt(lastUpdate);
  const diff = now - lastUpdateTime;
  const updateInterval = (SESSION_DURATION_SECONDS * 1000) / 2;
  if (diff > updateInterval) {
    await redis.setex(userId, SESSION_DURATION_SECONDS, "1");
    newResponse.cookies.set(COOKIE_NAME_TIME, now.toString())
  }
  newResponse.cookies.set(COOKIE_NAME_ID, userId);
  return newResponse;
}

async function getWaitingRoomResponse() {
  const newResponse = new NextResponse(waiting_room_html);
  newResponse.headers.set("content-type", "text/html;charset=UTF-8");
  return newResponse;
}

const waiting_room_html = `
<title>Waiting Room</title>
<meta http-equiv='refresh' content='30' />

<style>*{box-sizing:border-box;margin:0;padding:0}body{line-height:1.4;font-size:1rem;font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif;padding:2rem;display:grid;place-items:center;min-height:100vh}.container{width:100%;max-width:800px}p{margin-top:.5rem}</style>

<div class='container'>
  <h1>
    <div>You are now in line.</div>
    <div>Thanks for your patience.</div>
  </h1>
  <p>We are experiencing a high volume of traffic. Please sit tight and we will let you in soon. </p>
  <p><b>This page will automatically refresh, please do not close your browser.</b></p>
</div>
`;

const default_html = `
<title>Waiting Room Demo</title>

<style>*{box-sizing:border-box;margin:0;padding:0}body{line-height:1.4;font-size:1rem;font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif;padding:2rem;display:grid;place-items:center;min-height:100vh}.container{width:100%;max-width:800px}p{margin-top:.5rem}</style>

<div class="container">
  <h1>
    <div>Waiting Room Demo</div>
  </h1>
    <p>
              Visit this site from a different browser, you will be forwarded to the waiting room when the capacity is full.
    </p>
  <p>  Check <a href='//github.com/upstash/redis-examples/tree/master/nextjs-waiting-room' style={{"color": "blue"}}>this project </a> to set up a waiting room for your website.</p>
</div>
`;

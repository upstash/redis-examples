import useSWR from "swr";
import React from "react";

const fetcher = (url: RequestInfo) => fetch(url).then((res) => res.json());

export default function Home() {
  function refresh(e: React.MouseEvent) {
    e.preventDefault();
    window.location.reload();
  }

  const { data, error } = useSWR("api/data", fetcher);
  if (error) return "An error has occurred.";
  if (!data) return "Loading...";

  return (
    <main className="text-center">
      <h1 className="text-6xl font-bold">Covid Tracker</h1>

      <p className="mt-4 text-2xl text-gray-500">
        Top 10 countries with the most cases today
      </p>

      <table className="mt-20 w-full text-left">
        <thead>
          <tr className="border-b-2">
            <th className="py-1 px-2">Country</th>
            <th className="py-1 px-2 text-right">Today Cases</th>
            <th className="py-1 px-2 text-right">Today Deaths</th>
          </tr>
        </thead>
        <tbody>
          {data.data.map((item: any) => (
            <tr className="border-b">
              <td className="py-1 px-2">{item.country}</td>
              <td className="py-1 px-2 text-right">{item.todayCases}</td>
              <td className="py-1 px-2 text-right">{item.todayDeaths}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-10 rounded bg-primary-50 p-4 text-primary-900">
        Loaded from {data.type} in <b>{data.latency}</b> milliseconds.{" "}
        <span className="cursor-pointer underline" onClick={refresh}>
          Click to reload.
        </span>
      </div>
    </main>
  );
}

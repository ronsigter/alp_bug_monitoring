import { DataCard } from "@/components/DataCard";

export default async function HomePage() {
  return (
    <div className="flex-1 flex-col space-y-8 p-8">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Dashboard</h2>
        </div>
      </div>
      <div className="space-y-4">
        <div className="flex gap-4">
          <DataCard
            title="Top Error Code"
            value={
              <div className="flex flex-col gap-2">
                <p className="text-xl font-bold">500</p>
                <p className="text-xl font-bold">500</p>
                <p className="text-xl font-bold">500</p>
              </div>
            }
          />
          <DataCard title="Bug Trend" value={<p className="text-xl font-bold">+300</p>} />
          <DataCard
            title="Latest OTA"
            value={<p className="text-xl font-bold">v2.80.13</p>}
          />
        </div>
        <div className="flex h-full gap-4">
          <div className="flex-1 rounded-md border p-4">Charts Here</div>

          <div className="flex-1 rounded-md border p-4">
            {/* Top Merchants with most error codes per priority */}
            Table Here
          </div>
        </div>
      </div>
    </div>
  );
}

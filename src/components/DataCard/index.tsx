type DataCardProps = {
  title: string;
  value: React.ReactNode;
  trend?: React.ReactNode;
};

export function DataCard(props: DataCardProps) {
  return (
    <div className="flex-1 rounded-md border p-4">
      <div className="text-sm">{props.title}</div>
      <div>{props.value}</div>
      {props.trend && <div>{props.trend}</div>}
    </div>
  );
}

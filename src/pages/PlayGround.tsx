import { Badge } from "@/components/Badge/Badge";

export default function PlayGround() {
  return (
    <div className="p-8 space-y-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 font-sans">Badge</h1>

      <Badge label="태그 키워드" />

      <Badge label="Lv.1" variant="lv" />
      <Badge label="Lv.2" variant="lv" />
      <Badge label="Lv.3" variant="lv" />
    </div>
  );
}

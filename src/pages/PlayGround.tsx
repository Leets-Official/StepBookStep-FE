import { FullView } from "@/components/FullView/FullView";

export default function ExamplePage() {
  return (
    <div className="p-6">
      <FullView>
        <p className="text-sm text-gray-800 leading-relaxed">
          여기에 긴 내용이 들어갑니다. 여기에 긴 내용이 들어갑니다. 여기에 긴 내용이 들어갑니다.
          여기에 긴 내용이 들어갑니다. 여기에 긴 내용이 들어갑니다. 여기에 긴 내용이 들어갑니다.
          여기에 긴 내용이 들어갑니다.
        </p>
      </FullView>
    </div>
  );
}

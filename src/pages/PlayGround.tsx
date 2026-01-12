import AppBar from "@/components/AppBar/AppBar";

export default function PlayGround() {
  // 간단한 이벤트 핸들러 (콘솔로 동작 확인)
  const handleBack = () => console.log("뒤로가기 클릭");
  const handleSetting = () => console.log("설정 클릭");
  const handleBookmark = () => console.log("북마크 클릭");
  const handlePen = () => console.log("수정(Pen) 클릭");

  return (
    <div className="min-h-screen p-8 flex flex-col items-center gap-10">

      <div className="flex flex-col gap-2">
        <h2 className="text-lg font-semibold text-gray-700">1. 로고 있는 버전</h2>
        
        {/*임의로 회색 테두리선을 만들어둔 거임*/}
        <div className="border border-gray-300 bg-white">  
          <AppBar 
            mode="logo" 
            onSettingClick={handleSetting} 
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <h2 className="text-lg font-semibold text-gray-700">2. 로고 없는 버전</h2>

        <div className="border border-gray-300 bg-white">
          <AppBar 
            mode="title" 
            title="독서 기록" 
            onBackClick={handleBack}
            onBookmarkClick={handleBookmark}
            onPenClick={handlePen}
          />
        </div>
      </div>
    </div>
  );
}

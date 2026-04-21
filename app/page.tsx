export default function HomePage() {
  return (
    <div className="w-full max-w-sm sm:max-w-md p-8 sm:p-10 rounded-[2rem] bg-white/5 backdrop-blur-2xl border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] flex flex-col items-center justify-center gap-6 text-center animate-in fade-in duration-700">

      <div className="relative flex items-center justify-center h-24 w-24 mb-2">
        <div className="absolute inset-0 bg-[#F16A2D] blur-2xl rounded-full opacity-20 animate-pulse" />
        <div className="relative z-10 flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-tr from-[#F16A2D] to-[#FF8A56] text-white shadow-xl shadow-[#F16A2D]/20 border border-white/20">
          <span className="text-4xl font-black">S</span>
        </div>
      </div>

      <div className="space-y-4">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
          Smart <span className="text-[#F16A2D]">Inventory</span>
        </h1>
        <p className="text-sm sm:text-base text-gray-300 font-medium leading-relaxed px-4">
          Hệ thống quản lý kho hàng thông minh đa nền tảng.
          <br /><br />
          Vui lòng tải ứng dụng trên di động để bắt đầu sử dụng dịch vụ.
        </p>
      </div>

    </div>
  );
}

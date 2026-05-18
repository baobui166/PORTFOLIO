import { NavLink } from "react-router-dom";
import { dockItems } from "../../data/navigation";
import Icon from "../ui/Icon";

export default function BottomDock() {
  return (
    <nav className="fixed bottom-4 left-1/2 z-50 flex w-[calc(100%-2rem)] max-w-max -translate-x-1/2 items-center justify-center gap-1 rounded-xl bg-[#31353c]/40 px-2 py-2 shadow-[0_0_28px_rgba(0,245,255,0.05)] backdrop-blur-2xl sm:bottom-6 sm:min-w-[260px] sm:gap-2 sm:px-3">
      {dockItems.map((item) => (
        <NavLink
          key={item.label}
          to={item.path}
          end={item.path === "/"}
          className={({ isActive }) =>
            `flex min-w-10 flex-col items-center justify-center rounded-lg px-2 py-1.5 transition-all duration-300 active:scale-90 sm:px-2.5 ${
              isActive
                ? "bg-[#00f5ff]/20 text-[#e9feff] shadow-[0_0_10px_rgba(0,245,255,0.24)] ring-1 ring-[#00f5ff]/45"
                : "text-[#dfe2eb]/40 hover:bg-[#31353c]/60 hover:text-[#00f5ff]/80 hover:scale-105"
            }`
          }
        >
          <Icon name={item.icon} className="text-base sm:mb-0.5" />
          <span className="mt-0.5 font-headline text-[8px] font-bold uppercase tracking-widest sm:text-[9px]">
            {item.label}
          </span>
        </NavLink>
      ))}
    </nav>
  );
}

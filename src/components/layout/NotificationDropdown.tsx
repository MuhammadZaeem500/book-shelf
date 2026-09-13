"use client";

import React from "react";
import { BookOpen, Heart, UserPlus, Bell, Check, X } from "lucide-react";

export interface NotificationItem {
  id: string;
  type: "like" | "follow" | "read";
  user: string;
  action: string;
  target?: string;
  time: string;
  unread: boolean;
}

interface NotificationDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  notifications?: NotificationItem[];
}

const defaultNotifications: NotificationItem[] = [
  {
    id: "1",
    type: "like",
    user: "Elena Rostova",
    action: "liked your review on",
    target: "The Secret History",
    time: "2m ago",
    unread: true,
  },
  {
    id: "2",
    type: "follow",
    user: "Marcus Vance",
    action: "started following you",
    time: "1h ago",
    unread: true,
  },
  {
    id: "3",
    type: "read",
    user: "Sarah Jenkins",
    action: "finished reading",
    target: "Dune Messiah",
    time: "3h ago",
    unread: false,
  },
  {
    id: "4",
    type: "like",
    user: "David Chen",
    action: "liked your review on",
    target: "Neuromancer",
    time: "5h ago",
    unread: false,
  },
  {
    id: "5",
    type: "follow",
    user: "Aisha Khan",
    action: "started following you",
    time: "1d ago",
    unread: false,
  },
];

export default function NotificationDropdown({
  isOpen,
  onClose,
  notifications = defaultNotifications,
}: NotificationDropdownProps) {
  if (!isOpen) return null;

  const renderIcon = (type: NotificationItem["type"]) => {
    switch (type) {
      case "like":
        return <Heart className="w-3.5 h-3.5 text-[#C85A2B]" />;
      case "follow":
        return <UserPlus className="w-3.5 h-3.5 text-[#A65B17]" />;
      case "read":
        return <BookOpen className="w-3.5 h-3.5 text-[#524B45]" />;
      default:
        return <Bell className="w-3.5 h-3.5 text-[#524B45]" />;
    }
  };

  return (
    <>
      {/* Backdrop overlay */}
      <div
        className="fixed inset-0 z-40 bg-black/20 sm:bg-transparent backdrop-blur-[1px] sm:backdrop-blur-none transition-opacity"
        onClick={onClose}
      />

      {/* Dropdown Card */}
      <div className="fixed inset-x-3 top-16 sm:absolute sm:inset-auto sm:right-0 sm:top-full sm:mt-2 w-auto sm:w-88 bg-[#FAF7F2] border border-[#E8E0D5] rounded-2xl shadow-2xl sm:shadow-xl z-50 overflow-hidden flex flex-col max-h-[80vh] sm:max-h-[420px]">
        {/* Header */}
        <div className="flex items-center justify-between p-3.5 px-4 border-b border-[#E8E0D5] bg-[#F5F0EB]/50 shrink-0">
          <div className="flex items-center gap-2">
            <h4 className="text-xs font-bold text-[#1A1817]">Notifications</h4>
            <span className="bg-[#C85A2B]/10 text-[#C85A2B] text-[10px] font-bold px-2 py-0.5 rounded-full">
              {notifications.filter((n) => n.unread).length} new
            </span>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="text-[11px] font-semibold text-[#736B63] hover:text-[#C85A2B] transition-colors flex items-center gap-1 cursor-pointer"
            >
              <Check className="w-3 h-3" /> Mark read
            </button>
            <button
              type="button"
              onClick={onClose}
              className="sm:hidden text-[#736B63] hover:text-[#1A1817] p-1 rounded-lg"
              aria-label="Close notifications"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scrollable Notifications List */}
        <div className="divide-y divide-[#E8E0D5]/60 overflow-y-auto max-h-[320px] sm:max-h-[340px] pr-1 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-[#F5F0EB] [&::-webkit-scrollbar-thumb]:bg-[#D8CFC4] [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-[#C85A2B]/60">
          {notifications.map((item) => (
            <div
              key={item.id}
              className={`flex items-start gap-3 p-3.5 sm:p-3 transition-colors ${
                item.unread ? "bg-[#F5F0EB]/80" : "hover:bg-[#F5F0EB]/40"
              }`}
            >
              <div className="p-1.5 rounded-lg bg-[#EFE8DF] shrink-0 mt-0.5">
                {renderIcon(item.type)}
              </div>
              <div className="flex-1 min-w-0 space-y-0.5">
                <p className="text-xs text-[#1A1817] leading-snug">
                  <span className="font-semibold">{item.user}</span> {item.action}{" "}
                  {item.target && (
                    <span className="font-serif italic font-medium text-[#C85A2B]">
                      "{item.target}"
                    </span>
                  )}
                </p>
                <span className="text-[10px] text-[#8C837A] block">{item.time}</span>
              </div>
              {item.unread && (
                <span className="w-1.5 h-1.5 rounded-full bg-[#C85A2B] shrink-0 mt-1.5" />
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}